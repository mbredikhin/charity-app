import { Location } from '@/models/location.model';
import {
  Organization,
  Request,
  RequestAction,
  RequestContacts,
} from '@/models/request.model';

export interface RequestDto extends Omit<Request, 'id'> {
  organization: Omit<Organization, 'id'>;
  actionsSchedule: Omit<RequestAction, 'requestId'>[];
  contacts: Omit<RequestContacts, 'requestId'>;
  locations: Omit<Location, 'id'>[];
}
