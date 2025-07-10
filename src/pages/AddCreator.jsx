import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const AddCreator = () => {
  const navigate = useNavigate()
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Test connection when component loads
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('count', { count: 'exact', head: true })
        
        if (error) {
          console.error('Connection test failed:', error)
        } else {
          console.log('Supabase connection successful')
        }
      } catch (error) {
        console.error('Connection test error:', error)
      }
    }
    
    testConnection()
  }, [])

  const handleChange = (e) => {
    setCreator({
      ...creator,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      console.log('Attempting to insert creator:', creator)
      
      const { data, error } = await supabase
        .from('creators')
        .insert([creator])
        .select()
      
      if (error) {
        console.error('Detailed error:', error)
        alert(`Error adding creator: ${error.message}`)
      } else {
        console.log('Creator added successfully:', data)
        alert('Creator added successfully!')
        navigate('/')
      }
    } catch (error) {
      console.error('Catch error:', error)
      alert(`Error adding creator: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="creator-form">
      <h2 className="form-title">Add New Creator</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <span>👤</span> Creator Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
            placeholder="Enter the creator's name or handle"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">
            <span>🔗</span> Channel/Page URL *
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
            placeholder="https://youtube.com/@creator or https://twitch.tv/creator"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            <span>📝</span> Description
          </label>
          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe what kind of content they create, their style, or why you like them..."
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">
            <span>🖼️</span> Profile Image URL (optional)
          </label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/profile-image.jpg"
            disabled={isSubmitting}
          />
          <small className="form-help">
            Add a direct link to their profile picture or channel banner
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-dots">⏳</span> Adding Creator...
              </>
            ) : (
              <>
                <span>✨</span> Add Creator
              </>
            )}
          </button>
          
          <Link to="/">
            <button 
              type="button"
              className="btn-secondary"
              disabled={isSubmitting}
            >
              <span>↩️</span> Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddCreator