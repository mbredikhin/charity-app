import { Location } from '@/models/location.model';
import {
  Organization,
  Request,
  RequestAction,
  RequestContacts,
  RequestHelperRequirements,
} from '@/models/request.model';

export interface RequestDto extends Omit<Request, 'id'> {
  organization: Omit<Organization, 'id'>;
  actions_schedule: Omit<RequestAction, 'request_id'>[];
  contacts: Omit<RequestContacts, 'request_id'>;
  locations: Omit<Location, 'id'>[];
  helper_requirements: Omit<RequestHelperRequirements, 'request_id'>;
}
