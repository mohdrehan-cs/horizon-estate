export interface EmiResult {
  emi: number;
  principal: number;
  totalInterest: number;
  totalPayment: number;
  interestShare: number;
  principalShare: number;
}

export function calculateEmi(
  principal: number,
  annualRate: number,
  years: number,
): EmiResult {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) {
    const emi = months > 0 ? principal / months : 0;
    return {
      emi,
      principal,
      totalInterest: 0,
      totalPayment: principal,
      interestShare: 0,
      principalShare: 100,
    };
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    principal,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    interestShare: totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0,
    principalShare: totalPayment > 0 ? (principal / totalPayment) * 100 : 100,
  };
}

export function affordability(
  monthlyIncome: number,
  otherEmis: number,
  annualRate: number,
  years: number,
  downPayment: number,
): { eligibleEmi: number; loanAmount: number; propertyBudget: number } {
  const eligibleEmi = Math.max(monthlyIncome * 0.45 - otherEmis, 0);
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  let loanAmount = 0;
  if (monthlyRate > 0 && months > 0) {
    const factor = Math.pow(1 + monthlyRate, months);
    loanAmount = (eligibleEmi * (factor - 1)) / (monthlyRate * factor);
  }

  return {
    eligibleEmi: Math.round(eligibleEmi),
    loanAmount: Math.round(loanAmount),
    propertyBudget: Math.round(loanAmount + downPayment),
  };
}
