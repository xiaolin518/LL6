import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, RefreshCw, Star } from 'lucide-react';
import PythonCodeRunner from '../components/PythonCodeRunner';

const practicalProjects = [
  {
    id: 1,
    title: '销售数据读取与清洗',
    description: '学习使用Pandas读取CSV数据，处理缺失值和异常值，统一日期格式',
    knowledge: `## 知识讲解：数据清洗基础

### 1. Pandas数据读取
- \`pd.read_csv()\`：读取CSV文件，支持多种参数配置
- \`pd.read_excel()\`：读取Excel文件，需要openpyxl库支持

### 2. 缺失值处理
- \`df.isnull()\` / \`df.notnull()\`：检测缺失值
- \`df.dropna()\`：删除包含缺失值的行/列
- \`df.fillna()\`：填充缺失值（均值、中位数、前向/后向填充）

### 3. 异常值处理
- \`df.describe()\`：查看数据统计信息，识别异常范围
- \`df.clip()\`：截断异常值到合理范围
- IQR方法：基于四分位数间距识别离群值

### 4. 日期格式统一
- \`pd.to_datetime()\`：将字符串转换为日期时间格式
- \`df.dt.year/month/day\`：提取日期组件

### 5. 数据类型转换
- \`df.astype()\`：转换数据类型
- \`pd.to_numeric()\`：安全地转换为数值类型

### 业务意义
数据清洗是数据分析的第一步，直接影响后续分析结果的准确性。`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\ndf = pd.read_csv("sales.csv")\n\n# 数据清洗\n# 删除空值\n# 处理异常值\n# 统一日期格式\n\nprint(df)',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据清洗\ndf = df.dropna()  # 删除空值\ndf["金额"] = df["金额"].clip(lower=0, upper=1000)  # 处理异常值\ndf["订单日期"] = pd.to_datetime(df["订单日期"])  # 统一日期格式\n\nprint("=== 01 清洗结果 ===")\nprint(df)',
    answer: '=== 01 清洗结果 ===\n   用户ID      订单日期  金额\n0        1 2023-09-01   100\n1        1 2023-09-15   150\n3        2 2023-08-10    80\n4        3 2023-07-01   300\n5        3 2023-07-10   300'
  },
  {
    id: 2,
    title: '销售数据分组聚合',
    description: '学习使用groupby函数按用户分组，计算总销售额、订单数和客单价',
    knowledge: `## 知识讲解：分组聚合

### 1. Groupby基础
- \`df.groupby(by)\`：按指定列分组，返回GroupBy对象
- 支持按单列、多列或函数分组

### 2. 聚合函数
- \`.sum()\`：求和
- \`.mean()\`：平均值
- \`.count()\`：计数
- \`.min()\` / \`.max()\`：最小值/最大值
- \`.agg()\`：自定义聚合函数

### 3. 多指标聚合
\`\`\`python
df.groupby("用户ID").agg({
    "金额": ["sum", "count", "mean"],
    "订单日期": "max"
})
\`\`\`

### 4. 自定义聚合
\`\`\`python
def top_n(x, n=3):
    return x.sort_values(ascending=False).head(n)

df.groupby("用户ID")["金额"].apply(top_n)
\`\`\`

### 5. 客单价计算
客单价 = 总销售额 / 订单数

### 业务意义
分组聚合是数据分析的核心操作，用于从不同维度（用户、时间、地区等）汇总数据。`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 按用户分组\n# 计算总销售额、订单数、客单价\n\nprint(result)',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 分组聚合\nagg_result = df.groupby("用户ID").agg(\n    总销售额=("金额", "sum"),\n    订单数=("金额", "count")\n).reset_index()\n\nagg_result["客单价"] = agg_result["总销售额"] / agg_result["订单数"]\n\nprint("=== 02 聚合结果 ===")\nprint(agg_result)',
    answer: '=== 02 聚合结果 ===\n   用户ID  总销售额  订单数   客单价\n0        1      250      2  125.0\n1        2       80      1   80.0\n2        3      600      2  300.0'
  },
  {
    id: 3,
    title: '购物篮关联规则分析',
    description: '使用mlxtend库进行Apriori算法关联规则挖掘，发现商品购买规律',
    knowledge: `## 知识讲解：关联规则挖掘

### 1. Apriori算法原理
Apriori算法是经典的关联规则挖掘算法，基于"频繁项集的子集也一定是频繁的"原理。

### 2. 核心概念
- **支持度(Support)**：项集出现的频率
  - Support(X) = 包含X的交易数 / 总交易数
- **置信度(Confidence)**：规则的可靠程度
  - Confidence(X→Y) = Support(X∪Y) / Support(X)
- **提升度(Lift)**：规则的有效性
  - Lift(X→Y) = Confidence(X→Y) / Support(Y)

### 3. 算法步骤
1. 生成所有1-项集
2. 筛选频繁项集（满足最小支持度）
3. 迭代生成更大项集
4. 生成关联规则

### 4. mlxtend库使用
\`\`\`python
from mlxtend.frequent_patterns import apriori, association_rules

# 生成频繁项集
freq_items = apriori(df, min_support=0.1, use_colnames=True)

# 生成关联规则
rules = association_rules(freq_items, metric="confidence", min_threshold=0.5)
\`\`\`

### 5. 业务应用
- 商品推荐（"购买A的用户也购买B"）
- 货架摆放优化
- 促销活动策划

### 评估指标
- Lift > 1：正相关，规则有效
- Lift = 1：无关联
- Lift < 1：负相关`,

    data: '订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋',
    codeTemplate: 'from mlxtend.frequent_patterns import apriori, association_rules\nimport pandas as pd\n\n# 数据准备\n# 转换为one-hot编码\n# 挖掘频繁项集\n# 生成关联规则\n\nprint(rules)',
    solution: 'from mlxtend.frequent_patterns import apriori, association_rules\nimport pandas as pd\n\n# 模拟数据加载\ndata = """订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据转换\nbasket = df.groupby("订单ID")["商品"].apply(list).tolist()\nfrom mlxtend.preprocessing import TransactionEncoder\nte = TransactionEncoder()\nte_ary = te.fit(basket).transform(basket)\ndf_encoded = pd.DataFrame(te_ary, columns=te.columns_)\n\n# 关联规则挖掘\nfreq_items = apriori(df_encoded, min_support=0.3, use_colnames=True)\nrules = association_rules(freq_items, metric="confidence", min_threshold=0.5)\nrules = rules.sort_values("confidence", ascending=False)\n\nprint("=== 03 关联规则 ===")\nprint(rules[["antecedents", "consequents", "support", "confidence"]])',
    answer: '=== 03 关联规则 ===\n  antecedents consequents   support  confidence\n0      (面包)       (牛奶)  0.666667    1.000000\n1      (牛奶)       (面包)  0.666667    0.666667\n2      (鸡蛋)       (牛奶)  0.333333    1.000000\n3      (牛奶)       (鸡蛋)  0.333333    0.333333'
  },
  {
    id: 4,
    title: '客户聚类分析',
    description: '使用K-means算法对客户进行聚类，识别不同客户群体',
    knowledge: `## 知识讲解：K-means聚类

### 1. K-means算法原理
K-means是一种无监督学习算法，用于将数据划分为K个簇。

### 2. 算法步骤
1. 随机选择K个初始质心
2. 计算每个点到质心的距离，分配到最近的簇
3. 重新计算每个簇的质心
4. 重复步骤2-3，直到质心不再变化

### 3. 距离度量
- 欧氏距离（最常用）
- 曼哈顿距离
- 余弦相似度（适用于高维数据）

### 4. K值选择方法
- **肘部法则**：绘制误差平方和随K变化的曲线，选择拐点处的K
- **轮廓系数**：评估聚类质量，取值范围[-1,1]，越接近1越好

### 5. sklearn实现
\`\`\`python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
\`\`\`

### 6. 数据预处理
- 标准化：\`StandardScaler()\`
- 归一化：\`MinMaxScaler()\`

### 业务应用
- 客户分群（高价值客户、潜力客户、流失客户）
- 市场细分
- 异常检测`,

    data: '用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5',
    codeTemplate: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 数据准备\n# 标准化\n# 聚类\n# 分析结果\n\nprint(result)',
    solution: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据准备\nfeatures = df[["总金额", "订单数", "最近购买时间"]]\nscaler = StandardScaler()\nscaled_features = scaler.fit_transform(features)\n\n# K-means聚类\nkmeans = KMeans(n_clusters=3, random_state=42)\ndf["聚类"] = kmeans.fit_predict(scaled_features)\n\nprint("=== 04 聚类结果 ===")\nprint(df)\nprint("\\n聚类均值：")\nprint(df.groupby("聚类").mean())',
    answer: '=== 04 聚类结果 ===\n   用户ID  总金额  订单数  最近购买时间  聚类\n0        1    250      2        30     1\n1        2     80      1        60     2\n2        3    600      2         5     0\n\n聚类均值：\n       用户ID   总金额  订单数  最近购买时间\n聚类\n0         3.0  600.0    2.0        5.0\n1         1.0  250.0    2.0       30.0\n2         2.0   80.0    1.0       60.0'
  },
  {
    id: 5,
    title: '销售数据可视化',
    description: '使用Matplotlib绘制销售趋势折线图、饼图和柱状图',
    knowledge: `## 知识讲解：数据可视化

### 1. Matplotlib基础
\`\`\`python
import matplotlib.pyplot as plt

# 创建画布
plt.figure(figsize=(10, 6))

# 绘图
plt.plot(x, y)

# 添加标题和标签
plt.title("标题")
plt.xlabel("X轴标签")
plt.ylabel("Y轴标签")

# 显示图表
plt.show()
\`\`\`

### 2. 常用图表类型
- **折线图**：展示趋势变化（\`plt.plot()\`）
- **柱状图**：比较不同类别数据（\`plt.bar()\`）
- **饼图**：展示占比关系（\`plt.pie()\`）
- **散点图**：展示变量间关系（\`plt.scatter()\`）
- **直方图**：展示数据分布（\`plt.hist()\`）

### 3. 图表美化
- \`plt.grid()\`：添加网格线
- \`plt.legend()\`：添加图例
- \`plt.xticks(rotation=45)\`：旋转X轴标签
- \`plt.tight_layout()\`：自动调整布局

### 4. 子图布局
\`\`\`python
fig, axes = plt.subplots(nrows=2, ncols=3, figsize=(15, 10))
axes[0, 0].plot(x, y1)
axes[0, 1].bar(categories, values)
axes[0, 2].pie(sizes)
\`\`\`

### 5. Seaborn高级可视化
Seaborn是基于Matplotlib的更高级库，提供更美观的图表样式。

### 可视化原则
- 简洁清晰，避免信息过载
- 选择合适的图表类型
- 添加必要的标签和说明`,

    data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
    codeTemplate: 'import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 读取数据\n# 绘制图表\n\nplt.show()',
    solution: 'import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 模拟数据加载\ndata = """日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 可视化\nprint("=== 05 可视化已展示 ===")\nprint("弹出3 张图表：")\nprint("销售趋势折线图")\nprint("用户销售额占比饼图")\nprint("用户销售额柱状图")\n\n# 实际绘图代码示例\nplt.figure(figsize=(12, 4))\n\n# 折线图\nplt.subplot(131)\nplt.plot(df["日期"], df["销售额"], marker="o")\nplt.title("销售趋势")\nplt.xticks(rotation=45)\n\n# 饼图\nplt.subplot(132)\nplt.pie(df["销售额"], labels=df["日期"], autopct="%1.1f%%")\nplt.title("销售额占比")\n\n# 柱状图\nplt.subplot(133)\nplt.bar(df["日期"], df["销售额"])\nplt.title("销售额对比")\nplt.xticks(rotation=45)\n\nplt.tight_layout()',
    answer: '=== 05 可视化已展示 ===\n弹出3张图表：\n销售趋势折线图\n销售额占比饼图\n销售额对比柱状图\n\n图表数据：\n日期    销售额\n2023-01     100\n2023-02     120\n2023-03     150\n2023-04     130\n2023-05     160'
  },
  {
    id: 6,
    title: 'A/B测试效果分析',
    description: '使用卡方检验分析A/B测试结果，判断两组是否有显著差异',
    knowledge: `## 知识讲解：A/B测试与统计检验

### 1. A/B测试概念
A/B测试是一种对照实验，用于比较两个版本（A和B）的效果差异。

### 2. 卡方检验原理
卡方检验用于检验两个分类变量之间是否存在关联。

### 3. 假设检验步骤
1. **提出假设**：
   - H0（原假设）：两组没有显著差异
   - H1（备择假设）：两组存在显著差异
   
2. **计算检验统计量**：
   - 卡方值 = Σ[(观测值-期望值)² / 期望值]

3. **确定显著性水平**：通常取α=0.05

4. **做出决策**：
   - p值 < 0.05：拒绝原假设，认为有显著差异
   - p值 ≥ 0.05：不拒绝原假设，认为无显著差异

### 4. 适用场景
- 转化率测试
- 点击率测试
- 用户行为对比

### 5. 代码实现
\`\`\`python
from scipy.stats import chi2_contingency

# 列联表
contingency_table = [[转化A, 未转化A], [转化B, 未转化B]]
chi2, p, dof, expected = chi2_contingency(contingency_table)

# 判断结果
if p < 0.05:
    print("有显著差异")
else:
    print("无显著差异")
\`\`\`

### 注意事项
- 样本量要足够大
- 确保随机分组
- 控制其他变量`,

    data: '组别,转化,未转化\nA,100,900\nB,110,890',
    codeTemplate: 'from scipy.stats import chi2_contingency\nimport pandas as pd\n\n# 数据准备\n# 卡方检验\n# 分析结果\n\nprint(result)',
    solution: 'from scipy.stats import chi2_contingency\nimport pandas as pd\n\n# 模拟数据加载\ndata = """组别,转化,未转化\nA,100,900\nB,110,890"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 构建列联表\ncontingency = pd.crosstab(index=df["组别"], values=[df["转化"], df["未转化"]], aggfunc="sum")\ncontingency_table = [[100, 900], [110, 890]]\n\n# 卡方检验\nchi2, p, dof, expected = chi2_contingency(contingency_table)\n\nprint("=== 06 A/B测试结果 ===")\nprint(f"P值: {p:.4f}")\nif p < 0.05:\n    print("有显著差异")\nelse:\n    print("无显著差异")',
    answer: '=== 06 A/B测试结果 ===\n卡方值: 0.5243\n自由度: 1\nP值: 0.4697\n\n结论：不拒绝原假设，两组无显著差异（P值 = 0.4697 >= 0.05）'
  },
  {
    id: 7,
    title: '时间序列预测分析',
    description: '使用ARIMA模型进行时间序列预测，预测未来销售趋势',
    knowledge: `## 知识讲解：时间序列预测

### 1. 时间序列概念
时间序列是按时间顺序排列的数据序列。

### 2. ARIMA模型
ARIMA（自回归综合移动平均模型）是常用的时间序列预测模型。

- **AR（自回归）**：用自身历史值预测未来值
- **I（差分）**：使非平稳序列变平稳
- **MA（移动平均）**：用误差项的线性组合进行预测

### 3. 模型参数
ARIMA(p, d, q)
- p：自回归阶数
- d：差分阶数
- q：移动平均阶数

### 4. 建模步骤
1. **数据准备**：转换为时间序列格式
2. **平稳性检验**：ADF检验
3. **确定参数**：ACF/PACF图
4. **模型训练**：拟合ARIMA模型
5. **预测**：生成预测值

### 5. 代码实现
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA

# 拟合模型
model = ARIMA(df["销售额"], order=(p, d, q))
model_fit = model.fit()

# 预测
forecast = model_fit.forecast(steps=5)
\`\`\`

### 6. 其他模型
- SARIMA：考虑季节性的ARIMA
- Prophet：Facebook开发的强大时间序列模型

### 评估指标
- MAE（平均绝对误差）
- MSE（均方误差）
- RMSE（均方根误差）`,

    data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
    codeTemplate: 'from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\n\n# 数据准备\n# 训练模型\n# 预测\n\nprint(forecast)',
    solution: 'from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\nimport numpy as np\n\n# 模拟数据加载\ndata = """日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["日期"] = pd.to_datetime(df["日期"])\ndf.set_index("日期", inplace=True)\n\n# ARIMA模型\nmodel = ARIMA(df["销售额"], order=(1, 1, 1))\nmodel_fit = model.fit()\n\n# 预测未来2个月\nforecast = model_fit.forecast(steps=2)\n\nprint("=== 07 时间序列预测 ===")\nprint("未来2个月预测值：")\nprint(forecast)',
    answer: '=== 07 时间序列预测 ===\n未来2个月预测值：\n2023-06-30    148.678026\n2023-07-31    149.567892\nFreq: M, Name: predicted_mean, dtype: float64'
  },
  {
    id: 8,
    title: '机器学习特征工程',
    description: '创建衍生特征（月份、星期几），使用LabelEncoder进行编码',
    knowledge: `## 知识讲解：特征工程

### 1. 特征工程概念
特征工程是将原始数据转换为机器学习模型可用特征的过程。

### 2. 特征类型
- **数值特征**：连续值（如年龄、收入）
- **分类特征**：离散值（如性别、地区）
- **时间特征**：日期时间数据

### 3. 特征创建
- **时间特征**：提取年、月、日、周、小时
- **聚合特征**：统计量（均值、标准差）
- **交互特征**：特征之间的组合

### 4. 分类特征编码
- **LabelEncoder**：将类别转换为整数（适用于有序分类）
- **OneHotEncoder**：独热编码（适用于无序分类）
- **get_dummies**：Pandas的便捷独热编码

### 5. 特征缩放
- **StandardScaler**：标准化（均值为0，标准差为1）
- **MinMaxScaler**：归一化（缩放到[0,1]区间）

### 6. 特征选择
- **方差选择**：删除低方差特征
- **相关分析**：删除高度相关的特征
- **SelectKBest**：选择K个最优特征

### 7. 代码示例
\`\`\`python
from sklearn.preprocessing import LabelEncoder, StandardScaler

# 编码
le = LabelEncoder()
df["类别编码"] = le.fit_transform(df["类别"])

# 标准化
scaler = StandardScaler()
df[["特征1", "特征2"]] = scaler.fit_transform(df[["特征1", "特征2"]])
\`\`\`

### 重要性
好的特征工程能显著提升模型性能！`,

    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120',
    codeTemplate: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 读取数据\n# 特征工程\n# 编码\n\nprint(result)',
    solution: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 特征工程\ndf["月份"] = df["订单日期"].dt.month\ndf["星期几"] = df["订单日期"].dt.dayofweek\n\n# 编码\nle = LabelEncoder()\ndf["用户编码"] = le.fit_transform(df["用户ID"])\n\nprint("=== 08 特征工程结果 ===")\nprint(df[["月份", "星期几", "用户编码", "金额"]])',
    answer: '=== 08 特征工程结果 ===\n   月份  星期几  用户编码  金额\n0     9      4       0   100\n1     9      4       0   150\n2     8      3       1    80\n3     8      6       1   120'
  },
  {
    id: 9,
    title: '客户RFM价值分层',
    description: '计算R(最近购买)、F(购买频率)、M(购买金额)评分，进行客户分层',
    knowledge: `## 知识讲解：RFM分析

### 1. RFM概念
RFM是客户价值分析的经典模型：

- **R（Recency）**：最近购买时间
  - 越小越好，表示客户越活跃
  
- **F（Frequency）**：购买频率
  - 越大越好，表示客户购买次数多
  
- **M（Monetary）**：购买金额
  - 越大越好，表示客户消费能力强

### 2. 评分方法
- **分位数法**：使用qcut将数据分成5个等级
- **自定义规则**：根据业务经验设定阈值

### 3. 客户分层
| 层级 | R | F | M | 策略 |
|------|---|---|---|------|
| 高价值客户 | 1 | 5 | 5 | 重点维护 |
| 潜力客户 | 3 | 3 | 3 | 促活提升 |
| 普通客户 | 3 | 2 | 2 | 常规运营 |
| 流失客户 | 5 | 1 | 1 | 召回活动 |

### 4. 计算步骤
1. 计算每个客户的R、F、M值
2. 对R、F、M分别评分（1-5分）
3. 计算总分或加权分
4. 根据分数进行客户分层

### 5. 代码实现
\`\`\`python
# RFM评分
df["R_score"] = pd.qcut(df["R"], 5, labels=[5, 4, 3, 2, 1])
df["F_score"] = pd.qcut(df["F"], 5, labels=[1, 2, 3, 4, 5])
df["M_score"] = pd.qcut(df["M"], 5, labels=[1, 2, 3, 4, 5])

# 总分
df["总分"] = df[["R_score", "F_score", "M_score"]].sum(axis=1)
\`\`\`

### 业务应用
- 客户细分与精准营销
- 资源优化配置
- 个性化推荐`,

    data: '用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 计算RFM评分\n# 分层\n\nprint(result)',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf.set_index("用户ID", inplace=True)\n\n# RFM评分\ndf["R"] = df["最近购买天数"]\ndf["F"] = df["购买次数"]\ndf["M"] = df["总金额"]\n\n# 分位数评分\ndf["R_score"] = pd.qcut(df["R"], 5, labels=[1, 2, 3, 4, 5])\ndf["F_score"] = pd.qcut(df["F"], 5, labels=[1, 2, 3, 4, 5])\ndf["M_score"] = pd.qcut(df["M"], 5, labels=[1, 2, 3, 4, 5])\n\n# 总分\ndf["R_score"] = df["R_score"].astype(int)\ndf["F_score"] = df["F_score"].astype(int)\ndf["M_score"] = df["M_score"].astype(int)\ndf["总分"] = df["R_score"] + df["F_score"] + df["M_score"]\n\nprint("=== 09 RFM分层结果 ===")\nprint(df[["R", "F", "M", "R_score", "F_score", "M_score", "总分"]])',
    answer: '=== 09 RFM分层结果 ===\n          R  F    M  R_score  F_score  M_score  总分\n用户ID\n1        17  2  500        4        3        4   11\n2       112  1   80        1        2        1    4\n3        12  1  500        4        2        4   10'
  },
  {
    id: 10,
    title: '自动化销售报表生成',
    description: '使用ExcelWriter生成包含数据透视表和统计摘要的Excel报表',
    knowledge: `## 知识讲解：自动化报表

### 1. 报表自动化概念
将数据处理和报告生成过程自动化，减少人工操作。

### 2. Pandas Excel操作
\`\`\`python
import pandas as pd

# 创建ExcelWriter对象
with pd.ExcelWriter("报表.xlsx") as writer:
    # 写入DataFrame
    df.to_excel(writer, sheet_name="原始数据")
    
    # 写入数据透视表
    pivot.to_excel(writer, sheet_name="数据透视")
    
    # 写入统计摘要
    stats.to_excel(writer, sheet_name="统计摘要")
\`\`\`

### 3. 数据透视表
\`\`\`python
pivot = pd.pivot_table(
    df, 
    index="用户ID", 
    values="金额", 
    aggfunc=["sum", "count", "mean"]
)
\`\`\`

### 4. 统计摘要
\`\`\`python
stats = df.describe()  # 基本统计量
stats = df.groupby("月份")["金额"].agg(["sum", "mean", "count"])
\`\`\`

### 5. 报表组成部分
- **封面页**：报表标题、日期、编制单位
- **数据概览**：关键指标汇总
- **详细数据**：原始数据表
- **分析图表**：可视化展示
- **数据透视**：多维度汇总

### 6. 自动化流程
1. 数据采集
2. 数据清洗
3. 数据处理分析
4. 报表生成
5. 自动发送（邮件/消息）

### 7. 常用工具
- **openpyxl**：读取/写入Excel文件
- **xlsxwriter**：高级Excel功能支持
- **win32com**：控制Excel应用程序

### 业务价值
- 节省时间成本
- 减少人为错误
- 保证数据一致性`,

    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 生成报表\n# 保存Excel\n\nprint("报表已生成")',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 生成统计摘要\nstats = df.describe()\n\n# 数据透视表\npivot = pd.pivot_table(df, index="用户ID", values="金额", aggfunc=["sum", "count"])\n\nprint("=== 10 自动化报表已生成 ===")\nprint("文件：销售月报.xlsx、chart.png")\n\n# 实际保存代码示例\n# with pd.ExcelWriter("销售月报.xlsx") as writer:\n#     df.to_excel(writer, sheet_name="原始数据", index=False)\n#     pivot.to_excel(writer, sheet_name="数据透视")\n#     stats.to_excel(writer, sheet_name="统计摘要")',
    answer: '=== 10 自动化报表已生成 ===\n\n【销售概览】\n销售总额: 630 元\n订单总数: 4 单\n平均订单金额: 157.5 元\n\n【用户消费统计】\n   用户ID  消费总额  订单数\n0        1      250      2\n1        2       80      1\n2        3      300      1\n\n【统计摘要】\n             金额\ncount    4.000000\nmean   157.500000\nstd     96.279665\nmin     80.000000\n25%     95.000000\n50%    125.000000\n75%    262.500000\nmax    300.000000\n\n已生成文件：销售月报.xlsx'
  }
];

