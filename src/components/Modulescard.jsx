import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const ModuleCard = ({ module, index }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/module/${module.id}`);
  };

  const handleDetails = () => {
    navigate(`/module/${module.id}`);
  };

  const handleFavorite = () => {
    toast({
      title: "Module ajouté aux favoris.",
      description: `${module.title} a été ajouté à vos favoris.`,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Débutant': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermédiaire': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Avancé': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-effect rounded-xl p-6 card-hover group relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status badges */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          {module.isNew && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              Nouveau
            </Badge>
          )}
          {module.isCompleted && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              Terminé
            </Badge>
          )}
        </div>
        <button
          onClick={handleFavorite}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
          aria-label={`Ajouter ${module.title} aux favoris`}
        >
          <Star className="w-5 h-5" />
        </button>
      </div>

      {/* Module content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
          {module.title}
        </h3>
        <p className="text-purple-300 font-medium mb-3">{module.subtitle}</p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{module.description}</p>

        {/* Progress */}
        {module.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Progression</span>
              <span className="text-sm font-medium text-purple-300">{module.progress}% complété</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>
        )}

        {/* Meta information */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Durée : {module.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{module.lessons} leçons</span>
          </div>
          <Badge variant="outline" className={getLevelColor(module.level)}>
            Niveau : {module.level}
          </Badge>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleContinue}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            aria-label={`Bouton continuer module ${module.title}`}
          >
            <Play className="w-4 h-4 mr-2" />
            {module.progress > 0 ? 'Continuer' : 'Commencer'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDetails}
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            aria-label={`Ouvrir le module ${module.title}`}
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
