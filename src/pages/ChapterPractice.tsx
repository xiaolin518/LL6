import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';

const generateChapterQuestions = () => {
  const questions = [];
  const chapters = [
    { id: 1, name: '数据分析概述', count: 50 },
    { id: 2, name: '数据可视化技术', count: 50 },
    { id: 3, name: '描述性统计分析', count: 50 },
    { id: 4, name: '推断统计分析', count: 50 },
    { id: 5, name: '预测分析', count: 50 },
    { id: 6, name: '商务数据分析案例', count: 50 },
    { id: 7, name: 'Python数据分析实践项目', count: 100 },
  ];

  const questionTypes = ['单选题', '多选题', '判断题'];

  const baseQuestions = {
    1: [
      { question: '数据分析的基本流程不包括以下哪个步骤？', options: ['数据收集', '数据清洗', '数据备份', '数据可视化'], answer: '数据备份' },
      { question: '以下哪个不属于数据分析的应用领域？', options: ['市场营销', '金融风控', '娱乐游戏', '所有都是'], answer: '所有都是' },
      { question: '数据分析师的核心能力不包括以下哪项？', options: ['编程能力', '沟通能力', '绘画能力', '统计分析能力'], answer: '绘画能力' },
      { question: '在数据分析流程中，数据清洗的主要目的是什么？', options: ['增加数据量', '处理缺失值和异常值', '数据可视化', '数据备份'], answer: '处理缺失值和异常值' },
      { question: '以下哪种是数据可视化工具？', options: ['Excel', 'Python', 'Tableau', '所有都是'], answer: '所有都是' },
    ],
    2: [
      { question: '以下哪个不是Python常用的数据可视化库？', options: ['Matplotlib', 'Seaborn', 'Pandas', 'Plotly'], answer: 'Pandas' },
      { question: '柱状图最适合用来展示什么类型的数据？', options: ['趋势变化', '类别对比', '占比分布', '相关性'], answer: '类别对比' },
      { question: '饼图最适合用来展示什么类型的数据？', options: ['趋势变化', '类别对比', '占比分布', '相关性'], answer: '占比分布' },
      { question: '折线图最适合用来展示什么类型的数据？', options: ['趋势变化', '类别对比', '占比分布', '相关性'], answer: '趋势变化' },
      { question: 'Seaborn是基于哪个库构建的？', options: ['Matplotlib', 'Plotly', 'Bokeh', 'Pandas'], answer: 'Matplotlib' },
    ],
    3: [
      { question: '以下哪个是描述数据集中趋势的统计量？', options: ['均值', '标准差', '方差', '范围'], answer: '均值' },
      { question: '以下哪个是描述数据离散程度的统计量？', options: ['均值', '中位数', '众数', '标准差'], answer: '标准差' },
      { question: '如果数据分布是左偏的，以下哪个说法是正确的？', options: ['均值 > 中位数 > 众数', '众数 > 中位数 > 均值', '均值 = 中位数 = 众数', '众数 > 均值 > 中位数'], answer: '众数 > 中位数 > 均值' },
      { question: '四分位数间距（IQR）是指哪两个四分位数的差？', options: ['Q1和Q2', 'Q1和Q3', 'Q2和Q3', 'Q0和Q4'], answer: 'Q1和Q3' },
      { question: '相关系数r的取值范围是？', options: ['[0, 1]', '[-1, 1]', '[0, ∞)', '(-∞, ∞)'], answer: '[-1, 1]' },
    ],
    4: [
      { question: '假设检验中，第一类错误是指什么？', options: ['接受了正确的原假设', '拒绝了正确的原假设', '接受了错误的备择假设', '拒绝了错误的备择假设'], answer: '拒绝了正确的原假设' },
      { question: 'p值是指什么？', options: ['原假设为真的概率', '犯第一类错误的概率', '犯第二类错误的概率', '接受原假设的概率'], answer: '原假设为真的概率' },
      { question: '在独立样本t检验中，方差齐性检验的目的是什么？', options: ['检验均值是否相等', '检验方差是否相等', '检验样本量是否足够', '检验数据是否正态分布'], answer: '检验方差是否相等' },
      { question: '置信水平95%表示什么？', options: ['有95%的机会犯错误', '有95%的置信区间包含真实参数', '参数有95%的概率在某个区间', '所有都不对'], answer: '有95%的置信区间包含真实参数' },
      { question: '卡方检验主要用于什么场景？', options: ['检验均值差异', '检验方差差异', '检验类别变量独立性', '检验相关性'], answer: '检验类别变量独立性' },
    ],
    5: [
      { question: '线性回归模型中，R²表示什么？', options: ['模型的斜率', '模型的截距', '模型解释的变异占比', '模型的误差'], answer: '模型解释的变异占比' },
      { question: '以下哪个不是机器学习中的分类算法？', options: ['决策树', '线性回归', '随机森林', '逻辑回归'], answer: '线性回归' },
      { question: '在回归分析中，残差是指什么？', options: ['预测值', '真实值', '真实值与预测值的差', '预测值与真实值的和'], answer: '真实值与预测值的差' },
      { question: '特征选择的目的是什么？', options: ['增加特征数量', '减少特征数量，提高模型性能', '数据可视化', '数据清洗'], answer: '减少特征数量，提高模型性能' },
      { question: '在预测分析中，训练集和测试集的主要区别是什么？', options: ['训练集用于训练模型，测试集用于评估模型', '训练集数据量更大', '测试集数据量更大', '没有区别'], answer: '训练集用于训练模型，测试集用于评估模型' },
    ],
    6: [
      { question: '在销售数据分析中，哪个指标通常用于衡量客户价值？', options: ['客户ID', '购买频率', '客户姓名', '客户地址'], answer: '购买频率' },
      { question: 'RFM分析中的F代表什么？', options: ['Frequency（频率）', 'Freshness（新鲜度）', 'First（第一次）', 'Final（最后）'], answer: 'Frequency（频率）' },
      { question: '在供应链数据分析中，安全库存的主要目的是什么？', options: ['增加库存成本', '应对需求不确定性', '减少存储空间', '加快物流速度'], answer: '应对需求不确定性' },
      { question: '客户细分的主要目的是什么？', options: ['减少客户数量', '了解不同客户群体特征', '提高产品价格', '简化营销流程'], answer: '了解不同客户群体特征' },
      { question: 'A/B测试的主要目的是什么？', options: ['测试产品A和B的外观差异', '比较两种方案的效果', '测试软件版本', '所有都不对'], answer: '比较两种方案的效果' },
    ],
    7: [
      { question: '在Pandas中，读取CSV文件的函数是什么？', options: ['read_csv', 'read_excel', 'read_json', 'read_sql'], answer: 'read_csv' },
      { question: '以下哪个不是数据清洗常用的操作？', options: ['dropna', 'fillna', 'groupby', 'astype'], answer: 'groupby' },
      { question: '在Pandas中，哪个函数用于分组聚合？', options: ['merge', 'groupby', 'concat', 'join'], answer: 'groupby' },
      { question: 'K-means聚类算法属于什么类型？', options: ['监督学习', '无监督学习', '强化学习', '深度学习'], answer: '无监督学习' },
      { question: '时间序列分析中，移动平均的主要作用是什么？', options: ['增加数据波动', '消除数据波动', '减少数据量', '增加数据量'], answer: '消除数据波动' },
    ],
  };

  chapters.forEach(chapter => {
    const base = baseQuestions[chapter.id];
    for (let i = 0; i < chapter.count; i++) {
      const baseIndex = i % base.length;
      const type = questionTypes[i % 3];
      const baseQuestion = base[baseIndex];
      
      if (type === '判断题') {
        questions.push({
          id: `q${chapter.id}-${i}`,
          chapterId: chapter.id,
          type: '判断题',
          question: `关于${chapter.name}的这个说法：${['正确吗？', '是对的吗？', '是否成立？'][i % 3]}`,
          options: ['正确', '错误'],
          answer: i % 2 === 0 ? '正确' : '错误',
          explanation: '这是一个典型的判断题'
        });
      } else if (type === '多选题') {
        const extraOptions = [
          ['其他选项1', '其他选项2', '其他选项3'],
          ['额外选项A', '额外选项B', '额外选项C'],
          ['选择项X', '选择项Y', '选择项Z']
        ][i % 3];
        
        const correctAnswers = [baseQuestion.answer, extraOptions[i % 3]];
        
        questions.push({
          id: `q${chapter.id}-${i}`,
          chapterId: chapter.id,
          type: '多选题',
          question: `关于${chapter.name}，以下哪些是正确的？（多选）`,
          options: [baseQuestion.answer, ...baseQuestion.options.filter(o => o !== baseQuestion.answer), ...extraOptions].slice(0, 6),
          answer: correctAnswers,
          explanation: '这是一个典型的多选题'
        });
      } else {
        questions.push({
          id: `q${chapter.id}-${i}`,
          chapterId: chapter.id,
          type: '单选题',
          question: baseQuestion.question,
          options: baseQuestion.options,
          answer: baseQuestion.answer,
          explanation: '这是一个典型的单选题'
        });
      }
    }
  });

  return questions;
};

