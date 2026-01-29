import { useState } from 'react'
import { Link } from 'react-router-dom'
import { maintenanceGuides, categories } from '../data/guides'

export default function Guides() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredGuides = maintenanceGuides.filter(guide => {
    const matchesSearch = search === '' ||
      guide.title.toLowerCase().includes(search.toLowerCase()) ||
      guide.tools?.some(t => t.toLowerCase().includes(search.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner'
      case 'intermediate': return 'difficulty-intermediate'
      case 'advanced': return 'difficulty-advanced'
      default: return ''
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>Maintenance Guides</h2>
        <p>Step-by-step instructions</p>
      </div>

      {/* Search */}
      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="form-input"
          placeholder="Search guides or tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Guides List */}
      {filteredGuides.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <h3>No guides found</h3>
            <p>Try a different search term</p>
          </div>
        </div>
      ) : (
        filteredGuides.map(guide => {
          const category = categories.find(c => c.id === guide.category)

          return (
            <Link
              key={guide.id}
              to={`/guides/${guide.id}`}
              className="card card-clickable guide-card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="guide-card-header">
                <span className="guide-title">{guide.title}</span>
              </div>

              <div className="guide-meta">
                <span
                  className="badge"
                  style={{
                    background: `${category?.color}20`,
                    color: category?.color
                  }}
                >
                  {category?.name}
                </span>
                <span className={`badge ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </span>
                {guide.intervalMiles && (
                  <span className="badge badge-secondary">
                    Every {guide.intervalMiles} mi
                  </span>
                )}
              </div>

              {guide.tools && guide.tools.length > 0 && (
                <div className="guide-tools">
                  <p className="guide-tools-title">Tools needed</p>
                  <p className="guide-tools-list">
                    {guide.tools.slice(0, 3).join(', ')}
                    {guide.tools.length > 3 && ` +${guide.tools.length - 3} more`}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted">
                  {guide.steps?.length || 0} steps
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gray-400)' }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          )
        })
      )}
    </div>
  )
}
