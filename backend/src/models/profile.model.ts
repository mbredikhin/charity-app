import { User } from './user.model';

export interface Profile {
  userId: User['id'];
  firstName: string | null;
  lastName: string | null;
  birthdate: string | null;
  status: string | null;
  additionalInfo: string | null;
}

export interface ProfileContacts {
  userId: User['id'];
  email: string | null;
  phone: string | null;
}

export interface ProfileSocials {
  userId: User['id'];
  telegram: string | null;
  whatsapp: string | null;
  vk: string | null;
}

export interface ProfileEducation {
  userId: User['id'];
  organization: string;
  level: string;
  specialization: string;
  graduationYear: number;
}
