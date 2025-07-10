import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const ViewCreator = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchCreator()
  }, [id])

  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        setCreator(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator? This action cannot be undone.')) {
      setIsDeleting(true)
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id)

        if (error) {
          console.error('Error deleting creator:', error)
          alert('Error deleting creator!')
        } else {
          alert('Creator deleted successfully!')
          navigate('/')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error deleting creator!')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading creator details...</p>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="empty-state">
        <div className="empty-icon">❌</div>
        <h3>Creator Not Found</h3>
        <p>The creator you're looking for doesn't exist or may have been removed.</p>
        <Link to="/" className="btn-primary">
          <span>🏠</span> Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="creator-detail">
      <div className="back-link">
        <Link to="/">
          <span>←</span> Back to Creators
        </Link>
      </div>

      <div className="creator-card">
        {creator.imageURL && (
          <div className="creator-image-container">
            <img 
              src={creator.imageURL} 
              alt={creator.name}
              className="creator-image"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
        
        <div className="creator-info">
          <h1 className="creator-name">{creator.name}</h1>
          
          {creator.description && (
            <div className="creator-description">
              <h3>About</h3>
              <p>{creator.description}</p>
            </div>
          )}
          
          {creator.url && (
            <div className="creator-link">
              <h3>Channel/Page</h3>
              <a 
                href={creator.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="external-link"
              >
                <span>🔗</span> Visit Channel
                <span className="external-icon">↗</span>
              </a>
            </div>
          )}
          
          <div className="creator-actions">
            <Link to={`/creator/${creator.id}/edit`} className="btn-primary">
              <span>✏️</span> Edit Creator
            </Link>
            
            <button 
              onClick={handleDelete}
              className="delete-btn"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="loading-dots">⏳</span> Deleting...
                </>
              ) : (
                <>
                  <span>🗑️</span> Delete Creator
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCreator