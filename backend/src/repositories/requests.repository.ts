import { pool } from '@/database';
import { RequestDto } from '@/dto/request.dto';
import { Request } from '@/models/request.model';
import { User } from '@/models/user.model';
import { Pool, QueryResult } from 'pg';

const findRequestQueryBase = `
  SELECT r.id, r.title, r.description, r.goal_description, r.ending_date, r.requester_type, r.help_type, r.contributors_count, 
  r.request_goal, r.request_goal_current_value,
  (
    SELECT jsonb_build_object('helper_type', rh.helper_type, 'is_online', rh.is_online, 'qualification', rh.qualification)
    FROM request_helper_requirements rh WHERE rh.request_id = r.id
  ) AS helper_requirements,
  (
    SELECT jsonb_build_object('email', rc.email, 'phone', rc.phone, 'website', rc.website)
    FROM request_contacts rc WHERE rc.request_id = r.id
  ) AS contacts,
  (
    SELECT jsonb_build_object('title', title, 'is_verified', is_verified)
    FROM organizations o
    INNER JOIN request_organization ro ON ro.request_id = r.id AND ro.organization_id = o.id 
  ) AS organization,
  (
    SELECT array_agg(jsonb_build_object('step_label', step_label, 'is_done', is_done)) 
    FROM request_actions ra WHERE ra.request_id = r.id
  ) AS "actions_schedule",
  (
    SELECT array_agg(jsonb_build_object('latitude', l.latitude, 'longitude', l.longitude, 'district', l.district, 'city', l.city)) 
    FROM locations l 
    INNER JOIN request_locations rl ON rl.request_id = r.id AND rl.location_id = l.id
  ) AS locations
  FROM requests r WHERE `;

const queries = {
  getAllRequests: {
    name: 'get-all-requests',
    text: findRequestQueryBase + 'TRUE;',
  },
  findRequest: {
    name: 'find-request',
    text: findRequestQueryBase + 'r.id = $1;',
  },
  findFavouriteRequests: {
    name: 'find-favourite-requests',
    text: 'SELECT request_id FROM favourite_requests WHERE user_id = $1;',
  },
  addFavouriteRequest: {
    name: 'add-favourite-request',
    text: 'INSERT INTO favourite_requests (user_id, request_id) VALUES ($1, $2);',
  },
  removeFavouriteRequest: {
    name: 'remove-favourite-request',
    text: 'DELETE FROM favourite_requests WHERE user_id = $1 AND request_id = $2;',
  },
};

export class RequestsRepository {
  constructor(private pool: Pool) {}

  async getAllRequests() {
    const { rows }: QueryResult<RequestDto> = await this.pool.query(
      queries.getAllRequests,
      []
    );
    return rows;
  }
  async findRequest(id: Request['id']) {
    const { rows }: QueryResult<RequestDto> = await this.pool.query(
      queries.findRequest,
      [id]
    );
    return rows[0];
  }
  async findFavouriteRequests(userId: User['id']) {
    const { rows }: QueryResult<{ request_id: Request['id'] }> =
      await this.pool.query(queries.findFavouriteRequests, [userId]);
    return rows.map(({ request_id }) => request_id);
  }
  async addRequestToFavourites(userId: User['id'], requestId: Request['id']) {
    await this.pool.query(queries.addFavouriteRequest, [userId, requestId]);
  }
  async removeRequestFromFavourites(
    userId: User['id'],
    requestId: Request['id']
  ) {
    await this.pool.query(queries.removeFavouriteRequest, [userId, requestId]);
  }
}

export const requestsRepository = new RequestsRepository(pool);
