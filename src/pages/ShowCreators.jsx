import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ShowCreators = ({ creators }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Filter creators based on search term
  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Search Bar */}
      {creators.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search creators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      {/* Navigation Actions */}
      <div className="nav-actions">
        <Link to="/add" className="btn-primary">
          <span>✨</span> Add New Creator
        </Link>
      </div>

      {/* View Toggle */}
      {creators.length > 3 && (
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>
      )}

      {/* Results Count */}
      {searchTerm && (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>
          {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''} found
        </div>
      )}

      {/* Creators Grid */}
      {filteredCreators && filteredCreators.length > 0 ? (
        <div className={`creators-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {filteredCreators.map((creator) => (
            <div key={creator.id} className="card">
              {creator.imageURL && (
                <img 
                  src={creator.imageURL} 
                  alt={creator.name}
                  className="card-image"
                />
              )}
              
              <div className="card-content">
                <h3>{creator.name}</h3>
                
                {creator.description && (
                  <p>{creator.description}</p>
                )}
                
                {creator.url && (
                  <a 
                    href={creator.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="card-url"
                  >
                    <span>🔗</span> Visit Channel
                  </a>
                )}
                
                <div className="card-actions">
                  <Link to={`/creator/${creator.id}`} className="btn-primary">
                    View
                  </Link>
                  <Link to={`/creator/${creator.id}/edit`} className="btn-secondary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌟</div>
          <h3>Start Your Creator Journey</h3>
          <p>Build your personal collection of amazing content creators. Add YouTubers, streamers, podcasters, and more!</p>
          <Link to="/add" className="btn-primary">
            <span>🚀</span> Add Your First Creator
          </Link>
        </div>
      ) : (
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
          <h3>No Results Found</h3>
          <p>Try adjusting your search terms or add a new creator.</p>
          <Link to="/add" className="btn-primary">
            <span>➕</span> Add New Creator
          </Link>
        </div>
      )}
    </div>
  )
}

export default ShowCreators