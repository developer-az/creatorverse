import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const EditCreator = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      const { error } = await supabase
        .from('creators')
        .update({
          name: creator.name,
          url: creator.url,
          description: creator.description,
          imageURL: creator.imageURL
        })
        .eq('id', id)
      
      if (error) {
        console.error('Error updating creator:', error)
        alert('Error updating creator!')
      } else {
        alert('Creator updated successfully!')
        navigate(`/creator/${id}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating creator!')
    } finally {
      setIsSubmitting(false)
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

  return (
    <div className="creator-form">
      <h2 className="form-title">Edit Creator</h2>
      
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
                <span className="loading-dots">⏳</span> Updating...
              </>
            ) : (
              <>
                <span>💾</span> Update Creator
              </>
            )}
          </button>
          
          <Link to={`/creator/${id}`}>
            <button 
              type="button"
              className="btn-secondary"
              disabled={isSubmitting}
            >
              <span>↩️</span> Cancel
            </button>
          </Link>

          <button 
            type="button"
            onClick={handleDelete}
            className="delete-btn"
            disabled={isSubmitting || isDeleting}
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
      </form>
    </div>
  )
}

export default EditCreator