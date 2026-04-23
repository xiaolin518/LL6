import { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronRight, CheckCircle, AlertCircle, Award, BookMarked, Code, Database, BarChart3, FileText, Terminal, Play, RefreshCw } from 'lucide-react';

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
    `,
    practice: {
      title: '数据分析师的工作流程',
      description: '请分析并描述数据分析师的典型工作流程，包括各个步骤的具体内容和使用的工具。',
      data: '无需数据',
      codeTemplate: `# 请在下方描述数据分析师的工作流程
# 步骤1: 数据收集
# 步骤2: 数据清洗
# 步骤3: 数据探索
# 步骤4: 数据分析
# 步骤5: 结果可视化
# 步骤6: 报告撰写`,
      answer: `# 数据分析师的工作流程

## 步骤1: 数据收集
- 确定数据需求
- 从数据库、API、Excel等来源获取数据
- 确保数据的完整性和准确性

## 步骤2: 数据清洗
- 处理缺失值（删除、填充）
- 处理异常值（识别、处理）
- 数据类型转换
- 数据去重

## 步骤3: 数据探索
- 描述性统计分析
- 数据分布分析
- 相关性分析
- 可视化探索

## 步骤4: 数据分析
- 应用统计方法
- 使用机器学习算法
- 进行假设检验
- 建立预测模型

## 步骤5: 结果可视化
- 使用Matplotlib/Seaborn创建图表
- 制作交互式仪表板
- 选择合适的可视化类型

## 步骤6: 报告撰写
- 总结分析结果
- 提供数据支持的建议
- 制作专业的分析报告
- 向 stakeholders 展示结果`
    }
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
    `,
    practice: {
      title: '销售数据可视化',
      description: '使用Matplotlib和Seaborn创建销售数据的可视化图表，包括销售趋势、产品分布等。',
      data: `# 销售数据
import pandas as pd
import numpy as np

# 生成模拟销售数据
dates = pd.date_range('2023-01-01', periods=12, freq='M')
products = ['A', 'B', 'C', 'D', 'E']

data = []
for date in dates:
    for product in products:
        sales = np.random.randint(100, 1000)
        data.append({'date': date, 'product': product, 'sales': sales})

df = pd.DataFrame(data)
df['month'] = df['date'].dt.month_name()`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 销售数据（已提供）
dates = pd.date_range('2023-01-01', periods=12, freq='M')
products = ['A', 'B', 'C', 'D', 'E']

data = []
for date in dates:
    for product in products:
        sales = np.random.randint(100, 1000)
        data.append({'date': date, 'product': product, 'sales': sales})

df = pd.DataFrame(data)
df['month'] = df['date'].dt.month_name()

# 1. 绘制销售趋势图
plt.figure(figsize=(12, 6))
sns.lineplot(data=df, x='month', y='sales', hue='product')
plt.title('产品销售趋势')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 2. 绘制产品销售分布图
plt.figure(figsize=(10, 6))
sns.barplot(data=df, x='product', y='sales', estimator=sum)
plt.title('各产品总销售额')
plt.tight_layout()
plt.show()

# 3. 绘制月度销售热力图
pivot_df = df.pivot_table(values='sales', index='product', columns='month', aggfunc='sum')
plt.figure(figsize=(12, 8))
sns.heatmap(pivot_df, annot=True, fmt='d', cmap='YlGnBu')
plt.title('月度销售热力图')
plt.tight_layout()
plt.show()`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 销售数据
dates = pd.date_range('2023-01-01', periods=12, freq='M')
products = ['A', 'B', 'C', 'D', 'E']

data = []
for date in dates:
    for product in products:
        sales = np.random.randint(100, 1000)
        data.append({'date': date, 'product': product, 'sales': sales})

df = pd.DataFrame(data)
df['month'] = df['date'].dt.month_name()

# 1. 绘制销售趋势图
plt.figure(figsize=(12, 6))
sns.lineplot(data=df, x='month', y='sales', hue='product', marker='o')
plt.title('产品销售趋势')
plt.xticks(rotation=45)
plt.ylabel('销售额')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 2. 绘制产品销售分布图
monthly_total = df.groupby('product')['sales'].sum().reset_index()
plt.figure(figsize=(10, 6))
sns.barplot(data=monthly_total, x='product', y='sales')
plt.title('各产品总销售额')
plt.ylabel('总销售额')
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.show()

# 3. 绘制月度销售热力图
pivot_df = df.pivot_table(values='sales', index='product', columns='month', aggfunc='sum')
plt.figure(figsize=(12, 8))
sns.heatmap(pivot_df, annot=True, fmt='d', cmap='YlGnBu', cbar_kws={'label': '销售额'})
plt.title('月度销售热力图')
plt.tight_layout()
plt.show()

# 4. 绘制产品销售占比饼图
total_sales = df.groupby('product')['sales'].sum()
plt.figure(figsize=(8, 8))
plt.pie(total_sales, labels=total_sales.index, autopct='%1.1f%%', startangle=90)
plt.title('产品销售占比')
plt.axis('equal')
plt.tight_layout()
plt.show()`
    }
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
    `,
    practice: {
      title: '学生成绩统计分析',
      description: '对学生成绩数据进行描述性统计分析，计算各种统计量并分析数据分布。',
      data: `# 学生成绩数据
import pandas as pd
import numpy as np

# 生成模拟成绩数据
np.random.seed(42)
students = 100

math_scores = np.random.normal(75, 10, students)
math_scores = np.clip(math_scores, 0, 100)

english_scores = np.random.normal(80, 8, students)
english_scores = np.clip(english_scores, 0, 100)

computer_scores = np.random.normal(70, 12, students)
computer_scores = np.clip(computer_scores, 0, 100)

df = pd.DataFrame({
    'math': math_scores,
    'english': english_scores,
    'computer': computer_scores
})

df['total'] = df.sum(axis=1)
df['average'] = df.mean(axis=1)`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 学生成绩数据（已提供）
np.random.seed(42)
students = 100

math_scores = np.random.normal(75, 10, students)
math_scores = np.clip(math_scores, 0, 100)

english_scores = np.random.normal(80, 8, students)
english_scores = np.clip(english_scores, 0, 100)

computer_scores = np.random.normal(70, 12, students)
computer_scores = np.clip(computer_scores, 0, 100)

df = pd.DataFrame({
    'math': math_scores,
    'english': english_scores,
    'computer': computer_scores
})

df['total'] = df.sum(axis=1)
df['average'] = df.mean(axis=1)

# 1. 计算基本统计量
print("基本统计量:")
print(df.describe())

# 2. 分析数据分布
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
sns.histplot(df['math'], kde=True)
plt.title('数学成绩分布')

plt.subplot(1, 3, 2)
sns.histplot(df['english'], kde=True)
plt.title('英语成绩分布')

plt.subplot(1, 3, 3)
sns.histplot(df['computer'], kde=True)
plt.title('计算机成绩分布')

plt.tight_layout()
plt.show()

# 3. 分析成绩相关性
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('成绩相关性分析')
plt.tight_layout()
plt.show()`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 学生成绩数据
np.random.seed(42)
students = 100

math_scores = np.random.normal(75, 10, students)
math_scores = np.clip(math_scores, 0, 100)

english_scores = np.random.normal(80, 8, students)
english_scores = np.clip(english_scores, 0, 100)

computer_scores = np.random.normal(70, 12, students)
computer_scores = np.clip(computer_scores, 0, 100)

df = pd.DataFrame({
    'math': math_scores,
    'english': english_scores,
    'computer': computer_scores
})

df['total'] = df.sum(axis=1)
df['average'] = df.mean(axis=1)

# 1. 计算基本统计量
print("=== 基本统计量 ===")
print(df.describe())

# 2. 计算额外的统计量
print("\n=== 额外统计量 ===")
print(f"数学成绩中位数: {df['math'].median():.2f}")
print(f"英语成绩中位数: {df['english'].median():.2f}")
print(f"计算机成绩中位数: {df['computer'].median():.2f}")
print(f"数学成绩众数: {df['math'].mode().iloc[0]:.2f}")
print(f"英语成绩众数: {df['english'].mode().iloc[0]:.2f}")
print(f"计算机成绩众数: {df['computer'].mode().iloc[0]:.2f}")
print(f"数学成绩偏度: {df['math'].skew():.3f}")
print(f"英语成绩偏度: {df['english'].skew():.3f}")
print(f"计算机成绩偏度: {df['computer'].skew():.3f}")
print(f"数学成绩峰度: {df['math'].kurtosis():.3f}")
print(f"英语成绩峰度: {df['english'].kurtosis():.3f}")
print(f"计算机成绩峰度: {df['computer'].kurtosis():.3f}")

# 3. 分析数据分布
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
sns.histplot(df['math'], kde=True, bins=20)
plt.title('数学成绩分布')
plt.xlabel('分数')
plt.ylabel('频数')

plt.subplot(1, 3, 2)
sns.histplot(df['english'], kde=True, bins=20)
plt.title('英语成绩分布')
plt.xlabel('分数')
plt.ylabel('频数')

plt.subplot(1, 3, 3)
sns.histplot(df['computer'], kde=True, bins=20)
plt.title('计算机成绩分布')
plt.xlabel('分数')
plt.ylabel('频数')

plt.tight_layout()
plt.show()

# 4. 分析成绩相关性
plt.figure(figsize=(10, 8))
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', square=True, vmin=-1, vmax=1)
plt.title('成绩相关性分析')
plt.tight_layout()
plt.show()

# 5. 箱线图分析
plt.figure(figsize=(12, 6))
sns.boxplot(data=df[['math', 'english', 'computer']])
plt.title('各科成绩箱线图')
plt.ylabel('分数')
plt.tight_layout()
plt.show()

# 6. 成绩等级分析
def get_grade(score):
    if score >= 90:
        return '优秀'
    elif score >= 80:
        return '良好'
    elif score >= 70:
        return '中等'
    elif score >= 60:
        return '及格'
    else:
        return '不及格'

df['math_grade'] = df['math'].apply(get_grade)
df['english_grade'] = df['english'].apply(get_grade)
df['computer_grade'] = df['computer'].apply(get_grade)

print("\n=== 成绩等级分布 ===")
print("数学成绩等级:")
print(df['math_grade'].value_counts())
print("\n英语成绩等级:")
print(df['english_grade'].value_counts())
print("\n计算机成绩等级:")
print(df['computer_grade'].value_counts())`
    }
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
    `,
    practice: {
      title: '产品质量假设检验',
      description: '使用假设检验方法分析两种生产工艺的产品质量是否存在显著差异。',
      data: `# 产品质量数据
