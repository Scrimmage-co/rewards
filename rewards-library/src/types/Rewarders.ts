export interface Rewarder {
  integrator: string;
  id: number;
  name: string;
  image: string;
  multiplier: number;
  enabled: boolean;
  updatedAt: Date;
  createdAt: Date;
  code: string;
  priority: number;
}

export type IntegrationStatus = 'rejected' | 'active' | 'inactive';

export interface RewarderIntegration {
  id: number;
  userId: number;
  region: string;
  rewarder: Rewarder;
  status: IntegrationStatus;
}
