export interface Organization {
  id: number;
  title: string;
  isVerified: boolean;
}

export interface RequestAction {
  requestId: Request['id'];
  stepLabel: string;
  isDone: boolean;
}

export interface RequestContacts {
  requestId: Request['id'];
  email: string | null;
  phone: string | null;
  website: string | null;
}

export interface Request {
  id: number;
  title: string;
  description: string;
  goalDescription: string;
  endingDate: string;
}
