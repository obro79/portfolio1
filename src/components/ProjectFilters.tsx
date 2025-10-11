
import { useState, useEffect } from 'react';

const ProjectFilters: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="project-filters" role="tablist" aria-label="Project categories">
      <button className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`} onClick={() => handleFilter('all')} role="tab" aria-selected={filter === 'all'}>All</button>
      <button className={`filter-btn ${filter === 'highlighted' ? 'is-active' : ''}`} onClick={() => handleFilter('highlighted')} role="tab" aria-selected={filter === 'highlighted'}>Highlighted</button>
      <button className={`filter-btn ${filter === 'hackathon' ? 'is-active' : ''}`} onClick={() => handleFilter('hackathon')} role="tab" aria-selected={filter === 'hackathon'}>Hackathon</button>
      <button className={`filter-btn ${filter === 'personal' ? 'is-active' : ''}`} onClick={() => handleFilter('personal')} role="tab" aria-selected={filter === 'personal'}>Personal</button>
      <button className={`filter-btn ${filter === 'school' ? 'is-active' : ''}`} onClick={() => handleFilter('school')} role="tab" aria-selected={filter === 'school'}>School</button>
    </div>
  );
};

export default ProjectFilters;
