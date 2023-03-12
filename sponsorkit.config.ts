import { defineConfig, presets } from 'sponsorkit'

const hideTierUsers =
  new Set(process.env.HIDE_TIER_USERS?.split(',').map((u) => u.trim()) ?? [])

export default defineConfig({
  github: {
    type: 'user',
    login: 'sapphi-red'
  },

  outputDir: './dist',
  formats: ['png', 'svg'],

  onSponsorsReady(sponsors) {
    return sponsors.map(sponsor => {
      if (sponsor.provider === 'github' && hideTierUsers.has(sponsor.sponsor.login)) {
        return {
          ...sponsor,
          tierName: '$1 a month',
          monthlyDollars: 1
        }
      }
      return sponsor
    })
  },

  tiers: [
    {
      title: 'Backers',
      preset: presets.xs
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: presets.small
    },
    {
      title: 'Bronze Sponsors',
      monthlyDollars: 20,
      preset: {
        ...presets.base,
        boxHeight: presets.base.boxHeight + 16,
        name: {
          maxLength: 8
        }
      }
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: presets.medium
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: presets.large
    }
  ]
})
