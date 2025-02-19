export interface RequestDto {
  id: string;
  title: string;
  organization: {
    title: string;
    isVerified: boolean;
  };
  description: string;
  goalDescription: string;
  actionsSchedule: {
    stepLabel: string;
    isDone: boolean;
  }[];
  endingDate: string;
  location: {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
  };
  contacts: {
    email: string;
    phone: string;
    website: string;
  };
  requesterType: 'person' | 'organization';
  helpType: 'finance' | 'material';
  helperRequirements: {
    helperType: 'group' | 'single';
    isOnline: boolean;
    qualification: 'professional' | 'common';
  };
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
}

export interface Request extends RequestDto {
  isFavourite: boolean;
}

export function toRequestDto(request: Request): RequestDto {
  const dto = { ...request };
  delete dto.isFavourite;
  return dto;
}
