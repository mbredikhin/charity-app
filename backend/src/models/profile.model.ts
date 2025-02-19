import { User } from './user.model';

export interface Profile {
  user_id: User['id'];
  first_name: string | null;
  last_name: string | null;
  birthdate: string | null;
  status: string | null;
  additional_info: string | null;
}

export interface ProfileContacts {
  user_id: User['id'];
  email: string | null;
  phone: string | null;
}

export interface ProfileSocials {
  user_id: User['id'];
  telegram: string | null;
  whatsapp: string | null;
  vk: string | null;
}

export interface ProfileEducation {
  user_id: User['id'];
  organization: string;
  level: string;
  specialization: string;
  graduation_year: number;
}
