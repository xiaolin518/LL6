import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { GraduationCap } from 'lucide-react';

// 路由懒加载
const Home = lazy(() => import('./pages/Home'));
const DataAnalysisCourse = lazy(() => import('./pages/DataAnalysisCourse'));
const PracticalTraining = lazy(() => import('./pages/PracticalTraining'));
const ChapterPractice = lazy(() => import('./pages/ChapterPractice'));
const LearningSelect = lazy(() => import('./pages/LearningSelect'));
const NotFound = lazy(() => import('./pages/NotFound'));

// 加载中的状态组件
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <GraduationCap className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
        <p className="text-gray-600 text-lg">加载中...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data-analysis" element={<DataAnalysisCourse />} />
          <Route path="/data-analysis/practical" element={<PracticalTraining />} />
          <Route path="/data-analysis/chapter/:chapterId" element={<ChapterPractice />} />
          <Route path="/data-analysis/select" element={<LearningSelect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
