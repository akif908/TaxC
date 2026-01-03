import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Lightbulb, Clock, Repeat, Building2, AlertTriangle, Sparkles, Target, Award, Shield, Search, Users, Scale, Calculator } from 'lucide-react';

export default function FDRGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-10 mb-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <DollarSign className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Fixed Deposit Receipts (FDR)</h1>
                <p className="text-lg text-emerald-100">Complete Guide to FDR in Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* What is FDR Section */}
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            What is a Fixed Deposit Receipt (FDR)?
          </h2>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>A savings instrument where you deposit a lump sum for a fixed period, earning guaranteed interest.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Provides security for your principal amount.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Fixed interest rates (typically ranging from 5% to 9% per annum in recent times, but can vary).</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Flexible tenures, commonly from 1 month up to 5 years or more.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Various interest payout options (e.g., monthly, quarterly, or at maturity).</span>
            </p>
          </div>
        </div>

        {/* FDR Formula Section */}
        <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            FDR Interest Calculation Formula
          </h2>
          <div className="bg-slate-900/50 border border-purple-400/20 rounded-lg p-5 mb-4">
            <p className="text-xl font-mono text-purple-300 mb-4 text-center">
              A = P * (1 + r/n)^(n*t)
            </p>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><span className="text-purple-400 font-semibold">Where:</span></p>
              <p className="ml-4"><span className="text-purple-300">A</span> = Maturity amount</p>
              <p className="ml-4"><span className="text-purple-300">P</span> = Principal amount</p>
              <p className="ml-4"><span className="text-purple-300">r</span> = Annual interest rate (as a decimal, e.g., 6.5% = 0.065)</p>
              <p className="ml-4"><span className="text-purple-300">n</span> = Number of times interest is compounded per year</p>
              <p className="ml-4"><span className="text-purple-300">t</span> = Time duration in years</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 italic">
            For simple interest (compounding at maturity), the formula is: A = P * (1 + r*t)
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Key Features of FDR
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Tenure Options */}
            <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-5 hover:border-emerald-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">Tenure Options</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Many banks in Bangladesh allow FDRs for a variety of tenures — from as short as 1 month, to 3 months, 6 months, 1 year, and up to 2, 3, or even 5 years depending on the bank and scheme.
                  </p>
                </div>
              </div>
            </div>

            {/* Flexible Payout */}
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-5 hover:border-blue-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Repeat className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Flexible Payout / Renewal</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Some banks give options for interest payout monthly, quarterly, annually or at maturity. In many cases, you can also choose auto-renewal (rollover) at maturity.
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Against FDR */}
            <div className="bg-slate-800/50 border border-teal-500/30 rounded-xl p-5 hover:border-teal-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-teal-500/20 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-teal-400 mb-2">Loan Against FDR</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Some banks allow you to take a loan or overdraft against your FDR as collateral — useful if you may need liquidity while keeping your investment intact.
                  </p>
                </div>
              </div>
            </div>

            {/* Premature Withdrawal */}
            <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-5 hover:border-orange-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-400 mb-2">Premature Withdrawal</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    While FDRs are meant to be held to maturity, many banks allow premature encashment. But usually the interest paid will be lower — often reverting to a savings-account interest rate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Banks */}
        <div className="bg-slate-800/50 border border-indigo-500/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Examples of Banks Offering FDRs
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-900/50 border border-indigo-400/20 rounded-lg p-4">
              <p className="text-indigo-300 font-semibold">🏦 Bank Asia Limited</p>
              <p className="text-gray-400 text-sm">Offers FDR tenures including 1 month, 3 months, 6 months, 1 year, 2 years, etc.</p>
            </div>
            <div className="bg-slate-900/50 border border-indigo-400/20 rounded-lg p-4">
              <p className="text-indigo-300 font-semibold">💼 Mercantile Bank PLC</p>
              <p className="text-gray-400 text-sm">Offers fixed deposit accounts from as low as BDT 10,000, with multiple tenures.</p>
            </div>
            <div className="bg-slate-900/50 border border-indigo-400/20 rounded-lg p-4">
              <p className="text-indigo-300 font-semibold">🏛️ IFIC Bank PLC</p>
              <p className="text-gray-400 text-sm">Lists FDR tenures from 1 month up to 5 years.</p>
            </div>
            <div className="bg-slate-900/50 border border-indigo-400/20 rounded-lg p-4">
              <p className="text-indigo-300 font-semibold">🏢 Eastern Bank PLC</p>
              <p className="text-gray-400 text-sm">Also maintains "FD/Term Deposit" offerings.</p>
            </div>
          </div>
        </div>

        {/* 5 Tips for Better FD Returns */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            5 Tips for Better FD Returns
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Compare Bank Rates */}
            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-5 hover:border-green-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Search className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">Compare Bank Rates</h3>
                  <p className="text-gray-300 text-sm">
                    Check and compare current FD rates from multiple banks like NCC Bank, Dhaka Bank, Prime Bank, etc., before investing.
                  </p>
                </div>
              </div>
            </div>

            {/* Consider Tenure Wisely */}
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-5 hover:border-blue-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Consider Tenure Wisely</h3>
                  <p className="text-gray-300 text-sm">
                    Longer tenures (e.g., 3-5 years) often offer slightly higher interest rates, but ensure it aligns with your financial goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Senior Citizen Benefits */}
            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-5 hover:border-purple-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-400 mb-2">Senior Citizen Benefits</h3>
                  <p className="text-gray-300 text-sm">
                    Many banks in Bangladesh offer preferential, slightly higher interest rates for senior citizens on FDs.
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Implications */}
            <div className="bg-slate-800/50 border border-yellow-500/30 rounded-xl p-5 hover:border-yellow-400/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Scale className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Tax Implications</h3>
                  <p className="text-gray-300 text-sm">
                    Interest earned from Fixed Deposits is generally taxable income in Bangladesh. Factor this into your overall tax returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Factors Affecting Returns */}
        <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            What Affects Your Returns
          </h2>
          <div className="space-y-3">
            <div className="bg-slate-900/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="text-amber-300 font-semibold mb-1">Interest Rate Offered</h4>
              <p className="text-gray-400 text-sm">Higher rate → more return. Rates vary by bank and by tenure.</p>
            </div>
            <div className="bg-slate-900/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="text-amber-300 font-semibold mb-1">Tenure (Duration)</h4>
              <p className="text-gray-400 text-sm">Often, longer tenures give more favorable rates (and more total interest), but also lock in your money longer.</p>
            </div>
            <div className="bg-slate-900/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="text-amber-300 font-semibold mb-1">Interest Payout Frequency / Reinvestment</h4>
              <p className="text-gray-400 text-sm">If interest is paid periodically (monthly/quarterly), you can choose to reinvest (compounding) or withdraw — reinvesting helps grow faster.</p>
            </div>
            <div className="bg-slate-900/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="text-amber-300 font-semibold mb-1">Minimum Deposit Requirement</h4>
              <p className="text-gray-400 text-sm">Some banks require a certain minimum amount (e.g. BDT 10,000, or higher) to open an FDR.</p>
            </div>
            <div className="bg-slate-900/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="text-amber-300 font-semibold mb-1">Flexibility: Auto-renewal, Premature Withdrawal, Loan Against FDR</h4>
              <p className="text-gray-400 text-sm">Auto-renewal saves you from manual renewal; loan-against-FDR offers liquidity; premature withdrawal may reduce interest earned.</p>
            </div>
            <div className="bg-slate-900/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="text-amber-300 font-semibold mb-1">Tax and Other Deductions</h4>
              <p className="text-gray-400 text-sm">After maturity, banks may deduct tax or other charges from interest — this reduces net return (not always obvious upfront).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}