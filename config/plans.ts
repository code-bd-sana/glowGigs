// config/plans.ts

// IDs we will use in DB & code
export type PlanId = "basic" | "bronze" | "pro";

export interface PlanRules {
  label: string; 
  maxApplicationsPerMonth: number | "unlimited";
  canChatWithEmployers: boolean;
}

export const PLAN_RULES: Record<PlanId, PlanRules> = {
  basic: {
    label: "Basic Pack",
    maxApplicationsPerMonth: 5,
    canChatWithEmployers: false, 
  },
  bronze: {
    label: "Bronze Pack",
    maxApplicationsPerMonth: 15,
    canChatWithEmployers: true,
  },
  pro: {
    label: "Pro Pack",
    maxApplicationsPerMonth: "unlimited",
    canChatWithEmployers: true,
  },
};
