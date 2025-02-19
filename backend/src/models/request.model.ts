export interface Organization {
  id: number;
  title: string;
  is_verified: boolean;
}

export interface RequestAction {
  request_id: Request['id'];
  step_label: string;
  is_done: boolean;
}

export interface RequestContacts {
  request_id: Request['id'];
  email: string | null;
  phone: string | null;
  website: string | null;
}

export interface RequestHelperRequirements {
  request_id: Request['id'];
  helper_type: 'group' | 'single';
  is_online: boolean;
  qualification: 'professional' | 'common';
}

export interface Request {
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
}
