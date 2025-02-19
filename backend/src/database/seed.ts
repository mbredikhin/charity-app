import { pool } from '.';
import { User } from '@/models/user.model';
import { hashSecret } from '@/helpers/crypto.helper';
import { faker } from '@faker-js/faker';
import { dateTimeToDate } from '@/helpers/date.helper';
import {
  Profile,
  ProfileContacts,
  ProfileEducation,
  ProfileSocials,
} from '@/models/profile.model';
import { Location } from '@/models/location.model';
import { PoolClient } from 'pg';
import {
  Organization,
  Request,
  RequestAction,
  RequestContacts,
  RequestHelperRequirements,
} from '@/models/request.model';
import { exit } from 'node:process';

const generateUser = (index: number): Omit<User, 'id'> => ({
  email: `user-${index + 1}@site.com`,
  password_hash: hashSecret(
    'password',
    process.env.JWT_TOKEN_SIGNING_KEY as string,
    process.env.PASSWORD_SALT as string
  ),
});

const generateProfile = (user_id: number): Profile => ({
  user_id,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  birthdate: dateTimeToDate(faker.date.birthdate()),
  additional_info: null,
  status: 'beginner',
});

const generateProfileContacts = (user_id: number): ProfileContacts => ({
  user_id,
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
});

const generateProfileSocials = (user_id: number): ProfileSocials => ({
  user_id,
  telegram: faker.internet.username(),
  whatsapp: faker.internet.username(),
  vk: faker.internet.username(),
});

const generateProfileEducation = (user_id: number): ProfileEducation => ({
  user_id,
  organization: faker.company.name(),
  level: '',
  specialization: '',
  graduation_year: 2000,
});

const generateLocation = (): Omit<Location, 'id'> => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  district: faker.location.state(),
  city: faker.location.city(),
});

const generateRequest = (count: number): Omit<Request, 'id'> => {
  const request_goal = faker.number.int({ min: 1, max: 1000 });
  const request_goal_current_value = faker.number.int({
    min: 1,
    max: request_goal,
  });
  return {
    title: `Request #${count}`,
    description: 'Description',
    goal_description: 'Goal description',
    ending_date: dateTimeToDate(faker.date.future()),
    requester_type: Math.random() > 0.5 ? 'organization' : 'person',
    help_type: Math.random() > 0.5 ? 'finance' : 'material',
    contributors_count: faker.number.int({ min: 1, max: 10 }),
    request_goal,
    request_goal_current_value,
  };
};

const generateRequestHelperRequirements = (
  request_id: Request['id']
): RequestHelperRequirements => ({
  request_id,
  helper_type: Math.random() > 0.5 ? 'group' : 'single',
  is_online: Math.random() > 0.5,
  qualification: Math.random() > 0.5 ? 'professional' : 'common',
});

const generateRequestAction = (
  request_id: Request['id'],
  count: number,
  is_done = false
): RequestAction => ({
  request_id,
  step_label: `Action #${count}`,
  is_done,
});

const generateRequestContacts = (
  request_id: Request['id']
): RequestContacts => ({
  request_id,
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  website: faker.internet.domainName(),
});

const generateOrganization = (): Omit<Organization, 'id'> => ({
  title: faker.company.name(),
  is_verified: Math.random() > 0.5,
});

class Seeder {
  constructor(private client: PoolClient) {}

  static stringifyValue(
    value: string | number | boolean | null | undefined
  ): string {
    if (typeof value === 'string') {
      return `'${value.replaceAll("'", `\'`).replaceAll('"', `\"`)}'`;
    } else if ([null, undefined].includes(value as null | undefined)) {
      return 'NULL';
    }
    return `${value}`;
  }

  async insert(table: string, entries: Record<any, any>[]) {
    const fields = Object.keys(entries[0]);
    const query = `
      INSERT INTO ${table} (${fields.join(', ')})
      VALUES ${entries
        .map(
          (entry) =>
            `(${fields.map((key) => Seeder.stringifyValue(entry[key])).join(', ')})`
        )
        .join(', ')}
      RETURNING *;`;
    const result = await this.client.query(query);
    return result.rows;
  }

  async createUsers(quantity: number): Promise<User['id'][]> {
    const users: Omit<User, 'id'>[] = Array.from({ length: quantity }).map(
      (_, index) => generateUser(index)
    );
    const result = await this.insert('users', users);
    return result.map(({ id }) => id);
  }

  async createProfiles(userIds: number[]) {
    const profiles = userIds.map((userId) => generateProfile(userId));
    await this.insert('profiles', profiles);
  }

  async createProfileContacts(userIds: number[]) {
    const contacts = userIds.map((userId) => generateProfileContacts(userId));
    await this.insert('profile_contacts', contacts);
  }

  async createProfileSocials(userIds: number[]) {
    const socials = userIds.map((userId) => generateProfileSocials(userId));
    await this.insert('profile_socials', socials);
  }

