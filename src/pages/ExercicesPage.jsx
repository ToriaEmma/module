 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Save,
  Trophy,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const ExercisePage = () => {
  const { id, exerciseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exercise, setExercise] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(5);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Mock exercise data
    const mockExercise = {
      id: parseInt(exerciseId),
      title: "Construisez une navigation responsive",
      description: "Créez une barre de navigation qui s'adapte aux différentes tailles d'écran en utilisant HTML et CSS.",
      instructions: [
        "Créez une structure HTML pour la navigation",
        "Ajoutez les styles CSS de base",
        "Implémentez la responsivité avec les media queries",
        "Testez sur différentes tailles d'écran",
        "Optimisez l'accessibilité"
      ],
      hints: [
        "Pensez au flexbox pour organiser les éléments de navigation.",
        "Utilisez les media queries pour adapter le design aux mobiles.",
        "N'oubliez pas les attributs ARIA pour l'accessibilité."
      ],
      expectedOutput: "Une navigation responsive fonctionnelle",
      difficulty: "Intermédiaire"
    };

    setExercise(mockExercise);
    
    // Auto-save simulation
    const interval = setInterval(() => {
      setLastSaved(new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, [exerciseId]);

  const handleValidate = () => {
    // Simulate validation
    const isSuccess = Math.random() > 0.3; // 70% success rate for demo
    
    if (isSuccess) {
      setIsCompleted(true);
      const earnedPoints = 20 + (maxHints - hintsUsed) * 5; // Bonus for not using hints
      setPoints(earnedPoints);
      
      // Check for badges
      const newBadges = [];
      if (hintsUsed === 0) {
        newBadges.push("Résolveur autonome");
      }
      if (currentStep === totalSteps) {
        newBadges.push("Perfectionniste");
      }
      setBadges(newBadges);

      toast({
        title: "Bien joué ! ✔️",
        description: `Exercice validé ! +${earnedPoints} points`,
      });

      // Show badges if any
      if (newBadges.length > 0) {
        setTimeout(() => {
          newBadges.forEach(badge => {
            toast({
              title: "Badge débloqué : " + badge,
              description: "Félicitations pour cette réussite !",
            });
          });
        }, 1000);
      }
    } else {
      toast({
        title: "Erreur — vérifie la syntaxe et réessaie.",
        description: hintsUsed < maxHints ? "1 indice disponible." : "Plus d'indices disponibles.",
        variant: "destructive"
      });
    }
  };

  const handleRetry = () => {
    setIsCompleted(false);
    setCurrentStep(1);
    setUserCode('');
    setPoints(0);
    setBadges([]);
    toast({
      title: "Exercice réinitialisé",
      description: "Vous pouvez recommencer l'exercice."
    });
  };

  const handleHint = () => {
    if (hintsUsed >= maxHints) {
      toast({
        title: "Plus d'indices disponibles",
        description: "Vous avez utilisé tous vos indices pour cet exercice.",
        variant: "destructive"
      });
      return;
    }

    const hint = exercise.hints[hintsUsed];
    setHintsUsed(hintsUsed + 1);
    
    toast({
      title: `Indice ${hintsUsed + 1} :`,
      description: hint,
    });
  };

  const handleMarkComplete = () => {
    toast({
      title: "Exercice marqué comme terminé",
      description: "Progression sauvegardée automatiquement."
    });
    
    setTimeout(() => {
      navigate(`/module/${id}`);
    }, 1500);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Presque fini !",
        description: `Étape ${currentStep + 1}/${totalSteps}`
      });
    }
  };

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{exercise.title} - Exercice</title>
        <meta name="description" content={exercise.description} />
        <meta property="og:title" content={`${exercise.title} - Exercice`} />
        <meta property="og:description" content={exercise.description} />
      </Helmet>

      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <button 
                onClick={() => navigate('/')}
                className="hover:text-white transition-colors"
              >
                Modules
              </button>
              <ChevronRight className="w-4 h-4" />
              <button 
                onClick={() => navigate(`/module/${id}`)}
                className="hover:text-white transition-colors"
              >
                Module {id}
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Exercice {exerciseId}</span>
            </div>

            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => navigate(`/module/${id}`)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au module
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Exercise header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold gradient-text">
                    Exercice : {exercise.title}
                  </h1>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {exercise.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-300 mb-4">{exercise.description}</p>
                
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Progression</span>
                    <span className="text-sm font-medium text-purple-300">
                      Étape {currentStep}/{totalSteps}
                    </span>
                  </div>
                  <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
                </div>

                {/* Status */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    <span>
                      {lastSaved ? `Sauvegardé automatiquement à ${lastSaved}` : 'Sauvegarde automatique activée'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Workspace */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">Espace de travail</h2>
                
                {/* Code editor simulation */}
                <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2">index.html</span>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Écrivez votre code HTML ici..."
                    className="w-full h-64 bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleValidate}
                    disabled={isCompleted}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider
                  </Button>
                  
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="border-orange-500/30 text-orange-300 hover:bg-orange-500/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Réessayer
                  </Button>
                  
                  <Button
                    onClick={handleHint}
                    variant="outline"
                    disabled={hintsUsed >= maxHints}
                    className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10 disabled:opacity-50"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Demander indice ({hintsUsed}/{maxHints})
                  </Button>

                  {currentStep < totalSteps && (
                    <Button
                      onClick={handleNextStep}
                      variant="outline"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    >
                      Étape suivante
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Success state */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="glass-effect rounded-xl p-6 border-green-500/30 bg-green-500/10"
                >
                  <div className="text-center">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Félicitations !</h3>
                    <p className="text-green-400 mb-4" role="status" aria-live="polite">
                      Félicitations — exercice validé.
                    </p>
                    
                    {/* Points and badges */}
                    <div className="flex justify-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">+{points} points</span>
                      </div>
                      {badges.map((badge, index) => (
                        <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          <Star className="w-4 h-4 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={handleMarkComplete}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                    >
                      Marquer comme terminé
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-effect rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
                <div className="space-y-3">
                  {exercise.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        index + 1 === currentStep 
                          ? 'bg-purple-500/20 border border-purple-500/30' 
                          : index + 1 < currentStep 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-gray-500/10 border border-gray-500/30'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index + 1 === currentStep 
                          ? 'bg-purple-500 text-white' 
                          : index + 1 < currentStep 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                      }`}>
                        {index + 1 < currentStep ? '✓' : index + 1}
                      </div>
                      <p className={`text-sm ${
                        index + 1 === currentStep 
                          ? 'text-white font-medium' 
                          : index + 1 < currentStep 
                            ? 'text-green-400' 
                            : 'text-gray-400'
                      }`}>
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Help */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-effect rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Aide</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <strong>Objectif :</strong> {exercise.expectedOutput}
                  </p>
                  <p>
                    <strong>Indices utilisés :</strong> {hintsUsed}/{maxHints}
                  </p>
                  <p>
                    <strong>Conseils :</strong> Testez votre code régulièrement et n'hésitez pas à demander des indices si vous êtes bloqué.
                  </p>
                </div>
              </motion.div>

              {/* Gamification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-effect rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Progression</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Points totaux</span>
                    <span className="text-yellow-400 font-bold">{points}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Badges débloqués</span>
                    <span className="text-purple-400 font-bold">{badges.length}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-400">
                      Terminez sans utiliser d'indices pour débloquer le badge "Résolveur rapide" !
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisePage;