const chapterNames = {
  1: '数据分析概述',
  2: '数据可视化技术',
  3: '描述性统计分析',
  4: '推断统计分析',
  5: '预测分析',
  6: '商务数据分析案例',
  7: 'Python数据分析实践项目',
};

export default function ChapterPractice() {
  const navigate = useNavigate();
  const { chapterId } = useParams<{ chapterId: string }>();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const allQuestions = generateChapterQuestions();

  useEffect(() => {
    if (chapterId) {
      const chapterNum = parseInt(chapterId);
      const chapterQuestions = allQuestions.filter(q => q.chapterId === chapterNum);
      const shuffledQuestions = [...chapterQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
      setQuestions(shuffledQuestions);
    }
  }, [chapterId]);

  const selectAnswer = (questionId: string, answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const userAnswer = userAnswers[q.id];
      if (q.type === '多选题') {
        if (userAnswer && userAnswer.length === q.answer.length && 
            userAnswer.every(a => q.answer.includes(a))) {
          correctCount++;
        }
      } else {
        if (userAnswer === q.answer) {
          correctCount++;
        }
      }
    });
    setScore(Math.round((correctCount / questions.length) * 100));
  };

  const restartPractice = () => {
    if (chapterId) {
      const chapterNum = parseInt(chapterId);
      const chapterQuestions = allQuestions.filter(q => q.chapterId === chapterNum);
      const shuffledQuestions = [...chapterQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResult(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              章节练习
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/data-analysis')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              返回大纲
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              章节练习 - 第{chapterId}章 {chapterNames[parseInt(chapterId) || 1]}
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {!showResult ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    第 {currentQuestionIndex + 1} / {questions.length} 题
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      上一题
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {currentQuestionIndex === questions.length - 1 ? '提交' : '下一题'}
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {currentQuestion?.type === '多选题' ? '（多选）' : ''}
                    {currentQuestion?.question}
                  </h3>
                  <div className="space-y-2">
                    {currentQuestion?.options.map((option: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <input
                          type={currentQuestion.type === '多选题' ? 'checkbox' : 'radio'}
                          id={`option-${index}`}
                          name={`question-${currentQuestion.id}`}
                          checked={
                            currentQuestion.type === '多选题'
                              ? userAnswers[currentQuestion.id]?.includes(option)
                              : userAnswers[currentQuestion.id] === option
                          }
                          onChange={() => {
                            if (currentQuestion.type === '多选题') {
                              const currentAnswers = userAnswers[currentQuestion.id] || [];
                              if (currentAnswers.includes(option)) {
                                selectAnswer(currentQuestion.id, currentAnswers.filter(a => a !== option));
                              } else {
                                selectAnswer(currentQuestion.id, [...currentAnswers, option]);
                              }
                            } else {
                              selectAnswer(currentQuestion.id, option);
                            }
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    练习完成！
                  </h3>
                  <p className="text-xl text-gray-600">
                    得分：{score} 分
                  </p>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={restartPractice}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    重新练习
                  </button>
                  <button
                    onClick={() => navigate('/data-analysis')}
                    className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    返回大纲
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
