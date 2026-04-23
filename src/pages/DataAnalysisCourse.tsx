import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, AlertCircle, ChevronRight, RefreshCw, Star, ChevronLeft, Play } from 'lucide-react';

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
      <h3>7.1 实操目录</h3>
      <p>点击下方项目进入实操练习：</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(1)">
          <h4 class="font-bold text-blue-600">01. 销售数据读取与清洗</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: read_csv/read_excel, dropna, fillna, astype, drop_duplicates</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 数据完整性校验、格式统一、脏数据清理</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(2)">
          <h4 class="font-bold text-blue-600">02. 销售数据分组聚合</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: groupby, agg, sum, mean, count</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 多维度销售指标统计（销售额、销量、客单价）</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(3)">
          <h4 class="font-bold text-blue-600">03. 购物篮关联规则分析</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: groupby + apply, itertools.combinations, mlxtend.frequent_patterns</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 热销搭配挖掘、强关联商品识别、支持度 / 置信度计算</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(4)">
          <h4 class="font-bold text-blue-600">04. 客户聚类分析</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: StandardScaler, KMeans, silhouette_score</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 客户群体划分、高价值 / 流失 / 潜力客户识别、簇中心解读</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(5)">
          <h4 class="font-bold text-blue-600">05. 销售数据可视化</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: plot, bar, pie, line (Pandas内置), matplotlib, seaborn</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 销售趋势、地区分布、品类占比可视化，图表叙事与洞察总结</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(6)">
          <h4 class="font-bold text-blue-600">06. A/B测试效果分析</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: groupby, crosstab, scipy.stats (T-test/Chi2)</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 实验数据统计、转化率差异显著性检验、P值解读与方案评估</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(7)">
          <h4 class="font-bold text-blue-600">07. 时间序列预测分析</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: resample, rolling, shift, ARIMA/Prophet</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 销售趋势分析、季节性识别、月度 / 季度销量预测</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(8)">
          <h4 class="font-bold text-blue-600">08. 机器学习特征工程</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: get_dummies, LabelEncoder, cut/qcut, corr, SelectKBest</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 衍生特征创建、分类变量编码、特征筛选与建模数据准备</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(9)">
          <h4 class="font-bold text-blue-600">09. 客户RFM价值分层</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: qcut, map, apply, 自定义评分函数</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 基于RFM的客户价值分层、业务标签定义与分层运营策略制定</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="openPractice(10)">
          <h4 class="font-bold text-blue-600">10. 自动化销售报表生成</h4>
          <p class="text-sm text-gray-600 mt-1">核心工具: pd.ExcelWriter, openpyxl, pivot_table, plot</p>
          <p class="text-sm text-gray-600 mt-1">业务目标: 自动生成带图表的周报 / 月报，实现数据统计与报表自动化</p>
        </div>
      </div>
    `
  }
];

export default function DataAnalysisCourse() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [showPractice, setShowPractice] = useState<boolean>(false);
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  // 实操练习状态
  const [showPractical, setShowPractical] = useState<boolean>(false);
  const [currentPracticalId, setCurrentPracticalId] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const allQuestions = generateChapterQuestions();

  // 实操练习数据
  const practicalProjects = [
    {
      id: 1,
      title: '销售数据读取与清洗',
      description: '使用Pandas读取销售数据并进行清洗，处理缺失值和异常值',
      data: `import pandas as pd
import numpy as np

# 生成模拟销售数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
products = ['A', 'B', 'C', 'D', 'E']
regions = ['华东', '华南', '华北', '西南', '西北']

data = []
for date in dates:
    for product in products:
        for region in regions:
            sales = np.random.randint(50, 200)
            price = {
                'A': 100,
                'B': 200,
                'C': 150,
                'D': 300,
                'E': 250
            }[product]
            revenue = sales * price
            customer_id = np.random.randint(1, 1001)
            data.append({
                'date': date,
                'product': product,
                'region': region,
                'sales': sales,
                'price': price,
                'revenue': revenue,
                'customer_id': customer_id
            })

df = pd.DataFrame(data)

# 添加缺失值和异常值
missing_indices = np.random.choice(df.index, size=1000, replace=False)
df.loc[missing_indices, 'sales'] = np.nan

error_indices = np.random.choice(df.index, size=500, replace=False)
df.loc[error_indices, 'revenue'] = df.loc[error_indices, 'revenue'] * 10

# 保存数据
df.to_csv('sales_data.csv', index=False)
print("数据生成完成，保存为 sales_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
print("原始数据形状:", df.shape)

# 2. 检查缺失值
print("\n缺失值情况:")
print(df.isnull().sum())

# 3. 处理缺失值
# 请在此处添加代码

# 4. 处理异常值
# 请在此处添加代码

# 5. 验证数据
print("\n处理后数据形状:", df.shape)
print("处理后缺失值情况:")
print(df.isnull().sum())`,
      answer: `import pandas as pd
import numpy as np

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
print("原始数据形状:", df.shape)

# 2. 检查缺失值
print("\n缺失值情况:")
print(df.isnull().sum())

# 3. 处理缺失值
df['sales'] = df['sales'].fillna(df['sales'].mean())

# 4. 处理异常值
# 使用IQR方法检测异常值
Q1 = df['revenue'].quantile(0.25)
Q3 = df['revenue'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 过滤异常值
df = df[(df['revenue'] >= lower_bound) & (df['revenue'] <= upper_bound)]

# 5. 验证数据
print("\n处理后数据形状:", df.shape)
print("处理后缺失值情况:")
print(df.isnull().sum())

# 6. 数据类型转换
df['date'] = pd.to_datetime(df['date'])
df['sales'] = df['sales'].astype(int)

# 7. 去重
df = df.drop_duplicates()
print("\n去重后数据形状:", df.shape)

print("\n数据清洗完成！")`
    },
    {
      id: 2,
      title: '销售数据分组聚合',
      description: '使用groupby和agg函数进行多维度销售指标统计',
      data: `import pandas as pd
import numpy as np

# 生成模拟销售数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
products = ['A', 'B', 'C', 'D', 'E']
regions = ['华东', '华南', '华北', '西南', '西北']

data = []
for date in dates:
    for product in products:
        for region in regions:
            sales = np.random.randint(50, 200)
            price = {
                'A': 100,
                'B': 200,
                'C': 150,
                'D': 300,
                'E': 250
            }[product]
            revenue = sales * price
            customer_id = np.random.randint(1, 1001)
            data.append({
                'date': date,
                'product': product,
                'region': region,
                'sales': sales,
                'price': price,
                'revenue': revenue,
                'customer_id': customer_id
            })

df = pd.DataFrame(data)
df.to_csv('sales_data.csv', index=False)
print("数据生成完成，保存为 sales_data.csv")`,
      codeTemplate: `import pandas as pd

# 1. 读取数据
df = pd.read_csv('sales_data.csv')

# 2. 按产品分组统计
print("=== 按产品统计 ===")
# 请在此处添加代码

# 3. 按地区分组统计
print("\n=== 按地区统计 ===")
# 请在此处添加代码

# 4. 按月份分组统计
print("\n=== 按月统计 ===")
# 请在此处添加代码

# 5. 计算客单价
print("\n=== 客单价分析 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])

# 2. 按产品分组统计
print("=== 按产品统计 ===")
product_stats = df.groupby('product').agg({
    'sales': 'sum',
    'revenue': 'sum',
    'customer_id': 'nunique'
}).reset_index()
product_stats['avg_order_value'] = product_stats['revenue'] / product_stats['sales']
print(product_stats.sort_values('revenue', ascending=False))

# 3. 按地区分组统计
print("\n=== 按地区统计 ===")
region_stats = df.groupby('region').agg({
    'sales': 'sum',
    'revenue': 'sum',
    'customer_id': 'nunique'
}).reset_index()
region_stats['avg_order_value'] = region_stats['revenue'] / region_stats['sales']
print(region_stats.sort_values('revenue', ascending=False))

# 4. 按月份分组统计
print("\n=== 按月统计 ===")
df['month'] = df['date'].dt.month
monthly_stats = df.groupby('month').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()
monthly_stats['avg_order_value'] = monthly_stats['revenue'] / monthly_stats['sales']
print(monthly_stats.sort_values('month'))

# 5. 计算客单价
print("\n=== 客单价分析 ===")
total_avg_order = df['revenue'].sum() / df['sales'].sum()
print(f"总体客单价: {total_avg_order:.2f}")

# 6. 产品-地区交叉分析
print("\n=== 产品-地区交叉分析 ===")
pivot_table = df.pivot_table(
    values='revenue',
    index='product',
    columns='region',
    aggfunc='sum'
)
print(pivot_table)

print("\n分组聚合分析完成！")`
    },
    {
      id: 3,
      title: '购物篮关联规则分析',
      description: '分析商品之间的关联关系，挖掘热销搭配',
      data: `import pandas as pd
import numpy as np

# 生成模拟购物篮数据
np.random.seed(42)
transactions = []
products = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

for i in range(1000):
    # 每个交易包含2-5个商品
    num_products = np.random.randint(2, 6)
    transaction = np.random.choice(products, size=num_products, replace=False).tolist()
    transactions.append({
        'transaction_id': i + 1,
        'products': transaction
    })

df = pd.DataFrame(transactions)
df.to_csv('basket_data.csv', index=False)
print("数据生成完成，保存为 basket_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np
from itertools import combinations

# 1. 读取数据
df = pd.read_csv('basket_data.csv')

# 2. 数据预处理
# 请在此处添加代码

# 3. 计算商品组合的支持度
print("=== 商品组合支持度 ===")
# 请在此处添加代码

# 4. 计算置信度
print("\n=== 商品组合置信度 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np
from itertools import combinations

# 1. 读取数据
df = pd.read_csv('basket_data.csv')

# 2. 数据预处理
# 转换products列为列表
df['products'] = df['products'].apply(eval)

# 3. 计算商品组合的支持度
print("=== 商品组合支持度 ===")
# 统计单个商品的出现次数
item_counts = {}
for products in df['products']:
    for item in products:
        if item not in item_counts:
            item_counts[item] = 0
        item_counts[item] += 1

# 计算单个商品的支持度
total_transactions = len(df)
item_support = {item: count / total_transactions for item, count in item_counts.items()}
print("单个商品支持度:")
for item, support in sorted(item_support.items(), key=lambda x: x[1], reverse=True):
    print(f"{item}: {support:.3f}")

# 计算商品对的支持度
pair_counts = {}
for products in df['products']:
    # 生成所有商品对
    pairs = list(combinations(products, 2))
    for pair in pairs:
        # 排序确保 (A,B) 和 (B,A) 视为同一对
        sorted_pair = tuple(sorted(pair))
        if sorted_pair not in pair_counts:
            pair_counts[sorted_pair] = 0
        pair_counts[sorted_pair] += 1

# 计算商品对的支持度
pair_support = {pair: count / total_transactions for pair, count in pair_counts.items()}
print("\n商品对支持度（前10）:")
for pair, support in sorted(pair_support.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"{pair}: {support:.3f}")

# 4. 计算置信度
print("\n=== 商品组合置信度 ===")
confidence = {}
for pair, count in pair_counts.items():
    # 计算 A -> B 的置信度
    a, b = pair
    confidence[(a, b)] = count / item_counts[a]
    # 计算 B -> A 的置信度
    confidence[(b, a)] = count / item_counts[b]

print("商品对置信度（前10）:")
for (a, b), conf in sorted(confidence.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"{a} -> {b}: {conf:.3f}")

# 5. 计算提升度
print("\n=== 商品组合提升度 ===")
lift = {}
for pair, count in pair_counts.items():
    a, b = pair
    support_ab = pair_support[pair]
    support_a = item_support[a]
    support_b = item_support[b]
    lift[(a, b)] = support_ab / (support_a * support_b)

print("商品对提升度（前10）:")
for (a, b), lift_value in sorted(lift.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"{a} -> {b}: {lift_value:.3f}")

print("\n关联规则分析完成！")`
    },
    {
      id: 4,
      title: '客户聚类分析',
      description: '使用KMeans算法对客户进行聚类，识别不同价值的客户群体',
      data: `import pandas as pd
import numpy as np

# 生成模拟客户数据
np.random.seed(42)
customers = []

for i in range(1000):
    # 随机生成客户数据
    total_revenue = np.random.normal(5000, 2000)
    total_revenue = max(1000, total_revenue)
    
    purchase_frequency = np.random.poisson(5) + 1
    
    average_order_value = total_revenue / purchase_frequency
    
    # 添加一些客户群体特征
    if i < 200:
        # 高价值客户
        total_revenue *= 2
        purchase_frequency *= 1.5
    elif i < 500:
        # 中等价值客户
        pass
    else:
        # 低价值客户
        total_revenue *= 0.5
        purchase_frequency *= 0.8
    
    customers.append({
        'customer_id': i + 1,
        'total_revenue': total_revenue,
        'purchase_frequency': purchase_frequency,
        'average_order_value': total_revenue / purchase_frequency
    })

df = pd.DataFrame(customers)
df.to_csv('customer_data.csv', index=False)
print("数据生成完成，保存为 customer_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 1. 读取数据
df = pd.read_csv('customer_data.csv')

# 2. 数据预处理和标准化
# 请在此处添加代码

# 3. KMeans聚类
print("=== KMeans聚类 ===")
# 请在此处添加代码

# 4. 分析聚类结果
print("\n=== 聚类结果分析 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# 1. 读取数据
df = pd.read_csv('customer_data.csv')

# 2. 数据预处理和标准化
features = df[['total_revenue', 'purchase_frequency', 'average_order_value']]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# 3. KMeans聚类
print("=== KMeans聚类 ===")
# 尝试不同的k值
for k in range(2, 6):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaled_features)
    score = silhouette_score(scaled_features, kmeans.labels_)
    print(f"k={k}, 轮廓系数: {score:.3f}")

# 选择k=3进行最终聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(scaled_features)

# 4. 分析聚类结果
print("\n=== 聚类结果分析 ===")
cluster_analysis = df.groupby('cluster').agg({
    'total_revenue': ['mean', 'std'],
    'purchase_frequency': ['mean', 'std'],
    'average_order_value': ['mean', 'std'],
    'customer_id': 'count'
}).round(2)

print(cluster_analysis)

# 5. 为客户群体命名
cluster_names = {}
for cluster in range(3):
    cluster_data = df[df['cluster'] == cluster]
    if cluster_data['total_revenue'].mean() > df['total_revenue'].mean() * 1.5:
        cluster_names[cluster] = '高价值客户'
    elif cluster_data['total_revenue'].mean() > df['total_revenue'].mean() * 0.8:
        cluster_names[cluster] = '中等价值客户'
    else:
        cluster_names[cluster] = '低价值客户'

print("\n=== 客户群体分析 ===")
for cluster, name in cluster_names.items():
    count = len(df[df['cluster'] == cluster])
    print(f"群体 {cluster} ({name}): {count} 人")

# 6. 保存聚类结果
df['cluster_name'] = df['cluster'].map(cluster_names)
df.to_csv('customer_clusters.csv', index=False)
print("\n聚类结果已保存为 customer_clusters.csv")
print("客户聚类分析完成！")`
    },
    {
      id: 5,
      title: '销售数据可视化',
      description: '使用Matplotlib和Seaborn创建各种销售数据可视化图表',
      data: `import pandas as pd
import numpy as np

# 生成模拟销售数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=12, freq='M')
products = ['A', 'B', 'C', 'D', 'E']
regions = ['华东', '华南', '华北', '西南', '西北']

data = []
for date in dates:
    for product in products:
        for region in regions:
            # 生成基础销量
            base_sales = np.random.randint(100, 500)
            # 添加季节性波动
            seasonality = 100 * np.sin(2 * np.pi * date.month / 12) + 50
            # 计算最终销量
            sales = int(base_sales + seasonality)
            sales = max(50, sales)
            # 计算单价
            price = {
                'A': 100,
                'B': 200,
                'C': 150,
                'D': 300,
                'E': 250
            }[product]
            # 计算销售额
            revenue = sales * price
            data.append({
                'date': date,
                'product': product,
                'region': region,
                'sales': sales,
                'revenue': revenue
            })

df = pd.DataFrame(data)
df.to_csv('sales_data.csv', index=False)
print("数据生成完成，保存为 sales_data.csv")`,
      codeTemplate: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])

# 2. 销售趋势图
print("=== 销售趋势图 ===")
# 请在此处添加代码

# 3. 产品销售分布
print("\n=== 产品销售分布 ===")
# 请在此处添加代码

# 4. 地区销售分布
print("\n=== 地区销售分布 ===")
# 请在此处添加代码

# 5. 产品-地区热力图
print("\n=== 产品-地区热力图 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])

# 2. 销售趋势图
print("=== 销售趋势图 ===")
monthly_sales = df.groupby('date').agg({'revenue': 'sum'}).reset_index()

plt.figure(figsize=(12, 6))
sns.lineplot(x='date', y='revenue', data=monthly_sales, marker='o')
plt.title('月度销售额趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('sales_trend.png')
print("销售趋势图已保存为 sales_trend.png")
plt.show()

# 3. 产品销售分布
print("\n=== 产品销售分布 ===")
product_sales = df.groupby('product').agg({'revenue': 'sum'}).reset_index()

plt.figure(figsize=(10, 6))
sns.barplot(x='product', y='revenue', data=product_sales)
plt.title('各产品销售额分布')
plt.xlabel('产品')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('product_sales.png')
print("产品销售分布图已保存为 product_sales.png")
plt.show()

# 4. 地区销售分布
print("\n=== 地区销售分布 ===")
region_sales = df.groupby('region').agg({'revenue': 'sum'}).reset_index()

plt.figure(figsize=(10, 6))
sns.barplot(x='region', y='revenue', data=region_sales)
plt.title('各地区销售额分布')
plt.xlabel('地区')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('region_sales.png')
print("地区销售分布图已保存为 region_sales.png")
plt.show()

# 5. 产品-地区热力图
print("\n=== 产品-地区热力图 ===")
pivot_df = df.pivot_table(values='revenue', index='product', columns='region', aggfunc='sum')

plt.figure(figsize=(12, 8))
sns.heatmap(pivot_df, annot=True, fmt='.0f', cmap='YlGnBu')
plt.title('产品-地区销售热力图')
plt.tight_layout()
plt.savefig('product_region_heatmap.png')
print("产品-地区热力图已保存为 product_region_heatmap.png")
plt.show()

# 6. 饼图：产品销售占比
print("\n=== 产品销售占比 ===")
plt.figure(figsize=(8, 8))
plt.pie(product_sales['revenue'], labels=product_sales['product'], autopct='%1.1f%%')
plt.title('产品销售占比')
plt.tight_layout()
plt.savefig('product_pie.png')
print("产品销售占比饼图已保存为 product_pie.png")
plt.show()

print("\n数据可视化完成！")`
    },
    {
      id: 6,
      title: 'A/B测试效果分析',
      description: '使用统计方法分析A/B测试结果，评估方案效果',
      data: `import pandas as pd
import numpy as np

# 生成模拟A/B测试数据
np.random.seed(42)

# 控制组（A组）
group_a = []
for i in range(1000):
    # 基础转化率10%
    converted = np.random.random() < 0.1
    group_a.append({
        'user_id': i + 1,
        'group': 'A',
        'converted': converted
    })

# 实验组（B组）
group_b = []
for i in range(1000):
    # 基础转化率12%（提升20%）
    converted = np.random.random() < 0.12
    group_b.append({
        'user_id': i + 1001,
        'group': 'B',
        'converted': converted
    })

# 合并数据
df = pd.DataFrame(group_a + group_b)
df.to_csv('ab_test_data.csv', index=False)
print("数据生成完成，保存为 ab_test_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np
from scipy import stats

# 1. 读取数据
df = pd.read_csv('ab_test_data.csv')

# 2. 基本统计
print("=== 基本统计 ===")
# 请在此处添加代码

# 3. 卡方检验
print("\n=== 卡方检验 ===")
# 请在此处添加代码

# 4. 计算置信区间
print("\n=== 转化率置信区间 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np
from scipy import stats
from scipy.stats import chi2_contingency

# 1. 读取数据
df = pd.read_csv('ab_test_data.csv')

# 2. 基本统计
print("=== 基本统计 ===")
# 按组统计
group_stats = df.groupby('group').agg({
    'user_id': 'count',
    'converted': ['sum', 'mean']
}).round(4)

print(group_stats)

# 计算转化率差异
a_conversion = df[df['group'] == 'A']['converted'].mean()
b_conversion = df[df['group'] == 'B']['converted'].mean()
diff = b_conversion - a_conversion
lift = diff / a_conversion

print(f"\nA组转化率: {a_conversion:.4f}")
print(f"B组转化率: {b_conversion:.4f}")
print(f"转化率差异: {diff:.4f}")
print(f"提升比例: {lift:.4f}")

# 3. 卡方检验
print("\n=== 卡方检验 ===")
# 创建列联表
contingency_table = pd.crosstab(df['group'], df['converted'])
print("列联表:")
print(contingency_table)

# 执行卡方检验
chi2, p_value, dof, expected = chi2_contingency(contingency_table)
print(f"\n卡方统计量: {chi2:.4f}")
print(f"p值: {p_value:.4f}")

if p_value < 0.05:
    print("结果：差异显著，拒绝原假设")
else:
    print("结果：差异不显著，无法拒绝原假设")

# 4. 计算置信区间
print("\n=== 转化率置信区间 ===")
def calculate_confidence_interval(successes, trials, confidence=0.95):
    """计算二项分布的置信区间"""
    p = successes / trials
    z = stats.norm.ppf((1 + confidence) / 2)
    margin_error = z * np.sqrt(p * (1 - p) / trials)
    return (p - margin_error, p + margin_error)

# A组置信区间
a_successes = df[df['group'] == 'A']['converted'].sum()
a_trials = len(df[df['group'] == 'A'])
a_ci = calculate_confidence_interval(a_successes, a_trials)

# B组置信区间
b_successes = df[df['group'] == 'B']['converted'].sum()
b_trials = len(df[df['group'] == 'B'])
b_ci = calculate_confidence_interval(b_successes, b_trials)

print(f"A组转化率 95% 置信区间: [{a_ci[0]:.4f}, {a_ci[1]:.4f}]")
print(f"B组转化率 95% 置信区间: [{b_ci[0]:.4f}, {b_ci[1]:.4f}]")

# 5. 结论
print("\n=== 分析结论 ===")
if p_value < 0.05:
    print("1. 统计显著：B组转化率显著高于A组")
    print(f"2. 实际提升：B组转化率比A组提升了{lift:.2%}")
    print("3. 建议：可以考虑在全量用户中推广B方案")
else:
    print("1. 统计不显著：B组转化率与A组无显著差异")
    print("2. 建议：可以考虑增加样本量或调整实验方案")

print("\nA/B测试分析完成！")`
    },
    {
      id: 7,
      title: '时间序列预测分析',
      description: '使用时间序列分析方法预测未来销售趋势',
      data: `import pandas as pd
import numpy as np

# 生成模拟销售数据
np.random.seed(42)
dates = pd.date_range('2020-01-01', periods=36, freq='M')

# 生成基础趋势
base_trend = np.linspace(10000, 20000, len(dates))

# 添加季节性波动
seasonality = 3000 * np.sin(2 * np.pi * np.arange(len(dates)) / 12) + 1500

# 添加随机噪声
noise = np.random.normal(0, 1000, len(dates))

# 计算最终销售额
sales = base_trend + seasonality + noise
sales = np.maximum(5000, sales)  # 确保销售额为正

# 创建数据框
df = pd.DataFrame({
    'date': dates,
    'sales': sales
})
df.to_csv('time_series_data.csv', index=False)
print("数据生成完成，保存为 time_series_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 读取数据
df = pd.read_csv('time_series_data.csv')
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)

# 2. 数据可视化
print("=== 销售趋势可视化 ===")
# 请在此处添加代码

# 3. 移动平均分析
print("\n=== 移动平均分析 ===")
# 请在此处添加代码

# 4. 简单预测
print("\n=== 简单预测 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 读取数据
df = pd.read_csv('time_series_data.csv')
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)

# 2. 数据可视化
print("=== 销售趋势可视化 ===")
plt.figure(figsize=(15, 6))
plt.plot(df.index, df['sales'], label='实际销售额')
plt.title('销售趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(alpha=0.3)
plt.legend()
plt.tight_layout()
plt.savefig('sales_trend.png')
print("销售趋势图已保存为 sales_trend.png")
plt.show()

# 3. 移动平均分析
print("\n=== 移动平均分析 ===")
# 计算3个月移动平均
df['MA3'] = df['sales'].rolling(window=3).mean()
# 计算6个月移动平均
df['MA6'] = df['sales'].rolling(window=6).mean()

plt.figure(figsize=(15, 6))
plt.plot(df.index, df['sales'], label='实际销售额')
plt.plot(df.index, df['MA3'], label='3个月移动平均')
plt.plot(df.index, df['MA6'], label='6个月移动平均')
plt.title('移动平均分析')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(alpha=0.3)
plt.legend()
plt.tight_layout()
plt.savefig('moving_average.png')
print("移动平均分析图已保存为 moving_average.png")
plt.show()

# 4. 简单预测
print("\n=== 简单预测 ===")
# 方法1：使用最后一个值预测
last_value = df['sales'].iloc[-1]
print(f"方法1 - 最后值预测: {last_value:.2f}")

# 方法2：使用移动平均预测
ma3_prediction = df['MA3'].iloc[-1]
print(f"方法2 - 3个月移动平均预测: {ma3_prediction:.2f}")

ma6_prediction = df['MA6'].iloc[-1]
print(f"方法3 - 6个月移动平均预测: {ma6_prediction:.2f}")

# 方法4：线性趋势预测
from sklearn.linear_model import LinearRegression

# 准备数据
X = np.arange(len(df)).reshape(-1, 1)
y = df['sales'].values

# 训练模型
model = LinearRegression()
model.fit(X, y)

# 预测未来3个月
future_steps = 3
future_X = np.arange(len(df), len(df) + future_steps).reshape(-1, 1)
future_pred = model.predict(future_X)

print(f"\n方法4 - 线性趋势预测未来3个月:")
for i, pred in enumerate(future_pred):
    future_date = df.index[-1] + pd.DateOffset(months=i+1)
    print(f"{future_date.strftime('%Y-%m')}: {pred:.2f}")

# 5. 季节性分析
print("\n=== 季节性分析 ===")
# 计算月度平均值
df['month'] = df.index.month
monthly_avg = df.groupby('month')['sales'].mean()

plt.figure(figsize=(12, 6))
monthly_avg.plot(kind='bar')
plt.title('月度平均销售额')
plt.xlabel('月份')
plt.ylabel('平均销售额')
plt.tight_layout()
plt.savefig('seasonality.png')
print("季节性分析图已保存为 seasonality.png")
plt.show()

print("\n时间序列分析完成！")`
    },
    {
      id: 8,
      title: '机器学习特征工程',
      description: '创建和选择特征，为机器学习模型做准备',
      data: `import pandas as pd
import numpy as np

# 生成模拟客户数据
np.random.seed(42)
customers = []

for i in range(1000):
    age = np.random.randint(18, 70)
    gender = np.random.choice(['男', '女'])
    income = np.random.normal(5000, 2000)
    income = max(2000, income)
    
    # 生成购买行为
    purchase_frequency = np.random.poisson(5) + 1
    total_spend = income * (np.random.normal(0.3, 0.1))
    total_spend = max(500, total_spend)
    
    # 生成类别特征
    membership_level = np.random.choice(['普通', '银卡', '金卡', '钻石'])
    preferred_category = np.random.choice(['电子产品', '服装', '食品', '家居'])
    
    # 生成目标变量（是否会再次购买）
    # 基于多种因素的复合逻辑
    churn_prob = 0.5
    if membership_level in ['金卡', '钻石']:
        churn_prob -= 0.2
    if purchase_frequency > 8:
        churn_prob -= 0.15
    if total_spend > 10000:
        churn_prob -= 0.1
    if age < 30:
        churn_prob += 0.1
    
    will_purchase = np.random.random() > churn_prob
    
    customers.append({
        'customer_id': i + 1,
        'age': age,
        'gender': gender,
        'income': income,
        'purchase_frequency': purchase_frequency,
        'total_spend': total_spend,
        'membership_level': membership_level,
        'preferred_category': preferred_category,
        'will_purchase': will_purchase
    })

df = pd.DataFrame(customers)
df.to_csv('customer_features.csv', index=False)
print("数据生成完成，保存为 customer_features.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_selection import SelectKBest, chi2

# 1. 读取数据
df = pd.read_csv('customer_features.csv')

# 2. 分类变量编码
print("=== 分类变量编码 ===")
# 请在此处添加代码

# 3. 特征创建
print("\n=== 特征创建 ===")
# 请在此处添加代码

# 4. 特征选择
print("\n=== 特征选择 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler, OneHotEncoder
from sklearn.feature_selection import SelectKBest, chi2, f_classif
from sklearn.model_selection import train_test_split

# 1. 读取数据
df = pd.read_csv('customer_features.csv')
print("原始数据形状:", df.shape)
print("\n原始数据前5行:")
print(df.head())

# 2. 分类变量编码
print("\n=== 分类变量编码 ===")
# 方法1: Label Encoding（适用于有序分类变量）
le = LabelEncoder()
df['gender_encoded'] = le.fit_transform(df['gender'])
df['membership_encoded'] = le.fit_transform(df['membership_level'])

# 方法2: One-Hot Encoding（适用于无序分类变量）
df = pd.get_dummies(df, columns=['preferred_category'], prefix='category')

print("编码后数据前5行:")
print(df.head())

# 3. 特征创建
print("\n=== 特征创建 ===")
# 创建新特征：平均每次购买金额
df['avg_purchase_amount'] = df['total_spend'] / df['purchase_frequency']

# 创建年龄分组
df['age_group'] = pd.cut(df['age'], bins=[0, 30, 45, 60, 100], labels=['青年', '中年', '中老年', '老年'])
df['age_group_encoded'] = le.fit_transform(df['age_group'])

# 创建收入分组
df['income_group'] = pd.qcut(df['income'], q=4, labels=['低收入', '中低收入', '中高收入', '高收入'])
df['income_group_encoded'] = le.fit_transform(df['income_group'])

# 创建消费能力评分
df['spending_power'] = (df['total_spend'] / df['income'] * 100).round(2)

print("创建新特征后的数据形状:", df.shape)
print("\n新特征示例:")
print(df[['avg_purchase_amount', 'age_group', 'income_group', 'spending_power']].head())

# 4. 特征选择
print("\n=== 特征选择 ===")
# 准备特征和目标变量
X = df.drop(['customer_id', 'gender', 'membership_level', 'age_group', 'income_group', 'will_purchase'], axis=1)
y = df['will_purchase']

# 标准化数值特征
scaler = StandardScaler()
numeric_features = ['age', 'income', 'purchase_frequency', 'total_spend', 'avg_purchase_amount', 'spending_power']
X[numeric_features] = scaler.fit_transform(X[numeric_features])

# 使用SelectKBest选择最佳特征
selector = SelectKBest(score_func=f_classif, k=5)
X_selected = selector.fit_transform(X, y)

# 获取选中的特征
selected_feature_indices = selector.get_support(indices=True)
selected_features = X.columns[selected_feature_indices]

print("选中的特征:", list(selected_features))
print("\n特征得分:")
feature_scores = pd.DataFrame({
    'feature': X.columns,
    'score': selector.scores_
}).sort_values('score', ascending=False)
print(feature_scores)

# 5. 相关性分析
print("\n=== 相关性分析 ===")
corr_matrix = X.corr()
print("特征相关性（前10个）:")
corr_pairs = corr_matrix.unstack().sort_values(ascending=False)
# 过滤掉自相关和重复对
corr_pairs = corr_pairs[corr_pairs < 1.0]
print(corr_pairs.head(10))

# 6. 准备最终特征集
print("\n=== 最终特征集 ===")
final_features = X[selected_features]
print("最终特征形状:", final_features.shape)
print("\n最终特征示例:")
print(final_features.head())

# 保存处理后的数据
final_df = pd.concat([df[['customer_id', 'will_purchase']], final_features], axis=1)
final_df.to_csv('processed_features.csv', index=False)
print("\n处理后的数据已保存为 processed_features.csv")
print("特征工程完成！")`
    },
    {
      id: 9,
      title: '客户RFM价值分层',
      description: '基于RFM模型对客户进行价值分层',
      data: `import pandas as pd
import numpy as np

# 生成模拟客户交易数据
np.random.seed(42)
transactions = []
customer_ids = range(1, 1001)

for customer_id in customer_ids:
    # 生成最近购买日期（90天内）
    days_since_last_purchase = np.random.randint(1, 90)
    last_purchase_date = pd.Timestamp('2023-12-31') - pd.Timedelta(days=days_since_last_purchase)
    
    # 生成购买频率（1-20次）
    frequency = np.random.randint(1, 21)
    
    # 生成总消费金额
    # 基于客户类型生成不同的消费金额
    if np.random.random() < 0.2:  # 20%的高价值客户
        monetary = np.random.normal(10000, 2000)
    elif np.random.random() < 0.5:  # 30%的中等价值客户
        monetary = np.random.normal(5000, 1500)
    else:  # 50%的低价值客户
        monetary = np.random.normal(2000, 800)
    
    monetary = max(500, monetary)
    
    transactions.append({
        'customer_id': customer_id,
        'last_purchase_date': last_purchase_date,
        'frequency': frequency,
        'monetary': monetary
    })

df = pd.DataFrame(transactions)
df.to_csv('rfm_data.csv', index=False)
print("数据生成完成，保存为 rfm_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np

# 1. 读取数据
df = pd.read_csv('rfm_data.csv')
df['last_purchase_date'] = pd.to_datetime(df['last_purchase_date'])

# 2. 计算RFM指标
print("=== 计算RFM指标 ===")
# 请在此处添加代码

# 3. RFM评分
print("\n=== RFM评分 ===")
# 请在此处添加代码

# 4. 客户分层
print("\n=== 客户分层 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np

# 1. 读取数据
df = pd.read_csv('rfm_data.csv')
df['last_purchase_date'] = pd.to_datetime(df['last_purchase_date'])

# 2. 计算RFM指标
print("=== 计算RFM指标 ===")
# 计算Recency（最近购买天数）
today = pd.Timestamp('2023-12-31')
df['recency'] = (today - df['last_purchase_date']).dt.days

# Frequency（购买频率）已经直接给出
# Monetary（总消费金额）已经直接给出

print("RFM指标前5行:")
print(df[['customer_id', 'recency', 'frequency', 'monetary']].head())

# 3. RFM评分
print("\n=== RFM评分 ===")
# 将RFM转换为1-5分制
# Recency: 越小越好，所以需要反向评分
df['r_score'] = pd.qcut(df['recency'], 5, labels=[5, 4, 3, 2, 1])
# Frequency: 越大越好
df['f_score'] = pd.qcut(df['frequency'], 5, labels=[1, 2, 3, 4, 5])
# Monetary: 越大越好
df['m_score'] = pd.qcut(df['monetary'], 5, labels=[1, 2, 3, 4, 5])

# 转换为数值类型
df['r_score'] = df['r_score'].astype(int)
df['f_score'] = df['f_score'].astype(int)
df['m_score'] = df['m_score'].astype(int)

# 计算RFM总分
df['rfm_score'] = df['r_score'] + df['f_score'] + df['m_score']

print("RFM评分前5行:")
print(df[['customer_id', 'r_score', 'f_score', 'm_score', 'rfm_score']].head())

# 4. 客户分层
print("\n=== 客户分层 ===")
# 基于RFM评分的客户分层
def segment_customer(row):
    r = row['r_score']
    f = row['f_score']
    m = row['m_score']
    
    if r >= 4 and f >= 4 and m >= 4:
        return '高价值客户'
    elif r >= 3 and f >= 3 and m >= 3:
        return '中等价值客户'
    elif r >= 3 and f >= 2:
        return '潜力客户'
    elif r <= 2 and f >= 3:
        return '回流客户'
    elif r <= 2 and f <= 2 and m <= 2:
        return '流失客户'
    else:
        return '一般客户'

df['customer_segment'] = df.apply(segment_customer, axis=1)

# 统计各客户群体数量
segment_counts = df['customer_segment'].value_counts()
print("客户群体分布:")
print(segment_counts)

# 分析各客户群体的特征
segment_analysis = df.groupby('customer_segment').agg({
    'recency': 'mean',
    'frequency': 'mean',
    'monetary': 'mean',
    'rfm_score': 'mean',
    'customer_id': 'count'
}).round(2)

print("\n客户群体特征分析:")
print(segment_analysis)

# 5. 针对不同客户群体的策略建议
print("\n=== 客户群体策略建议 ===")
strategies = {
    '高价值客户': '提供VIP服务、专属优惠、个性化推荐，维护客户忠诚度',
    '中等价值客户': '增加互动频率，提供升级机会，鼓励更多消费',
    '潜力客户': '提供首次购买优惠，引导重复购买，培养消费习惯',
    '回流客户': '发送召回邮件，提供限时优惠，重新激活购买',
    '流失客户': '分析流失原因，提供特别优惠，尝试挽回',
    '一般客户': '提供个性化推荐，增加接触点，提升客户价值'
}

for segment, strategy in strategies.items():
    count = segment_counts.get(segment, 0)
    print(f"{segment} ({count}人): {strategy}")

# 6. 保存RFM分析结果
df.to_csv('rfm_analysis.csv', index=False)
print("\nRFM分析结果已保存为 rfm_analysis.csv")
print("客户RFM价值分层分析完成！")`
    },
    {
      id: 10,
      title: '自动化销售报表生成',
      description: '自动生成带图表的销售周报/月报',
      data: `import pandas as pd
import numpy as np

# 生成模拟销售数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
products = ['A', 'B', 'C', 'D', 'E']
regions = ['华东', '华南', '华北', '西南', '西北']

data = []
for date in dates:
    for product in products:
        for region in regions:
            # 生成基础销量
            base_sales = np.random.randint(50, 200)
            # 添加季节性波动
            seasonality = 20 * np.sin(2 * np.pi * date.month / 12) + 10
            # 添加随机波动
            random_noise = np.random.normal(0, 10)
            # 计算最终销量
            sales = int(base_sales + seasonality + random_noise)
            sales = max(0, sales)
            # 计算单价
            price = {
                'A': 100,
                'B': 200,
                'C': 150,
                'D': 300,
                'E': 250
            }[product]
            # 计算销售额
            revenue = sales * price
            data.append({
                'date': date,
                'product': product,
                'region': region,
                'sales': sales,
                'revenue': revenue
            })

df = pd.DataFrame(data)
df.to_csv('sales_data.csv', index=False)
print("数据生成完成，保存为 sales_data.csv")`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])

# 2. 数据汇总
print("=== 数据汇总 ===")
# 请在此处添加代码

# 3. 生成图表
print("\n=== 生成图表 ===")
# 请在此处添加代码

# 4. 生成Excel报表
print("\n=== 生成Excel报表 ===")
# 请在此处添加代码`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 读取数据
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])

# 2. 数据汇总
print("=== 数据汇总 ===")
# 总体汇总
total_summary = {
    '总销售额': df['revenue'].sum(),
    '总销量': df['sales'].sum(),
    '平均客单价': df['revenue'].sum() / df['sales'].sum(),
    '数据天数': len(df['date'].unique()),
    '产品种类': len(df['product'].unique()),
    '地区数量': len(df['region'].unique())
}

print("总体销售情况:")
for key, value in total_summary.items():
    if isinstance(value, float):
        print(f"{key}: {value:.2f}")
    else:
        print(f"{key}: {value}")

# 按产品汇总
product_summary = df.groupby('product').agg({
    'revenue': 'sum',
    'sales': 'sum'
}).reset_index()
product_summary['avg_price'] = product_summary['revenue'] / product_summary['sales']

print("\n产品销售情况:")
print(product_summary.sort_values('revenue', ascending=False))

# 按地区汇总
region_summary = df.groupby('region').agg({
    'revenue': 'sum',
    'sales': 'sum'
}).reset_index()
region_summary['avg_price'] = region_summary['revenue'] / region_summary['sales']

print("\n地区销售情况:")
print(region_summary.sort_values('revenue', ascending=False))

# 按月汇总
df['month'] = df['date'].dt.month
monthly_summary = df.groupby('month').agg({
    'revenue': 'sum',
    'sales': 'sum'
}).reset_index()
monthly_summary['avg_price'] = monthly_summary['revenue'] / monthly_summary['sales']

print("\n月度销售情况:")
print(monthly_summary.sort_values('month'))

# 3. 生成图表
print("\n=== 生成图表 ===")
# 产品销售分布图
plt.figure(figsize=(10, 6))
plt.bar(product_summary['product'], product_summary['revenue'])
plt.title('产品销售额分布')
plt.xlabel('产品')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('product_sales.png')
print("产品销售分布图已保存为 product_sales.png")

# 地区销售分布图
plt.figure(figsize=(10, 6))
plt.bar(region_summary['region'], region_summary['revenue'])
plt.title('地区销售额分布')
plt.xlabel('地区')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('region_sales.png')
print("地区销售分布图已保存为 region_sales.png")

# 月度销售趋势图
plt.figure(figsize=(12, 6))
plt.plot(monthly_summary['month'], monthly_summary['revenue'], marker='o')
plt.title('月度销售额趋势')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('monthly_trend.png')
print("月度销售趋势图已保存为 monthly_trend.png")

# 4. 生成Excel报表
print("\n=== 生成Excel报表 ===")
# 创建Excel写入器
report_date = datetime.now().strftime('%Y-%m-%d')
output_file = f'sales_report_{report_date}.xlsx'

with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
    # 写入总体汇总
    summary_df = pd.DataFrame([total_summary])
    summary_df.to_excel(writer, sheet_name='总体汇总', index=False)
    
    # 写入产品销售情况
    product_summary.to_excel(writer, sheet_name='产品销售', index=False)
    
    # 写入地区销售情况
    region_summary.to_excel(writer, sheet_name='地区销售', index=False)
    
    # 写入月度销售情况
    monthly_summary.to_excel(writer, sheet_name='月度销售', index=False)
    
    # 写入原始数据（前100行）
    df.head(100).to_excel(writer, sheet_name='原始数据', index=False)

print(f"Excel报表已生成: {output_file}")

# 5. 生成HTML报表
print("\n=== 生成HTML报表 ===")
html_content = f'''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>销售分析报表</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }}
        h1, h2 {{
            color: #333;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }}
        th, td {{
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }}
        th {{
            background-color: #f2f2f2;
        }}
        .summary {{ 
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }}
        .chart {{ 
            margin: 20px 0;
            text-align: center;
        }}
        img {{ 
            max-width: 100%;
            height: auto;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>销售分析报表</h1>
        <p>生成日期: {report_date}</p>
        
        <div class="summary">
            <h2>总体销售情况</h2>
            <table>
                <tr>
                    <th>指标</th>
                    <th>数值</th>
                </tr>
                <tr>
                    <td>总销售额</td>
                    <td>{total_summary['总销售额']:.2f}</td>
                </tr>
                <tr>
                    <td>总销量</td>
                    <td>{total_summary['总销量']}</td>
                </tr>
                <tr>
                    <td>平均客单价</td>
                    <td>{total_summary['平均客单价']:.2f}</td>
                </tr>
                <tr>
                    <td>数据天数</td>
                    <td>{total_summary['数据天数']}</td>
                </tr>
                <tr>
                    <td>产品种类</td>
                    <td>{total_summary['产品种类']}</td>
                </tr>
                <tr>
                    <td>地区数量</td>
                    <td>{total_summary['地区数量']}</td>
                </tr>
            </table>
        </div>
        
        <h2>产品销售情况</h2>
        <table>
            <tr>
                <th>产品</th>
                <th>销售额</th>
                <th>销量</th>
                <th>平均单价</th>
            </tr>
            {''.join([f'''
            <tr>
                <td>{row['product']}</td>
                <td>{row['revenue']:.2f}</td>
                <td>{row['sales']}</td>
                <td>{row['avg_price']:.2f}</td>
            </tr>
            ''' for _, row in product_summary.iterrows()])}
        </table>
        
        <h2>地区销售情况</h2>
        <table>
            <tr>
                <th>地区</th>
                <th>销售额</th>
                <th>销量</th>
                <th>平均单价</th>
            </tr>
            {''.join([f'''
            <tr>
                <td>{row['region']}</td>
                <td>{row['revenue']:.2f}</td>
                <td>{row['sales']}</td>
                <td>{row['avg_price']:.2f}</td>
            </tr>
            ''' for _, row in region_summary.iterrows()])}
        </table>
        
        <h2>销售图表</h2>
        <div class="chart">
            <h3>产品销售额分布</h3>
            <img src="product_sales.png" alt="产品销售额分布">
        </div>
        
        <div class="chart">
            <h3>地区销售额分布</h3>
            <img src="region_sales.png" alt="地区销售额分布">
        </div>
        
        <div class="chart">
            <h3>月度销售额趋势</h3>
            <img src="monthly_trend.png" alt="月度销售额趋势">
        </div>
    </div>
</body>
</html>
'''

with open('sales_report.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("HTML报表已生成: sales_report.html")
print("\n自动化销售报表生成完成！")`
    }
  ]

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

  // 实操练习函数
  const openPractice = (id: number) => {
    setCurrentPracticalId(id);
    const project = practicalProjects.find(p => p.id === id);
    if (project) {
      setUserCode(project.codeTemplate);
    }
    setCodeOutput('');
    setShowAnswer(false);
    setShowPractical(true);
  };

  const runCode = () => {
    // 这里只是模拟代码运行，实际项目中可以使用后端API或WebAssembly
    setCodeOutput('代码运行中...\n\n模拟运行结果:\n' + userCode.split('\n').filter(line => !line.startsWith('#')).join('\n'));
  };

  const showAnswerSolution = () => {
    setShowAnswer(true);
  };

  const currentPractical = currentPracticalId ? practicalProjects.find(p => p.id === currentPracticalId) : null;
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
                    <button
                      onClick={() => startPractice(chapter.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      章节练习
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Content Modal - 理论学习 */}
      {activeChapter && !showPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {courseOutline.find(c => c.id === activeChapter)?.title} - 理论学习
              </h3>
              <button
                onClick={() => setActiveChapter(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6" dangerouslySetInnerHTML={{ __html: courseOutline.find(c => c.id === activeChapter)?.content || '' }} />
            <div className="p-6 border-t">
              <button
                onClick={() => {
                  startPractice(activeChapter);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Star className="w-5 h-5" />
                开始章节练习
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Practice Modal - 章节练习 */}
      {showPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {courseOutline.find(c => parseInt(c.id.replace('chapter', '')) === currentChapterId)?.title} - 章节练习
              </h3>
              <button
                onClick={() => setShowPractice(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {!showResult ? (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">
                      第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {currentQuestion?.type}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {currentQuestion?.question}
                    </h4>
                    
                    <div className="space-y-3">
                      {currentQuestion?.options.map((option: string, index: number) => {
                        const isSelected = currentQuestion?.type === '多选题'
                          ? userAnswers[currentQuestion?.id]?.includes(option)
                          : userAnswers[currentQuestion?.id] === option;
                        
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (currentQuestion?.type === '多选题') {
                                // 多选题逻辑
                                const currentAnswers = userAnswers[currentQuestion?.id] || [];
                                if (currentAnswers.includes(option)) {
                                  selectAnswer(currentQuestion?.id, currentAnswers.filter(a => a !== option));
                                } else {
                                  selectAnswer(currentQuestion?.id, [...currentAnswers, option]);
                                }
                              } else {
                                selectAnswer(currentQuestion?.id, option);
                              }
                            }}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                isSelected ? 'bg-blue-500 text-white' : 'border-2 border-gray-300'
                              }`}>
                                {isSelected && (
                                  <CheckCircle className="w-4 h-4" />
                                )}
                              </div>
                              <span className="text-gray-700">{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentQuestionIndex === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      上一题
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {currentQuestionIndex === questions.length - 1 ? '提交答案' : '下一题'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                    score >= 60 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {score >= 60 ? (
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    ) : (
                      <AlertCircle className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">练习完成！</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-2">{score}分</div>
                  <p className="text-gray-600">
                    {score >= 80 ? '优秀！继续保持！' : 
                     score >= 60 ? '及格了，再接再厉！' : '需要加强练习！'}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-gray-800">题目回顾</h4>
                  {questions.map((q, index) => {
                    const userAnswer = userAnswers[q.id];
                    let isCorrect = false;
                    if (q.type === '多选题') {
                      isCorrect = userAnswer && userAnswer.length === q.answer.length && 
                                  userAnswer.every((a: string) => q.answer.includes(a));
                    } else {
                      isCorrect = userAnswer === q.answer;
                    }

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-lg border ${
                          isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <AlertCircle className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-800">第 {index + 1} 题</span>
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                                {q.type}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{q.question}</p>
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="text-gray-500">你的答案：</span>
                                <span className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                  {q.type === '多选题'
                                    ? (userAnswer || []).join('、') || '未作答'
                                    : userAnswer || '未作答'}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="text-sm">
                                  <span className="text-gray-500">正确答案：</span>
                                  <span className="font-medium text-green-600">
                                    {q.type === '多选题' ? q.answer.join('、') : q.answer}
                                  </span>
                                </div>
                              )}
                              {q.explanation && (
                                <div className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">解析：</span>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={restartPractice}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    重新练习
                  </button>
                  <button
                    onClick={() => setShowPractice(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Practical Modal - 实操练习 */}
      {showPractical && currentPractical && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                实操练习 - {currentPractical.title}
              </h3>
              <button
                onClick={() => setShowPractical(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左边：题目要求和实操数据 */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">题目要求</h4>
                    <p className="text-gray-700">{currentPractical.description}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">实操数据</h4>
                    <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                      <pre>{currentPractical.data}</pre>
                    </div>
                  </div>
                </div>

                {/* 中间：Python代码编辑器 */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-4 rounded-lg h-full">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-lg">Python代码</h4>
                      <button
                        onClick={runCode}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        运行
                      </button>
                    </div>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-[400px] p-4 bg-gray-800 text-gray-100 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="请输入Python代码..."
                    />
                  </div>
                </div>

                {/* 右边：运行结果和答案 */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">运行结果</h4>
                    <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm min-h-[200px] overflow-auto">
                      <pre>{codeOutput || '请点击运行按钮查看结果'}</pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-lg">参考答案</h4>
                      <button
                        onClick={showAnswerSolution}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                      >
                        查看答案
                      </button>
                    </div>
                    {showAnswer ? (
                      <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm max-h-[200px] overflow-auto">
                        <pre>{currentPractical.answer}</pre>
                      </div>
                    ) : (
                      <div className="bg-gray-200 p-8 rounded text-center text-gray-500">
                        点击上方按钮查看参考答案
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-2">数据分析技术课程</p>
          <p className="text-sm text-gray-400">© 2024 广东科学技术职业学院</p>
        </div>
      </footer>
    </div>
  );
}