  async createProfileEducation(userIds: number[], perUser: number = 2) {
    const education = userIds.reduce(
      (acc, userId) => [
        ...acc,
        ...Array.from({ length: perUser }).map(() =>
          generateProfileEducation(userId)
        ),
      ],
      [] as ProfileEducation[]
    );
    await this.insert('profile_education', education);
  }

  async createLocations(quantity: number): Promise<Location['id'][]> {
    const locations = Array.from({ length: quantity }).map(() =>
      generateLocation()
    );
    const result = await this.insert('locations', locations);
    return result.map(({ id }) => id);
  }

  async createProfileLocations(userIds: number[], perUser = 2) {
    for await (const user_id of userIds) {
      const locationIds = await this.createLocations(perUser);
      await this.insert(
        'profile_locations',
        locationIds.map((location_id) => ({ user_id, location_id }))
      );
    }
  }

  async createRequests(quantity: number): Promise<Request['id'][]> {
    const requests = Array.from({ length: quantity }).map((_, index) =>
      generateRequest(index + 1)
    );
    const result = await this.insert('requests', requests);
    return result.map(({ id }) => id);
  }

  async createRequestActions(requestIds: Request['id'][], perRequest = 3) {
    for await (const requestId of requestIds) {
      const actions = Array.from({ length: perRequest }).map((_, index) =>
        generateRequestAction(requestId, index + 1, index === 0)
      );
      await this.insert('request_actions', actions);
    }
  }

  async createRequestHelperRequirements(requestIds: Request['id'][]) {
    const helperRequirements = requestIds.map((requestId) =>
      generateRequestHelperRequirements(requestId)
    );
    await this.insert('request_helper_requirements', helperRequirements);
  }

  async createRequestContacts(requestIds: Request['id'][]) {
    const contacts = requestIds.map((requestId) =>
      generateRequestContacts(requestId)
    );
    await this.insert('request_contacts', contacts);
  }

  async createRequestLocations(requestIds: Request['id'][], perRequest = 2) {
    for await (const request_id of requestIds) {
      const locationIds = await this.createLocations(perRequest);
      await this.insert(
        'request_locations',
        locationIds.map((location_id) => ({ request_id, location_id }))
      );
    }
  }

  async createRequestOrganizations(requestIds: Request['id'][]) {
    const organizations = Array.from({
      length: faker.number.int({ min: 0, max: requestIds.length - 1 }),
    }).map(() => generateOrganization());
    const result = await this.insert('organizations', organizations);
    const organizationIds = result.map(({ id }) => id);
    await this.insert(
      'request_organization',
      requestIds.map((request_id) => ({
        request_id,
        organization_id:
          organizationIds[
            faker.number.int({ min: 0, max: organizationIds.length - 1 })
          ],
      }))
    );
  }

  async createFavouriteRequests(
    userIds: User['id'][],
    requestIds: Request['id'][],
    perUser = 2
  ) {
    for await (const user_id of userIds) {
      const entries = requestIds
        .slice(0, perUser)
        .map((request_id) => ({ user_id, request_id }));
      await this.insert('favourite_requests', entries);
    }
  }
}

(async function main() {
  const client = await pool.connect();
  const seeder = new Seeder(client);
  try {
    await client.query('BEGIN');
    const userIds = await seeder.createUsers(2);
    console.log('users seeding completed successfully');
    await seeder.createProfiles(userIds);
    console.log('profiles seeding completed successfully');
    await seeder.createProfileContacts(userIds);
    console.log('profile_contacts seeding completed successfully');
    await seeder.createProfileSocials(userIds);
    console.log('profile_socials seeding completed successfully');
    await seeder.createProfileEducation(userIds);
    console.log('profile_education seeding completed successfully');
    await seeder.createProfileLocations(userIds);
    console.log('profile_locations seeding completed successfully');

    const requestIds = await seeder.createRequests(20);
    console.log('requests seeding completed successfully');
    await seeder.createRequestActions(requestIds);
    console.log('request_actions seeding completed successfully');
    await seeder.createRequestHelperRequirements(requestIds);
    console.log('request_helper_requirements seeding completed successfully');
    await seeder.createRequestContacts(requestIds);
    console.log('request_contacts seeding completed successfully');
    await seeder.createRequestLocations(requestIds);
    console.log('request_locations seeding completed successfully');
    await seeder.createRequestOrganizations(requestIds);
    console.log('request_organizations seeding completed successfully');
    await seeder.createFavouriteRequests(userIds, requestIds);
    console.log('favourite_requests seeding completed successfully');

    await client.query('COMMIT');

    console.log('Db seeding has been completed successfully');
  } catch (error: any) {
    console.error(
      `Error occured during db seeding procedure: ${error.message}`
    );
    console.log('Rollback changes');
    await client.query('ROLLBACK');
  } finally {
    client.release();
    exit();
  }
})();
