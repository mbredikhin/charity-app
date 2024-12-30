export interface ProfileContacts {
  email: string;
  phone: string;
  social: {
    telegram: string;
    whatsapp: string;
    vk: string;
  };
}

export interface ProfileEducation {
  organizationName: string;
  level: string;
  specialization: string;
  graduationYear: number;
}

export interface ProfileLocation {
  latitude: number;
  longitude: number;
  district: string;
  city: string;
}

export interface ProfileDto {
  id: string;
  name: string | null;
  lastName: string | null;
  birthdate: string;
  status: string;
  baseLocations: ProfileLocation[] | null;
  educations: ProfileEducation[] | null;
  additionalInfo: string;
  contacts: Partial<ProfileContacts> | null;
  favouriteRequests: string[] | null;
}

export interface Profile extends ProfileDto {
  name: string;
  lastName: string;
  baseLocations: ProfileLocation[];
  educations: ProfileEducation[];
  favouriteRequests: string[];
  get fullName(): string;
}

export function createProfile(dto: ProfileDto): Profile {
  return {
    ...dto,
    name: dto.name ?? '',
    lastName: dto.lastName ?? '',
    baseLocations: [...dto.baseLocations],
    educations: [...dto.educations],
    favouriteRequests: [...dto.favouriteRequests],
    contacts: {
      email: dto.contacts?.email ?? '',
      phone: dto.contacts?.phone ?? '',
      social: {
        telegram: dto.contacts?.social?.telegram ?? '',
        whatsapp: dto.contacts?.social?.whatsapp ?? '',
        vk: dto.contacts?.social?.vk ?? '',
      },
    },
    get fullName() {
      return `${this.name} ${this.lastName}`;
    },
  };
}
