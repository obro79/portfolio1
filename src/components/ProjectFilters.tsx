
import { useState, useEffect } from 'react';

const ProjectFilters: React.FC = () => {
  const [filter, setFilter] = useState<string>('highlighted');

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);

    // Get all project cards
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      const categories = card.getAttribute('data-category')?.split(' ') || [];

      if (newFilter === 'all') {
        card.classList.remove('is-hidden');
      } else {
        if (categories.includes(newFilter)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      }
    });
  };

  // Apply initial filter on mount
  useEffect(() => {
    handleFilter('highlighted');
  }, []);

  return (
    <div className="project-filters" role="tablist" aria-label="Project categories">
      <button className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`} onClick={() => handleFilter('all')} role="tab" aria-selected={filter === 'all'}>All</button>
      <button className={`filter-btn ${filter === 'highlighted' ? 'is-active' : ''}`} onClick={() => handleFilter('highlighted')} role="tab" aria-selected={filter === 'highlighted'}>Highlighted</button>
      <button className={`filter-btn ${filter === 'hackathon' ? 'is-active' : ''}`} onClick={() => handleFilter('hackathon')} role="tab" aria-selected={filter === 'hackathon'}>Hackathon</button>
      <button className={`filter-btn ${filter === 'school' ? 'is-active' : ''}`} onClick={() => handleFilter('school')} role="tab" aria-selected={filter === 'school'}>School</button>
    </div>
  );
};

export default ProjectFilters;