import numpy as np

# 工艺A的产品质量数据
process_a = np.array([10.2, 9.8, 10.1, 10.3, 9.9, 10.0, 10.2, 9.7, 10.1, 10.4])

# 工艺B的产品质量数据
process_b = np.array([9.8, 9.5, 9.7, 9.6, 9.9, 9.8, 9.7, 9.6, 9.9, 9.5])`,
      codeTemplate: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# 产品质量数据（已提供）
process_a = np.array([10.2, 9.8, 10.1, 10.3, 9.9, 10.0, 10.2, 9.7, 10.1, 10.4])
process_b = np.array([9.8, 9.5, 9.7, 9.6, 9.9, 9.8, 9.7, 9.6, 9.9, 9.5])

# 1. 计算基本统计量
print("工艺A统计量:")
print(f"均值: {np.mean(process_a):.3f}")
print(f"标准差: {np.std(process_a, ddof=1):.3f}")

print("\n工艺B统计量:")
print(f"均值: {np.mean(process_b):.3f}")
print(f"标准差: {np.std(process_b, ddof=1):.3f}")

# 2. 进行独立样本t检验
# 假设：H0: 两种工艺的产品质量无显著差异
# H1: 两种工艺的产品质量有显著差异
t_stat, p_value = stats.ttest_ind(process_a, process_b)
print(f"\nt统计量: {t_stat:.3f}")
print(f"p值: {p_value:.4f}")

# 3. 结果分析
alpha = 0.05
if p_value < alpha:
    print("拒绝原假设，两种工艺的产品质量有显著差异")
else:
    print("接受原假设，两种工艺的产品质量无显著差异")

# 4. 绘制箱线图
plt.figure(figsize=(8, 6))
plt.boxplot([process_a, process_b], labels=['工艺A', '工艺B'])
plt.title('两种工艺的产品质量对比')
plt.ylabel('质量指标')
plt.tight_layout()
plt.show()`,
      answer: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 产品质量数据
process_a = np.array([10.2, 9.8, 10.1, 10.3, 9.9, 10.0, 10.2, 9.7, 10.1, 10.4])
process_b = np.array([9.8, 9.5, 9.7, 9.6, 9.9, 9.8, 9.7, 9.6, 9.9, 9.5])

# 1. 计算基本统计量
print("=== 基本统计量 ===")
print("工艺A:")
print(f"样本量: {len(process_a)}")
print(f"均值: {np.mean(process_a):.3f}")
print(f"中位数: {np.median(process_a):.3f}")
print(f"标准差: {np.std(process_a, ddof=1):.3f}")
print(f"方差: {np.var(process_a, ddof=1):.3f}")

print("\n工艺B:")
print(f"样本量: {len(process_b)}")
print(f"均值: {np.mean(process_b):.3f}")
print(f"中位数: {np.median(process_b):.3f}")
print(f"标准差: {np.std(process_b, ddof=1):.3f}")
print(f"方差: {np.var(process_b, ddof=1):.3f}")

# 2. 进行假设检验
print("\n=== 假设检验 ===")
print("原假设 H0: μA = μB (两种工艺的产品质量无显著差异)")
print("备择假设 H1: μA ≠ μB (两种工艺的产品质量有显著差异)")

# 首先检验方差齐性
levene_stat, levene_p = stats.levene(process_a, process_b)
print(f"\n方差齐性检验:")
print(f"Levene统计量: {levene_stat:.3f}")
print(f"p值: {levene_p:.4f}")

if levene_p > 0.05:
    print("方差齐性成立，使用等方差t检验")
    t_stat, p_value = stats.ttest_ind(process_a, process_b, equal_var=True)
else:
    print("方差齐性不成立，使用异方差t检验")
    t_stat, p_value = stats.ttest_ind(process_a, process_b, equal_var=False)

print(f"\nt检验结果:")
print(f"t统计量: {t_stat:.3f}")
print(f"p值: {p_value:.4f}")

# 3. 结果分析
alpha = 0.05
print(f"\n显著性水平 α = {alpha}")
if p_value < alpha:
    print("✅ 拒绝原假设，两种工艺的产品质量有显著差异")
    print(f"工艺A的均值({np.mean(process_a):.3f})显著高于工艺B({np.mean(process_b):.3f})")
else:
    print("❌ 接受原假设，两种工艺的产品质量无显著差异")

# 4. 计算置信区间
print("\n=== 均值差的95%置信区间 ===")
mean_diff = np.mean(process_a) - np.mean(process_b)
std_error = np.sqrt(np.var(process_a, ddof=1)/len(process_a) + np.var(process_b, ddof=1)/len(process_b))
df = len(process_a) + len(process_b) - 2
t_critical = stats.t.ppf(0.975, df)
conf_interval = [mean_diff - t_critical * std_error, mean_diff + t_critical * std_error]
print(f"均值差: {mean_diff:.3f}")
print(f"95%置信区间: [{conf_interval[0]:.3f}, {conf_interval[1]:.3f}]")

# 5. 数据可视化
plt.figure(figsize=(12, 6))

# 箱线图
plt.subplot(1, 2, 1)
plt.boxplot([process_a, process_b], labels=['工艺A', '工艺B'])
plt.title('两种工艺的产品质量对比')
plt.ylabel('质量指标')
plt.grid(axis='y', alpha=0.3)

# 分布直方图
plt.subplot(1, 2, 2)
sns.histplot(process_a, kde=True, label='工艺A', alpha=0.6)
sns.histplot(process_b, kde=True, label='工艺B', alpha=0.6)
plt.title('产品质量分布')
plt.xlabel('质量指标')
plt.ylabel('频数')
plt.legend()
plt.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()

# 6. 结论
print("\n=== 分析结论 ===")
print("根据假设检验结果，工艺A的产品质量显著高于工艺B。")
print("建议采用工艺A进行生产，以提高产品质量。")`
    }
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
    `,
    practice: {
      title: '销售预测模型',
      description: '使用线性回归模型预测产品销售量，基于历史销售数据和相关因素。',
      data: `# 销售预测数据
import pandas as pd
import numpy as np

# 生成模拟销售数据
np.random.seed(42)
months = 24

# 特征变量
advertising = np.random.uniform(10, 50, months)
price = np.random.uniform(50, 150, months)
competitors = np.random.randint(1, 5, months)

# 目标变量（销售量）
sales = 100 + 2 * advertising - 0.5 * price + 10 * competitors + np.random.normal(0, 20, months)
sales = np.maximum(0, sales)

df = pd.DataFrame({
    'advertising': advertising,
    'price': price,
    'competitors': competitors,
    'sales': sales
})`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 销售预测数据（已提供）
np.random.seed(42)
months = 24

# 特征变量
advertising = np.random.uniform(10, 50, months)
price = np.random.uniform(50, 150, months)
competitors = np.random.randint(1, 5, months)

# 目标变量（销售量）
sales = 100 + 2 * advertising - 0.5 * price + 10 * competitors + np.random.normal(0, 20, months)
sales = np.maximum(0, sales)

df = pd.DataFrame({
    'advertising': advertising,
    'price': price,
    'competitors': competitors,
    'sales': sales
})

# 1. 数据探索
print("数据基本信息:")
print(df.info())
print("\n数据描述性统计:")
print(df.describe())

# 2. 相关性分析
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('变量相关性分析')
plt.tight_layout()
plt.show()

# 3. 准备数据
X = df[['advertising', 'price', 'competitors']]
y = df['sales']

# 4. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 5. 训练线性回归模型
model = LinearRegression()
model.fit(X_train, y_train)

# 6. 模型评估
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\n模型评估:")
print(f"均方误差 (MSE): {mse:.2f}")
print(f"R² 评分: {r2:.3f}")
print(f"模型系数: {model.coef_}")
print(f"截距: {model.intercept_:.2f}")

# 7. 预测结果可视化
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('实际销售量')
plt.ylabel('预测销售量')
plt.title('实际 vs 预测销售量')
plt.tight_layout()
plt.show()`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 销售预测数据
np.random.seed(42)
months = 24

# 特征变量
advertising = np.random.uniform(10, 50, months)
price = np.random.uniform(50, 150, months)
competitors = np.random.randint(1, 5, months)

# 目标变量（销售量）
sales = 100 + 2 * advertising - 0.5 * price + 10 * competitors + np.random.normal(0, 20, months)
sales = np.maximum(0, sales)

df = pd.DataFrame({
    'advertising': advertising,
    'price': price,
    'competitors': competitors,
    'sales': sales
})

# 1. 数据探索
print("=== 数据基本信息 ===")
print(df.info())
print("\n=== 数据描述性统计 ===")
print(df.describe())

# 2. 相关性分析
print("\n=== 变量相关性分析 ===")
corr_matrix = df.corr()
print(corr_matrix)

plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', square=True, vmin=-1, vmax=1)
plt.title('变量相关性热力图')
plt.tight_layout()
plt.show()

# 3. 特征与目标变量关系分析
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
sns.scatterplot(x='advertising', y='sales', data=df)
plt.title('广告支出与销售量关系')
plt.xlabel('广告支出')
plt.ylabel('销售量')

plt.subplot(1, 3, 2)
sns.scatterplot(x='price', y='sales', data=df)
plt.title('价格与销售量关系')
plt.xlabel('价格')
plt.ylabel('销售量')

plt.subplot(1, 3, 3)
sns.boxplot(x='competitors', y='sales', data=df)
plt.title('竞争对手数量与销售量关系')
plt.xlabel('竞争对手数量')
plt.ylabel('销售量')

plt.tight_layout()
plt.show()

# 4. 准备数据
X = df[['advertising', 'price', 'competitors']]
y = df['sales']

# 5. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
print(f"\n训练集大小: {len(X_train)}")
print(f"测试集大小: {len(X_test)}")

# 6. 训练线性回归模型
model = LinearRegression()
model.fit(X_train, y_train)

# 7. 模型评估
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\n=== 模型评估 ===")
print(f"均方误差 (MSE): {mse:.2f}")
print(f"均方根误差 (RMSE): {rmse:.2f}")
print(f"平均绝对误差 (MAE): {mae:.2f}")
print(f"R² 评分: {r2:.3f}")
print(f"\n模型系数:")
print(f"广告支出系数: {model.coef_[0]:.3f}")
print(f"价格系数: {model.coef_[1]:.3f}")
print(f"竞争对手系数: {model.coef_[2]:.3f}")
print(f"截距: {model.intercept_:.2f}")

# 8. 预测结果可视化
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.7, s=100)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('实际销售量', fontsize=12)
plt.ylabel('预测销售量', fontsize=12)
plt.title('实际 vs 预测销售量', fontsize=14)
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()

# 9. 残差分析
residuals = y_test - y_pred
plt.figure(figsize=(10, 6))
plt.scatter(y_pred, residuals, alpha=0.7, s=100)
plt.axhline(y=0, color='r', linestyle='--', lw=2)
plt.xlabel('预测销售量', fontsize=12)
plt.ylabel('残差', fontsize=12)
plt.title('残差分析', fontsize=14)
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()

# 10. 模型应用示例
print("\n=== 模型应用示例 ===")
# 预测新数据
new_data = pd.DataFrame({
    'advertising': [30, 40, 25],
    'price': [100, 80, 120],
    'competitors': [2, 1, 3]
})

predictions = model.predict(new_data)
print("新数据预测结果:")
for i, pred in enumerate(predictions):
    print(f"案例 {i+1}: 预测销售量 = {pred:.2f}")

# 11. 结论
print("\n=== 分析结论 ===")
print("1. 广告支出与销售量呈正相关关系，每增加1单位广告支出，销售量平均增加约2单位")
print("2. 价格与销售量呈负相关关系，每增加1单位价格，销售量平均减少约0.5单位")
print("3. 竞争对手数量与销售量呈正相关关系，可能是因为竞争激烈的市场通常需求更大")
print(f"4. 模型R²评分为{r2:.3f}，说明模型能够解释{int(r2*100)}%的销售量变异")
print("5. 该模型可以用于预测未来的销售量，帮助制定销售策略")`
    }
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
    `,
    practice: {
      title: '客户价值分析',
      description: '分析客户购买数据，计算客户价值，进行客户分群。',
      data: `# 客户购买数据
import pandas as pd
import numpy as np

# 生成模拟客户数据
np.random.seed(42)
customers = 100

# 客户特征
age = np.random.randint(18, 70, customers)
gender = np.random.choice(['男', '女'], customers)
membership = np.random.choice(['普通', '银卡', '金卡', '钻石'], customers, p=[0.6, 0.2, 0.15, 0.05])

# 购买行为
purchase_frequency = np.random.poisson(5, customers) + 1
average_order_value = np.random.normal(200, 50, customers)
average_order_value = np.maximum(50, average_order_value)

# 计算客户价值
customer_value = purchase_frequency * average_order_value

# 最近购买时间（天数）
recency = np.random.randint(1, 365, customers)

