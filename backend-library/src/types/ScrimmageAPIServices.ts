export const ScrimmageAPIServices = ['api', 'p2e', 'fed', 'nbc'] as const;

export type ScrimmageAPIService = (typeof ScrimmageAPIServices)[number];
