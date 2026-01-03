// Configurable tax rules for local calculations.
// You can adjust these to match NBR Income-tax Paripatra 2025–2026.

export default {
  investmentRebate: {
    // Rebate rate applied to eligible investment base
    ratePercent: 15,
    // Cap base: min(eligibleInvestments, capPercentOfTaxableIncome * taxableIncome)
    capPercentOfTaxableIncome: 25,
    // Optional absolute cap in Taka (set to 0 or null to disable)
    maxCapTk: 0,
  },
};