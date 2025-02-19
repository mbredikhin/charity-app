import { Location } from '@/models/location.model';
import {
  ProfileContacts,
  ProfileEducation,
  ProfileSocials,
  Profile,
} from '@/models/profile.model';

export interface ProfileDto extends Omit<Profile, 'userId'> {
  contacts: Omit<ProfileContacts, 'userId'>;
  socials: Omit<ProfileSocials, 'userId'>;
  education: Omit<ProfileEducation, 'userId'>[];
  locations: Omit<Location, 'id'>[];
}
