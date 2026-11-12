export type StampDutyState = "delhi" | "uttar-pradesh";
export type BuyerType = "male" | "female" | "joint";

export interface StampDutyInput {
  state: StampDutyState;
  buyer: BuyerType;
  propertyValue: number;
  underConstruction: boolean;
  affordable: boolean;
}

export interface StampDutyResult {
  stampDutyRate: number;
  stampDuty: number;
  registrationRate: number;
  registration: number;
  gstRate: number;
  gst: number;
  pastingFee: number;
  total: number;
  effectiveRate: number;
}

const RULES: Record<
  StampDutyState,
  { label: string; stamp: Record<BuyerType, number>; registration: number }
> = {
  delhi: {
    label: "Delhi",
    stamp: { male: 6, female: 4, joint: 5 },
    registration: 1,
  },
  "uttar-pradesh": {
    label: "Uttar Pradesh (Noida / Greater Noida)",
    stamp: { male: 7, female: 6, joint: 6.5 },
    registration: 1,
  },
};

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const rule = RULES[input.state];
  const stampDutyRate = rule.stamp[input.buyer];
  const stampDuty = Math.round((input.propertyValue * stampDutyRate) / 100);
  const registration = Math.round((input.propertyValue * rule.registration) / 100);
  const gstRate = input.underConstruction ? (input.affordable ? 1 : 5) : 0;
  const gst = Math.round((input.propertyValue * gstRate) / 100);
  const pastingFee = input.state === "delhi" ? 100 : 0;
  const total = stampDuty + registration + gst + pastingFee;

  return {
    stampDutyRate,
    stampDuty,
    registrationRate: rule.registration,
    registration,
    gstRate,
    gst,
    pastingFee,
    total,
    effectiveRate: input.propertyValue > 0 ? (total / input.propertyValue) * 100 : 0,
  };
}

export function stampDutyLabel(state: StampDutyState) {
  return RULES[state].label;
}
