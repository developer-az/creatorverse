import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ShowCreators = ({ creators }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [hoveredCard, setHoveredCard] = useState(null)

  // Filter creators based on search term
  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }

  // Card hover effect
  const handleCardHover = (index) => {
    setHoveredCard(index)
  }

  const handleCardLeave = () => {
    setHoveredCard(null)
  }

  return (
    <div>
      {/* Search Bar */}
      {creators.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search creators by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <div className="search-icon">🔍</div>
          )}
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
            <span>⊞</span> Grid View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <span>☰</span> List View
          </button>
        </div>
      )}

      {/* Results Count */}
      {searchTerm && (
        <div className="search-results">
          <p>
            Found <strong>{filteredCreators.length}</strong> creator{filteredCreators.length !== 1 ? 's' : ''} 
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* Creators Grid */}
      {filteredCreators && filteredCreators.length > 0 ? (
        <div className={`creators-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {filteredCreators.map((creator, index) => (
            <div 
              key={creator.id} 
              className={`card ${hoveredCard === index ? 'card-hovered' : ''}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%'
              }}
            >
              {creator.imageURL && (
                <div className="card-image-container">
                  <img 
                    src={creator.imageURL} 
                    alt={creator.name}
                    className="card-image"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              <div className="card-content">
                <h3 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(creator.name, searchTerm) 
                  }}
                />
                
                {creator.description && (
                  <p 
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(creator.description, searchTerm) 
                    }}
                  />
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
                    <span>👁️</span> View
                  </Link>
                  <Link to={`/creator/${creator.id}/edit`} className="btn-secondary">
                    <span>✏️</span> Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌟</div>
          <h3>Start Your Creator Journey</h3>
          <p>Build your personal collection of amazing content creators. Add YouTubers, streamers, podcasters, and more to discover the best content across the internet.</p>
          <Link to="/add" className="btn-primary">
            <span>🚀</span> Add Your First Creator
          </Link>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No Results Found</h3>
          <p>We couldn't find any creators matching your search. Try adjusting your search terms or add a new creator to your collection.</p>
          <div className="empty-actions">
            <button 
              onClick={() => setSearchTerm('')} 
              className="btn-secondary"
            >
              <span>↺</span> Clear Search
            </button>
            <Link to="/add" className="btn-primary">
              <span>➕</span> Add New Creator
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowCreators