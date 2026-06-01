import { BookOpen, Database, Globe, BarChart3, LineChart, Star, Code, GraduationCap, ChevronRight } from 'lucide-react';
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
    icon: <Code className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'data-analysis',
    title: '数据分析技术',
    description: '掌握数据分析的基本方法和工具，包括数据可视化技术',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    link: '/data-analysis/select'
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
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
        50% {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
        }
      }
      @keyframes gradient-shift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient-shift 8s ease infinite;
      }
      .stagger-1 { animation-delay: 0.1s; }
      .stagger-2 { animation-delay: 0.2s; }
      .stagger-3 { animation-delay: 0.3s; }
      .stagger-4 { animation-delay: 0.4s; }
      .stagger-5 { animation-delay: 0.5s; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 animate-gradient">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse-glow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                小林学习网站
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-gray-600">
              <a href="#home" className="hover:text-blue-600 transition-colors font-medium">首页</a>
              <a href="#courses" className="hover:text-blue-600 transition-colors font-medium">课程</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-24 px-4 relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            {/* 欢迎徽章 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-8 border border-gray-100">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-700 font-medium">欢迎来到小林的学习空间</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              你好，我是
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                小林
              </span>
            </h1>
            
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl text-gray-600">
                广东科学技术职业学院
              </p>
              <p className="text-lg text-gray-500">
                商学院 · 商务数据分析与应用专业
              </p>
            </div>
            
            {/* 快速行动按钮 */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/data-analysis/select" className="group">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <BookOpen className="w-6 h-6" />
                  <span className="text-lg font-bold">开始学习数据分析</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <a href="#courses" className="group">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <Database className="w-6 h-6 text-purple-600" />
                  <span className="text-lg font-bold">查看所有课程</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5', label: '精品课程', icon: <BookOpen className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
              { number: '10+', label: '实践项目', icon: <Code className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
              { number: '∞', label: '学习时长', icon: <Star className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
              { number: '2024', label: '学习年份', icon: <GraduationCap className="w-6 h-6" />, color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up opacity-0" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              我的学习课程
            </h2>
            <p className="text-xl text-gray-600">
              精选课程，助力学习成长
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Link
                key={course.id}
                to={course.link || '#'}
                className={`group ${course.link ? 'cursor-pointer' : 'cursor-default'} animate-fade-in-up opacity-0`}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 overflow-hidden border border-gray-100">
                  <div className={`h-3 bg-gradient-to-r ${course.color}`} />
                  <div className="p-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      {course.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
                    <div className="pt-4 border-t border-gray-100">
                      <span className={`inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all ${course.link ? 'text-blue-600' : 'text-gray-400'}`}>
                        {course.link ? '开始学习' : '即将更新'}
                        {course.link && <ChevronRight className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl animate-gradient">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              准备好开始学习了吗？
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              加入小林的学习旅程，一起探索数据科学的奥秘
            </p>
            <Link to="/data-analysis/select">
              <div className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <GraduationCap className="w-6 h-6" />
                <span className="text-lg font-bold">立即开始学习</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white">
                  小林学习网站
                </div>
              </div>
              <p className="text-gray-400">
                持续学习，不断进步
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">快速链接</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors">首页</Link>
                <Link to="/data-analysis/select" className="block text-gray-400 hover:text-white transition-colors">数据分析</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">关于我</h4>
              <p className="text-gray-400">
                广东科学技术职业学院<br />
                商学院 · 商务数据分析与应用专业
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © 2024 小林学习网站 · 持续学习，持续进步
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
