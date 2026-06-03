import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '页面未找到 - 小林学习网站';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          页面未找到
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          抱歉，您访问的页面不存在或已被移除
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
}
