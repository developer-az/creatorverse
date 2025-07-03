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

  return (
    <div className="creator-form">
      <h2>Edit Creator</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
            placeholder="Enter creator's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel/Page URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe what kind of content they create..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white',
              marginRight: '10px'
            }}
          >
            💾 Update Creator
          </button>
          
          <Link to={`/creator/${id}`}>
            <button 
              type="button"
              style={{ 
                backgroundColor: '#6c757d', 
                color: 'white',
                marginRight: '10px'
              }}
            >
              Cancel
            </button>
          </Link>

          <button 
            type="button"
            onClick={handleDelete}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white'
            }}
          >
            🗑️ Delete Creator
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCreator