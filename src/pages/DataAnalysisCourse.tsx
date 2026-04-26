import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, AlertCircle, ChevronRight, RefreshCw, Star, ChevronLeft, Play, Code } from 'lucide-react';

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
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [showPractice, setShowPractice] = useState<boolean>(false);
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isPracticalMode, setIsPracticalMode] = useState<boolean>(false);
  
  // 实操练习状态
  const [showPractical, setShowPractical] = useState<boolean>(false);
  const [currentPracticalId, setCurrentPracticalId] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const allQuestions = generateChapterQuestions();

  // 实操练习数据
  // 实操练习数据
  // 实操练习数据
  // 实操练习数据
  // 实操练习数据
  const practicalProjects = [
    {
      id: 1,
      title: "销售数据读取与清洗",
      description: "数据完整性校验、格式统一、脏数据清理",
      data: `示例数据（sales_raw.csv）：
USER_ID,ORDER_DATE,AMOUNT
1,2023-09-01,100
1,2023-09-15,150
1,,200
2,2023-08-10,80
2,2023-08-25,-5
3,2023-07-01,300
3,2023-07-10,300`,
      codeTemplate: `# 读取数据
df = pd.read_csv('sales_raw.csv')

# 删除空值行
df.dropna(subset=['ORDER_DATE', 'AMOUNT'], inplace=True)

# 金额异常值处理（金额<=0视为脏数据）
df = df[df['AMOUNT'] > 0]

# 日期格式统一
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

# 删除重复订单（同用户同一天同金额视为重复）
df.drop_duplicates(subset=['USER_ID', 'ORDER_DATE', 'AMOUNT'], inplace=True)

print(df)`,
      answer: `import pandas as pd

# 构造数据（替代csv文件）
data = {
    'USER_ID': [1, 1, 1, 2, 2, 3, 3],
    'ORDER_DATE': ['2023-09-01', '2023-09-15', None, '2023-08-10', '2023-08-25', '2023-07-01', '2023-07-10'],
    'AMOUNT': [100, 150, 200, 80, -5, 300, 300]
}
df = pd.DataFrame(data)

# 删除空值行
df.dropna(subset=['ORDER_DATE', 'AMOUNT'], inplace=True)

# 金额异常值处理
df = df[df['AMOUNT'] > 0]

# 日期格式统一
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

# 删除重复订单
df.drop_duplicates(subset=['USER_ID', 'ORDER_DATE', 'AMOUNT'], inplace=True)

print('=== 01 清洗结果 ===')
print(df)`,
    },
    {
      id: 2,
      title: "销售数据分组聚合",
      description: "多维度销售指标统计（销售额、销量、客单价）",
      data: `使用清洗后的销售数据`,
      codeTemplate: `# 按用户聚合
user_stats = df.groupby('USER_ID').agg(
    总销售额=('AMOUNT', 'sum'),
    订单数=('AMOUNT', 'count'),
    客单价=('AMOUNT', 'mean')
).reset_index()

print(user_stats)`,
      answer: `# 沿用01清洗后的数据
user_stats = df.groupby('USER_ID').agg(
    总销售额=('AMOUNT', 'sum'),
    订单数=('AMOUNT', 'count'),
    客单价=('AMOUNT', 'mean')
).reset_index()

print('
=== 02 聚合结果 ===')
print(user_stats)`,
    },
    {
      id: 3,
      title: "购物篮关联规则分析",
      description: "热销搭配挖掘、强关联商品识别",
      data: `交易数据：
TRANSACTION_ID,PRODUCT
101,牛奶
101,面包
101,鸡蛋
102,牛奶
102,面包
103,鸡蛋
103,黄油`,
      codeTemplate: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 创建购物篮矩阵
basket = df.groupby(['TRANSACTION_ID', 'PRODUCT'])['PRODUCT'].count().unstack().fillna(0)
basket = basket.applymap(lambda x: 1 if x > 0 else 0)

# 频繁项集
frequent = apriori(basket, min_support=0.4, use_colnames=True)

# 关联规则
rules = association_rules(frequent, metric='confidence', min_threshold=0.6)
print(rules[['antecedents', 'consequents', 'support', 'confidence']])`,
      answer: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 构造购物篮数据
data = {
    'TRANSACTION_ID': [101,101,101,102,102,103,103],
    'PRODUCT': ['牛奶','面包','鸡蛋','牛奶','面包','鸡蛋','黄油']
}
df = pd.DataFrame(data)

# 构建购物篮矩阵
basket = df.groupby(['TRANSACTION_ID','PRODUCT'])['PRODUCT'].count().unstack().fillna(0)
basket = basket.applymap(lambda x:1 if x>0 else 0)

# 频繁项集
frequent = apriori(basket, min_support=0.4, use_colnames=True)

# 关联规则
rules = association_rules(frequent, metric='confidence', min_threshold=0.6)

print('
=== 03 关联规则 ===')
print(rules[['antecedents','consequents','support','confidence']])`,
    },
    {
      id: 4,
      title: "客户聚类分析",
      description: "客户群体划分、高价值/流失/潜力客户识别",
      data: `客户特征表：
USER_ID,总金额,订单数,最近购买时间（天）
1,250,2,30
2,80,1,60
3,600,2,5`,
      codeTemplate: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

features = df[['总金额', '订单数', '最近购买时间']]
scaler = StandardScaler()
scaled = scaler.fit_transform(features)

kmeans = KMeans(n_clusters=3, random_state=42)
df['聚类'] = kmeans.fit_predict(scaled)

print(df.groupby('聚类').mean())`,
      answer: `import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 构造RFM特征
data = {
    'USER_ID': [1,2,3],
    '总金额': [250,80,600],
    '订单数': [2,1,2],
    '最近购买时间': [30,60,5]
}
df = pd.DataFrame(data)

features = df[['总金额','订单数','最近购买时间']]
scaler = StandardScaler()
scaled = scaler.fit_transform(features)

kmeans = KMeans(n_clusters=3, random_state=42)
df['聚类'] = kmeans.fit_predict(scaled)

print('
=== 04 聚类结果 ===')
print(df)
print('
聚类均值：')
print(df.groupby('聚类').mean())`,
    },
    {
      id: 5,
      title: "销售数据可视化",
      description: "销售趋势、地区分布、品类占比可视化，图表叙事与洞察总结",
      data: `销售数据：
USER_ID,ORDER_DATE,AMOUNT
1,2024-03-01,100
1,2024-03-15,150
2,2024-03-10,200
2,2024-03-20,80
3,2024-03-25,120`,
      codeTemplate: `import pandas as pd
import matplotlib.pyplot as plt

# 数据
data = {
    'USER_ID': [1, 1, 2, 2, 3],
    'ORDER_DATE': ['2024-03-01', '2024-03-15', '2024-03-10', '2024-03-20', '2024-03-25'],
    'AMOUNT': [100, 150, 200, 80, 120]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

# 按日期排序
df = df.sort_values('ORDER_DATE')

# 折线图：销售趋势
plt.figure(figsize=(8, 4))
plt.plot(df['ORDER_DATE'], df['AMOUNT'], marker='o')
plt.title('每日销售趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 饼图：用户销售额占比
user_sales = df.groupby('USER_ID')['AMOUNT'].sum()
plt.figure()
plt.pie(user_sales, labels=user_sales.index, autopct='%1.1f%%')
plt.title('用户销售额占比')
plt.show()

# 柱状图：按用户汇总
user_sales.plot(kind='bar')
plt.title('各用户总销售额')
plt.xlabel('用户ID')
plt.ylabel('总销售额')
plt.show()`,
      answer: `import pandas as pd
import matplotlib.pyplot as plt

data = {
    'USER_ID': [1,1,2,2,3],
    'ORDER_DATE': ['2024-03-01','2024-03-15','2024-03-10','2024-03-20','2024-03-25'],
    'AMOUNT': [100,150,200,80,120]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

# 折线图
plt.figure(figsize=(8,4))
plt.plot(df['ORDER_DATE'], df['AMOUNT'], marker='o')
plt.title('每日销售趋势')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 饼图
user_sales = df.groupby('USER_ID')['AMOUNT'].sum()
plt.figure()
plt.pie(user_sales, labels=user_sales.index, autopct='%1.1f%%')
plt.title('用户销售额占比')
plt.show()

# 柱状图
user_sales.plot(kind='bar')
plt.title('各用户总销售额')
plt.show()

print('
=== 05 可视化已展示 ===')`,
    },
    {
      id: 6,
      title: "A/B测试效果分析",
      description: "实验数据统计、转化率差异显著性检验",
      data: `A/B测试数据：
USER_ID,GROUP,CONVERTED
1,A,1
2,A,0
3,B,1
...,...,...`,
      codeTemplate: `from scipy.stats import chi2_contingency

contingency = pd.crosstab(df['GROUP'], df['CONVERTED'])
chi2, p, dof, expected = chi2_contingency(contingency)

print(f'P值: {p:.4f}')
if p < 0.05:
    print('转化率差异显著')
else:
    print('无显著差异')`,
      answer: `import pandas as pd
from scipy.stats import chi2_contingency

# 构造A/B测试数据
data = {
    'USER_ID': range(1,9),
    'GROUP': ['A','A','A','A','B','B','B','B'],
    'CONVERTED': [1,0,1,0,1,1,0,1]
}
df = pd.DataFrame(data)

contingency = pd.crosstab(df['GROUP'], df['CONVERTED'])
chi2, p, dof, expected = chi2_contingency(contingency)

print('
=== 06 A/B测试结果 ===')
print(f'P值: {p:.4f}')
if p < 0.05:
    print('转化率差异显著')
else:
    print('无显著差异')`,
    },
    {
      id: 7,
      title: "时间序列预测分析",
      description: "销售趋势分析、月度销量预测",
      data: `时间序列数据：
USER_ID,ORDER_DATE,AMOUNT
1,2023-01-15,100
1,2023-02-18,120
1,2023-03-20,140
1,2023-04-12,130
1,2023-05-10,150`,
      codeTemplate: `import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

data = {'USER_ID': [1,1,1,1,1],
        'ORDER_DATE': ['2023-01-15','2023-02-18','2023-03-20','2023-04-12','2023-05-10'],
        'AMOUNT': [100,120,140,130,150]}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

ts = df.set_index('ORDER_DATE')['AMOUNT'].resample('M').sum()
model = ARIMA(ts, order=(1,1,1))
fit = model.fit()
print(fit.forecast(steps=2))`,
      answer: `import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

data = {
    'USER_ID': [1,1,1,1,1],
    'ORDER_DATE': ['2023-01-15','2023-02-18','2023-03-20','2023-04-12','2023-05-10'],
    'AMOUNT': [100,120,140,130,150]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

ts = df.set_index('ORDER_DATE')['AMOUNT'].resample('M').sum()
model = ARIMA(ts, order=(1,1,1))
fit = model.fit()

print('
=== 07 时间序列预测 ===')
print('未来2个月预测值：')
print(fit.forecast(steps=2))`,
    },
    {
      id: 8,
      title: "机器学习特征工程",
      description: "衍生特征创建、分类变量编码",
      data: `特征工程数据：
USER_ID,ORDER_DATE,AMOUNT
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
2,2023-08-25,120`,
      codeTemplate: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

data = {'USER_ID': [1,1,2,2],
        'ORDER_DATE': ['2023-09-01','2023-09-15','2023-08-10','2023-08-25'],
        'AMOUNT': [100,150,80,120]}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

df['月份'] = df['ORDER_DATE'].dt.month
df['星期几'] = df['ORDER_DATE'].dt.dayofweek
le = LabelEncoder()
df['用户编码'] = le.fit_transform(df['USER_ID'])
print(df[['月份','星期几','用户编码','AMOUNT']])`,
      answer: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

data = {
    'USER_ID': [1,1,2,2],
    'ORDER_DATE': ['2023-09-01','2023-09-15','2023-08-10','2023-08-25'],
    'AMOUNT': [100,150,80,120]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

df['月份'] = df['ORDER_DATE'].dt.month
df['星期几'] = df['ORDER_DATE'].dt.dayofweek
le = LabelEncoder()
df['用户编码'] = le.fit_transform(df['USER_ID'])

print('
=== 08 特征工程结果 ===')
print(df[['月份','星期几','用户编码','AMOUNT']])`,
    },
    {
      id: 9,
      title: "客户RFM价值分层",
      description: "客户价值分层、高价值/流失客户识别",
      data: `RFM数据：
USER_ID,ORDER_DATE,AMOUNT
1,2024-02-01,300
1,2024-03-15,200
2,2023-12-10,80
3,2024-03-20,500`,
      codeTemplate: `import pandas as pd
from datetime import datetime

data = {'USER_ID': [1,1,2,3],
        'ORDER_DATE': ['2024-02-01','2024-03-15','2023-12-10','2024-03-20'],
        'AMOUNT': [300,200,80,500]}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

current_date = datetime(2024, 4, 1)
rfm = df.groupby('USER_ID').agg({
    'ORDER_DATE': lambda x: (current_date - x.max()).days,
    'USER_ID': 'count',
    'AMOUNT': 'sum'
}).rename(columns={'ORDER_DATE':'R','USER_ID':'F','AMOUNT':'M'})

rfm['R_score'] = pd.qcut(rfm['R'], 4, labels=[4,3,2,1])
rfm['F_score'] = pd.qcut(rfm['F'], 4, labels=[1,2,3,4])
rfm['M_score'] = pd.qcut(rfm['M'], 4, labels=[1,2,3,4])
rfm['总分'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)
print(rfm)`,
      answer: `import pandas as pd
from datetime import datetime

data = {
    'USER_ID': [1,1,2,3],
    'ORDER_DATE': ['2024-02-01','2024-03-15','2023-12-10','2024-03-20'],
    'AMOUNT': [300,200,80,500]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

current_date = datetime(2024,4,1)
rfm = df.groupby('USER_ID').agg({
    'ORDER_DATE': lambda x:(current_date - x.max()).days,
    'USER_ID': 'count',
    'AMOUNT': 'sum'
}).rename(columns={'ORDER_DATE':'R','USER_ID':'F','AMOUNT':'M'})

# 四分位数评分
rfm['R_score'] = pd.qcut(rfm['R'], 4, labels=[4,3,2,1], duplicates='drop')
rfm['F_score'] = pd.qcut(rfm['F'], 4, labels=[1,2,3,4], duplicates='drop')
rfm['M_score'] = pd.qcut(rfm['M'], 4, labels=[1,2,3,4], duplicates='drop')

rfm['总分'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)

print('
=== 09 RFM分层结果 ===')
print(rfm)`,
    },
    {
      id: 10,
      title: "自动化销售报表生成",
      description: "自动生成带图表的周报/月报，实现数据统计与报表自动化",
      data: `销售数据：
USER_ID,ORDER_DATE,AMOUNT
1,2024-03-01,100
1,2024-03-15,150
2,2024-03-10,200
2,2024-03-20,120
3,2024-03-25,80`,
      codeTemplate: `import pandas as pd
import matplotlib.pyplot as plt

# 数据
data = {
    'USER_ID': [1, 1, 2, 2, 3],
    'ORDER_DATE': ['2024-03-01', '2024-03-15', '2024-03-10', '2024-03-20', '2024-03-25'],
    'AMOUNT': [100, 150, 200, 120, 80]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

# 生成Excel报表
with pd.ExcelWriter('销售月报.xlsx', engine='openpyxl') as writer:
    # 数据透视表
    pivot = pd.pivot_table(df, values='AMOUNT', index='USER_ID',
                           columns=pd.Grouper(key='ORDER_DATE', freq='M'),
                           aggfunc='sum', fill_value=0)
    pivot.to_excel(writer, sheet_name='月度销售汇总')

    # 统计摘要
    summary = df.groupby('USER_ID').agg(
        总金额=('AMOUNT', 'sum'),
        订单数=('AMOUNT', 'count')
    ).reset_index()
    summary.to_excel(writer, sheet_name='客户统计', index=False)

    # 生成图表并保存
    fig, ax = plt.subplots()
    df.groupby(df['ORDER_DATE'].dt.day)['AMOUNT'].sum().plot(kind='line', marker='o', ax=ax)
    ax.set_title('3月每日销售额趋势')
    fig.savefig('chart.png')
    plt.close()

print('报表已生成：销售月报.xlsx 和 chart.png')`,
      answer: `import pandas as pd
import matplotlib.pyplot as plt

data = {
    'USER_ID': [1,1,2,2,3],
    'ORDER_DATE': ['2024-03-01','2024-03-15','2024-03-10','2024-03-20','2024-03-25'],
    'AMOUNT': [100,150,200,120,80]
}
df = pd.DataFrame(data)
df['ORDER_DATE'] = pd.to_datetime(df['ORDER_DATE'])

# 生成Excel
with pd.ExcelWriter('销售月报.xlsx', engine='openpyxl') as writer:
    pivot = pd.pivot_table(df, values='AMOUNT', index='USER_ID',
                           columns=pd.Grouper(key='ORDER_DATE', freq='M'),
                           aggfunc='sum', fill_value=0)
    pivot.to_excel(writer, sheet_name='月度销售汇总')

    summary = df.groupby('USER_ID').agg(
        总金额=('AMOUNT','sum'),
        订单数=('AMOUNT','count')
    ).reset_index()
    summary.to_excel(writer, sheet_name='客户统计', index=False)

# 保存图表
fig, ax = plt.subplots()
df.groupby(df['ORDER_DATE'].dt.day)['AMOUNT'].sum().plot(kind='line', marker='o', ax=ax)
ax.set_title('3月每日销售额趋势')
fig.savefig('chart.png')
plt.close()

print('
=== 10 自动化报表已生成 ===')
print('文件：销售月报.xlsx、chart.png')`,
    },
  ];

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
      // 初始为空，让训练者手动输入代码
      setUserCode('');
    }
    setCodeOutput('');
    setShowAnswer(false);
    setShowPractical(true);
  };

  const runCode = () => {
    // 这里使用答案.docx中的运行结果
    const runResults: { [key: number]: string } = {
      1: `=== 01 清洗结果 ===\n   USER_ID ORDER_DATE  AMOUNT\n0        1 2023-09-01     100\n1        1 2023-09-15     150\n3        2 2023-08-10      80\n5        3 2023-07-01     300\n6        3 2023-07-10     300`,
      2: `=== 02 聚合结果 ===\n   USER_ID  总销售额  订单数   客单价\n0        1      250      2  125.0\n1        2       80      1   80.0\n2        3      600      2  300.0`,
      3: `=== 03 关联规则 ===\n  antecedents consequents   support  confidence\n0      (面包)       (牛奶)  0.666667    1.000000\n1      (牛奶)       (面包)  0.666667    1.000000\n2      (鸡蛋)       (牛奶)  0.333333    0.500000（被阈值过滤）`,
      4: `=== 04 聚类结果 ===\n   USER_ID  总金额  订单数  最近购买时间  聚类\n0        1    250      2        30     1\n1        2     80      1        60     2\n2        3    600      2         5     0\n\n聚类均值：\n       USER_ID   总金额  订单数  最近购买时间\n聚类\n0         3.0  600.0    2.0        5.0\n1         1.0  250.0    2.0       30.0\n2         2.0   80.0    1.0       60.0`,
      5: `=== 05 可视化已展示 ===\n弹出3 张图表：\n销售趋势折线图\n用户销售额占比饼图\n用户销售额柱状图`,
      6: `=== 06 A/B测试结果 ===\nP值: 0.5243\n无显著差异`,
      7: `=== 07 时间序列预测 ===\n未来2个月预测值：\n2023-06-30    148.678026\n2023-07-31    149.567892\nFreq: M, Name: predicted_mean, dtype: float64`,
      8: `=== 08 特征工程结果 ===\n   月份  星期几  用户编码  AMOUNT\n0     9      4       0     100\n1     9      4       0     150\n2     8      3       1      80\n3     8      4       1     120`,
      9: `=== 09 RFM分层结果 ===\n          R  F    M R_score F_score M_score  总分\nUSER_ID\n1        17  2  500       4       3       4   11\n2       112  1   80       1       2       1    4\n3        12  1  500       4       2       4   10`,
      10: `=== 10 自动化报表已生成 ===\n文件：销售月报.xlsx、chart.png`
    };
    
    setCodeOutput('代码运行中...\n\n' + runResults[currentPracticalId || 1]);
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
                        setIsPracticalMode(false);
                        setShowPractice(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      理论学习
                    </button>
                    {chapter.id === 'chapter7' && (
                      <button
                        onClick={() => {
                          setActiveChapter(chapter.id);
                          setIsPracticalMode(true);
                          setShowPractice(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Code className="w-4 h-4" />
                        实操训练
                      </button>
                    )}
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
                {courseOutline.find(c => c.id === activeChapter)?.title} - {isPracticalMode ? '实操训练' : '理论学习'}
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
            {isPracticalMode && activeChapter === 'chapter7' ? (
              <>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">实操目录</h3>
                  <p className="text-gray-600 mb-6">点击下方项目进入实操练习：</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {practicalProjects.map((project) => (
                      <div 
                        key={project.id}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => openPractice(project.id)}
                      >
                        <h4 className="font-bold text-blue-600">{`${project.id}. ${project.title}`}</h4>
                        <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t">
                  <button
                    onClick={() => {
                      // 默认打开第一个实操项目
                      openPractice(1);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Code className="w-5 h-5" />
                    开始实操训练
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-6" dangerouslySetInnerHTML={{ __html: courseOutline.find(c => c.id === activeChapter)?.content || '' }} />
                <div className="p-6 border-t">
                  <button
                    onClick={() => {
                      // 默认打开第一个实操项目
                      openPractice(1);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Code className="w-5 h-5" />
                    开始实操训练
                  </button>
                </div>
              </>
            )}
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
                    <div className="overflow-x-auto">
                      {(() => {
                        const data = currentPractical.data;
                        const lines = data.split('\n').filter(line => line.trim());
                        if (lines.length < 2) {
                          return (
                            <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                              <pre>{data}</pre>
                            </div>
                          );
                        }
                        const headers = lines[0].split(',');
                        const rows = lines.slice(1);
                        return (
                          <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                              <tr>
                                {headers.map((header, index) => (
                                  <th key={index} className="px-4 py-2 border border-gray-300 text-left">
                                    {header.trim()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, rowIndex) => {
                                const cells = row.split(',');
                                return (
                                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    {cells.map((cell, cellIndex) => (
                                      <td key={cellIndex} className="px-4 py-2 border border-gray-300">
                                        {cell.trim()}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* 中间：Python代码编辑器 */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-4 rounded-lg h-full">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-lg">代码编辑器</h4>
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
