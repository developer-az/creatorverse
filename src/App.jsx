import React, { useState, useEffect } from 'react'
import { useRoutes, useLocation, Link } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import Analytics from './pages/Analytics'
import { supabase } from './client'
import { getComprehensiveAnalytics, getPlatformFromUrl, calculateQualityScore } from './utils/analytics'
import './App.css'

function App() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Smooth scrolling optimization
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const fetchCreators = async () => {
    try {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })
      
      setCreators(data || [])
    } catch (error) {
      console.error('Error fetching creators:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCreators()
  }, [])

  // Refresh data when navigating back to home
  useEffect(() => {
    if (location.pathname === '/') {
      fetchCreators()
    }
  }, [location.pathname])

  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators creators={creators} />
    },
    {
      path: "/add",
      element: <AddCreator />
    },
    {
      path: "/analytics",
      element: <Analytics creators={creators} />
    },
    {
      path: "/creator/:id",
      element: <ViewCreator />
    },
    {
      path: "/creator/:id/edit",
      element: <EditCreator />
    }
  ])

  // Don't show header on detail pages
  const isDetailPage = location.pathname !== '/' && location.pathname !== '/add' && location.pathname !== '/analytics'

  if (loading) {
    return (
      <div className="App">
        <header className="header">
          <h1>✨ Creatorverse</h1>
          <p>Discover amazing content creators!</p>
        </header>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your creator universe...</p>
          <p className="loading-subtitle">Preparing to showcase amazing content creators</p>
          <div className="loading-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {!isDetailPage && (
        <>
          <header className="header">
            <h1>✨ Creatorverse</h1>
            <p>Discover amazing content creators from across the internet</p>
            <div className="header-decoration">
              <div className="floating-orb orb-1"></div>
              <div className="floating-orb orb-2"></div>
              <div className="floating-orb orb-3"></div>
            </div>
          </header>
          
          {location.pathname === '/' && creators.length > 0 && (
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-number">{creators.length}</span>
                <span className="stat-label">Total Creators</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{Math.round((creators.filter(c => c.imageURL && c.description && c.url && c.name).length / creators.length) * 100)}%</span>
                <span className="stat-label">Complete Profiles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{(() => {
                  const platforms = [...new Set(creators.map(c => getPlatformFromUrl(c.url)))].length;
                  return platforms;
                })()}</span>
                <span className="stat-label">Platforms</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{Math.round(creators.reduce((sum, creator) => sum + calculateQualityScore(creator), 0) / creators.length)}%</span>
                <span className="stat-label">Avg Quality</span>
              </div>
              <div className="stat-item" style={{ borderLeft: '2px solid var(--primary-500)', paddingLeft: 'var(--space-4)' }}>
                <Link to="/analytics" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="stat-number">📊</span>
                  <span className="stat-label">View Analytics</span>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
      {element}
    </div>
  )
}

export default App