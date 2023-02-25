export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  tutorials: string[];
  sharpsportId: string;
  verified: false;
  paymentAddress: string;
  tags: string[];
  roles: string[];
}

export interface UserAccess {
  accessToken: string;
  refreshToken: string;
}
