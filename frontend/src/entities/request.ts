import { omit } from '@/utils/common';

export interface RequestDto {
  id: number;
  title: string;
  description: string;
  goal_description: string;
  ending_date: string;
  requester_type: 'person' | 'organization';
  help_type: 'finance' | 'material';
  contributors_count: number;
  request_goal: number;
  request_goal_current_value: number;
  helper_requirements: {
    helper_type: 'group' | 'single';
    is_online: boolean;
    qualification: 'professional' | 'common';
  };
  organization: {
    title: string;
    is_verified: boolean;
  };
  actions_schedule: {
    step_label: string;
    is_done: boolean;
  }[];
  locations: {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
  }[];
  contacts: {
    email: string | null;
    phone: string | null;
    website: string | null;
  };
}

export interface Request extends RequestDto {
  is_favourite: boolean;
}

export function toRequestDto(request: Request): RequestDto {
  return omit(request, ['is_favourite']);
}
