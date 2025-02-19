export interface ProfileContacts {
  email: string | null;
  phone: string | null;
}

export interface ProfileSocials {
  telegram: string | null;
  whatsapp: string | null;
  vk: string | null;
}

export interface ProfileEducation {
  organization: string;
  level: string;
  specialization: string;
  graduation_year: number;
}

export interface ProfileLocation {
  latitude: number;
  longitude: number;
  district: string;
  city: string;
}

export interface ProfileDto {
  first_name: string | null;
  last_name: string | null;
  birthdate: string | null;
  status: string | null;
  additional_info: string | null;
  contacts: ProfileContacts;
  socials: ProfileSocials;
  education: ProfileEducation[];
  locations: ProfileLocation[];
}

export interface Profile extends ProfileDto {
  get full_name(): string;
}

export function createProfile(dto: ProfileDto): Profile {
  return {
    ...dto,
    get full_name() {
      return `${this.first_name} ${this.last_name}`;
    },
  };
}
