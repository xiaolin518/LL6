import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, ChevronLeft, Play, Code } from 'lucide-react';

// 生成400道章节练习题
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

// 课程大纲数据
const courseOutline = [
  {
    id: 'chapter1',
    title: '数据分析概述',
    description: '了解数据分析的基本概念、流程和应用领域',
    content: `
      <h3>1.1 数据分析的定义与重要性</h3>
      <p>数据分析是指通过收集、处理、分析数据，提取有价值的信息，为决策提供支持的过程。在当今数据驱动的时代，数据分析已经成为企业和组织的核心竞争力。</p>
      
      <h3>1.2 数据分析的基本流程</h3>
      <ul>
        <li>数据收集：从各种来源获取数据</li>
        <li>数据清洗：处理缺失值、异常值等</li>
        <li>数据探索：了解数据的基本特征</li>
        <li>数据分析：使用各种方法分析数据</li>
        <li>结果可视化：将分析结果以直观的方式展示</li>
        <li>报告撰写：总结分析结果和建议</li>
      </ul>
      
      <h3>1.3 数据分析的应用领域</h3>
      <p>数据分析广泛应用于市场营销、金融、医疗、教育、物流等各个领域，帮助企业优化决策，提高运营效率。</p>
    `
  },
  {
    id: 'chapter2',
    title: '数据可视化技术',
    description: '学习使用Python进行数据可视化',
    content: `
      <h3>2.1 Matplotlib库基础</h3>
      <p>Matplotlib是Python中最常用的数据可视化库，可以创建各种类型的图表，包括折线图、柱状图、散点图等。</p>
      
      <h3>2.2 Seaborn库进阶</h3>
      <p>Seaborn是基于Matplotlib的高级可视化库，提供了更美观的默认样式和更高级的统计图表功能。</p>
      
      <h3>2.3 交互式可视化工具</h3>
      <p>介绍Plotly等交互式可视化工具，创建可交互的图表，提升数据展示效果。</p>
    `
  },
  {
    id: 'chapter3',
    title: '描述性统计分析',
    description: '学习使用统计方法描述和分析数据',
    content: `
      <h3>3.1 数据的集中趋势</h3>
      <p>学习均值、中位数、众数等描述数据集中趋势的统计量。</p>
      
      <h3>3.2 数据的离散程度</h3>
      <p>学习方差、标准差、四分位数等描述数据离散程度的统计量。</p>
      
      <h3>3.3 数据的分布特征</h3>
      <p>学习数据的分布形态，包括正态分布、偏态分布等。</p>
    `
  },
  {
    id: 'chapter4',
    title: '推断统计分析',
    description: '学习使用推断统计方法从样本推断总体',
    content: `
      <h3>4.1 假设检验</h3>
      <p>学习假设检验的基本原理和步骤，包括t检验、方差分析等。</p>
      
      <h3>4.2 置信区间</h3>
      <p>学习如何计算和解释置信区间，评估估计的可靠性。</p>
      
      <h3>4.3 相关分析</h3>
      <p>学习相关系数的计算和解释，分析变量之间的关系。</p>
    `
  },
  {
    id: 'chapter5',
    title: '预测分析',
    description: '学习使用机器学习方法进行预测',
    content: `
      <h3>5.1 线性回归分析</h3>
      <p>学习线性回归的基本原理和应用，预测连续型变量。</p>
      
      <h3>5.2 分类算法</h3>
      <p>学习决策树、随机森林等分类算法，预测离散型变量。</p>
      
      <h3>5.3 模型评估</h3>
      <p>学习模型评估的指标，如准确率、精确率、召回率等。</p>
    `
  },
  {
    id: 'chapter6',
    title: '商务数据分析案例',
    description: '通过实际案例学习商务数据分析',
    content: `
      <h3>6.1 销售数据分析</h3>
      <p>分析销售数据，识别销售趋势和模式，优化销售策略。</p>
      
      <h3>6.2 客户行为分析</h3>
      <p>分析客户行为数据，了解客户偏好，提高客户满意度。</p>
      
      <h3>6.3 供应链数据分析</h3>
      <p>分析供应链数据，优化库存管理和物流配送。</p>
    `
  },
  {
    id: 'chapter7',
    title: 'Python数据分析实践项目',
    description: '10个实用的Python数据分析项目，涵盖数据清洗、分析、可视化等多个领域',
    content: `
      <h3>7.1 项目概述</h3>
      <p>本章节包含10个实用的Python数据分析项目，涵盖数据清洗、分析、可视化等多个领域。</p>
      <p>点击"实操训练"按钮进入实操目录，选择具体项目进行练习。</p>
    `
  }
];

