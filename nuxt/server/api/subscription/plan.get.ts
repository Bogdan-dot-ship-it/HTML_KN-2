export default defineEventHandler((event) => {
  return {
    id: 'team-annual',
    title: 'Team - Annual',
    trialDays: 3,
    pricePerMonth: 207.50,
    pricePerYear: 2490,
    oldPricePerYear: 2988,
    savings: 498,
    features: [
      { text: 'Primary user + 2 free team members', subtext: '(extra team members for $25/month)' },
      { text: 'Save unlimited properties' },
      { text: '50,000 exports', subtext: '(additional exports at $0.01 each)' },
      { text: '1,000 free skip traces', subtext: '(additional skip tracing at $0.08 each)' },
      { text: 'Imports $0.01' },
      { text: 'FREE daily product trainings and support' },
      { text: 'Full suite of next-gen investing tools' },
      { text: 'Industry first AI powered comp tool' },
      { text: 'Includes dedicated support agent' }
    ]
  }
})
