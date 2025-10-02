// SEO Configuration
export interface SEOConfig {
  site: {
    name: string
    url: string
    description: string
    author: string
    keywords: string
  }
  social: {
    twitter: {
      site: string
      creator: string
    }
  }
  images: {
    defaultOgImage: string
    ogImageDimensions: {
      width: string
      height: string
      type: string
    }
  }
  theme: {
    color: string
    tileColor: string
  }
}

export const seoConfig: SEOConfig = {
  site: {
    name: 'VGR Youtube',
    url: 'https://localhost:5173',
    description: 'YouTube videos from the Video Games Records website - speedruns, gaming achievements, and world records.',
    author: 'Video Games Records',
    keywords: 'VGR, Video Games Records, YouTube, speedrun, gaming, world records, achievements, gaming videos, esports'
  },
  social: {
    twitter: {
      site: '@VideoGamesRec',
      creator: '@VideoGamesRec'
    }
  },
  images: {
    defaultOgImage: '/images/og-default.jpg',
    ogImageDimensions: {
      width: '1200',
      height: '630',
      type: 'image/jpeg'
    }
  },
  theme: {
    color: '#ffffff',
    tileColor: '#ffffff'
  }
}