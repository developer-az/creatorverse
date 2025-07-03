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
    }
  }

  return (
    <div className="creator-form">
      <h2>Add New Creator</h2>
      
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
              backgroundColor: '#007bff', 
              color: 'white',
              marginRight: '10px'
            }}
          >
            ➕ Add Creator
          </button>
          
          <Link to="/">
            <button 
              type="button"
              style={{ 
                backgroundColor: '#6c757d', 
                color: 'white'
              }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddCreator