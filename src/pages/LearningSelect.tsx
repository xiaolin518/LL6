import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, ChevronLeft, BookText, GraduationCap } from 'lucide-react';

export default function LearningSelect() {
  const navigate = useNavigate();

  const chapters = [
    { id: 'chapter1', title: '数据分析概述', description: '了解数据分析的基本概念、流程和应用领域' },
    { id: 'chapter2', title: '数据可视化技术', description: '学习使用Python进行数据可视化' },
    { id: 'chapter3', title: '描述性统计分析', description: '学习使用统计方法描述和分析数据' },
    { id: 'chapter4', title: '推断统计分析', description: '学习使用推断统计方法从样本推断总体' },
    { id: 'chapter5', title: '预测分析', description: '学习使用机器学习方法进行预测' },
    { id: 'chapter6', title: '商务数据分析案例', description: '通过实际案例学习商务数据分析' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              数据分析技术课程
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <button
                onClick={() => navigate('/data-analysis')}
                className="hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                返回课程
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">选择学习方式</h1>
            <p className="text-gray-600">选择您想要学习的内容，开始您的数据分析之旅</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：章节学习 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-full p-2">
                    <BookText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">章节学习</h2>
                    <p className="text-blue-100 text-sm">理论学习 + 章节练习</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">学习1-6章的理论知识，包含数据分析概述、数据可视化、统计分析等内容</p>
                <div className="space-y-3">
                  {chapters.map((chapter, index) => (
                    <button
                      key={chapter.id}
                      onClick={() => navigate(`/data-analysis#${chapter.id}`)}
                      className="w-full text-left p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {chapter.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：实操训练 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-full p-2">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">实操训练</h2>
                    <p className="text-purple-100 text-sm">10个Python数据分析项目</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">通过10个实战项目，掌握Python数据分析技能，包含数据清洗、分析、可视化等</p>
                <button
                  onClick={() => navigate('/data-analysis/practical')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  进入实操训练
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
