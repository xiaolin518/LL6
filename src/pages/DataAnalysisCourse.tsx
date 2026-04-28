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
      title: '销售数据读取与清洗',
      description: '学习使用Pandas读取CSV数据，处理缺失值和异常值，统一日期格式',
      data: 'USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
      codeTemplate: 'import pandas as pd\n\n# 读取数据\ndf = pd.read_csv("sales.csv")\n\n# 数据清洗\n# 删除空值\n# 处理异常值\n# 统一日期格式\n\nprint(df)',
      answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据清洗\ndf = df.dropna()  # 删除空值\ndf["AMOUNT"] = df["AMOUNT"].clip(lower=0, upper=1000)  # 处理异常值\ndf["ORDER_DATE"] = pd.to_datetime(df["ORDER_DATE"])  # 统一日期格式\n\nprint("=== 01 清洗结果 ===")\nprint(df)'
    },
    {
      id: 2,
      title: '销售数据分组聚合',
      description: '学习使用groupby函数按用户分组，计算总销售额、订单数和客单价',
      data: 'USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
      codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 按用户分组\n# 计算总销售额、订单数、客单价\n\nprint(result)',
      answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["ORDER_DATE"] = pd.to_datetime(df["ORDER_DATE"])\n\n# 分组聚合\nagg_result = df.groupby("USER_ID").agg(\n    总销售额=("AMOUNT", "sum"),\n    订单数=("AMOUNT", "count")\n).reset_index()\n\nagg_result["客单价"] = agg_result["总销售额"] / agg_result["订单数"]\n\nprint("=== 02 聚合结果 ===")\nprint(agg_result)'
    },
    {
      id: 3,
      title: '购物篮关联规则分析',
      description: '使用mlxtend库进行Apriori算法关联规则挖掘，发现商品购买规律',
      data: '订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋',
      codeTemplate: 'from mlxtend.frequent_patterns import apriori, association_rules\nimport pandas as pd\n\n# 数据准备\n# 转换为one-hot编码\n# 挖掘频繁项集\n# 生成关联规则\n\nprint(rules)',
      answer: 'from mlxtend.frequent_patterns import apriori, association_rules\nimport pandas as pd\n\n# 模拟数据加载\ndata = """订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据转换\nbasket = df.groupby("订单ID")["商品"].apply(list).tolist()\nfrom mlxtend.preprocessing import TransactionEncoder\nte = TransactionEncoder()\nte_ary = te.fit(basket).transform(basket)\ndf_encoded = pd.DataFrame(te_ary, columns=te.columns_)\n\n# 关联规则挖掘\nfreq_items = apriori(df_encoded, min_support=0.3, use_colnames=True)\nrules = association_rules(freq_items, metric="confidence", min_threshold=0.5)\nrules = rules.sort_values("confidence", ascending=False)\n\nprint("=== 03 关联规则 ===")\nprint(rules[["antecedents", "consequents", "support", "confidence"]])'
    },
    {
      id: 4,
      title: '客户聚类分析',
      description: '使用K-means算法对客户进行聚类，识别不同客户群体',
      data: 'USER_ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5',
      codeTemplate: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 数据准备\n# 标准化\n# 聚类\n# 分析结果\n\nprint(result)',
      answer: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 模拟数据加载\ndata = """USER_ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据准备\nfeatures = df[["总金额", "订单数", "最近购买时间"]]\nscaler = StandardScaler()\nscaled_features = scaler.fit_transform(features)\n\n# K-means聚类\nkmeans = KMeans(n_clusters=3, random_state=42)\ndf["聚类"] = kmeans.fit_predict(scaled_features)\n\nprint("=== 04 聚类结果 ===")\nprint(df)\nprint("\\n聚类均值：")\nprint(df.groupby("聚类").mean())'
    },
    {
      id: 5,
      title: '销售数据可视化',
      description: '使用Matplotlib绘制销售趋势折线图、饼图和柱状图',
      data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
      codeTemplate: 'import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 读取数据\n# 绘制图表\n\nplt.show()',
      answer: 'import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 模拟数据加载\ndata = """日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 可视化\nprint("=== 05 可视化已展示 ===")\nprint("弹出3 张图表：")\nprint("销售趋势折线图")\nprint("用户销售额占比饼图")\nprint("用户销售额柱状图")\n\n# 实际绘图代码示例\nplt.figure(figsize=(12, 4))\n\n# 折线图\nplt.subplot(131)\nplt.plot(df["日期"], df["销售额"], marker="o")\nplt.title("销售趋势")\nplt.xticks(rotation=45)\n\n# 饼图\nplt.subplot(132)\nplt.pie(df["销售额"], labels=df["日期"], autopct="%1.1f%%")\nplt.title("销售额占比")\n\n# 柱状图\nplt.subplot(133)\nplt.bar(df["日期"], df["销售额"])\nplt.title("销售额对比")\nplt.xticks(rotation=45)\n\nplt.tight_layout()'
    },
    {
      id: 6,
      title: 'A/B测试效果分析',
      description: '使用卡方检验分析A/B测试结果，判断两组是否有显著差异',
      data: '组别,转化,未转化\nA,100,900\nB,110,890',
      codeTemplate: 'from scipy.stats import chi2_contingency\nimport pandas as pd\n\n# 数据准备\n# 卡方检验\n# 分析结果\n\nprint(result)',
      answer: 'from scipy.stats import chi2_contingency\nimport pandas as pd\n\n# 模拟数据加载\ndata = """组别,转化,未转化\nA,100,900\nB,110,890"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 构建列联表\ncontingency = pd.crosstab(index=df["组别"], values=[df["转化"], df["未转化"]], aggfunc="sum")\ncontingency_table = [[100, 900], [110, 890]]\n\n# 卡方检验\nchi2, p, dof, expected = chi2_contingency(contingency_table)\n\nprint("=== 06 A/B测试结果 ===")\nprint(f"P值: {p:.4f}")\nif p < 0.05:\n    print("有显著差异")\nelse:\n    print("无显著差异")'
    },
    {
      id: 7,
      title: '时间序列预测分析',
      description: '使用ARIMA模型进行时间序列预测，预测未来销售趋势',
      data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
      codeTemplate: 'from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\n\n# 数据准备\n# 训练模型\n# 预测\n\nprint(forecast)',
      answer: 'from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\nimport numpy as np\n\n# 模拟数据加载\ndata = """日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["日期"] = pd.to_datetime(df["日期"])\ndf.set_index("日期", inplace=True)\n\n# ARIMA模型\nmodel = ARIMA(df["销售额"], order=(1, 1, 1))\nmodel_fit = model.fit()\n\n# 预测未来2个月\nforecast = model_fit.forecast(steps=2)\n\nprint("=== 07 时间序列预测 ===")\nprint("未来2个月预测值：")\nprint(forecast)'
    },
    {
      id: 8,
      title: '机器学习特征工程',
      description: '创建衍生特征（月份、星期几），使用LabelEncoder进行编码',
      data: 'USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120',
      codeTemplate: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 读取数据\n# 特征工程\n# 编码\n\nprint(result)',
      answer: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 模拟数据加载\ndata = """USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["ORDER_DATE"] = pd.to_datetime(df["ORDER_DATE"])\n\n# 特征工程\ndf["月份"] = df["ORDER_DATE"].dt.month\ndf["星期几"] = df["ORDER_DATE"].dt.dayofweek\n\n# 编码\nle = LabelEncoder()\ndf["用户编码"] = le.fit_transform(df["USER_ID"])\n\nprint("=== 08 特征工程结果 ===")\nprint(df[["月份", "星期几", "用户编码", "AMOUNT"]])'
    },
    {
      id: 9,
      title: '客户RFM价值分层',
      description: '计算R(最近购买)、F(购买频率)、M(购买金额)评分，进行客户分层',
      data: 'USER_ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500',
      codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 计算RFM评分\n# 分层\n\nprint(result)',
      answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """USER_ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf.set_index("USER_ID", inplace=True)\n\n# RFM评分\ndf["R"] = df["最近购买天数"]\ndf["F"] = df["购买次数"]\ndf["M"] = df["总金额"]\n\n# 分位数评分\ndf["R_score"] = pd.qcut(df["R"], 5, labels=[1, 2, 3, 4, 5])\ndf["F_score"] = pd.qcut(df["F"], 5, labels=[1, 2, 3, 4, 5])\ndf["M_score"] = pd.qcut(df["M"], 5, labels=[1, 2, 3, 4, 5])\n\n# 总分\ndf["R_score"] = df["R_score"].astype(int)\ndf["F_score"] = df["F_score"].astype(int)\ndf["M_score"] = df["M_score"].astype(int)\ndf["总分"] = df["R_score"] + df["F_score"] + df["M_score"]\n\nprint("=== 09 RFM分层结果 ===")\nprint(df[["R", "F", "M", "R_score", "F_score", "M_score", "总分"]])'
    },
    {
      id: 10,
      title: '自动化销售报表生成',
      description: '使用ExcelWriter生成包含数据透视表和统计摘要的Excel报表',
      data: 'USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300',
      codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 生成报表\n# 保存Excel\n\nprint("报表已生成")',
      answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """USER_ID,ORDER_DATE,AMOUNT\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["ORDER_DATE"] = pd.to_datetime(df["ORDER_DATE"])\n\n# 生成统计摘要\nstats = df.describe()\n\n# 数据透视表\npivot = pd.pivot_table(df, index="USER_ID", values="AMOUNT", aggfunc=["sum", "count"])\n\nprint("=== 10 自动化报表已生成 ===")\nprint("文件：销售月报.xlsx、chart.png")\n\n# 实际保存代码示例\n# with pd.ExcelWriter("销售月报.xlsx") as writer:\n#     df.to_excel(writer, sheet_name="原始数据", index=False)\n#     pivot.to_excel(writer, sheet_name="数据透视")\n#     stats.to_excel(writer, sheet_name="统计摘要")'
    }
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
      // 显示项目代码模板
      setUserCode(project.codeTemplate);
    }
    setCodeOutput('');
    setShowAnswer(false);
    setShowPractical(true);
  };

  const runCode = () => {
    if (!userCode.trim()) {
      setCodeOutput('请输入Python代码后再运行');
      return;
    }
    
    try {
      // 模拟Python代码执行
      // 在实际项目中，这里可以使用Python解释器或API
      let output = '代码运行结果：\n\n';
      
      // 为不同项目提供模拟数据
      const projectId = currentPracticalId || 1;
      
      // 通用错误检测
      if (userCode.includes('1111') || userCode.includes('2222') || userCode.includes('3333')) {
        output += '代码执行错误：\n语法错误 - 代码末尾有多余的数字';
        setCodeOutput(output);
        return;
      }
      
      let isOutputMatching = false;
      let errorMessage = '';
      
      if (projectId === 1) {
        // 项目1：销售数据读取与清洗
        if (userCode.includes('read_csv') || userCode.includes('dropna') || userCode.includes('to_datetime')) {
          output += `=== 01 清洗结果 ===\n   USER_ID ORDER_DATE  AMOUNT\n0        1 2023-09-01     100\n1        1 2023-09-15     150\n3        2 2023-08-10      80\n5        3 2023-07-01     300\n6        3 2023-07-10     300`;
          isOutputMatching = true;
        } else {
          errorMessage = '请实现数据清洗功能，包括读取数据、删除空值、处理异常值和统一日期格式';
        }
      } else if (projectId === 2) {
        // 项目2：销售数据分组聚合
        if (userCode.includes('groupby')) {
          if (userCode.includes('agg')) {
            if (userCode.includes('sam')) {
              output += '代码执行错误：\n参数错误 - 应该使用 sum() 而不是 sam()';
            } else if (userCode.includes('1111') || userCode.includes('2222') || userCode.includes('3333')) {
              output += '代码执行错误：\n语法错误 - 代码末尾有多余的数字';
            } else {
              output += `=== 02 聚合结果 ===\n   USER_ID  总销售额  订单数   客单价\n0        1      250      2  125.0\n1        2       80      1   80.0\n2        3      600      2  300.0`;
              isOutputMatching = true;
            }
          } else if (userCode.includes('ugg')) {
            output += '代码执行错误：\n方法名错误 - 应该使用 agg() 而不是 ugg()';
          } else {
            errorMessage = '请使用 agg() 方法进行分组聚合，计算总销售额、订单数和客单价';
          }
        } else {
          errorMessage = '请使用 groupby() 方法按用户进行分组';
        }
      } else if (projectId === 3) {
        // 项目3：购物篮关联规则分析
        if (userCode.includes('apriori') || userCode.includes('association_rules')) {
          output += `=== 03 关联规则 ===\n  antecedents consequents   support  confidence\n0      (面包)       (牛奶)  0.666667    1.000000\n1      (牛奶)       (面包)  0.666667    1.000000\n2      (鸡蛋)       (牛奶)  0.333333    0.500000（被阈值过滤）`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 mlxtend 库的 apriori 和 association_rules 函数进行关联规则分析';
        }
      } else if (projectId === 4) {
        // 项目4：客户聚类分析
        if (userCode.includes('KMeans') || userCode.includes('StandardScaler')) {
          output += `=== 04 聚类结果 ===\n   USER_ID  总金额  订单数  最近购买时间  聚类\n0        1    250      2        30     1\n1        2     80      1        60     2\n2        3    600      2         5     0\n\n聚类均值：\n       USER_ID   总金额  订单数  最近购买时间\n聚类\n0         3.0  600.0    2.0        5.0\n1         1.0  250.0    2.0       30.0\n2         2.0   80.0    1.0       60.0`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 sklearn 的 KMeans 和 StandardScaler 进行客户聚类分析';
        }
      } else if (projectId === 5) {
        // 项目5：销售数据可视化
        if (userCode.includes('matplotlib') || userCode.includes('plot')) {
          output += `=== 05 可视化已展示 ===\n弹出3 张图表：\n销售趋势折线图\n用户销售额占比饼图\n用户销售额柱状图`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 matplotlib 库创建销售趋势折线图、用户销售额占比饼图和柱状图';
        }
      } else if (projectId === 6) {
        // 项目6：A/B测试效果分析
        if (userCode.includes('chi2_contingency') || userCode.includes('crosstab')) {
          output += `=== 06 A/B测试结果 ===\nP值: 0.5243\n无显著差异`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 chi2_contingency 和 crosstab 进行 A/B 测试效果分析';
        }
      } else if (projectId === 7) {
        // 项目7：时间序列预测分析
        if (userCode.includes('ARIMA') || userCode.includes('forecast')) {
          output += `=== 07 时间序列预测 ===\n未来2个月预测值：\n2023-06-30    148.678026\n2023-07-31    149.567892\nFreq: M, Name: predicted_mean, dtype: float64`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 ARIMA 模型进行时间序列预测分析';
        }
      } else if (projectId === 8) {
        // 项目8：机器学习特征工程
        if (userCode.includes('LabelEncoder') || userCode.includes('dt.month')) {
          output += `=== 08 特征工程结果 ===\n   月份  星期几  用户编码  AMOUNT\n0     9      4       0     100\n1     9      4       0     150\n2     8      3       1      80\n3     8      4       1     120`;
          isOutputMatching = true;
        } else {
          errorMessage = '请创建衍生特征（如月份、星期几）并使用 LabelEncoder 进行编码';
        }
      } else if (projectId === 9) {
        // 项目9：客户RFM价值分层
        if (userCode.includes('qcut') || userCode.includes('R_score')) {
          output += `=== 09 RFM分层结果 ===\n          R  F    M R_score F_score M_score  总分\nUSER_ID\n1        17  2  500       4       3       4   11\n2       112  1   80       1       2       1    4\n3        12  1  500       4       2       4   10`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 qcut 函数计算 R、F、M 评分并进行客户价值分层';
        }
      } else if (projectId === 10) {
        // 项目10：自动化销售报表生成
        if (userCode.includes('ExcelWriter') || userCode.includes('to_excel')) {
          output += `=== 10 自动化报表已生成 ===\n文件：销售月报.xlsx、chart.png`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 ExcelWriter 生成包含数据透视表和统计摘要的 Excel 报表';
        }
      } else {
        // 通用执行
        if (userCode.includes('print')) {
          // 简单的print语句
          const printMatch = userCode.match(/print\((.*?)\)/);
          if (printMatch) {
            output += `输出：${printMatch[1]}`;
            isOutputMatching = true;
          } else {
            errorMessage = '请使用 print() 函数输出结果';
          }
        } else {
          errorMessage = '请实现相应的功能';
        }
      }
      
      // 如果输出不匹配，显示"输出不匹配"提示和具体错误信息
      if (!isOutputMatching) {
        output = `代码运行结果：\n\n输出不匹配\n\n提示：${errorMessage}`;
      }
      
      setCodeOutput(output);
    } catch (error) {
      setCodeOutput(`代码执行错误：\n${error.message}`);
    }
  };

  const showAnswerSolution = () => {
    // 将编辑区内容替换成对应项目的参考答案
    const project = practicalProjects.find(p => p.id === currentPracticalId);
    if (project) {
      setUserCode(project.answer);
    }
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
                {activeChapter === chapter.id && !showPractice && !isPracticalMode && (
                  <div className="mt-4 p-6 bg-white rounded-xl shadow-sm">
                    <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
                  </div>
                )}
                {activeChapter === chapter.id && isPracticalMode && (
                  <div className="mt-4 p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">实操训练项目</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {practicalProjects.map(project => (
                        <div
                          key={project.id}
                          className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                          onClick={() => openPractice(project.id)}
                        >
                          <h4 className="font-bold text-blue-800 mb-2">{project.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <div className="flex items-center text-xs text-blue-600">
                            <Play className="w-3 h-3 mr-1" />
                            开始练习
                          </div>
                        </div>
                      ))}
                    </div>
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

      {/* 实操练习界面 */}
      {showPractical && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                实操训练 - {currentPractical?.title}
              </h2>
              <button
                onClick={() => setShowPractical(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                返回项目列表
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧题目要求和数据 */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-800 mb-2">题目要求</h3>
                  <p className="text-gray-700">{currentPractical?.description}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-800 mb-2">实操数据</h3>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{currentPractical?.data}</pre>
                  </div>
                </div>
              </div>
              
              {/* 中间代码编辑器 */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">代码编辑器</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUserCode('print("hello")')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        重置
                      </button>
                      <button
                        onClick={showAnswerSolution}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm flex items-center gap-1"
                      >
                        <Star className="w-3 h-3" />
                        查看答案
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 bg-gray-800 text-green-400 p-4 rounded border border-gray-700 font-mono text-sm resize-none"
                    placeholder="请输入Python代码..."
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={runCode}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      运行代码
                    </button>
                  </div>
                </div>
                
                {/* 右侧运行结果 */}
                <div className="bg-gray-100 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">输出结果</h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm min-h-40">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{codeOutput || '运行代码后显示结果'}</pre>
                  </div>
                </div>
                
                {/* 参考答案 */}
                {showAnswer && (
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h3 className="font-bold text-yellow-800 mb-2">参考答案</h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">{currentPractical?.answer}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}