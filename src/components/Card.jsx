import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ creator }) => {
  return (
    <div className="card">
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className="card-image" />
      )}
      <div className="card-content">
        <h3>{creator.name}</h3>
        <p>{creator.description}</p>
        <div className="card-actions">
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="visit-btn"
          >
            Visit Channel
          </a>
          <Link to={`/creator/${creator.id}`} className="view-btn">
            View
          </Link>
          <Link to={`/creator/${creator.id}/edit`} className="edit-btn">
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card