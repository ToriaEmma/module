import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import ModuleCard from '@/components/Modulescard';
import SearchAndFilters from '@/components/SearchAndFilters';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelSlug } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: null,
    category: null,
    shortDuration: false
  });
  const [favorites, setFavorites] = useState([]); // array of ids

  // Mock data
  useEffect(() => {
    const mockModules = [
      {
        id: 1,
        title: "Initiation au HTML",
        subtitle: "Bases du web en 2 heures",
        description: "Apprenez les balises essentielles et créez votre première page.",
        progress: 45,
        duration: "2h",
        lessons: 8,
        level: "Débutant",
        category: "Développement",
        isNew: true,
        isCompleted: false
      },
      {
        id: 2,
        title: "CSS Avancé",
        subtitle: "Maîtrisez les animations",
        description: "Créez des interfaces modernes avec CSS Grid, Flexbox et animations.",
        progress: 0,
        duration: "4h",
        lessons: 12,
        level: "Avancé",
        category: "Développement",
        isNew: false,
        isCompleted: false
      },
      {
        id: 3,
        title: "Design System",
        subtitle: "Cohérence visuelle",
        description: "Construisez un système de design complet pour vos projets.",
        progress: 100,
        duration: "3h",
        lessons: 10,
        level: "Intermédiaire",
        category: "Design",
        isNew: false,
        isCompleted: true
      },
      {
        id: 4,
        title: "JavaScript ES6+",
        subtitle: "Programmation moderne",
        description: "Découvrez les fonctionnalités modernes de JavaScript.",
        progress: 25,
        duration: "5h",
        lessons: 15,
        level: "Intermédiaire",
        category: "Développement",
        isNew: false,
        isCompleted: false
      },
      {
        id: 5,
        title: "UX Research",
        subtitle: "Comprendre les utilisateurs",
        description: "Méthodes et outils pour analyser les besoins utilisateurs.",
        progress: 0,
        duration: "1h30",
        lessons: 6,
        level: "Débutant",
        category: "Design",
        isNew: true,
        isCompleted: false
      }
    ];

    setModules(mockModules);
    setFilteredModules(mockModules);
  }, []);

  // Initialize from URL params on mount or when searchParams change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const level = searchParams.get('level'); // expects values like "Débutant", "Intermédiaire", "Avancé"
    const category = searchParams.get('category');
    const short = searchParams.get('short'); // '1' or '0'
    const fav = searchParams.get('fav'); // comma-separated ids

    // Helpers to convert between slug and label
    const slugToLevel = (slug) => {
      if (!slug) return null;
      const s = slug.toLowerCase();
      if (s === 'debutant') return 'Débutant';
      if (s === 'intermediaire') return 'Intermédiaire';
      if (s === 'avance' || s === 'avancé') return 'Avancé';
      return null;
    };

    setSearchTerm(q);
    setFilters({
      level: level || slugToLevel(levelSlug) || null,
      category: category || null,
      shortDuration: short === '1',
    });
    const favList = (fav ? fav.split(',') : []).map((v) => Number(v)).filter((n) => !Number.isNaN(n));
    setFavorites(favList);
  }, [searchParams, levelSlug]);

  // Filter and search logic
  useEffect(() => {
    let filtered = modules;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter(module => module.level === filters.level);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(module => module.category === filters.category);
    }

    // Duration filter
    if (filters.shortDuration) {
      filtered = filtered.filter(module => {
        const duration = parseFloat(module.duration);
        return duration < 2;
      });
    }

    setFilteredModules(filtered);
  }, [modules, searchTerm, filters]);

  // Handlers that also sync URL
  const handleSearch = (value) => {
    setSearchTerm(value);
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set('q', value); else next.delete('q');
    setSearchParams(next);
  };

  const handleFilter = (nextFilters) => {
    setFilters(nextFilters);
    const next = new URLSearchParams(searchParams.toString());
    if (nextFilters.level) next.set('level', nextFilters.level); else next.delete('level');
    if (nextFilters.category) next.set('category', nextFilters.category); else next.delete('category');
    if (nextFilters.shortDuration) next.set('short', '1'); else next.delete('short');
    // If level changed, update pathname to slug
    const levelToSlug = (lvl) => {
      if (!lvl) return '';
      const map = {
        'Débutant': 'debutant',
        'Intermédiaire': 'intermediaire',
        'Avancé': 'avance',
      };
      return map[lvl] || '';
    };

    const slug = levelToSlug(nextFilters.level);
    const basePath = slug ? `/${slug}` : '/';
    const query = next.toString();
    const full = query ? `${basePath}?${query}` : basePath;
    navigate(full);
  };

  const handleFavoriteToggle = (id) => {
    const nextFavs = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(nextFavs);
    const next = new URLSearchParams(searchParams.toString());
    if (nextFavs.length) next.set('fav', nextFavs.join(',')); else next.delete('fav');
    setSearchParams(next);
  };

  return (
    <>
      <Helmet>
        <title>Modules - Plateforme d'apprentissage</title>
        <meta name="description" content="Découvrez nos modules d'apprentissage interactifs. Apprenez à votre rythme avec des cours de développement, design et plus encore." />
        <meta property="og:title" content="Modules - Plateforme d'apprentissage" />
        <meta property="og:description" content="Découvrez nos modules d'apprentissage interactifs. Apprenez à votre rythme avec des cours de développement, design et plus encore." />
      </Helmet>

      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 floating-animation">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-purple-400 floating-animation" style={{ animationDelay: '1s' }} />
            </div>
            
            <h1 className="text-5xl font-bold gradient-text mb-4">
              Modules
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Apprenez à votre rythme
            </p>
          </motion.div>

          {/* Search and Filters */}
          <SearchAndFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            filters={filters}
            searchTerm={searchTerm}
            selectedLevel={filters.level || 'Tous'}
            selectedCategory={filters.category || 'Tous'}
            shortDuration={filters.shortDuration}
          />

          {/* Modules Grid */}
          {filteredModules.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredModules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  isFavorite={favorites.includes(module.id)}
                  onFavorite={handleFavoriteToggle}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="glass-effect rounded-xl p-12 max-w-md mx-auto">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Aucun module trouvé</h3>
                <p className="text-gray-400">
                  Essaie d'autres filtres ou mots-clés.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModulesPage;
