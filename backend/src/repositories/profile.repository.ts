import { pool } from '@/database';
import { ProfileDto } from '@/dto/profile.dto';
import { dateTimeToDate } from '@/helpers/date.helper';
import { Pool, QueryResult } from 'pg';

const queries = {
  findProfile: {
    name: 'find-profile',
    text: `
      SELECT p.first_name, p.last_name, p.birthdate, p.status, p.additional_info,
        (
          SELECT jsonb_build_object('email', pc.email, 'phone', pc.phone)
          FROM profile_contacts pc WHERE pc.user_id = $1
        ) AS contacts,
        (
          SELECT jsonb_build_object('telegram', ps.telegram, 'whatsapp', ps.whatsapp, 'vk', ps.vk)
          FROM profile_socials ps WHERE ps.user_id = $1
        ) AS socials,
        (
          SELECT json_agg(
            jsonb_build_object('organization', pe.organization, 'level', pe.level, 'specialization', pe.specialization, 'graduation_year', pe.graduation_year)
          )
          FROM profile_education pe WHERE pe.user_id = $1
        ) AS education,
        (
          SELECT json_agg(
            jsonb_build_object('latitude', l.latitude, 'longitude', l.longitude, 'district', l.district, 'city', l.city)
          )
          FROM profile_locations pl
          INNER JOIN locations l ON pl.user_id = $1 AND l.id = pl.location_id
        ) AS locations
        FROM profiles p WHERE p.user_id = $1;`,
  },
};

export class ProfileRepository {
  constructor(private pool: Pool) {}

  async findProfile(userId: number) {
    const { rows }: QueryResult<ProfileDto> = await this.pool.query(
      queries.findProfile,
      [userId]
    );
    return rows.map((profile) => ({
      ...profile,
      birthdate: dateTimeToDate(profile.birthdate ?? ''),
    }))[0];
  }
}

export const profileRepository = new ProfileRepository(pool);
