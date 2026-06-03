import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';

const generateChapterQuestions = () => {
  const questions = [];
  const chapters = [
    { id: 1, name: '数据分析概述', count: 10 },
    { id: 2, name: '数据可视化技术', count: 10 },
    { id: 3, name: '描述性统计分析', count: 10 },
    { id: 4, name: '推断统计分析', count: 10 },
    { id: 5, name: '预测分析', count: 10 },
    { id: 6, name: '商务数据分析案例', count: 10 },
  ];

  const baseQuestions = {
    1: [
      { question: '数据分析的基本流程不包括以下哪个步骤？', options: ['数据收集', '数据清洗', '数据备份', '数据可视化'], answer: '数据备份' },
      { question: '以下哪个不属于数据分析的应用领域？', options: ['市场营销', '金融风控', '娱乐游戏', '所有都是'], answer: '所有都是' },
      { question: '数据分析师的核心能力不包括以下哪项？', options: ['编程能力', '沟通能力', '绘画能力', '统计分析能力'], answer: '绘画能力' },
      { question: '在数据分析流程中，数据清洗的主要目的是什么？', options: ['增加数据量', '处理缺失值和异常值', '数据可视化', '数据备份'], answer: '处理缺失值和异常值' },
      { question: '以下哪种是数据可视化工具？', options: ['Excel', 'Python', 'Tableau', '所有都是'], answer: '所有都是' },
      { question: '数据分析的最终目标是什么？', options: ['制作报表', '发现问题', '支持决策', '展示数据'], answer: '支持决策' },
      { question: '数据质量问题中不包括以下哪项？', options: ['缺失值', '异常值', '重复值', '正确值'], answer: '正确值' },
      { question: '数据可视化的主要作用不包括以下哪项？', options: ['发现趋势', '展示数据', '替代分析', '发现异常'], answer: '替代分析' },
      { question: '大数据的4V特征不包括以下哪项？', options: ['Volume（大量）', 'Velocity（高速）', 'Variety（多样）', 'Visual（视觉）'], answer: 'Visual（视觉）' },
      { question: '数据驱动决策的优势是什么？', options: ['基于直觉', '客观准确', '速度慢', '成本高'], answer: '客观准确' },
    ],
    2: [
      { question: '以下哪个不是Python常用的数据可视化库？', options: ['Matplotlib', 'Seaborn', 'Pandas', 'Plotly'], answer: 'Pandas' },
      { question: '柱状图最适合用来展示什么类型的数据？', options: ['趋势变化', '类别对比', '占比分布', '相关性'], answer: '类别对比' },
      { question: '饼图最适合用来展示什么类型的数据？', options: ['趋势变化', '类别对比', '占比分布', '相关性'], answer: '占比分布' },
      { question: '折线图最适合用来展示什么类型的数据？', options: ['趋势变化', '类别对比', '占比分布', '相关性'], answer: '趋势变化' },
      { question: 'Seaborn是基于哪个库构建的？', options: ['Matplotlib', 'Plotly', 'Bokeh', 'Pandas'], answer: 'Matplotlib' },
      { question: '散点图主要用于展示什么？', options: ['类别对比', '占比分布', '两个变量的关系', '时间趋势'], answer: '两个变量的关系' },
      { question: '箱线图可以展示数据的什么信息？', options: ['均值', '四分位数和异常值', '占比', '趋势'], answer: '四分位数和异常值' },
      { question: '热力图适合展示什么类型的数据？', options: ['时间序列', '分类占比', '矩阵数据', '散点分布'], answer: '矩阵数据' },
      { question: '在数据可视化中，颜色的主要作用是什么？', options: ['美观', '区分数据', '填充空白', '无作用'], answer: '区分数据' },
      { question: '选择图表类型的主要依据是什么？', options: ['个人喜好', '数据类型和分析目的', '美观度', '时间长短'], answer: '数据类型和分析目的' },
    ],
    3: [
      { question: '以下哪个是描述数据集中趋势的统计量？', options: ['均值', '标准差', '方差', '范围'], answer: '均值' },
      { question: '以下哪个是描述数据离散程度的统计量？', options: ['均值', '中位数', '众数', '标准差'], answer: '标准差' },
      { question: '如果数据分布是左偏的，以下哪个说法是正确的？', options: ['均值 > 中位数 > 众数', '众数 > 中位数 > 均值', '均值 = 中位数 = 众数', '众数 > 均值 > 中位数'], answer: '众数 > 中位数 > 均值' },
      { question: '四分位数间距（IQR）是指哪两个四分位数的差？', options: ['Q1和Q2', 'Q1和Q3', 'Q2和Q3', 'Q0和Q4'], answer: 'Q1和Q3' },
      { question: '相关系数r的取值范围是？', options: ['[0, 1]', '[-1, 1]', '[0, ∞)', '(-∞, ∞)'], answer: '[-1, 1]' },
      { question: '以下哪个不是集中趋势的度量？', options: ['中位数', '众数', '均值', '极差'], answer: '极差' },
      { question: '标准差是方差的什么？', options: ['平方', '平方根', '倒数', '两倍'], answer: '平方根' },
      { question: '如果相关系数r=0，表示什么？', options: ['完全正相关', '完全负相关', '无线性相关', '完全相关'], answer: '无线性相关' },
      { question: '众数是指数据中的什么？', options: ['最大的数', '最小的数', '出现最多的数', '中间的数'], answer: '出现最多的数' },
      { question: '以下哪个统计量对异常值最敏感？', options: ['中位数', '均值', '众数', '四分位数'], answer: '均值' },
    ],
    4: [
      { question: '假设检验中，第一类错误是指什么？', options: ['接受了正确的原假设', '拒绝了正确的原假设', '接受了错误的备择假设', '拒绝了错误的备择假设'], answer: '拒绝了正确的原假设' },
      { question: 'p值是指什么？', options: ['原假设为真的概率', '犯第一类错误的概率', '犯第二类错误的概率', '接受原假设的概率'], answer: '原假设为真的概率' },
      { question: '在独立样本t检验中，方差齐性检验的目的是什么？', options: ['检验均值是否相等', '检验方差是否相等', '检验样本量是否足够', '检验数据是否正态分布'], answer: '检验方差是否相等' },
      { question: '置信水平95%表示什么？', options: ['有95%的机会犯错误', '有95%的置信区间包含真实参数', '参数有95%的概率在某个区间', '所有都不对'], answer: '有95%的置信区间包含真实参数' },
      { question: '卡方检验主要用于什么场景？', options: ['检验均值差异', '检验方差差异', '检验类别变量独立性', '检验相关性'], answer: '检验类别变量独立性' },
      { question: '在假设检验中，如果p值小于0.05，我们通常会怎么做？', options: ['接受原假设', '拒绝原假设', '不做决定', '需要更多信息'], answer: '拒绝原假设' },
      { question: '置信区间的宽度与置信水平的关系是？', options: ['正相关', '负相关', '无关', '不确定'], answer: '正相关' },
      { question: '以下哪种检验适用于比较两个样本的均值差异？', options: ['卡方检验', 't检验', '方差分析', '相关分析'], answer: 't检验' },
      { question: '第二类错误是指什么？', options: ['接受正确的原假设', '接受错误的原假设', '拒绝正确的原假设', '拒绝错误的原假设'], answer: '接受错误的原假设' },
      { question: '统计推断的主要目的是什么？', options: ['描述样本数据', '从样本推断总体', '计算统计量', '制作图表'], answer: '从样本推断总体' },
    ],
    5: [
      { question: '线性回归模型中，R²表示什么？', options: ['模型的斜率', '模型的截距', '模型解释的变异占比', '模型的误差'], answer: '模型解释的变异占比' },
      { question: '以下哪个不是机器学习中的分类算法？', options: ['决策树', '线性回归', '随机森林', '逻辑回归'], answer: '线性回归' },
      { question: '在回归分析中，残差是指什么？', options: ['预测值', '真实值', '真实值与预测值的差', '预测值与真实值的和'], answer: '真实值与预测值的差' },
      { question: '特征选择的目的是什么？', options: ['增加特征数量', '减少特征数量，提高模型性能', '数据可视化', '数据清洗'], answer: '减少特征数量，提高模型性能' },
      { question: '在预测分析中，训练集和测试集的主要区别是什么？', options: ['训练集用于训练模型，测试集用于评估模型', '训练集数据量更大', '测试集数据量更大', '没有区别'], answer: '训练集用于训练模型，测试集用于评估模型' },
      { question: '过拟合是指模型在什么情况下表现？', options: ['训练集好，测试集好', '训练集好，测试集差', '训练集差，测试集好', '训练集差，测试集差'], answer: '训练集好，测试集差' },
      { question: '逻辑回归主要用于什么任务？', options: ['回归预测', '分类预测', '聚类分析', '关联规则'], answer: '分类预测' },
      { question: '决策树的优势不包括以下哪项？', options: ['可解释性强', '处理非线性关系', '不易过拟合', '无需标准化'], answer: '不易过拟合' },
      { question: '随机森林是基于什么算法改进的？', options: ['线性回归', '决策树', 'K-means', '支持向量机'], answer: '决策树' },
      { question: '评估回归模型性能的指标不包括以下哪项？', options: ['MAE', 'RMSE', 'R²', '准确率'], answer: '准确率' },
    ],
    6: [
      { question: '在销售数据分析中，哪个指标通常用于衡量客户价值？', options: ['客户ID', '购买频率', '客户姓名', '客户地址'], answer: '购买频率' },
      { question: 'RFM分析中的F代表什么？', options: ['Frequency（频率）', 'Freshness（新鲜度）', 'First（第一次）', 'Final（最后）'], answer: 'Frequency（频率）' },
      { question: '在供应链数据分析中，安全库存的主要目的是什么？', options: ['增加库存成本', '应对需求不确定性', '减少存储空间', '加快物流速度'], answer: '应对需求不确定性' },
      { question: '客户细分的主要目的是什么？', options: ['减少客户数量', '了解不同客户群体特征', '提高产品价格', '简化营销流程'], answer: '了解不同客户群体特征' },
      { question: 'A/B测试的主要目的是什么？', options: ['测试产品A和B的外观差异', '比较两种方案的效果', '测试软件版本', '所有都不对'], answer: '比较两种方案的效果' },
      { question: 'RFM分析中的M代表什么？', options: ['Money（金额）', 'Month（月份）', 'Max（最大）', 'Mean（均值）'], answer: 'Money（金额）' },
      { question: '市场细分的基础是什么？', options: ['客户数量', '客户需求差异', '产品种类', '销售渠道'], answer: '客户需求差异' },
      { question: '在营销数据分析中，转化率是指什么？', options: ['访问网站的人数', '购买人数占访问人数的比例', '总销售额', '客户数量'], answer: '购买人数占访问人数的比例' },
      { question: '库存周转率的计算公式是？', options: ['销售量/平均库存', '库存/销售额', '利润/库存', '成本/库存'], answer: '销售量/平均库存' },
      { question: 'A/B测试中，测试组和对照组应该什么？', options: ['完全一样', '只有一个变量不同', '多个变量不同', '都不对'], answer: '只有一个变量不同' },
    ],
  };

  chapters.forEach(chapter => {
    const base = baseQuestions[chapter.id];
    for (let i = 0; i < chapter.count; i++) {
      const baseIndex = i % base.length;
      const baseQuestion = base[baseIndex];
      
      questions.push({
        id: `q${chapter.id}-${i}`,
        chapterId: chapter.id,
        type: '单选题',
        question: baseQuestion.question,
        options: baseQuestion.options,
        answer: baseQuestion.answer,
        explanation: `正确答案是${baseQuestion.answer}`
      });
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

  useEffect(() => {
    document.title = `${chapterNames[parseInt(chapterId) || 1]} - 章节练习 - 小林学习网站`;
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
      if (userAnswer === q.answer) {
        correctCount++;
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
              返回课程
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
                    {currentQuestion?.question}
                  </h3>
                  <div className="space-y-2">
                    {currentQuestion?.options.map((option: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name={`question-${currentQuestion.id}`}
                          checked={userAnswers[currentQuestion.id] === option}
                          onChange={() => selectAnswer(currentQuestion.id, option)}
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
                    返回课程
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
