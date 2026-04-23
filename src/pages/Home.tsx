import { BookOpen, Database, Globe, BarChart3, LineChart } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link?: string;
}

const courses: Course[] = [
  {
    id: 'python',
    title: 'Python基础',
    description: '学习Python编程语言的基础知识，包括语法、数据结构、函数等',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'data-analysis',
    title: '数据分析技术',
    description: '掌握数据分析的基本方法和工具，包括数据可视化技术',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    link: '/data-analysis'
  },
  {
    id: 'data-collection',
    title: '数据采集与处理',
    description: '学习网络爬虫、数据清洗和数据预处理技术',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'supply-chain',
    title: '供应链数据分析',
    description: '应用数据分析技术优化供应链管理，提升运营效率',
    icon: <LineChart className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'database',
    title: '数据库原理与应用',
    description: '学习数据库系统原理、SQL语言和数据库应用开发',
    icon: <Database className="w-8 h-8" />,
    color: 'from-indigo-500 to-violet-500'
  }
];

export default function Home() {
  // 添加CSS动画
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              林进娟的学习空间
            </div>
            <div className="hidden md:flex items-center gap-6 text-gray-600">
              <a href="#home" className="hover:text-blue-600 transition-colors">首页</a>
              <a href="#courses" className="hover:text-blue-600 transition-colors">课程</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              你好，我是
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                林进娟
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              广东科学技术职业学院
            </p>
            <p className="text-lg text-gray-500 mb-8">
              商学院 · 商务数据分析与应用专业
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">欢迎来到我的学习空间</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            我的课程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={course.link || '#'}
                className={`group ${course.link ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                      {course.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                        {course.link ? '进入学习' : '即将更新'}
                        <BookOpen className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-2">林进娟的个人学习网站</p>
          <p className="text-sm text-gray-400">© 2024 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
