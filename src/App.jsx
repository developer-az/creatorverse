import React, { useState, useEffect } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import { supabase } from './client'
import './App.css'

function App() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = document.querySelector('.App')
      if (parallax) {
        const speed = scrolled * 0.5
        parallax.style.transform = `translateY(${speed}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
      path: "/creator/:id",
      element: <ViewCreator />
    },
    {
      path: "/creator/:id/edit",
      element: <EditCreator />
    }
  ])

  // Don't show header on detail pages
  const isDetailPage = location.pathname !== '/' && location.pathname !== '/add'

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
                <span className="stat-label">Creators</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{creators.filter(c => c.imageURL).length}</span>
                <span className="stat-label">With Photos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{creators.filter(c => c.description).length}</span>
                <span className="stat-label">Described</span>
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