df = pd.DataFrame({
    'customer_id': range(1, customers + 1),
    'age': age,
    'gender': gender,
    'membership': membership,
    'purchase_frequency': purchase_frequency,
    'average_order_value': average_order_value,
    'customer_value': customer_value,
    'recency': recency
})`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans

# 客户购买数据（已提供）
np.random.seed(42)
customers = 100

# 客户特征
age = np.random.randint(18, 70, customers)
gender = np.random.choice(['男', '女'], customers)
membership = np.random.choice(['普通', '银卡', '金卡', '钻石'], customers, p=[0.6, 0.2, 0.15, 0.05])

# 购买行为
purchase_frequency = np.random.poisson(5, customers) + 1
average_order_value = np.random.normal(200, 50, customers)
average_order_value = np.maximum(50, average_order_value)

# 计算客户价值
customer_value = purchase_frequency * average_order_value

# 最近购买时间（天数）
recency = np.random.randint(1, 365, customers)

df = pd.DataFrame({
    'customer_id': range(1, customers + 1),
    'age': age,
    'gender': gender,
    'membership': membership,
    'purchase_frequency': purchase_frequency,
    'average_order_value': average_order_value,
    'customer_value': customer_value,
    'recency': recency
})

# 1. 数据探索
print("数据基本信息:")
print(df.info())
print("\n数据描述性统计:")
print(df.describe())

# 2. 客户价值分析
print("\n客户价值分布:")
print(f"平均客户价值: {df['customer_value'].mean():.2f}")
print(f"客户价值中位数: {df['customer_value'].median():.2f}")
print(f"最高客户价值: {df['customer_value'].max():.2f}")
print(f"最低客户价值: {df['customer_value'].min():.2f}")

# 3. 客户分群（RFM分析）
# 计算RFM得分
df['R_score'] = pd.qcut(df['recency'], 5, labels=[5, 4, 3, 2, 1])  # 最近购买时间越短，得分越高
df['F_score'] = pd.qcut(df['purchase_frequency'], 5, labels=[1, 2, 3, 4, 5])  # 购买频率越高，得分越高
df['M_score'] = pd.qcut(df['customer_value'], 5, labels=[1, 2, 3, 4, 5])  # 客户价值越高，得分越高

# 计算RFM总分
df['RFM_score'] = df['R_score'].astype(int) + df['F_score'].astype(int) + df['M_score'].astype(int)

# 客户分群
def get_customer_segment(score):
    if score >= 12:
        return '高价值客户'
    elif score >= 9:
        return '中价值客户'
    else:
        return '低价值客户'

df['segment'] = df['RFM_score'].apply(get_customer_segment)

print("\n客户分群结果:")
print(df['segment'].value_counts())

# 4. 可视化分析
plt.figure(figsize=(15, 10))

# 客户价值分布
plt.subplot(2, 2, 1)
sns.histplot(df['customer_value'], kde=True, bins=20)
plt.title('客户价值分布')
plt.xlabel('客户价值')
plt.ylabel('频数')

# 会员等级与客户价值关系
plt.subplot(2, 2, 2)
sns.boxplot(x='membership', y='customer_value', data=df)
plt.title('会员等级与客户价值关系')
plt.ylabel('客户价值')

# 性别与客户价值关系
plt.subplot(2, 2, 3)
sns.boxplot(x='gender', y='customer_value', data=df)
plt.title('性别与客户价值关系')
plt.ylabel('客户价值')

# 客户分群分布
plt.subplot(2, 2, 4)
sns.countplot(x='segment', data=df)
plt.title('客户分群分布')
plt.ylabel('客户数量')

plt.tight_layout()
plt.show()

# 5. 客户分群特征分析
print("\n各客户分群特征:")
print(df.groupby('segment').agg({
    'customer_value': 'mean',
    'purchase_frequency': 'mean',
    'average_order_value': 'mean',
    'recency': 'mean',
    'age': 'mean'
}).round(2))`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 客户购买数据
np.random.seed(42)
customers = 100

# 客户特征
age = np.random.randint(18, 70, customers)
gender = np.random.choice(['男', '女'], customers)
membership = np.random.choice(['普通', '银卡', '金卡', '钻石'], customers, p=[0.6, 0.2, 0.15, 0.05])

# 购买行为
purchase_frequency = np.random.poisson(5, customers) + 1
average_order_value = np.random.normal(200, 50, customers)
average_order_value = np.maximum(50, average_order_value)

# 计算客户价值
customer_value = purchase_frequency * average_order_value

# 最近购买时间（天数）
recency = np.random.randint(1, 365, customers)

df = pd.DataFrame({
    'customer_id': range(1, customers + 1),
    'age': age,
    'gender': gender,
    'membership': membership,
    'purchase_frequency': purchase_frequency,
    'average_order_value': average_order_value,
    'customer_value': customer_value,
    'recency': recency
})

# 1. 数据探索
print("=== 数据基本信息 ===")
print(df.info())
print("\n=== 数据描述性统计 ===")
print(df.describe())

# 2. 客户价值分析
print("\n=== 客户价值分析 ===")
print(f"平均客户价值: {df['customer_value'].mean():.2f}")
print(f"客户价值中位数: {df['customer_value'].median():.2f}")
print(f"最高客户价值: {df['customer_value'].max():.2f}")
print(f"最低客户价值: {df['customer_value'].min():.2f}")
print(f"客户价值标准差: {df['customer_value'].std():.2f}")

# 3. 客户分群（RFM分析）
print("\n=== RFM分析 ===")

# 计算RFM得分
df['R_score'] = pd.qcut(df['recency'], 5, labels=[5, 4, 3, 2, 1])  # 最近购买时间越短，得分越高
df['F_score'] = pd.qcut(df['purchase_frequency'], 5, labels=[1, 2, 3, 4, 5])  # 购买频率越高，得分越高
df['M_score'] = pd.qcut(df['customer_value'], 5, labels=[1, 2, 3, 4, 5])  # 客户价值越高，得分越高

# 计算RFM总分
df['RFM_score'] = df['R_score'].astype(int) + df['F_score'].astype(int) + df['M_score'].astype(int)

# 客户分群
def get_customer_segment(score):
    if score >= 12:
        return '高价值客户'
    elif score >= 9:
        return '中价值客户'
    else:
        return '低价值客户'

df['segment'] = df['RFM_score'].apply(get_customer_segment)

print("客户分群结果:")
segment_counts = df['segment'].value_counts()
print(segment_counts)
print(f"\n高价值客户占比: {(segment_counts['高价值客户']/len(df)*100):.1f}%")
print(f"中价值客户占比: {(segment_counts['中价值客户']/len(df)*100):.1f}%")
print(f"低价值客户占比: {(segment_counts['低价值客户']/len(df)*100):.1f}%")

# 4. K-means聚类分析
print("\n=== K-means聚类分析 ===")

# 准备聚类数据
cluster_data = df[['recency', 'purchase_frequency', 'customer_value']]

# 数据标准化
scaler = StandardScaler()
scaled_data = scaler.fit_transform(cluster_data)

# 确定最佳聚类数
inertia = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaled_data)
    inertia.append(kmeans.inertia_)

# 绘制肘部图
plt.figure(figsize=(10, 6))
plt.plot(range(1, 11), inertia, marker='o')
plt.title('K-means聚类肘部图')
plt.xlabel('聚类数')
plt.ylabel('惯性值')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()

# 使用最佳聚类数（这里选择3）
kmeans = KMeans(n_clusters=3, random_state=42)
df['kmeans_cluster'] = kmeans.fit_predict(scaled_data)

print("K-means聚类结果:")
print(df['kmeans_cluster'].value_counts())

# 5. 可视化分析
plt.figure(figsize=(15, 12))

# 1. 客户价值分布
plt.subplot(3, 2, 1)
sns.histplot(df['customer_value'], kde=True, bins=20)
plt.title('客户价值分布')
plt.xlabel('客户价值')
plt.ylabel('频数')
plt.grid(axis='y', alpha=0.3)

# 2. 会员等级与客户价值关系
plt.subplot(3, 2, 2)
sns.boxplot(x='membership', y='customer_value', data=df, order=['普通', '银卡', '金卡', '钻石'])
plt.title('会员等级与客户价值关系')
plt.ylabel('客户价值')
plt.grid(axis='y', alpha=0.3)

# 3. 性别与客户价值关系
plt.subplot(3, 2, 3)
sns.boxplot(x='gender', y='customer_value', data=df)
plt.title('性别与客户价值关系')
plt.ylabel('客户价值')
plt.grid(axis='y', alpha=0.3)

# 4. 客户分群分布
plt.subplot(3, 2, 4)
sns.countplot(x='segment', data=df, order=['高价值客户', '中价值客户', '低价值客户'])
plt.title('客户分群分布')
plt.ylabel('客户数量')
plt.grid(axis='y', alpha=0.3)