export default function DataAnalysisCourse() {
  const navigate = useNavigate();
  // 数据分析课程组件
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [showPractice, setShowPractice] = useState<boolean>(false);
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const allQuestions = generateChapterQuestions();

  // 开始章节练习
  const startPractice = (chapterId: string) => {
    const chapterNum = parseInt(chapterId.replace('chapter', ''));
    setCurrentChapterId(chapterNum);
    
    // 筛选当前章节的题目并随机打乱
    const chapterQuestions = allQuestions.filter(q => q.chapterId === chapterNum);
    const shuffledQuestions = [...chapterQuestions].sort(() => Math.random() - 0.5).slice(0, 10); // 每次取10道题
    
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResult(false);
    setShowPractice(true);
    setActiveChapter(null);
  };

  // 选择答案
  const selectAnswer = (questionId: string, answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 切换到下一题
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  // 切换到上一题
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // 计算分数
  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const userAnswer = userAnswers[q.id];
      if (q.type === '多选题') {
        // 多选题需要全部选对
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

  // 重新开始练习
  const restartPractice = () => {
    if (currentChapterId) {
      // 重新随机选择题目
      const chapterQuestions = allQuestions.filter(q => q.chapterId === currentChapterId);
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
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              数据分析技术课程
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <a href="/" className="hover:text-blue-600 transition-colors">首页</a>
              <a href="#outline" className="hover:text-blue-600 transition-colors">课程大纲</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            数据分析技术
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            高职大二学期课程 | 理论学习 + 章节练习
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">开始学习</span>
          </div>
        </div>
      </section>

      {/* Course Outline */}
      <section id="outline" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            课程大纲
          </h2>
          <div className="space-y-6">
            {courseOutline.map((chapter, index) => (
              <div
                key={chapter.id}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{chapter.title}</h3>
                      <p className="text-gray-600">{chapter.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {chapter.id !== 'chapter7' && (
                      <button
                        onClick={() => {
                          setActiveChapter(chapter.id);
                          setShowPractice(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        理论学习
                      </button>
                    )}
                    {chapter.id === 'chapter7' && (
                      <button
                        onClick={() => navigate('/data-analysis/practical')}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Code className="w-4 h-4" />
                        实操训练
                      </button>
                    )}
                    {chapter.id !== 'chapter7' && (
                      <button
                        onClick={() => startPractice(chapter.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        章节练习
                      </button>
                    )}
                  </div>
                </div>
                {activeChapter === chapter.id && !showPractice && chapter.id !== 'chapter7' && (
                  <div className="mt-4 p-6 bg-white rounded-xl shadow-sm">
                    <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 章节练习界面 */}
      {showPractice && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                章节练习 - 第{currentChapterId}章
              </h2>
              <button
                onClick={() => setShowPractice(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                返回大纲
              </button>
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
                      {currentQuestion.type === '多选题' ? '（多选）' : ''}
                      {currentQuestion.question}
                    </h3>
                    <div className="space-y-2">
                      {currentQuestion.options.map((option: string, index: number) => (
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
                      onClick={() => setShowPractice(false)}
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
      )}
    </div>
  );
}