import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getComprehensiveAnalytics, getPlatformFromUrl, calculateQualityScore, calculateEngagementPotential } from '../utils/analytics'

const Analytics = ({ creators }) => {
  const [analytics, setAnalytics] = useState(null)
  const [selectedView, setSelectedView] = useState('overview')

  useEffect(() => {
    if (creators && creators.length > 0) {
      const analyticsData = getComprehensiveAnalytics(creators)
      setAnalytics(analyticsData)
    }
  }, [creators])

  if (!analytics || creators.length === 0) {
    return (
      <div className="analytics-empty">
        <div className="empty-icon">📊</div>
        <h3>Analytics Coming Soon</h3>
        <p>Add some creators to see insightful analytics about your collection!</p>
        <Link to="/add" className="btn-primary">
          <span>✨</span> Add Your First Creator
        </Link>
      </div>
    )
  }

  const renderOverview = () => (
    <div className="analytics-section">
      <h3>📊 Collection Overview</h3>
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <h4>{analytics.overview.total}</h4>
            <p>Total Creators</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h4>{analytics.overview.complete}</h4>
            <p>Complete Profiles</p>
            <small>{Math.round((analytics.overview.complete / analytics.overview.total) * 100)}% completion rate</small>
          </div>
        </div>
        <div className="analytics-card">
          <div className="card-icon">🏆</div>
          <div className="card-content">
            <h4>{Math.round(analytics.quality.average)}%</h4>
            <p>Avg Quality Score</p>
            <small>Based on profile completeness</small>
          </div>
        </div>
        <div className="analytics-card">
          <div className="card-icon">🚀</div>
          <div className="card-content">
            <h4>{analytics.engagement.averageScore}%</h4>
            <p>Avg Engagement Potential</p>
            <small>Platform & quality weighted</small>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPlatforms = () => (
    <div className="analytics-section">
      <h3>🌐 Platform Distribution</h3>
      <div className="platform-analysis">
        <div className="platform-chart">
          {analytics.platforms.map((platform, index) => (
            <div key={platform.platform} className="platform-bar">
              <div className="platform-info">
                <span className="platform-name">{platform.platform}</span>
                <span className="platform-count">{platform.count}</span>
              </div>
              <div className="platform-bar-container">
                <div 
                  className="platform-bar-fill" 
                  style={{ 
                    width: `${(platform.count / analytics.overview.total) * 100}%`,
                    backgroundColor: `hsl(${index * 40}, 70%, 60%)`
                  }}
                ></div>
              </div>
              <span className="platform-percentage">
                {Math.round((platform.count / analytics.overview.total) * 100)}%
              </span>
            </div>
          ))}
        </div>
        <div className="platform-insights">
          <h4>📈 Platform Insights</h4>
          <ul>
            <li><strong>Most Popular:</strong> {analytics.platforms[0]?.platform || 'N/A'} ({analytics.platforms[0]?.count || 0} creators)</li>
            <li><strong>Platform Diversity:</strong> {analytics.platforms.length} different platforms</li>
            <li><strong>Concentration:</strong> Top 3 platforms represent {Math.round((analytics.platforms.slice(0, 3).reduce((sum, p) => sum + p.count, 0) / analytics.overview.total) * 100)}% of creators</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const renderQuality = () => (
    <div className="analytics-section">
      <h3>⭐ Content Quality Analysis</h3>
      <div className="quality-analysis">
        <div className="quality-distribution">
          <h4>Quality Distribution</h4>
          <div className="quality-bars">
            <div className="quality-bar excellent">
              <span>Excellent (90-100%)</span>
              <div className="bar">
                <div style={{ width: `${(analytics.quality.distribution.excellent / analytics.overview.total) * 100}%` }}></div>
              </div>
              <span>{analytics.quality.distribution.excellent}</span>
            </div>
            <div className="quality-bar good">
              <span>Good (70-89%)</span>
              <div className="bar">
                <div style={{ width: `${(analytics.quality.distribution.good / analytics.overview.total) * 100}%` }}></div>
              </div>
              <span>{analytics.quality.distribution.good}</span>
            </div>
            <div className="quality-bar fair">
              <span>Fair (50-69%)</span>
              <div className="bar">
                <div style={{ width: `${(analytics.quality.distribution.fair / analytics.overview.total) * 100}%` }}></div>
              </div>
              <span>{analytics.quality.distribution.fair}</span>
            </div>
            <div className="quality-bar poor">
              <span>Needs Work (&lt;50%)</span>
              <div className="bar">
                <div style={{ width: `${(analytics.quality.distribution.poor / analytics.overview.total) * 100}%` }}></div>
              </div>
              <span>{analytics.quality.distribution.poor}</span>
            </div>
          </div>
        </div>
        
        <div className="top-quality">
          <h4>🏅 Highest Quality Profiles</h4>
          {analytics.quality.topQuality.map((creator, index) => (
            <div key={creator.id} className="top-creator">
              <span className="rank">#{index + 1}</span>
              <div className="creator-info">
                <Link to={`/creator/${creator.id}`} className="creator-link">
                  {creator.name}
                </Link>
                <span className="quality-score">{creator.qualityScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderActivity = () => (
    <div className="analytics-section">
      <h3>📅 Recent Activity</h3>
      <div className="activity-analysis">
        <div className="activity-stats">
          <div className="activity-card">
            <h4>{analytics.activity.last24Hours}</h4>
            <p>Last 24 Hours</p>
          </div>
          <div className="activity-card">
            <h4>{analytics.activity.lastWeek}</h4>
            <p>Last Week</p>
          </div>
          <div className="activity-card">
            <h4>{analytics.activity.lastMonth}</h4>
            <p>Last Month</p>
          </div>
        </div>
        
        {analytics.activity.recentCreators.length > 0 && (
          <div className="recent-creators">
            <h4>🆕 Recently Added</h4>
            {analytics.activity.recentCreators.map((creator) => (
              <div key={creator.id} className="recent-creator">
                <Link to={`/creator/${creator.id}`} className="creator-link">
                  {creator.name}
                </Link>
                <span className="platform-tag">{getPlatformFromUrl(creator.url)}</span>
                <span className="add-date">
                  {new Date(creator.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderContent = () => (
    <div className="analytics-section">
      <h3>📝 Content Analysis</h3>
      <div className="content-analysis">
        <div className="description-stats">
          <h4>Description Analytics</h4>
          <div className="stats-grid">
            <div className="stat">
              <span className="value">{analytics.descriptions.averageLength}</span>
              <span className="label">Avg Length</span>
            </div>
            <div className="stat">
              <span className="value">{analytics.descriptions.minLength}</span>
              <span className="label">Shortest</span>
            </div>
            <div className="stat">
              <span className="value">{analytics.descriptions.maxLength}</span>
              <span className="label">Longest</span>
            </div>
            <div className="stat">
              <span className="value">{Math.round((analytics.descriptions.totalWithDescriptions / analytics.overview.total) * 100)}%</span>
              <span className="label">Coverage</span>
            </div>
          </div>
        </div>
        
        {analytics.descriptions.commonWords.length > 0 && (
          <div className="common-words">
            <h4>🔤 Popular Terms</h4>
            <div className="word-cloud">
              {analytics.descriptions.commonWords.slice(0, 8).map((word, index) => (
                <span 
                  key={word.word} 
                  className="word-tag"
                  style={{ 
                    fontSize: `${Math.max(0.8, 1.2 - (index * 0.1))}em`,
                    opacity: Math.max(0.6, 1 - (index * 0.05))
                  }}
                >
                  {word.word} ({word.count})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderEngagement = () => (
    <div className="analytics-section">
      <h3>🚀 Engagement Potential</h3>
      <div className="engagement-analysis">
        <div className="engagement-overview">
          <p>Engagement potential is calculated based on platform popularity, profile quality, and completeness.</p>
        </div>
        
        <div className="top-engagement">
          <h4>🌟 Highest Engagement Potential</h4>
          {analytics.engagement.topEngagement.map((creator, index) => (
            <div key={creator.id} className="engagement-creator">
              <span className="rank">#{index + 1}</span>
              <div className="creator-details">
                <Link to={`/creator/${creator.id}`} className="creator-link">
                  {creator.name}
                </Link>
                <div className="creator-meta">
                  <span className="platform-tag">{getPlatformFromUrl(creator.url)}</span>
                  <span className="engagement-score">{creator.engagementScore}% potential</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <div className="back-link">
          <Link to="/">
            <span>←</span> Back to Creators
          </Link>
        </div>
        <h1>📊 Analytics Dashboard</h1>
        <p>Insights and analysis for your creator collection</p>
      </div>

      <div className="analytics-nav">
        <button 
          className={`nav-btn ${selectedView === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedView('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`nav-btn ${selectedView === 'platforms' ? 'active' : ''}`}
          onClick={() => setSelectedView('platforms')}
        >
          🌐 Platforms
        </button>
        <button 
          className={`nav-btn ${selectedView === 'quality' ? 'active' : ''}`}
          onClick={() => setSelectedView('quality')}
        >
          ⭐ Quality
        </button>
        <button 
          className={`nav-btn ${selectedView === 'activity' ? 'active' : ''}`}
          onClick={() => setSelectedView('activity')}
        >
          📅 Activity
        </button>
        <button 
          className={`nav-btn ${selectedView === 'content' ? 'active' : ''}`}
          onClick={() => setSelectedView('content')}
        >
          📝 Content
        </button>
        <button 
          className={`nav-btn ${selectedView === 'engagement' ? 'active' : ''}`}
          onClick={() => setSelectedView('engagement')}
        >
          🚀 Engagement
        </button>
      </div>

      <div className="analytics-content">
        {selectedView === 'overview' && renderOverview()}
        {selectedView === 'platforms' && renderPlatforms()}
        {selectedView === 'quality' && renderQuality()}
        {selectedView === 'activity' && renderActivity()}
        {selectedView === 'content' && renderContent()}
        {selectedView === 'engagement' && renderEngagement()}
      </div>
    </div>
  )
}

export default Analytics