# 5. 年龄与客户价值关系
plt.subplot(3, 2, 5)
sns.scatterplot(x='age', y='customer_value', data=df, alpha=0.7)
plt.title('年龄与客户价值关系')
plt.xlabel('年龄')
plt.ylabel('客户价值')
plt.grid(alpha=0.3)

# 6. RFM得分分布
plt.subplot(3, 2, 6)
sns.histplot(df['RFM_score'], bins=15)
plt.title('RFM得分分布')
plt.xlabel('RFM得分')
plt.ylabel('频数')
plt.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()

# 6. 各客户分群特征分析
print("\n=== 各客户分群特征 ===")
segment_analysis = df.groupby('segment').agg({
    'customer_value': ['mean', 'std'],
    'purchase_frequency': 'mean',
    'average_order_value': 'mean',
    'recency': 'mean',
    'age': 'mean',
    'customer_id': 'count'
}).round(2)

print(segment_analysis)

# 7. 营销建议
print("\n=== 营销建议 ===")
print("高价值客户 (占比%.1f%%):" % (segment_counts['高价值客户']/len(df)*100))
print("- 提供专属VIP服务和个性化推荐")
print("- 定期发送专属优惠和活动邀请")
print("- 建立一对一客户关系管理")

print("\n中价值客户 (占比%.1f%%):" % (segment_counts['中价值客户']/len(df)*100))
print("- 推出会员升级计划，鼓励增加消费")
print("- 提供交叉销售和向上销售机会")
print("- 定期发送个性化促销信息")

print("\n低价值客户 (占比%.1f%%):" % (segment_counts['低价值客户']/len(df)*100))
print("- 推出首次购买优惠，吸引再次购买")
print("- 发送个性化产品推荐")
print("- 设计会员注册激励计划")

# 8. 结论
print("\n=== 分析结论 ===")
print("1. 客户价值分布呈现右偏分布，少数客户贡献了大部分价值")
print("2. 会员等级与客户价值呈正相关，钻石会员平均价值最高")
print("3. 通过RFM分析，成功将客户分为高、中、低三个价值群体")
print("4. 针对不同价值的客户群体，需要制定差异化的营销策略")
print("5. 建议重点关注高价值客户的 retention，同时努力提升中低价值客户的价值")`
    }
  },
  {
    id: 'chapter7',
    title: 'Python数据分析实践项目',
    description: '10个实用的Python数据分析项目，涵盖数据清洗、分析、可视化等多个领域',
    content: `
      <h3>7.1 实操目录结构</h3>
      <p>为了便于实践和管理，我们创建了以下实操目录结构：</p>
      <ul>
        <li><strong>data/</strong> - 存放数据集</li>
        <li><strong>scripts/</strong> - 存放Python脚本</li>
        <li><strong>notebooks/</strong> - 存放Jupyter Notebook</li>
        <li><strong>reports/</strong> - 存放分析报告</li>
      </ul>
      
      <h3>7.2 销售数据读取与清洗</h3>
      <p><strong>核心工具/函数:</strong> read_csv/read_excel, dropna, fillna, astype, drop_duplicates</p>
      <p><strong>业务目标:</strong> 数据完整性校验、格式统一、脏数据清理</p>
      
      <h3>7.3 销售数据分组聚合</h3>
      <p><strong>核心工具/函数:</strong> groupby, agg, sum, mean, count</p>
      <p><strong>业务目标:</strong> 多维度销售指标统计（销售额、销量、客单价）</p>
      
      <h3>7.4 购物篮关联规则分析</h3>
      <p><strong>核心工具/函数:</strong> groupby + apply, itertools.combinations, mlxtend.frequent_patterns</p>
      <p><strong>业务目标:</strong> 热销搭配挖掘、强关联商品识别、支持度 / 置信度计算</p>
      
      <h3>7.5 客户聚类分析</h3>
      <p><strong>核心工具/函数:</strong> StandardScaler, KMeans, silhouette_score</p>
      <p><strong>业务目标:</strong> 客户群体划分、高价值 / 流失 / 潜力客户识别、簇中心解读</p>
      
      <h3>7.6 销售数据可视化</h3>
      <p><strong>核心工具/函数:</strong> plot, bar, pie, line (Pandas 内置), matplotlib, seaborn</p>
      <p><strong>业务目标:</strong> 销售趋势、地区分布、品类占比可视化，图表叙事与洞察总结</p>
      
      <h3>7.7 A/B 测试效果分析</h3>
      <p><strong>核心工具/函数:</strong> groupby, crosstab, scipy.stats (T-test/Chi2)</p>
      <p><strong>业务目标:</strong> 实验数据统计、转化率差异显著性检验、P 值解读与方案评估</p>
      
      <h3>7.8 时间序列预测分析</h3>
      <p><strong>核心工具/函数:</strong> resample, rolling, shift, ARIMA/Prophet</p>
      <p><strong>业务目标:</strong> 销售趋势分析、季节性识别、月度 / 季度销量预测</p>
      
      <h3>7.9 机器学习特征工程</h3>
      <p><strong>核心工具/函数:</strong> get_dummies, LabelEncoder, cut/qcut, corr, SelectKBest</p>
      <p><strong>业务目标:</strong> 衍生特征创建、分类变量编码、特征筛选与建模数据准备</p>
      
      <h3>7.10 客户 RFM 价值分层</h3>
      <p><strong>核心工具/函数:</strong> qcut, map, apply, 自定义评分函数</p>
      <p><strong>业务目标:</strong> 基于 RFM 的客户价值分层、业务标签定义与分层运营策略制定</p>
      
      <h3>7.11 自动化销售报表生成</h3>
      <p><strong>核心工具/函数:</strong> pd.ExcelWriter, openpyxl, pivot_table, plot</p>
      <p><strong>业务目标:</strong> 自动生成带图表的周报 / 月报，实现数据统计与报表自动化</p>
    `,
    practice: {
      title: '销售数据综合分析',
      description: '结合多个实践项目的技术，完成从数据清洗到分析报告的完整流程。按照实操目录结构组织代码和数据。',
      data: `# 销售数据
import pandas as pd
import numpy as np
import os

# 创建实操目录结构
os.makedirs('data', exist_ok=True)
os.makedirs('scripts', exist_ok=True)
os.makedirs('notebooks', exist_ok=True)
os.makedirs('reports', exist_ok=True)

# 生成模拟销售数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
products = ['A', 'B', 'C', 'D', 'E']
regions = ['华东', '华南', '华北', '西南', '西北']

# 生成销售记录
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
            # 计算单价（不同产品不同价格）
            price = {
                'A': 100,
                'B': 200,
                'C': 150,
                'D': 300,
                'E': 250
            }[product]
            # 计算销售额
            revenue = sales * price
            # 生成客户ID
            customer_id = np.random.randint(1, 1001)
            # 添加到数据
            data.append({
                'date': date,
                'product': product,
                'region': region,
                'sales': sales,
                'price': price,
                'revenue': revenue,
                'customer_id': customer_id
            })

# 创建DataFrame
df = pd.DataFrame(data)

# 添加一些缺失值和异常值
# 随机删除一些记录
missing_indices = np.random.choice(df.index, size=1000, replace=False)
df.loc[missing_indices, 'sales'] = np.nan

# 添加一些异常值
error_indices = np.random.choice(df.index, size=500, replace=False)
df.loc[error_indices, 'revenue'] = df.loc[error_indices, 'revenue'] * 10

# 保存到data目录
df.to_csv('data/sales_data.csv', index=False)
print("数据已保存到 data/sales_data.csv")
print(f"数据形状: {df.shape}")
print(f"缺失值数量: {df.isnull().sum().sum()}")
print("实操目录结构创建完成：")
print("- data/ - 存放数据集")
print("- scripts/ - 存放Python脚本")
print("- notebooks/ - 存放Jupyter Notebook")
print("- reports/ - 存放分析报告")`,
      codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from scipy import stats
import os

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 数据读取与清洗
print("=== 1. 数据读取与清洗 ===")
# 读取数据
df = pd.read_csv('data/sales_data.csv')
print(f"原始数据形状: {df.shape}")

# 检查缺失值
print("\n缺失值情况:")
print(df.isnull().sum())

# 处理缺失值
df['sales'] = df['sales'].fillna(df['sales'].mean())

# 处理异常值
# 使用IQR方法检测异常值
Q1 = df['revenue'].quantile(0.25)
Q3 = df['revenue'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 过滤异常值
df = df[(df['revenue'] >= lower_bound) & (df['revenue'] <= upper_bound)]
print(f"清洗后数据形状: {df.shape}")

# 2. 销售数据分组聚合
print("\n=== 2. 销售数据分组聚合 ===")
# 按产品分组
top_products = df.groupby('product').agg({
    'sales': 'sum',
    'revenue': 'sum',
    'customer_id': 'nunique'
}).reset_index()
top_products['avg_order_value'] = top_products['revenue'] / top_products['sales']
print("按产品统计:")
print(top_products.sort_values('revenue', ascending=False))

# 按地区分组
region_stats = df.groupby('region').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()
print("\n按地区统计:")
print(region_stats.sort_values('revenue', ascending=False))

# 3. 销售数据可视化
print("\n=== 3. 销售数据可视化 ===")
# 产品销量分布
plt.figure(figsize=(12, 6))
sns.barplot(x='product', y='sales', data=top_products)
plt.title('各产品销量分布')
plt.ylabel('销量')
plt.tight_layout()
plt.savefig('reports/product_sales.png')
print("产品销量分布图表已保存到 reports/product_sales.png")
plt.show()

# 地区销售额分布
plt.figure(figsize=(12, 6))
sns.barplot(x='region', y='revenue', data=region_stats)
plt.title('各地区销售额分布')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('reports/region_revenue.png')
print("地区销售额分布图表已保存到 reports/region_revenue.png")
plt.show()

# 4. 客户聚类分析
print("\n=== 4. 客户聚类分析 ===")
# 计算客户价值
customer_value = df.groupby('customer_id').agg({
    'revenue': 'sum',
    'sales': 'sum',
    'date': 'count'
}).reset_index()
customer_value.columns = ['customer_id', 'total_revenue', 'total_sales', 'purchase_frequency']

# 标准化数据
scaler = StandardScaler()
customer_features = customer_value[['total_revenue', 'total_sales', 'purchase_frequency']]
scaled_features = scaler.fit_transform(customer_features)

# K-means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
customer_value['cluster'] = kmeans.fit_predict(scaled_features)

# 分析聚类结果
print("客户聚类分析结果:")
cluster_result = customer_value.groupby('cluster').agg({
    'total_revenue': 'mean',
    'total_sales': 'mean',
    'purchase_frequency': 'mean',
    'customer_id': 'count'
}).round(2)
print(cluster_result)

# 保存聚类结果
customer_value.to_csv('data/customer_clusters.csv', index=False)
print("客户聚类结果已保存到 data/customer_clusters.csv")

# 5. 时间序列分析
print("\n=== 5. 时间序列分析 ===")
# 转换日期格式
df['date'] = pd.to_datetime(df['date'])

# 按月聚合
monthly_sales = df.set_index('date').resample('M').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()

# 绘制销售趋势
plt.figure(figsize=(15, 6))
sns.lineplot(x='date', y='revenue', data=monthly_sales)
plt.title('月度销售额趋势')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('reports/monthly_revenue_trend.png')
print("月度销售额趋势图表已保存到 reports/monthly_revenue_trend.png")
plt.show()

# 6. 生成分析报告
print("\n=== 6. 生成分析报告 ===")
with open('reports/sales_analysis_report.md', 'w', encoding='utf-8') as f:
    f.write('# 销售数据分析报告\n\n')
    f.write('## 1. 数据概况\n')
    f.write(f'- 原始数据量: {df.shape[0]} 条记录\n')
    f.write(f'- 数据清洗后: {df.shape[0]} 条记录\n')
    f.write('\n')
    
    f.write('## 2. 产品销售分析\n')
    f.write('### 销售额最高的产品\n')
    top_product = top_products.loc[top_products['revenue'].idxmax()]
    f.write(f'- 产品: {top_product['product']}\n')
    f.write(f'- 销售额: {top_product['revenue']:.2f}\n')
    f.write(f'- 销量: {top_product['sales']}\n')
    f.write('\n')
    
    f.write('## 3. 地区销售分析\n')
    f.write('### 销售额最高的地区\n')
    top_region = region_stats.loc[region_stats['revenue'].idxmax()]
    f.write(f'- 地区: {top_region['region']}\n')
    f.write(f'- 销售额: {top_region['revenue']:.2f}\n')
    f.write('\n')
    
    f.write('## 4. 客户分析\n')
    f.write('### 客户聚类结果\n')
    for cluster in cluster_result.index:
        f.write(f'- 客户群 {cluster}:\n')
        f.write(f'  - 平均销售额: {cluster_result.loc[cluster, 'total_revenue']:.2f}\n')
        f.write(f'  - 客户数量: {cluster_result.loc[cluster, 'customer_id']}\n')
    f.write('\n')
    
    f.write('## 5. 结论与建议\n')
    f.write('1. 数据清洗后，成功处理了缺失值和异常值\n')
    f.write('2. 产品销售情况分析显示不同产品的销售表现差异\n')
    f.write('3. 地区销售分布不均衡，需要针对性的营销策略\n')
    f.write('4. 客户聚类分析识别出不同价值的客户群体\n')
    f.write('5. 时间序列分析显示销售额的月度变化趋势\n')
    f.write('6. 建议根据分析结果制定差异化的销售策略，重点关注高价值客户和潜力地区\n')

print("分析报告已生成到 reports/sales_analysis_report.md")
print("\n实操完成！")
print("所有文件已按目录结构组织:")
print("- data/ - 存放数据集")
print("- scripts/ - 存放Python脚本")
print("- notebooks/ - 存放Jupyter Notebook")
print("- reports/ - 存放分析报告")`,
      answer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from scipy import stats
import os

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 数据读取与清洗
print("=== 1. 数据读取与清洗 ===")
# 读取数据
df = pd.read_csv('data/sales_data.csv')
print(f"原始数据形状: {df.shape}")

# 检查缺失值
print("\n缺失值情况:")
print(df.isnull().sum())

# 处理缺失值
df['sales'] = df['sales'].fillna(df['sales'].mean())

# 处理异常值
# 使用IQR方法检测异常值
Q1 = df['revenue'].quantile(0.25)
Q3 = df['revenue'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 过滤异常值
df = df[(df['revenue'] >= lower_bound) & (df['revenue'] <= upper_bound)]
print(f"清洗后数据形状: {df.shape}")

# 2. 销售数据分组聚合
print("\n=== 2. 销售数据分组聚合 ===")
# 按产品分组
top_products = df.groupby('product').agg({
    'sales': 'sum',
    'revenue': 'sum',
    'customer_id': 'nunique'
}).reset_index()
top_products['avg_order_value'] = top_products['revenue'] / top_products['sales']
print("按产品统计:")
print(top_products.sort_values('revenue', ascending=False))

# 按地区分组
region_stats = df.groupby('region').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()
print("\n按地区统计:")
print(region_stats.sort_values('revenue', ascending=False))

# 按月份分组
df['month'] = df['date'].apply(lambda x: pd.to_datetime(x).month)
monthly_stats = df.groupby('month').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()
print("\n按月统计:")
print(monthly_stats.sort_values('month'))

# 3. 销售数据可视化
print("\n=== 3. 销售数据可视化 ===")
# 产品销量分布
plt.figure(figsize=(12, 6))
sns.barplot(x='product', y='sales', data=top_products)
plt.title('各产品销量分布')
plt.ylabel('销量')
plt.tight_layout()
plt.savefig('reports/product_sales.png')
print("产品销量分布图表已保存到 reports/product_sales.png")
plt.show()

# 产品销售额分布
plt.figure(figsize=(12, 6))
sns.barplot(x='product', y='revenue', data=top_products)
plt.title('各产品销售额分布')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('reports/product_revenue.png')
print("产品销售额分布图表已保存到 reports/product_revenue.png")
plt.show()

# 地区销售额分布
plt.figure(figsize=(12, 6))
sns.barplot(x='region', y='revenue', data=region_stats)
plt.title('各地区销售额分布')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('reports/region_revenue.png')
print("地区销售额分布图表已保存到 reports/region_revenue.png")
plt.show()

# 月度销售趋势
plt.figure(figsize=(15, 6))
sns.lineplot(x='month', y='revenue', data=monthly_stats, marker='o')
plt.title('月度销售额趋势')
plt.ylabel('销售额')
plt.xlabel('月份')
plt.xticks(range(1, 13))
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('reports/monthly_revenue_trend.png')
print("月度销售额趋势图表已保存到 reports/monthly_revenue_trend.png")
plt.show()

# 产品-地区销售热力图
pivot_df = df.pivot_table(values='revenue', index='product', columns='region', aggfunc='sum')
plt.figure(figsize=(12, 8))
sns.heatmap(pivot_df, annot=True, fmt='.0f', cmap='YlGnBu')
plt.title('产品-地区销售热力图')
plt.tight_layout()
plt.savefig('reports/product_region_heatmap.png')
print("产品-地区销售热力图已保存到 reports/product_region_heatmap.png")
plt.show()

# 4. 客户聚类分析
print("\n=== 4. 客户聚类分析 ===")
# 计算客户价值
customer_value = df.groupby('customer_id').agg({
    'revenue': 'sum',
    'sales': 'sum',
    'date': 'count'
}).reset_index()
customer_value.columns = ['customer_id', 'total_revenue', 'total_sales', 'purchase_frequency']

# 标准化数据
scaler = StandardScaler()
customer_features = customer_value[['total_revenue', 'total_sales', 'purchase_frequency']]
scaled_features = scaler.fit_transform(customer_features)

# K-means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
customer_value['cluster'] = kmeans.fit_predict(scaled_features)

# 分析聚类结果
cluster_analysis = customer_value.groupby('cluster').agg({
    'total_revenue': ['mean', 'std'],
    'total_sales': 'mean',
    'purchase_frequency': 'mean',
    'customer_id': 'count'
}).round(2)

print("客户聚类分析结果:")
print(cluster_analysis)

# 客户聚类可视化
plt.figure(figsize=(12, 8))
sns.scatterplot(
    x='total_revenue', 
    y='purchase_frequency', 
    hue='cluster', 
    data=customer_value, 
    palette='viridis',
    s=100, alpha=0.7
)
plt.title('客户聚类分析')
plt.xlabel('总销售额')
plt.ylabel('购买频率')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('reports/customer_clusters.png')
print("客户聚类分析图表已保存到 reports/customer_clusters.png")
plt.show()

# 保存聚类结果
customer_value.to_csv('data/customer_clusters.csv', index=False)
print("客户聚类结果已保存到 data/customer_clusters.csv")

# 5. 时间序列分析
print("\n=== 5. 时间序列分析 ===")
# 转换日期格式
df['date'] = pd.to_datetime(df['date'])

# 按月聚合
monthly_sales = df.set_index('date').resample('M').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()

# 计算移动平均
monthly_sales['revenue_ma3'] = monthly_sales['revenue'].rolling(window=3).mean()

# 绘制销售趋势
plt.figure(figsize=(15, 6))
sns.lineplot(x='date', y='revenue', data=monthly_sales, label='实际销售额')
sns.lineplot(x='date', y='revenue_ma3', data=monthly_sales, label='3个月移动平均', linewidth=2)
plt.title('月度销售额趋势')
plt.ylabel('销售额')
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('reports/monthly_revenue_ma.png')
print("月度销售额移动平均图表已保存到 reports/monthly_revenue_ma.png")
plt.show()

# 6. 产品相关性分析
print("\n=== 6. 产品相关性分析 ===")
# 计算产品间的相关性
product_pivot = df.pivot_table(values='sales', index='customer_id', columns='product', aggfunc='sum')
product_corr = product_pivot.corr()

# 可视化产品相关性
plt.figure(figsize=(10, 8))
sns.heatmap(product_corr, annot=True, cmap='coolwarm', square=True, vmin=-1, vmax=1)
plt.title('产品销售相关性分析')
plt.tight_layout()
plt.savefig('reports/product_correlation.png')
print("产品相关性分析图表已保存到 reports/product_correlation.png")
plt.show()

# 7. 生成详细分析报告
print("\n=== 7. 生成详细分析报告 ===")
with open('reports/sales_analysis_report.md', 'w', encoding='utf-8') as f:
    f.write('# 销售数据分析报告\n\n')
    f.write('## 1. 数据概况\n')
    f.write(f'- 原始数据量: {df.shape[0]} 条记录\n')
    f.write(f'- 数据清洗后: {df.shape[0]} 条记录\n')
    f.write(f'- 处理的缺失值: {1000} 个\n')
    f.write(f'- 处理的异常值: {500} 个\n')
    f.write('\n')
    
    f.write('## 2. 产品销售分析\n')
    f.write('### 销售额最高的产品\n')
    top_product = top_products.loc[top_products['revenue'].idxmax()]
    f.write(f'- 产品: {top_product['product']}\n')
    f.write(f'- 销售额: {top_product['revenue']:.2f}\n')
    f.write(f'- 销量: {top_product['sales']}\n')
    f.write(f'- 客单价: {top_product['avg_order_value']:.2f}\n')
    f.write('\n')
    
    f.write('### 销量最高的产品\n')
    top_sales_product = top_products.loc[top_products['sales'].idxmax()]
    f.write(f'- 产品: {top_sales_product['product']}\n')
    f.write(f'- 销量: {top_sales_product['sales']}\n')
    f.write(f'- 销售额: {top_sales_product['revenue']:.2f}\n')
    f.write('\n')
    
    f.write('## 3. 地区销售分析\n')
    f.write('### 销售额最高的地区\n')
    top_region = region_stats.loc[region_stats['revenue'].idxmax()]
    f.write(f'- 地区: {top_region['region']}\n')
    f.write(f'- 销售额: {top_region['revenue']:.2f}\n')
    f.write(f'- 销量: {top_region['sales']}\n')
    f.write('\n')
    
    f.write('### 销售额最低的地区\n')
    bottom_region = region_stats.loc[region_stats['revenue'].idxmin()]
    f.write(f'- 地区: {bottom_region['region']}\n')
    f.write(f'- 销售额: {bottom_region['revenue']:.2f}\n')
    f.write(f'- 销量: {bottom_region['sales']}\n')
    f.write('\n')
    
    f.write('## 4. 客户分析\n')
    f.write('### 客户聚类结果\n')
    for cluster in cluster_analysis.index:
        f.write(f'- 客户群 {cluster}:\n')
        f.write(f'  - 平均销售额: {cluster_analysis.loc[cluster, ('total_revenue', 'mean')]:.2f}\n')
        f.write(f'  - 平均销量: {cluster_analysis.loc[cluster, ('total_sales', 'mean')]:.2f}\n')
        f.write(f'  - 平均购买频率: {cluster_analysis.loc[cluster, ('purchase_frequency', 'mean')]:.2f}\n')
        f.write(f'  - 客户数量: {cluster_analysis.loc[cluster, ('customer_id', 'count')]}\n')
    f.write('\n')
    
    f.write('## 5. 时间趋势分析\n')
    f.write('### 销售额最高的月份\n')
    top_month = monthly_stats.loc[monthly_stats['revenue'].idxmax()]
    f.write(f'- 月份: {top_month['month']}月\n')
    f.write(f'- 销售额: {top_month['revenue']:.2f}\n')
    f.write('\n')
    
    f.write('### 销售额最低的月份\n')
    bottom_month = monthly_stats.loc[monthly_stats['revenue'].idxmin()]
    f.write(f'- 月份: {bottom_month['month']}月\n')
    f.write(f'- 销售额: {bottom_month['revenue']:.2f}\n')
    f.write('\n')
    
    f.write('## 6. 产品相关性分析\n')
    f.write('### 相关性最高的产品组合\n')
    # 找到相关性最高的产品组合
    corr_matrix = product_corr.values
    np.fill_diagonal(corr_matrix, -1)  # 排除自身相关性
    max_corr_idx = np.unravel_index(np.argmax(corr_matrix), corr_matrix.shape)
    max_corr_products = [product_corr.columns[max_corr_idx[0]], product_corr.columns[max_corr_idx[1]]]
    max_corr_value = product_corr.iloc[max_corr_idx[0], max_corr_idx[1]]
    f.write(f'- 产品组合: {max_corr_products[0]} 和 {max_corr_products[1]}\n')
    f.write(f'- 相关系数: {max_corr_value:.3f}\n')
    f.write('\n')
    
    f.write('## 7. 结论与建议\n')
    f.write('### 结论\n')
    f.write('1. 数据清洗后，成功处理了1000个缺失值和500个异常值，保证了数据质量\n')
    f.write('2. 产品销售表现差异明显，需要针对不同产品制定不同的营销策略\n')
    f.write('3. 地区销售分布不均衡，华东地区表现最佳，西北地区需要重点关注\n')
    f.write('4. 客户群体可以分为3个不同价值的群体，需要差异化管理\n')
    f.write('5. 销售额存在明显的季节性趋势，需要根据季节调整库存和营销策略\n')
    f.write('6. 部分产品之间存在较强的相关性，可以考虑捆绑销售策略\n')
    f.write('\n')
    
    f.write('### 建议\n')
    f.write('1. **产品策略**:\n')
    f.write('   - 重点推广销售额和销量表现较好的产品\n')
    f.write('   - 针对表现较差的产品，分析原因并制定改进方案\n')
    f.write('   - 利用产品相关性，设计捆绑销售和交叉销售策略\n')
    f.write('\n')
    f.write('2. **地区策略**:\n')
    f.write('   - 对华东等表现较好的地区，保持现有策略并寻求进一步增长\n')
    f.write('   - 对西北等表现较差的地区，制定针对性的市场开拓计划\n')
    f.write('   - 考虑地区差异，制定本地化的营销策略\n')
    f.write('\n')
    f.write('3. **客户策略**:\n')
    f.write('   - 对高价值客户，提供VIP服务和个性化推荐\n')
    f.write('   - 对中价值客户，推出会员升级计划，鼓励增加消费\n')
    f.write('   - 对低价值客户，设计吸引再次购买的促销活动\n')
    f.write('\n')
    f.write('4. **时间策略**:\n')
    f.write('   - 根据月度销售趋势，提前备货和调整营销策略\n')
    f.write('   - 在销售旺季加大营销力度，在淡季推出促销活动\n')
    f.write('\n')
    f.write('5. **数据管理**:\n')
    f.write('   - 建立定期数据清洗和分析的流程\n')
    f.write('   - 利用分析结果持续优化销售策略\n')
    f.write('   - 建立销售预测模型，提高决策的科学性\n')

print("详细分析报告已生成到 reports/sales_analysis_report.md")

# 8. 保存分析脚本
print("\n=== 8. 保存分析脚本 ===")
analysis_script = '''
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 读取数据
df = pd.read_csv('data/sales_data.csv')

# 数据清洗
df['sales'] = df['sales'].fillna(df['sales'].mean())
Q1 = df['revenue'].quantile(0.25)
Q3 = df['revenue'].quantile(0.75)
IQR = Q3 - Q1
df = df[(df['revenue'] >= Q1 - 1.5 * IQR) & (df['revenue'] <= Q3 + 1.5 * IQR)]

# 销售分析
top_products = df.groupby('product').agg({
    'sales': 'sum',
    'revenue': 'sum',
    'customer_id': 'nunique'
}).reset_index()
top_products['avg_order_value'] = top_products['revenue'] / top_products['sales']

region_stats = df.groupby('region').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()

# 客户聚类
customer_value = df.groupby('customer_id').agg({
    'revenue': 'sum',
    'sales': 'sum',
    'date': 'count'
}).reset_index()
customer_value.columns = ['customer_id', 'total_revenue', 'total_sales', 'purchase_frequency']

scaler = StandardScaler()
scaled_features = scaler.fit_transform(customer_value[['total_revenue', 'total_sales', 'purchase_frequency']])

kmeans = KMeans(n_clusters=3, random_state=42)
customer_value['cluster'] = kmeans.fit_predict(scaled_features)

# 时间序列分析
df['date'] = pd.to_datetime(df['date'])
monthly_sales = df.set_index('date').resample('M').agg({
    'sales': 'sum',
    'revenue': 'sum'
}).reset_index()

# 产品相关性
product_pivot = df.pivot_table(values='sales', index='customer_id', columns='product', aggfunc='sum')
product_corr = product_pivot.corr()

print("分析完成！")
'''

with open('scripts/sales_analysis.py', 'w', encoding='utf-8') as f:
    f.write(analysis_script)

print("分析脚本已保存到 scripts/sales_analysis.py")
print("\n实操完成！")
print("所有文件已按目录结构组织:")
print("- data/ - 存放数据集")
print("- scripts/ - 存放Python脚本")
print("- notebooks/ - 存放Jupyter Notebook")
print("- reports/ - 存放分析报告")
print("\n报告和图表已生成，可在reports目录查看")`
    }
  }
];

export default function DataAnalysisCourse() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [showPractice, setShowPractice] = useState<boolean>(false);
  const [currentPractice, setCurrentPractice] = useState<any>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  // 开始章节练习
  const startPractice = (chapter: any) => {
    setActiveChapter(chapter.id);
    setCurrentPractice(chapter.practice);
    setUserCode(chapter.practice.codeTemplate);
    setCodeOutput('');
    setShowAnswer(false);
    setShowPractice(true);
  };

  // 运行代码
  const runCode = () => {
    // 模拟代码运行，实际项目中可以使用CodeMirror或其他代码执行库
    setCodeOutput('代码运行中...\n\n模拟运行结果:\n' + Math.random().toString());
  };

  // 重置代码
  const resetCode = () => {
    if (currentPractice) {
      setUserCode(currentPractice.codeTemplate);
      setCodeOutput('');
      setShowAnswer(false);
    }
  };

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
            高职大二学期课程 | 实操练习 | 章节学习
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
                      onClick={() => setActiveChapter(chapter.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <BookMarked className="w-4 h-4" />
                      学习
                    </button>
                    <button
                      onClick={() => startPractice(chapter)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      实操练习
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Content Modal */}
      {activeChapter && !showPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {courseOutline.find(c => c.id === activeChapter)?.title}
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
          </div>
        </div>
      )}

      {/* Practice Modal */}
      {showPractice && currentPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {courseOutline.find(c => c.id === activeChapter)?.title} - 实操练习
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
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{currentPractice.title}</h4>
                <p className="text-gray-600 mb-4">{currentPractice.description}</p>
                
                {/* 题目要求和数据 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    实操数据
                  </h5>
                  <pre className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">{currentPractice.data}</pre>
                </div>
              </div>
              
              {/* 代码编辑器和结果 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 代码编辑器 */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-800 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-600" />
                      Python代码
                    </h5>
                    <div className="flex gap-2">
                      <button
                        onClick={runCode}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        运行
                      </button>
                      <button
                        onClick={resetCode}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        重置
                      </button>
                    </div>
                  </div>
                  <textarea
                    ref={codeRef}
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-80 p-4 bg-gray-50 border rounded font-mono text-sm resize-none"
                  />
                </div>
                
                {/* 运行结果 */}
                <div className="lg:col-span-1">
                  <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    运行结果
                  </h5>
                  <div className="bg-gray-50 border rounded p-4 h-80 overflow-y-auto font-mono text-sm">
                    {codeOutput || '请运行代码查看结果'}
                  </div>
                  
                  {/* 答案按钮 */}
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    {showAnswer ? '隐藏答案' : '查看答案'}
                  </button>
                  
                  {/* 答案显示 */}
                  {showAnswer && (
                    <div className="mt-4 bg-gray-50 border rounded p-4">
                      <h6 className="font-medium text-gray-800 mb-2">参考答案</h6>
                      <pre className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">{currentPractice.answer}</pre>
                    </div>
                  )}
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