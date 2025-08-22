import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const SearchAndFilters = ({
  onSearch,
  onFilter,
  filters,
  searchTerm = '',
  selectedLevel = 'Tous',
  selectedCategory = 'Tous',
  shortDuration = false,
}) => {

  const handleSearch = (value) => {
    onSearch(value);
  };

  const handleLevelChange = (level) => {
    onFilter({ ...filters, level: level === 'Tous' ? null : level });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onFilter({ ...filters, category: category === 'Tous' ? null : category });
  };

  const handleDurationToggle = () => {
    onFilter({ ...filters, shortDuration: !shortDuration });
  };

  const clearFilters = () => {
    onSearch('');
    onFilter({ level: null, category: null, shortDuration: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-6 mb-8"
    >
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder='Rechercher un module, ex : "HTML", "Design"…'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-white">Filtres</span>
        </div>

        {/* Level filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filtrer par niveau
          </label>
          <div className="flex flex-wrap gap-2">
            {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLevelChange(level)}
                className={selectedLevel === level 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                  : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
                }
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Duration filter */}
        <div>
          <Button
            variant={shortDuration ? 'default' : 'outline'}
            size="sm"
            onClick={handleDurationToggle}
            className={shortDuration 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
              : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
            }
          >
            <Clock className="w-4 h-4 mr-2" />
            Durée &lt; 2h
          </Button>
        </div>

        {/* Category filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Catégorie
          </label>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-white/5 border-white/10 text-white"
          >
            <option value="Tous">Tous</option>
            <option value="Développement">Développement</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
          </Select>
        </div>

        {/* Clear filters */}
        {(selectedLevel !== 'Tous' || selectedCategory !== 'Tous' || shortDuration || searchTerm) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-400 hover:text-white"
          >
            Effacer les filtres
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchAndFilters;
