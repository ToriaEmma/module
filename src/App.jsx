import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ModulesPage from '@/pages/ModulesPage';
import ModuleDetailPage from '@/pages/ModuleDetailPage';
import ExercisePage from '@/pages/ExercisePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<ModulesPage />} />
          <Route path="/module/:id" element={<ModuleDetailPage />} />
          <Route path="/module/:id/exercise/:exerciseId" element={<ExercisePage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