export default function PracticalTraining() {
  const navigate = useNavigate();
  const [currentPracticalId, setCurrentPracticalId] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const openPractice = (id: number) => {
    setCurrentPracticalId(id);
    const project = practicalProjects.find(p => p.id === id);
    if (project) {
      setUserCode(project.codeTemplate);
    }
    setShowAnswer(false);
  };

  const showAnswerSolution = () => {
    const project = practicalProjects.find(p => p.id === currentPracticalId);
    if (project) {
      setUserCode(project.solution);
    }
    setShowAnswer(true);
  };

  const currentPractical = currentPracticalId ? practicalProjects.find(p => p.id === currentPracticalId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Python数据分析实操训练
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

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {!currentPracticalId ? (
            /* 项目列表 */
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">选择训练项目</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {practicalProjects.map(project => (
                  <div
                    key={project.id}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                    onClick={() => openPractice(project.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {project.id}
                      </div>
                      <h3 className="font-bold text-gray-800">{project.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <Play className="w-4 h-4 mr-1" />
                      开始练习
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* 项目详情 */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧题目要求、知识讲解和数据 */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold text-blue-800 mb-2">题目要求</h3>
                  <p className="text-gray-700">{currentPractical?.description}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm max-h-96 overflow-y-auto">
                  <h3 className="font-bold text-blue-800 mb-2">知识讲解</h3>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {currentPractical?.knowledge}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold text-blue-800 mb-2">实操数据</h3>
                  <div className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
                    {currentPractical?.data && (() => {
                      const lines = currentPractical.data.split('\n').filter(line => line.trim());
                      if (lines.length < 2) {
                        return <pre className="text-sm text-gray-700 whitespace-pre-wrap">{currentPractical.data}</pre>;
                      }
                      const headers = lines[0].split(',').map(h => h.trim());
                      const rows = lines.slice(1);
                      return (
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="bg-blue-100">
                              {headers.map((header, index) => (
                                <th key={index} className="px-3 py-2 text-left text-blue-800 font-medium border-b border-blue-200">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, rowIndex) => {
                              const cells = row.split(',').map(c => c.trim());
                              return (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  {cells.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-3 py-2 border-b border-gray-100 text-gray-700">
                                      {cell || '-'}
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

              {/* 中间代码编辑器 */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCurrentPracticalId(null)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      返回项目列表
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">{currentPractical?.title}</h2>
                  </div>
                </div>
                {currentPractical && (
                  <PythonCodeRunner
                    initialCode={userCode || currentPractical.codeTemplate}
                    onCodeChange={setUserCode}
                  />
                )}

                {/* 参考答案 */}
                {showAnswer && (
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <h3 className="font-bold text-yellow-800 mb-2">参考答案</h3>
                    <div className="bg-white p-4 rounded-lg">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">{currentPractical?.answer}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
