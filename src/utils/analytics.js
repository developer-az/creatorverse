/**
 * Analytics utility functions for Creatorverse
 * Provides data analysis capabilities for creator insights
 */

/**
 * Extract platform information from creator URLs
 */
export const getPlatformFromUrl = (url) => {
  if (!url) return 'Unknown'
  
  const lowerUrl = url.toLowerCase()
  
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'YouTube'
  if (lowerUrl.includes('twitch.tv')) return 'Twitch'
  if (lowerUrl.includes('tiktok.com')) return 'TikTok'
  if (lowerUrl.includes('instagram.com')) return 'Instagram'
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'Twitter/X'
  if (lowerUrl.includes('discord')) return 'Discord'
  if (lowerUrl.includes('spotify.com')) return 'Spotify'
  if (lowerUrl.includes('soundcloud.com')) return 'SoundCloud'
  if (lowerUrl.includes('patreon.com')) return 'Patreon'
  if (lowerUrl.includes('onlyfans.com')) return 'OnlyFans'
  if (lowerUrl.includes('github.com')) return 'GitHub'
  if (lowerUrl.includes('linkedin.com')) return 'LinkedIn'
  if (lowerUrl.includes('facebook.com')) return 'Facebook'
  if (lowerUrl.includes('reddit.com')) return 'Reddit'
  if (lowerUrl.includes('medium.com')) return 'Medium'
  if (lowerUrl.includes('substack.com')) return 'Substack'
  
  return 'Other'
}

/**
 * Analyze platform distribution across creators
 */
export const analyzePlatformDistribution = (creators) => {
  const platformCount = {}
  
  creators.forEach(creator => {
    const platform = getPlatformFromUrl(creator.url)
    platformCount[platform] = (platformCount[platform] || 0) + 1
  })
  
  return Object.entries(platformCount)
    .map(([platform, count]) => ({ platform, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Calculate content quality score for a creator
 */
export const calculateQualityScore = (creator) => {
  let score = 0
  let maxScore = 100
  
  // Basic information (40 points)
  if (creator.name && creator.name.trim()) score += 15
  if (creator.url && creator.url.trim()) score += 25
  
  // Description quality (35 points)
  if (creator.description && creator.description.trim()) {
    score += 20
    // Bonus for detailed descriptions
    if (creator.description.length > 100) score += 10
    if (creator.description.length > 200) score += 5
  }
  
  // Visual content (25 points)
  if (creator.imageURL && creator.imageURL.trim()) {
    score += 25
  }
  
  return Math.min(score, maxScore)
}

/**
 * Analyze content quality across all creators
 */
export const analyzeContentQuality = (creators) => {
  const qualityScores = creators.map(calculateQualityScore)
  
  return {
    average: qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length,
    distribution: {
      excellent: qualityScores.filter(score => score >= 90).length,
      good: qualityScores.filter(score => score >= 70 && score < 90).length,
      fair: qualityScores.filter(score => score >= 50 && score < 70).length,
      poor: qualityScores.filter(score => score < 50).length
    },
    topQuality: creators
      .map(creator => ({ ...creator, qualityScore: calculateQualityScore(creator) }))
      .sort((a, b) => b.qualityScore - a.qualityScore)
      .slice(0, 3)
  }
}

/**
 * Analyze description content patterns
 */
export const analyzeDescriptions = (creators) => {
  const descriptions = creators
    .filter(creator => creator.description && creator.description.trim())
    .map(creator => creator.description)
  
  if (descriptions.length === 0) {
    return {
      totalWithDescriptions: 0,
      averageLength: 0,
      minLength: 0,
      maxLength: 0,
      commonWords: []
    }
  }
  
  const lengths = descriptions.map(desc => desc.length)
  const words = descriptions
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3) // Filter out short words
    .filter(word => !['this', 'that', 'with', 'from', 'they', 'have', 'will', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'about', 'would', 'there', 'could', 'other', 'more', 'very', 'what', 'know', 'just', 'first', 'also', 'after', 'back', 'work', 'well', 'year', 'come', 'good', 'much', 'make', 'over', 'such', 'take', 'than', 'only', 'think', 'people'].includes(word))
  
  const wordCount = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })
  
  const commonWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }))
  
  return {
    totalWithDescriptions: descriptions.length,
    averageLength: Math.round(lengths.reduce((sum, len) => sum + len, 0) / lengths.length),
    minLength: Math.min(...lengths),
    maxLength: Math.max(...lengths),
    commonWords
  }
}

/**
 * Analyze recent activity (creators added in timeframes)
 */
export const analyzeRecentActivity = (creators) => {
  const now = new Date()
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000)
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
  
  const creatorsWithDates = creators.filter(creator => creator.created_at)
  
  return {
    last24Hours: creatorsWithDates.filter(creator => 
      new Date(creator.created_at) > oneDayAgo
    ).length,
    lastWeek: creatorsWithDates.filter(creator => 
      new Date(creator.created_at) > oneWeekAgo
    ).length,
    lastMonth: creatorsWithDates.filter(creator => 
      new Date(creator.created_at) > oneMonthAgo
    ).length,
    totalTracked: creatorsWithDates.length,
    recentCreators: creatorsWithDates
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
  }
}

/**
 * Calculate engagement potential score based on platform and quality
 */
export const calculateEngagementPotential = (creator) => {
  let score = 0
  const platform = getPlatformFromUrl(creator.url)
  const quality = calculateQualityScore(creator)
  
  // Platform multipliers (based on typical engagement rates)
  const platformMultipliers = {
    'TikTok': 1.5,
    'Instagram': 1.3,
    'YouTube': 1.2,
    'Twitch': 1.1,
    'Twitter/X': 1.0,
    'Other': 0.8
  }
  
  const multiplier = platformMultipliers[platform] || 0.8
  
  // Base score from quality (0-100)
  score = quality * multiplier
  
  // Bonus for complete profiles
  if (creator.imageURL && creator.description && creator.description.length > 100) {
    score *= 1.1
  }
  
  return Math.min(Math.round(score), 100)
}

/**
 * Get comprehensive analytics for all creators
 */
export const getComprehensiveAnalytics = (creators) => {
  return {
    overview: {
      total: creators.length,
      withImages: creators.filter(c => c.imageURL).length,
      withDescriptions: creators.filter(c => c.description).length,
      complete: creators.filter(c => c.imageURL && c.description && c.url && c.name).length
    },
    platforms: analyzePlatformDistribution(creators),
    quality: analyzeContentQuality(creators),
    descriptions: analyzeDescriptions(creators),
    activity: analyzeRecentActivity(creators),
    engagement: {
      topEngagement: creators
        .map(creator => ({ ...creator, engagementScore: calculateEngagementPotential(creator) }))
        .sort((a, b) => b.engagementScore - a.engagementScore)
        .slice(0, 5),
      averageScore: Math.round(
        creators.reduce((sum, creator) => sum + calculateEngagementPotential(creator), 0) / creators.length
      )
    }
  }
}