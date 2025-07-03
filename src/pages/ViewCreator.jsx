import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const ViewCreator = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

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
    if (window.confirm('Are you sure you want to delete this creator?')) {
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
      }
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (!creator) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Creator not found</h2>
        <Link to="/">
          <button>← Back to Home</button>
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/">
          <button style={{ 
            backgroundColor: '#6c757d', 
            color: 'white',
            marginRight: '10px'
          }}>
            ← Back to Home
          </button>
        </Link>
      </div>

      <div className="card" style={{ maxWidth: 'none' }}>
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name}
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />
        )}
        
        <h1 style={{ marginBottom: '20px' }}>{creator.name}</h1>
        
        {creator.url && (
          <div style={{ marginBottom: '20px' }}>
            <strong>Channel/Page:</strong>
            <br />
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#007bff', 
                fontSize: '18px',
                textDecoration: 'none'
              }}
            >
              🔗 {creator.url}
            </a>
          </div>
        )}
        
        {creator.description && (
          <div style={{ marginBottom: '30px' }}>
            <strong>Description:</strong>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.6',
              marginTop: '10px'
            }}>
              {creator.description}
            </p>
          </div>
        )}
        
        <div className="card-actions">
          <Link to={`/creator/${creator.id}/edit`}>
            <button style={{ 
              backgroundColor: '#ffc107', 
              color: 'black',
              marginRight: '10px'
            }}>
              ✏️ Edit Creator
            </button>
          </Link>
          
          <button 
            onClick={handleDelete}
            className="delete-btn"
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white'
            }}
          >
            🗑️ Delete Creator
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewCreator