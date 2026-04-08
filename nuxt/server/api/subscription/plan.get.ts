export default defineEventHandler((event) => {
  const query = getQuery(event)
  const planId = query.id
  const billingType = query.type

  const plansData = {
    starter: {
      title: 'Starter',
      monthlyPrice: 99.00,
      annualTotal: 999,
      oldAnnual: 1188,
      savings: 189,
      features: [
        { text: 'Primary user only', subtext: '(extra team members for $35/month)' },
        { text: 'Save unlimited properties' },
        { text: '10,000 exports' }
      ]
    },
    team: {
      title: 'Team',
      monthlyPrice: 249.00,
      annualTotal: 2490,
      oldAnnual: 2988,
      savings: 498,
      features: [
        { text: 'Primary user + 2 free team members' },
        { text: '50,000 exports' },
        { text: '1,000 free skip traces' }
      ]
    },
    business: {
      title: 'Business',
      monthlyPrice: 549.00,
      annualTotal: 5490,
      oldAnnual: 6588,
      savings: 1098,
      features: [
        { text: 'Primary user + 6 free team members' },
        { text: '100,000 exports' },
        { text: '2,000 free skip traces' }
      ]
    }
  }

  const selectedPlan = plansData[planId as keyof typeof plansData] || plansData.team

  if (billingType === 'annual') {
    return {
      title: `${selectedPlan.title} - Annual`,
      trialDays: 3,
      pricePerMonth: selectedPlan.annualTotal / 12,
      pricePerYear: selectedPlan.annualTotal,
      oldPricePerYear: selectedPlan.oldAnnual,
      savings: selectedPlan.savings,
      features: selectedPlan.features
    }
  } else {
    return {
      title: `${selectedPlan.title} - Monthly`,
      trialDays: 3,
      pricePerMonth: selectedPlan.monthlyPrice,
      pricePerYear: selectedPlan.monthlyPrice, // Для місячного плану платимо лише за місяць
      oldPricePerYear: selectedPlan.monthlyPrice,
      savings: 0,
      features: selectedPlan.features
    }
  }
})
