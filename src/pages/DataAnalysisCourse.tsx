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
  const practicalProjects = [
    {
      id: 1,
      title: "销售数据读取与清洗",
      description: "使用Pandas读取销售数据并进行清洗，处理缺失值和异常值",
      data: `电商销售原始数据（sales_raw.csv），包含字段：订单ID、商品ID、商品类别、地区、购买日期、销量、销售额、客户ID，共10000行，存在15%缺失值、5%异常值，日期格式不统一（部分为“YYYY年MM月DD日”）。`,
      codeTemplate: `1. 读取数据并查看基本信息（形状、数据类型、缺失值占比）；2. 处理缺失值（数值型用均值填充，字符串型用“未知”填充）；3. 处理异常值（销量/销售额为负、超出3倍标准差的值删除）；4. 统一日期格式为“YYYY-MM-DD”，删除重复行；5. 保存清洗后的数据。`,
      answer: `import pandas as pd
import numpy as np

# 1. 读取数据并查看基本信息
df = pd.read_csv("sales_raw.csv")
print("原始数据形状：", df.shape)
print("缺失值情况：\\n", df.isnull().sum())

# 2. 处理缺失值
df["销售额"].fillna(df["销售额"].mean(), inplace=True)
df["购买日期"].fillna(df["购买日期"].mode()[0], inplace=True)
df["地区"].fillna("未知", inplace=True)

# 3. 处理异常值
std_sales = df["销售额"].std()
mean_sales = df["销售额"].mean()
df = df[(df["销量"] > 0) & (df["销售额"] < mean_sales + 3*std_sales)]

# 4. 统一日期格式、删除重复行
df["购买日期"] = pd.to_datetime(df["购买日期"], format="%Y年%m月%d日", errors="coerce")
df["购买日期"] = df["购买日期"].dt.strftime("%Y-%m-%d")
df = df.drop_duplicates()

# 5. 输出并保存
print("清洗后数据形状：", df.shape)
print("清洗后数据前5行：\\n", df.head())
df.to_csv("sales_cleaned.csv", index=False)`,
    },
    {
      id: 2,
      title: "销售数据分组聚合",
      description: "使用groupby和agg函数进行多维度销售指标统计",
      data: `使用项目01清洗后的sales_cleaned.csv数据，字段完整，格式统一，共9840行有效数据。`,
      codeTemplate: `1. 读取清洗后的销售数据；2. 按商品类别分组，计算每组的总销量、总销售额、平均客单价；3. 按地区分组，计算每组的订单数、总销售额、平均销量；4. 按月份分组，计算每月的总销量、总销售额；5. 将聚合结果整理为DataFrame，保存为聚合报表。`,
      answer: `import pandas as pd

# 1. 读取清洗后的数据
df = pd.read_csv("sales_cleaned.csv")
df["购买日期"] = pd.to_datetime(df["购买日期"])
df["月份"] = df["购买日期"].dt.month

# 2. 按商品类别聚合
category_agg = df.groupby("商品类别").agg({
    "销量": "sum",
    "销售额": "sum",
    "订单ID": "count"
}).rename(columns={"订单ID": "订单数"})
category_agg["客单价"] = category_agg["销售额"] / category_agg["销量"]

# 3. 按地区聚合
area_agg = df.groupby("地区").agg({
    "订单ID": "count",
    "销售额": "sum",
 "销量": "mean"
}).rename(columns={"订单ID": "订单数", "销量": "平均销量"})

# 4. 按月份聚合
month_agg = df.groupby("月份").agg({
    "销量": "sum",
    "销售额": "sum"
})

# 5. 保存聚合结果
with pd.ExcelWriter("sales_aggregation.xlsx") as writer:
    category_agg.to_excel(writer, sheet_name="商品类别聚合")
    area_agg.to_excel(writer, sheet_name="地区聚合")
    month_agg.to_excel(writer, sheet_name="月度聚合")
print("聚合报表生成完成")`,
    },
    {
      id: 3,
      title: "购物篮关联规则分析",
      description: "使用Apriori算法挖掘商品间的关联规则",
      data: `使用sales_cleaned.csv数据，筛选出包含“订单ID”和“商品名称”的字段，共9840行，涉及80个商品、7200个唯一订单（部分订单包含多个商品）。`,
      codeTemplate: `1. 读取清洗后的销售数据，按订单ID分组，获取每个订单的商品组合；2. 转换数据为one-hot编码格式（商品为列，订单为行，购买记1，未购买记0）；3. 使用Apriori算法挖掘频繁项集（最小支持度0.05）；4. 计算关联规则，筛选置信度≥0.5的强关联规则；5. 可视化关联规则（展示前10条强关联规则）。`,
      answer: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
import matplotlib.pyplot as plt

# 1. 读取数据并处理商品组合
df = pd.read_csv("sales_cleaned.csv")[["订单ID", "商品名称"]]
basket = df.groupby(["订单ID", "商品名称"])["商品名称"].count().unstack().fillna(0)
basket = basket.applymap(lambda x: 1 if x > 0 else 0)

# 2. 挖掘频繁项集
frequent_itemsets = apriori(basket, min_support=0.05, use_colnames=True)

# 3. 计算关联规则
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)
rules = rules.sort_values("confidence", ascending=False).head(10)

# 4. 可视化关联规则
plt.figure(figsize=(12, 6))
plt.bar(range(len(rules)), rules["confidence"], tick_label=[f"{list(x)[0]}→{list(y)[0]}" for x,y in zip(rules["antecedents"], rules["consequents"])])
plt.xticks(rotation=45, ha="right")
plt.xlabel("关联规则")
plt.ylabel("置信度")
plt.title("置信度Top10关联规则")
plt.tight_layout()
plt.savefig("association_rules.png")

# 5. 输出结果
print("频繁项集：\\n", frequent_itemsets.head())
print("强关联规则：\\n", rules[["antecedents", "consequents", "support", "confidence"]])`,
    },
    {
      id: 4,
      title: "客户聚类分析",
      description: "使用KMeans算法对客户进行聚类，识别客户群体",
      data: `使用sales_cleaned.csv数据，按客户ID聚合，得到1500个唯一客户的特征数据，包含字段：客户ID、总消费金额、消费频次、平均客单价。`,
      codeTemplate: `1. 读取清洗后的销售数据，按客户ID分组，计算客户的核心特征（消费金额、消费频次、平均客单价）；2. 对特征进行标准化处理（消除量纲影响）；3. 使用K-Means算法聚类（k值通过轮廓系数确定，范围2-5）；4. 分析每个簇的特征，定义客户标签（高价值、潜力、普通、流失）；5. 可视化聚类结果（散点图），输出客户聚类报告。`,
      answer: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt

# 1. 计算客户核心特征
df = pd.read_csv("sales_cleaned.csv")
customer_features = df.groupby("客户ID").agg({
    "销售额": "sum",
    "订单ID": "count",
    "销量": "mean"
}).rename(columns={"订单ID": "消费频次", "销量": "平均客单价"})

# 2. 特征标准化
scaler = StandardScaler()
features_scaled = scaler.fit_transform(customer_features)

# 3. 确定k值并聚类
sil_scores = []
for k in range(2,6):
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(features_scaled)
    sil_scores.append(silhouette_score(features_scaled, labels))
k_optimal = sil_scores.index(max(sil_scores)) + 2
kmeans = KMeans(n_clusters=k_optimal, random_state=42)
customer_features["簇标签"] = kmeans.fit_predict(features_scaled)

# 4. 定义客户标签并可视化
cluster_labels = {0:"高价值", 1:"潜力", 2:"普通", 3:"流失"}
customer_features["客户标签"] = customer_features["簇标签"].map(cluster_labels)
plt.scatter(customer_features["销售额"], customer_features["消费频次"], c=customer_features["簇标签"], cmap="viridis")
plt.xlabel("总消费金额")
plt.ylabel("消费频次")
plt.title("客户聚类结果")
plt.savefig("customer_clustering.png")

# 5. 输出并保存
print(f"最优k值：{k_optimal}，轮廓系数：{max(sil_scores):.2f}")
print("簇中心特征：\\n", scaler.inverse_transform(kmeans.cluster_centers_))
customer_features.to_csv("customer_clustering.csv")`,
    },
    {
      id: 5,
      title: "销售数据可视化",
      description: "使用Matplotlib和Seaborn创建销售数据可视化图表",
      data: `使用sales_cleaned.csv和项目02的聚合数据，包含月度销售额、地区销售额、品类销量等统计数据。`,
      codeTemplate: `1. 读取清洗后的数据及分组聚合数据；2. 绘制月度销售趋势图（折线图，x轴月份，y轴总销售额）；3. 绘制地区销售额分布（柱状图，x轴地区，y轴总销售额）；4. 绘制商品品类销量占比（饼图，标注占比）；5. 绘制销量与销售额的相关性散点图；6. 整合所有图表，添加标题、坐标轴标签，保存为可视化报告（图片格式）。`,
      answer: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. 读取数据
df = pd.read_csv("sales_cleaned.csv")
df["购买日期"] = pd.to_datetime(df["购买日期"])
df["月份"] = df["购买日期"].dt.month
month_agg = df.groupby("月份")["销售额"].sum()
area_agg = df.groupby("地区")["销售额"].sum()
category_agg = df.groupby("商品类别")["销量"].sum()

# 2. 绘制综合图表
plt.figure(figsize=(16, 12))

# 月度趋势图
plt.subplot(2,2,1)
month_agg.plot(kind="line", marker="o")
plt.title("月度销售额趋势")
plt.xlabel("月份")
plt.ylabel("总销售额")

# 地区柱状图
plt.subplot(2,2,2)
area_agg.plot(kind="bar")
plt.title("各地区销售额分布")
plt.xlabel("地区")
plt.ylabel("总销售额")
plt.xticks(rotation=45)

# 品类饼图
plt.subplot(2,2,3)
plt.pie(category_agg, labels=category_agg.index, autopct="%1.1f%%")
plt.title("商品品类销量占比")

# 相关性散点图
plt.subplot(2,2,4)
sns.scatterplot(x="销量", y="销售额", data=df)
plt.title("销量与销售额相关性")

plt.tight_layout()
plt.savefig("sales_visualization.png")
print("可视化图表生成完成")
print(f"销量与销售额相关系数：{df[['销量', '销售额']].corr().iloc[0,1]:.2f}")`,
    },
    {
      id: 6,
      title: "A/B 测试效果分析",
      description: "使用统计方法分析A/B测试的效果",
      data: `A/B测试数据（ab_test.csv），包含字段：用户ID、分组（对照组/实验组）、是否曝光、是否下单，共8000条数据，对照组4000条，实验组4000条。`,
      codeTemplate: `1. 读取A/B测试数据，区分对照组（原有运营方案）和实验组（新运营方案）；2. 计算两组的转化率（下单人数/曝光人数）；3. 进行显著性检验（样本量>30用T检验，分类数据用卡方检验）；4. 解读P值（P<0.05则两组差异显著，新方案有效）；5. 计算置信区间，评估方案提升效果，输出测试报告。`,
      answer: `import pandas as pd
from scipy.stats import ttest_ind, norm

# 1. 读取A/B测试数据
df = pd.read_csv("ab_test.csv")

# 2. 计算两组转化率
group_stats = df.groupby("分组").agg({
    "是否曝光": "count",
    "是否下单": "sum"
})
group_stats["转化率"] = group_stats["是否下单"] / group_stats["是否曝光"]
control_conv = group_stats.loc["对照组", "转化率"]
test_conv = group_stats.loc["实验组", "转化率"]

# 3. 显著性检验（T检验）
control_data = df[df["分组"]=="对照组"]["是否下单"]
test_data = df[df["分组"]=="实验组"]["是否下单"]
t_stat, p_value = ttest_ind(test_data, control_conv, equal_var=False)

# 4. 计算置信区间（95%）
lift = test_conv - control_conv
se = ((test_conv*(1-test_conv)/len(test_data)) + (control_conv*(1-control_conv)/len(control_data)))**0.5
ci_low = lift - 1.96*se
ci_high = lift + 1.96*se

# 5. 输出并保存报告
report = pd.DataFrame({
    "分组": ["对照组", "实验组"],
    "样本量": group_stats["是否曝光"],
    "下单人数": group_stats["是否下单"],
    "转化率": group_stats["转化率"]
})
report["P值"] = [p_value, p_value]
report["转化率提升区间"] = [f"{ci_low:.3f}-{ci_high:.3f}", f"{ci_low:.3f}-{ci_high:.3f}"]
print("A/B测试报告：\\n", report)
print(f"结论：{'新方案有效' if p_value<0.05 else '新方案无效'}，转化率提升{lift:.3f}")
report.to_csv("ab_test_report.csv", index=False)`,
    },
    {
      id: 7,
      title: "时间序列预测分析",
      description: "使用ARIMA模型进行销售预测",
      data: `使用sales_cleaned.csv数据，按“购买日期”聚合，得到365天的每日销量数据，形成时间序列（索引为日期，值为每日销量）。`,
      codeTemplate: `1. 读取清洗后的销售数据，按日期分组，计算每日销量，转换为时间序列数据；2. 分析时间序列的趋势（长期趋势、季节性），绘制时序图、滚动平均图；3. 拆分训练集（80%）和测试集（20%）；4. 使用ARIMA模型（调参p=2, d=1, q=1）或Prophet模型进行预测；5. 计算预测误差（MAE、RMSE），可视化预测结果（实际值vs预测值），预测未来3个月销量。`,
      answer: `import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

# 1. 构建时间序列
df = pd.read_csv("sales_cleaned.csv")
df["购买日期"] = pd.to_datetime(df["购买日期"])
ts = df.groupby("购买日期")["销量"].sum().asfreq("D").fillna(0)

# 2. 时序分析与可视化
plt.figure(figsize=(12, 6))
plt.plot(ts, label="每日销量")
plt.plot(ts.rolling(window=7).mean(), label="7日滚动平均")
plt.title("销量时间序列趋势")
plt.xlabel("日期")
plt.ylabel("销量")
plt.legend()
plt.savefig("time_series_trend.png")

# 3. 拆分训练集与测试集
train_size = int(len(ts)*0.8)
train, test = ts[:train_size], ts[train_size:]

# 4. ARIMA模型预测
model = ARIMA(train, order=(2,1,1))
model_fit = model.fit()
predictions = model_fit.predict(start=len(train), end=len(ts)-1, typ="levels")

# 5. 模型评估与未来预测
mae = mean_absolute_error(test, predictions)
rmse = np.sqrt(mean_squared_error(test, predictions))
future_predict = model_fit.get_forecast(steps=90) # 未来3个月
future_销量 = future_predict.predicted_mean.resample("M").sum()

# 输出与保存
forecast_df = pd.DataFrame({"实际值": test, "预测值": predictions})
forecast_df["误差"] = forecast_df["实际值"] - forecast_df["预测值"]
print(f"MAE: {mae:.0f}, RMSE: {rmse:.0f}")
print("未来3个月销量预测：\\n", future_销量)
forecast_df.to_csv("sales_forecast.csv")`,
    },
    {
      id: 8,
      title: "机器学习特征工程",
      description: "进行特征工程，为机器学习模型做准备",
      data: `使用sales_cleaned.csv和项目04的客户聚类数据，包含原始特征（销量、销售额、地区等）和客户特征（消费频次、平均客单价等），共9840行数据。`,
      codeTemplate: `1. 读取清洗后的销售数据及客户特征数据；2. 创建衍生特征（消费时长、购买频率、客单价等级）；3. 对分类变量编码（地区、商品类别用独热编码，客户标签用标签编码）；4. 对数值特征分箱（销售额用qcut分为5个等级）；5. 计算特征相关性，筛选与销售额相关系数≥0.3的特征；6. 输出处理后的特征数据集，用于后续建模。`,
      answer: `import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_selection import SelectKBest, f_regression

# 1. 读取数据
df = pd.read_csv("sales_cleaned.csv")
customer_df = pd.read_csv("customer_clustering.csv", index_col="客户ID")
df = df.merge(customer_df[["消费频次", "平均客单价", "客户标签"]], on="客户ID")

# 2. 创建衍生特征
df["购买日期"] = pd.to_datetime(df["购买日期"])
first_purchase = df.groupby("客户ID")["购买日期"].min()
df["消费时长"] = (df["购买日期"] - df["客户ID"].map(first_purchase)).dt.days
df["购买频率"] = df["消费频次"] / (df["消费时长"] + 1) # 避免除以0
df["客单价等级"] = pd.qcut(df["平均客单价"], 3, labels=["低", "中", "高"])

# 3. 分类变量编码
df = pd.get_dummies(df, columns=["地区", "商品类别", "客单价等级"], drop_first=True)
le = LabelEncoder()
df["客户标签编码"] = le.fit_transform(df["客户标签"])

# 4. 数值特征分箱
df["销售额等级"] = pd.qcut(df["销售额"], 5, labels=[1,2,3,4,5])

# 5. 特征筛选
X = df.drop(["销售额", "订单ID", "商品ID", "购买日期", "客户标签"], axis=1)
y = df["销售额"]
selector = SelectKBest(score_func=f_regression, k=6)
X_selected = selector.fit_transform(X, y)
selected_cols = X.columns[selector.get_support()]
feature_df = df[selected_cols.tolist() + ["销售额"]]

# 输出与保存
print("筛选后特征：", selected_cols.tolist())
print("处理后数据集形状：", feature_df.shape)
feature_df.to_csv("feature_engineered_data.csv", index=False)`,
    },
    {
      id: 9,
      title: "客户 RFM 价值分层",
      description: "使用RFM模型进行客户价值分层",
      data: `使用sales_cleaned.csv数据，按客户ID聚合，得到1500个唯一客户的RFM指标数据，包含字段：客户ID、最近消费天数（R）、消费频次（F）、消费总金额（M）。`,
      codeTemplate: `1. 读取清洗后的销售数据，按客户ID计算RFM指标（R：最近一次消费距离当前的天数，F：消费频次，M：消费总金额）；2. 对R、F、M分别进行评分（1-5分，R越小分越高，F、M越大分越高）；3. 计算RFM总得分，按得分分4层（高价值、高潜力、普通、低价值）；4. 定义各分层客户的运营策略；5. 输出客户RFM分层结果，保存为分层报告。`,
      answer: `import pandas as pd

# 1. 读取数据并计算RFM指标
df = pd.read_csv("sales_cleaned.csv")
df["购买日期"] = pd.to_datetime(df["购买日期"])
current_date = df["购买日期"].max()

rfm = df.groupby("客户ID").agg({
    "购买日期": lambda x: (current_date - x.max()).dt.days, # R
    "订单ID": "count", # F
    "销售额": "sum" # M
}).rename(columns={"购买日期": "R", "订单ID": "F", "销售额": "M"})

# 2. RFM评分（1-5分，R反向评分）
rfm["R_score"] = pd.qcut(rfm["R"], 5, labels=[5,4,3,2,1])
rfm["F_score"] = pd.qcut(rfm["F"], 5, labels=[1,2,3,4,5])
rfm["M_score"] = pd.qcut(rfm["M"], 5, labels=[1,2,3,4,5])

# 3. 总得分与分层
rfm["RFM总分"] = rfm["R_score"].astype(int) + rfm["F_score"].astype(int) + rfm["M_score"].astype(int)
def get_segment(score):
    if score >=12: return "高价值"
    elif score >=10: return "高潜力"
    elif score >=7: return "普通"
    else: return "低价值"
rfm["客户分层"] = rfm["RFM总分"].apply(get_segment)

# 4. 运营策略
strategy = {"高价值": "推送专属权益+优先服务",
            "高潜力": "推送满减券+新品推荐",
            "普通": "常规活动推送",
            "低价值": "推送唤醒优惠券+低频关怀"}
rfm["运营策略"] = rfm["客户分层"].map(strategy)

# 输出与保存
print("各分层客户数量：\\n", rfm["客户分层"].value_counts())
rfm.to_csv("customer_rfm_stratification.csv")`,
    },
    {
      id: 10,
      title: "自动化销售报表生成",
      description: "自动化生成带图表的Excel销售报表",
      data: `使用sales_cleaned.csv、项目02的聚合数据、项目05的可视化数据，包含月度、地区、品类等多维度统计信息。`,
      codeTemplate: `1. 读取清洗后的销售数据及各项目的聚合、统计数据；2. 使用pivot_table生成多维度统计表格（月度销售额、地区销售额、品类销量）；3. 在Excel中插入图表（月度趋势图、品类占比饼图）；4. 设置Excel格式（标题、边框、字体），分工作表保存不同类型的统计数据和图表；5. 编写自动化脚本，实现一键生成周报/月报，无需手动操作。`,
      answer: `import pandas as pd
import matplotlib.pyplot as plt

# 1. 读取所有所需数据
df = pd.read_csv("sales_cleaned.csv")
df["购买日期"] = pd.to_datetime(df["购买日期"])
df["月份"] = df["购买日期"].dt.month

# 2. 创建Excel写入器
with pd.ExcelWriter("sales_report.xlsx", engine="openpyxl") as writer:
    # 工作表1：月度统计
    month_pivot = pd.pivot_table(df, values="销售额", index="月份", aggfunc="sum")
    month_pivot.to_excel(writer, sheet_name="月度统计")
    # 插入月度趋势图
    plt.figure(figsize=(8,4))
    month_pivot.plot(kind="line", ax=plt.gca())
    plt.title("月度销售额趋势")
    plt.tight_layout()
    plt.savefig("month_trend.png")
    worksheet1 = writer.sheets["月度统计"]
    worksheet1.add_image("month_trend.png", "D2")

    # 工作表2：地区统计
    area_pivot = pd.pivot_table(df, values="销售额", index="地区", aggfunc="sum")
    area_pivot.to_excel(writer, sheet_name="地区统计")

    # 工作表3：品类统计
    category_pivot = pd.pivot_table(df, values="销量", index="商品类别", aggfunc="sum")
    category_pivot.to_excel(writer, sheet_name="品类统计")
    # 插入品类饼图
    plt.figure(figsize=(6,6))
    plt.pie(category_pivot["销量"], labels=category_pivot.index, autopct="%1.1f%%")
    plt.title("品类销量占比")
    plt.tight_layout()
    plt.savefig("category_pie.png")
    worksheet3 = writer.sheets["品类统计"]
    worksheet3.add_image("category_pie.png", "D2")

print("自动化销售报表生成成功，保存路径：./sales_report.xlsx")`,
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
                      startPractice(activeChapter);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Star className="w-5 h-5" />
                    开始章节练习
                  </button>
                </div>
              </>
            ) : (
              <>
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
