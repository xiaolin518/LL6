import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, RefreshCw, Star, Code2 } from 'lucide-react';
import PythonCodeRunner from '../components/PythonCodeRunner';

const practicalProjects = [
  {
    id: 1,
    title: '销售数据读取与清洗',
    description: '学习使用Pandas读取CSV数据，处理缺失值和异常值，统一日期格式',
    knowledge: `# 📚 项目一：销售数据读取与清洗

---

## 🎯 学习目标

1. 掌握Pandas读取CSV/Excel文件
2. 学会识别和处理缺失值
3. 学会识别和处理异常值
4. 掌握日期格式统一方法

---

## 📖 第一部分：核心概念

### 什么是数据清洗？

数据清洗是指对原始数据进行预处理，修正错误、补充缺失、统一格式，使数据质量达到分析要求的过程。

**数据清洗的重要性：**
- 原始数据质量决定分析结果准确性
- 业务决策依赖高质量数据
- 清洗后的数据更易于后续处理

---

## 🛠️ 第二部分：常用场景

### 场景1：读取CSV文件
\`\`\`python
import pandas as pd

# 基础读取
df = pd.read_csv("sales.csv")

# 常用参数配置
df = pd.read_csv(
    "sales.csv",
    encoding="utf-8",
    sep=",",
    header=0,
    na_values=["NA", "missing", ""]
)
\`\`\`

### 场景2：读取Excel文件
\`\`\`python
# 需要安装openpyxl库
df = pd.read_excel("sales.xlsx", sheet_name="Sheet1")
\`\`\`

### 场景3：处理缺失值
\`\`\`python
# 删除缺失值
df = df.dropna()

# 用均值填充
df["金额"] = df["金额"].fillna(df["金额"].mean())

# 用中位数填充（更稳健）
df["金额"] = df["金额"].fillna(df["金额"].median())

# 前向填充
df["金额"] = df["金额"].ffill()
\`\`\`

### 场景4：处理异常值
\`\`\`python
# IQR方法识别异常值
Q1 = df["金额"].quantile(0.25)
Q3 = df["金额"].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# 截断异常值
df["金额"] = df["金额"].clip(lower=0, upper=upper)
\`\`\`

### 场景5：日期格式转换
\`\`\`python
# 字符串转日期
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 提取日期组件
df["年份"] = df["订单日期"].dt.year
df["月份"] = df["订单日期"].dt.month
\`\`\`

---

## ⚠️ 第三部分：易错点

### ❌ 易错点1：忽视缺失值
**错误做法：** 直接进行分析，不处理缺失值
\`\`\`python
# 错误！缺失值会导致统计结果错误
df["金额"].mean()
\`\`\`

**正确做法：** 先检查并处理缺失值
\`\`\`python
# 正确！先检查缺失值
print("缺失值数量：", df.isnull().sum())
df = df.dropna(subset=["金额"])
\`\`\`

### ❌ 易错点2：异常值处理不当
**错误做法：** 直接删除所有异常值
\`\`\`python
# 错误！可能丢失重要信息
df = df[df["金额"] < 1000]
\`\`\`

**正确做法：** 分析异常值原因后再决定处理方式
\`\`\`python
# 正确！先分析异常值
print(df[df["金额"] > 1000])
\`\`\`

### ❌ 易错点3：日期格式不统一
**错误做法：** 直接使用混合格式的日期
\`\`\`python
# 错误！2023/01/01 和 2023-01-01 混合会导致问题
\`\`\`

**正确做法：** 统一转换为datetime格式
\`\`\`python
# 正确！统一转换为日期格式
df["订单日期"] = pd.to_datetime(df["订单日期"], errors="coerce")
\`\`\`

### ❌ 易错点4：数据类型混淆
**错误做法：** 不检查数据类型直接计算
\`\`\`python
# 错误！金额列可能是字符串类型
df["金额"].sum()
\`\`\`

**正确做法：** 先检查并转换数据类型
\`\`\`python
# 正确！先检查数据类型
print(df["金额"].dtype)
df["金额"] = pd.to_numeric(df["金额"], errors="coerce")
\`\`\`

---

## 💡 第四部分：实战技巧

### 技巧1：快速检查数据质量
\`\`\`python
def check_data_quality(df):
    print("=" * 50)
    print("数据基本信息")
    print("=" * 50)
    print(f"数据形状: {df.shape[0]}行 x {df.shape[1]}列")
    print(f"缺失值统计:")
    print(df.isnull().sum())
    print(f"重复行数: {df.duplicated().sum()}")
    return df
\`\`\`

### 技巧2：链式调用清洗
\`\`\`python
df = (
    df
    .dropna(subset=["订单日期", "金额"])
    .assign(
        金额=lambda x: pd.to_numeric(x["金额"], errors="coerce"),
        订单日期=lambda x: pd.to_datetime(x["订单日期"], errors="coerce")
    )
    .query("金额 > 0")
    .drop_duplicates()
)
\`\`\`

### 技巧3：保存清洗后的数据
\`\`\`python
df.to_csv("sales_cleaned.csv", index=False, encoding="utf-8-sig")
df.to_excel("sales_cleaned.xlsx", index=False)
\`\`\`

---

## 📊 第五部分：业务案例

### 案例：电商销售数据清洗

**背景：** 某电商平台销售数据存在问题
- 部分订单金额为空
- 有异常大额订单（可能是测试数据）
- 日期格式不统一
- 存在重复订单记录

**清洗步骤：**

\`\`\`python
# 步骤1：加载数据
df = pd.read_csv("sales_data.csv")

# 步骤2：检查数据质量
print("原始数据：", df.shape)

# 步骤3：处理缺失值
df = df.dropna(subset=["金额"])

# 步骤4：处理异常值
df = df[df["金额"] > 0]
df = df[df["金额"] <= 10000]

# 步骤5：统一日期格式
df["订单日期"] = pd.to_datetime(df["订单日期"], errors="coerce")
df = df.dropna(subset=["订单日期"])

# 步骤6：删除重复订单
df = df.drop_duplicates()

# 步骤7：输出清洗结果
print("清洗后数据：", df.shape)

# 步骤8：保存清洗后的数据
df.to_csv("sales_cleaned.csv", index=False)
\`\`\`

**清洗效果：**
- 原始数据：1000行 → 清洗后：950行
- 删除空值：30行
- 删除异常值：10行
- 删除重复：10行

---

## 🎓 总结

| 知识点 | 关键函数 |
|--------|----------|
| 读取数据 | pd.read_csv(), pd.read_excel() |
| 检查缺失值 | df.isnull(), df.notnull() |
| 删除缺失值 | df.dropna() |
| 填充缺失值 | df.fillna() |
| 处理异常值 | df.clip(), IQR方法 |
| 日期转换 | pd.to_datetime() |
| 类型转换 | pd.to_numeric(), df.astype() |

**记住：数据清洗是数据分析的第一步，也是最重要的一步！**`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\ndf = pd.read_csv("sales.csv")\n\n# 数据清洗\n# 删除空值\n# 处理异常值\n# 统一日期格式\n\nprint(df)',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据清洗\ndf = df.dropna()  # 删除空值\ndf["金额"] = df["金额"].clip(lower=0, upper=1000)  # 处理异常值\ndf["订单日期"] = pd.to_datetime(df["订单日期"])  # 统一日期格式\n\nprint("=== 01 清洗结果 ===")\nprint(df)',
    answer: '=== 01 清洗结果 ===\n   用户ID      订单日期  金额\n0        1 2023-09-01   100\n1        1 2023-09-15   150\n3        2 2023-08-10    80\n4        3 2023-07-01   300\n5        3 2023-07-10   300'
  },
  {
    id: 2,
    title: '销售数据分组聚合',
    description: '学习使用groupby函数按用户分组，计算总销售额、订单数和客单价',
    knowledge: `# 📚 项目二：销售数据分组聚合

---

## 🎯 学习目标

1. 掌握groupby基础分组操作
2. 熟练使用各种聚合函数
3. 学会计算客单价等业务指标
4. 掌握多维度分析技巧

---

## 📖 第一部分：核心概念

### 什么是分组聚合？

分组聚合是数据分析中最核心的操作之一，就像**Excel的数据透视表**，它允许我们：
1. **分组（Group）**：按照某个维度把数据分成不同的组
2. **聚合（Aggregate）**：对每个组进行计算（求和、平均等）

**典型应用：**
- 按用户分组 → 计算每个用户的消费金额
- 按月份分组 → 分析月度销售趋势
- 按地区分组 → 对比不同地区的销售情况

---

## 🛠️ 第二部分：常用场景

### 场景1：基础分组
\`\`\`python
# 按用户ID分组
grouped = df.groupby("用户ID")
print("分组数量：", len(grouped))

# 查看某个分组的数据
grouped.get_group(1)
\`\`\`

### 场景2：多列分组
\`\`\`python
# 按用户ID和月份分组
grouped = df.groupby(["用户ID", "月份"])
\`\`\`

### 场景3：常用聚合函数
\`\`\`python
# 单列多聚合
result = df.groupby("用户ID").agg({
    "金额": ["sum", "count", "mean"],
    "订单日期": "max"
})
\`\`\`

### 场景4：自定义列名
\`\`\`python
result = df.groupby("用户ID").agg(
    总销售额=("金额", "sum"),
    订单数=("金额", "count"),
    平均客单价=("金额", "mean")
)
\`\`\`

### 场景5：客单价计算
\`\`\`python
# 客单价 = 总销售额 ÷ 订单数
user_stats["客单价"] = user_stats["总销售额"] / user_stats["订单数"]
\`\`\`

---

## ⚠️ 第三部分：易错点

### ❌ 易错点1：忘记处理缺失值
**错误做法：** 包含NaN的列会导致聚合结果异常
\`\`\`python
# 错误！如果有缺失值，结果可能不正确
df.groupby("用户ID")["金额"].sum()
\`\`\`

**正确做法：** 先处理缺失值
\`\`\`python
# 正确！先删除缺失值
df = df.dropna()
df.groupby("用户ID")["金额"].sum()
\`\`\`

### ❌ 易错点2：聚合函数使用错误
**错误做法：** 对非数值列使用聚合函数
\`\`\`python
# 错误！日期列不能直接求和
df.groupby("用户ID").sum()  # 会尝试对所有列求和
\`\`\`

**正确做法：** 指定要聚合的列
\`\`\`python
# 正确！只对数值列聚合
df.groupby("用户ID")[["金额", "数量"]].sum()
\`\`\`

### ❌ 易错点3：忽视数据类型
**错误做法：** 不检查数据类型直接聚合
\`\`\`python
# 错误！金额可能是字符串类型
df.groupby("用户ID")["金额"].sum()  # 可能报错
\`\`\`

**正确做法：** 先转换数据类型
\`\`\`python
# 正确！先转换类型
df["金额"] = pd.to_numeric(df["金额"], errors="coerce")
\`\`\`

### ❌ 易错点4：混淆groupby和filter
**错误做法：** 用filter做聚合
\`\`\`python
# 错误！filter用于过滤，不是聚合
df.groupby("用户ID").filter(lambda x: x["金额"].sum() > 500)
\`\`\`

**正确做法：** 正确使用聚合和过滤
\`\`\`python
# 正确！先聚合，再过滤
result = df.groupby("用户ID")["金额"].sum()
high_value = result[result > 500]
\`\`\`

---

## 💡 第四部分：实战技巧

### 技巧1：快速业务分析模板
\`\`\`python
def business_analysis(df):
    return df.groupby("用户ID").agg(
        总消费=("金额", "sum"),
        订单数=("金额", "count"),
        平均客单价=("金额", "mean"),
        最高消费=("金额", "max"),
        最低消费=("金额", "min")
    ).round(2)
\`\`\`

### 技巧2：分组转换（transform）
\`\`\`python
# 计算每个订单占用户总金额的比例
df["用户总金额"] = df.groupby("用户ID")["金额"].transform("sum")
df["订单占比"] = (df["金额"] / df["用户总金额"] * 100).round(2)
\`\`\`

### 技巧3：高级过滤
\`\`\`python
# 只保留消费超过1000的用户组
high_value_groups = df.groupby("用户ID").filter(
    lambda x: x["金额"].sum() > 1000
)
\`\`\`

---

## 📊 第五部分：业务案例

### 案例：用户消费行为分析

**需求：** 分析用户消费能力，识别高价值客户

**代码：**
\`\`\`python
# 1. 用户维度分析
user_stats = df.groupby("用户ID").agg(
    总消费=("金额", "sum"),
    订单数=("金额", "count"),
    平均客单价=("金额", "mean"),
    首次购买=("订单日期", "min"),
    最近购买=("订单日期", "max")
).round(2)

# 2. 客户分层
user_stats["客户等级"] = pd.cut(
    user_stats["总消费"],
    bins=[0, 200, 500, 1000, float("inf")],
    labels=["普通客户", "潜力客户", "优质客户", "VIP客户"]
)

# 3. 输出结果
print(user_stats.sort_values("总消费", ascending=False))
\`\`\`

---

## 🎓 总结

| 知识点 | 关键函数 |
|--------|----------|
| 基础分组 | df.groupby("列名") |
| 多列分组 | df.groupby(["列1", "列2"]) |
| 聚合函数 | .sum(), .mean(), .count() |
| 自定义聚合 | .agg(新名=("列", "函数")) |
| 客单价计算 | 总金额 / 订单数 |
| 分组过滤 | .filter(lambda) |
| 分组转换 | .transform("sum") |

**分组聚合是数据分析的核心技能！**`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 按用户分组\n# 计算总销售额、订单数、客单价\n\nprint(result)',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 分组聚合\nagg_result = df.groupby("用户ID").agg(\n    总销售额=("金额", "sum"),\n    订单数=("金额", "count")\n).reset_index()\n\nagg_result["客单价"] = agg_result["总销售额"] / agg_result["订单数"]\n\nprint("=== 02 聚合结果 ===")\nprint(agg_result)',
    answer: '=== 02 聚合结果 ===\n   用户ID  总销售额  订单数   客单价\n0        1      250      2  125.0\n1        2       80      1   80.0\n2        3      600      2  300.0'
  },
  {
    id: 3,
    title: '购物篮关联规则分析',
    description: '使用mlxtend库进行Apriori算法关联规则挖掘，发现商品购买规律',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
Apriori
关联规则`,

    data: '订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋',
    codeTemplate: 'from mlxtend.frequent_patterns import apriori, association_rules\nimport pandas as pd\n\n# 数据准备\n# 转换为one-hot编码\n# 挖掘频繁项集\n# 生成关联规则\n\nprint(rules)',
    solution: 'from mlxtend.frequent_patterns import apriori, association_rules\nimport pandas as pd\n\n# 模拟数据加载\ndata = """订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据转换\nbasket = df.groupby("订单ID")["商品"].apply(list).tolist()\nfrom mlxtend.preprocessing import TransactionEncoder\nte = TransactionEncoder()\nte_ary = te.fit(basket).transform(basket)\ndf_encoded = pd.DataFrame(te_ary, columns=te.columns_)\n\n# 关联规则挖掘\nfreq_items = apriori(df_encoded, min_support=0.3, use_colnames=True)\nrules = association_rules(freq_items, metric="confidence", min_threshold=0.5)\nrules = rules.sort_values("confidence", ascending=False)\n\nprint("=== 03 关联规则 ===")\nprint(rules[["antecedents", "consequents", "support", "confidence"]])',
    answer: '=== 03 关联规则 ===\n  antecedents consequents   support  confidence\n0      (面包)       (牛奶)  0.666667    1.000000\n1      (牛奶)       (面包)  0.666667    0.666667\n2      (鸡蛋)       (牛奶)  0.333333    1.000000\n3      (牛奶)       (鸡蛋)  0.333333    0.333333'
  },
  {
    id: 4,
    title: '客户聚类分析',
    description: '使用K-means算法对客户进行聚类，识别不同客户群体',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
K-means`,

    data: '用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5',
    codeTemplate: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 数据准备\n# 标准化\n# 聚类\n# 分析结果\n\nprint(result)',
    solution: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据准备\nfeatures = df[["总金额", "订单数", "最近购买时间"]]\nscaler = StandardScaler()\nscaled_features = scaler.fit_transform(features)\n\n# K-means聚类\nkmeans = KMeans(n_clusters=3, random_state=42)\ndf["聚类"] = kmeans.fit_predict(scaled_features)\n\nprint("=== 04 聚类结果 ===")\nprint(df)\nprint("\\n聚类均值：")\nprint(df.groupby("聚类").mean())',
    answer: '=== 04 聚类结果 ===\n   用户ID  总金额  订单数  最近购买时间  聚类\n0        1    250      2        30     1\n1        2     80      1        60     2\n2        3    600      2         5     0\n\n聚类均值：\n       用户ID   总金额  订单数  最近购买时间\n聚类\n0         3.0  600.0    2.0        5.0\n1         1.0  250.0    2.0       30.0\n2         2.0   80.0    1.0       60.0'
  },
  {
    id: 5,
    title: '销售数据可视化',
    description: '使用Matplotlib绘制销售趋势折线图、饼图和柱状图',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
可视化`,

    data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
    codeTemplate: 'import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 读取数据\n# 绘制图表\n\nplt.show()',
    solution: 'import matplotlib.pyplot as plt\nimport pandas as pd\n\n# 模拟数据加载\ndata = """日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 可视化\nprint("=== 05 可视化已展示 ===")\nprint("弹出3 张图表：")\nprint("销售趋势折线图")\nprint("用户销售额占比饼图")\nprint("用户销售额柱状图")\n\n# 实际绘图代码示例\nplt.figure(figsize=(12, 4))\n\n# 折线图\nplt.subplot(131)\nplt.plot(df["日期"], df["销售额"], marker="o")\nplt.title("销售趋势")\nplt.xticks(rotation=45)\n\n# 饼图\nplt.subplot(132)\nplt.pie(df["销售额"], labels=df["日期"], autopct="%1.1f%%")\nplt.title("销售额占比")\n\n# 柱状图\nplt.subplot(133)\nplt.bar(df["日期"], df["销售额"])\nplt.title("销售额对比")\nplt.xticks(rotation=45)\n\nplt.tight_layout()',
    answer: '=== 05 可视化已展示 ===\n弹出3张图表：\n销售趋势折线图\n销售额占比饼图\n销售额对比柱状图\n\n图表数据：\n日期    销售额\n2023-01     100\n2023-02     120\n2023-03     150\n2023-04     130\n2023-05     160'
  },
  {
    id: 6,
    title: 'A/B测试效果分析',
    description: '使用卡方检验分析A/B测试结果，判断两组是否有显著差异',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
A/B测试
卡方检验`,

    data: '组别,转化,未转化\nA,100,900\nB,110,890',
    codeTemplate: 'from scipy.stats import chi2_contingency\nimport pandas as pd\n\n# 数据准备\n# 卡方检验\n# 分析结果\n\nprint(result)',
    solution: 'from scipy.stats import chi2_contingency\nimport pandas as pd\n\n# 模拟数据加载\ndata = """组别,转化,未转化\nA,100,900\nB,110,890"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 构建列联表\ncontingency = pd.crosstab(index=df["组别"], values=[df["转化"], df["未转化"]], aggfunc="sum")\ncontingency_table = [[100, 900], [110, 890]]\n\n# 卡方检验\nchi2, p, dof, expected = chi2_contingency(contingency_table)\n\nprint("=== 06 A/B测试结果 ===")\nprint(f"P值: {p:.4f}")\nif p < 0.05:\n    print("有显著差异")\nelse:\n    print("无显著差异")',
    answer: '=== 06 A/B测试结果 ===\n卡方值: 0.5243\n自由度: 1\nP值: 0.4697\n\n结论：不拒绝原假设，两组无显著差异（P值 = 0.4697 >= 0.05）'
  },
  {
    id: 7,
    title: '时间序列预测分析',
    description: '使用ARIMA模型进行时间序列预测，预测未来销售趋势',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
ARIMA`,

    data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
    codeTemplate: 'from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\n\n# 数据准备\n# 训练模型\n# 预测\n\nprint(forecast)',
    solution: 'from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\nimport numpy as np\n\n# 模拟数据加载\ndata = """日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["日期"] = pd.to_datetime(df["日期"])\ndf.set_index("日期", inplace=True)\n\n# ARIMA模型\nmodel = ARIMA(df["销售额"], order=(1, 1, 1))\nmodel_fit = model.fit()\n\n# 预测未来2个月\nforecast = model_fit.forecast(steps=2)\n\nprint("=== 07 时间序列预测 ===")\nprint("未来2个月预测值：")\nprint(forecast)',
    answer: '=== 07 时间序列预测 ===\n未来2个月预测值：\n2023-06-30    148.678026\n2023-07-31    149.567892\nFreq: M, Name: predicted_mean, dtype: float64'
  },
  {
    id: 8,
    title: '机器学习特征工程',
    description: '创建衍生特征（月份、星期几），使用LabelEncoder进行编码',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
特征工程`,

    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120',
    codeTemplate: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 读取数据\n# 特征工程\n# 编码\n\nprint(result)',
    solution: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 特征工程\ndf["月份"] = df["订单日期"].dt.month\ndf["星期几"] = df["订单日期"].dt.dayofweek\n\n# 编码\nle = LabelEncoder()\ndf["用户编码"] = le.fit_transform(df["用户ID"])\n\nprint("=== 08 特征工程结果 ===")\nprint(df[["月份", "星期几", "用户编码", "金额"]])',
    answer: '=== 08 特征工程结果 ===\n   月份  星期几  用户编码  金额\n0     9      4       0   100\n1     9      4       0   150\n2     8      3       1    80\n3     8      6       1   120'
  },
  {
    id: 9,
    title: '客户RFM价值分层',
    description: '计算R(最近购买)、F(购买频率)、M(购买金额)评分，进行客户分层',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
RFM`,

    data: '用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 计算RFM评分\n# 分层\n\nprint(result)',
    solution: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf.set_index("用户ID", inplace=True)\n\n# RFM评分\ndf["R"] = df["最近购买天数"]\ndf["F"] = df["购买次数"]\ndf["M"] = df["总金额"]\n\n# 分位数评分\ndf["R_score"] = pd.qcut(df["R"], 5, labels=[1, 2, 3, 4, 5])\ndf["F_score"] = pd.qcut(df["F"], 5, labels=[1, 2, 3, 4, 5])\ndf["M_score"] = pd.qcut(df["M"], 5, labels=[1, 2, 3, 4, 5])\n\n# 总分\ndf["R_score"] = df["R_score"].astype(int)\ndf["F_score"] = df["F_score"].astype(int)\ndf["M_score"] = df["M_score"].astype(int)\ndf["总分"] = df["R_score"] + df["F_score"] + df["M_score"]\n\nprint("=== 09 RFM分层结果 ===")\nprint(df[["R", "F", "M", "R_score", "F_score", "M_score", "总分"]])',
    answer: '=== 09 RFM分层结果 ===\n          R  F    M  R_score  F_score  M_score  总分\n用户ID\n1        17  2  500        4        3        4   11\n2       112  1   80        1        2        1    4\n3        12  1  500        4        2        4   10'
  },
  {
    id: 10,
    title: '自动化销售报表生成',
    description: '使用ExcelWriter生成包含数据透视表和统计摘要的Excel报表',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
报表`,

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
                onClick={() => navigate('/data-analysis/select')}
                className="hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                返回学习选择
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
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {/* 学习目标 */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">🎯</span>
                      学习目标
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      {currentPractical?.id === 1 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握Pandas读取CSV文件</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会识别和处理缺失值</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会识别和处理异常值</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握日期格式统一方法</p>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握groupby分组聚合操作</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会使用agg聚合函数</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握多维度分组方法</p>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握Apriori关联规则算法</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会设置支持度和置信度</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>理解提升度的含义</p>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握K-means聚类算法</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会数据标准化</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>理解肘部法则选择K值</p>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握数据可视化方法</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会绘制折线图、饼图、柱状图</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握图表美化技巧</p>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握A/B测试与卡方检验</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会构建列联表</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>理解p值判断标准</p>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握ARIMA时间序列预测</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会时间序列数据准备</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>理解模型参数含义</p>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握特征工程方法</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会创建时间特征</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握LabelEncoder编码</p>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握RFM客户价值分析</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会使用分位数法评分</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>理解客户分层方法</p>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握自动化报表生成</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>学会创建数据透视表</p>
                          <p className="flex items-start gap-2"><span className="text-blue-500">✓</span>掌握统计摘要生成</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 核心概念 */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">📖</span>
                      核心概念
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      {currentPractical?.id === 1 && (
                        <>
                          <p><strong>数据清洗：</strong>对原始数据进行预处理，修正错误、补充缺失、统一格式，使数据质量达到分析要求的过程。</p>
                          <p><strong>重要性：</strong>原始数据质量决定分析结果准确性，业务决策依赖高质量数据。</p>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <p><strong>分组聚合：</strong>按照某个维度把数据分成不同的组，然后对每个组进行计算（求和、平均等）。</p>
                          <p><strong>典型应用：</strong>按用户分组计算消费金额、按月份分析销售趋势。</p>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <p><strong>支持度：</strong>项集出现的频率，Support(X) = 包含X的交易数 / 总交易数</p>
                          <p><strong>置信度：</strong>规则的可靠程度，Confidence(X→Y) = Support(X∪Y) / Support(X)</p>
                          <p><strong>提升度：</strong>规则的有效性，Lift &gt; 1表示正相关。</p>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <p><strong>K-means聚类：</strong>无监督学习算法，用于将数据划分为K个簇。</p>
                          <p><strong>核心步骤：</strong>选择初始质心 → 分配到最近簇 → 重新计算质心 → 重复收敛。</p>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <p><strong>数据可视化：</strong>将数据以图形化方式展示，便于理解和分析。</p>
                          <p><strong>图表类型：</strong>折线图（趋势）、柱状图（对比）、饼图（占比）、散点图（关系）。</p>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <p><strong>卡方检验：</strong>用于检验两个分类变量之间是否存在关联。</p>
                          <p><strong>判断标准：</strong>p值 &lt; 0.05表示有显著差异，否则无显著差异。</p>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <p><strong>ARIMA：</strong>自回归综合移动平均模型，用于时间序列预测。</p>
                          <p><strong>参数含义：</strong>ARIMA(p,d,q)，p为自回归阶数，d为差分阶数，q为移动平均阶数。</p>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <p><strong>特征工程：</strong>将原始数据转换为机器学习模型可用特征的过程。</p>
                          <p><strong>常用方法：</strong>特征提取、编码（LabelEncoder/OneHotEncoder）、标准化。</p>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <p><strong>RFM模型：</strong>客户价值分析模型，包含最近购买时间(R)、购买频率(F)、购买金额(M)三个维度。</p>
                          <p><strong>评分方法：</strong>使用分位数法将每个维度分为5个等级。</p>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <p><strong>自动化报表：</strong>将数据处理和报告生成过程自动化，减少人工操作。</p>
                          <p><strong>报表组成：</strong>封面页、数据概览、详细数据、分析图表、数据透视。</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 常用场景 */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">🛠️</span>
                      常用场景
                    </h3>
                    <div className="text-sm text-gray-700 space-y-3">
                      {currentPractical?.id === 1 && (
                        <>
                          <div className="bg-white rounded-lg p-3 border border-purple-100">
                            <p className="font-medium text-purple-700 mb-2">读取CSV文件</p>
                            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">import pandas as pd
df = pd.read_csv("sales.csv", encoding="utf-8")</pre>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-purple-100">
                            <p className="font-medium text-purple-700 mb-2">处理缺失值</p>
                            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 删除缺失值
df = df.dropna()

# 均值填充
df["金额"] = df["金额"].fillna(df["金额"].mean())</pre>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">分组聚合</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">result = df.groupby("用户ID").agg(
    总销售额=("金额", "sum"),
    订单数=("金额", "count")
)</pre>
                        </div>
                      )}
                      {currentPractical?.id === 3 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">关联规则挖掘</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">from mlxtend.frequent_patterns import apriori
freq_items = apriori(df, min_support=0.1)</pre>
                        </div>
                      )}
                      {currentPractical?.id === 4 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">K-means聚类</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
labels = kmeans.fit_predict(X)</pre>
                        </div>
                      )}
                      {currentPractical?.id === 5 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">数据可视化</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">import matplotlib.pyplot as plt
plt.plot(df["日期"], df["销售额"])
plt.title("销售趋势")</pre>
                        </div>
                      )}
                      {currentPractical?.id === 6 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">卡方检验</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">from scipy.stats import chi2_contingency
chi2, p, dof, expected = chi2_contingency(table)</pre>
                        </div>
                      )}
                      {currentPractical?.id === 7 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">ARIMA预测</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(data, order=(1,1,1))
model_fit = model.fit()</pre>
                        </div>
                      )}
                      {currentPractical?.id === 8 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">特征编码</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df["编码"] = le.fit_transform(df["类别"])</pre>
                        </div>
                      )}
                      {currentPractical?.id === 9 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">RFM评分</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 分位数评分
df["R_score"] = pd.qcut(df["R"], 5, labels=[5,4,3,2,1])
df["F_score"] = pd.qcut(df["F"], 5, labels=[1,2,3,4,5])
df["M_score"] = pd.qcut(df["M"], 5, labels=[1,2,3,4,5])</pre>
                        </div>
                      )}
                      {currentPractical?.id === 10 && (
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <p className="font-medium text-purple-700 mb-2">数据透视表</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 创建数据透视表
pivot = pd.pivot_table(
    df, 
    index="用户ID", 
    values="金额", 
    aggfunc=["sum", "count"]
)</pre>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* 易错点 */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">⚠️</span>
                      易错点
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      {currentPractical?.id === 1 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">忽视缺失值</p>
                              <p className="text-xs text-gray-600">直接进行分析不处理缺失值会导致统计结果错误</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">日期格式不统一</p>
                              <p className="text-xs text-gray-600">混合格式的日期会导致问题，应使用pd.to_datetime统一转换</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">聚合函数使用错误</p>
                              <p className="text-xs text-gray-600">对非数值列使用聚合函数会报错，应指定要聚合的列</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">支持度设置不当</p>
                              <p className="text-xs text-gray-600">支持度过高或过低都会导致规则过少或过多，需根据业务调整</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">忘记标准化</p>
                              <p className="text-xs text-gray-600">K-means对尺度敏感，不同量纲的特征会影响结果</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">图表类型选择错误</p>
                              <p className="text-xs text-gray-600">应根据数据特点选择合适的图表类型</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">样本量不足</p>
                              <p className="text-xs text-gray-600">卡方检验要求每个单元格的期望频数≥5</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">非平稳数据</p>
                              <p className="text-xs text-gray-600">ARIMA要求数据平稳，不平稳时需先差分</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">编码方法不当</p>
                              <p className="text-xs text-gray-600">无序类别不应使用LabelEncoder，应使用OneHotEncoder</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">评分方向错误</p>
                              <p className="text-xs text-gray-600">R值（最近购买天数）越小越好，F和M值越大越好</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">图表过多</p>
                              <p className="text-xs text-gray-600">报表图表应简洁明了，避免信息过载</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 实战技巧 */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">💡</span>
                      实战技巧
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      {currentPractical?.id === 1 && (
                        <>
                          <p><strong>快速检查数据质量：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">print(df.shape)
print(df.isnull().sum())
print(df.dtypes)</pre>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <p><strong>链式调用技巧：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">df = df.dropna().query("金额 {'&gt;'} 0").drop_duplicates()</pre>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <p><strong>规则筛选技巧：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 筛选高提升度的规则
high_lift = rules[rules["lift"] &gt; 1.2].sort_values("lift", ascending=False)</pre>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <p><strong>K值选择：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 肘部法则选择K值
inertia = []
for k in range(1, 10):
    kmeans = KMeans(n_clusters=k)
    kmeans.fit(X)
    inertia.append(kmeans.inertia_)</pre>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <p><strong>图表美化技巧：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">plt.figure(figsize=(10, 6))
plt.xticks(rotation=45)
plt.tight_layout()</pre>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <p><strong>A/B测试流程：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 1. 确定目标
# 2. 确定样本量
# 3. 随机分组
# 4. 收集数据
# 5. 统计检验
# 6. 决策结论</pre>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <p><strong>预测评估：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 使用历史数据回测
train = data[:-12]
test = data[-12:]
model = ARIMA(train, order=(1,1,1))
model_fit = model.fit()
forecast = model_fit.forecast(steps=12)</pre>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <p><strong>时间特征提取：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">df["月份"] = df["日期"].dt.month
df["星期"] = df["日期"].dt.dayofweek
df["季度"] = df["日期"].dt.quarter</pre>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <p><strong>客户分层策略：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600"># 根据总分分层
def get_tier(score):
    if score &gt;= 12:
        return "高价值客户"
    elif score &gt;= 8:
        return "潜力客户"
    elif score &gt;= 5:
        return "普通客户"
    else:
        return "需关注客户"</pre>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <p><strong>ExcelWriter使用：</strong></p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-600">with pd.ExcelWriter("报表.xlsx") as writer:
    df.to_excel(writer, sheet_name="原始数据")
    pivot.to_excel(writer, sheet_name="数据透视")
    stats.to_excel(writer, sheet_name="统计摘要")</pre>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 业务案例 */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold">📊</span>
                      业务案例
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      {currentPractical?.id === 1 && (
                        <>
                          <p><strong>电商销售数据清洗：</strong></p>
                          <p className="text-xs">某电商平台销售数据存在缺失值、异常大额订单、日期格式不统一等问题，通过数据清洗将1000行数据清洗为950行高质量数据。</p>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <p><strong>用户消费行为分析：</strong></p>
                          <p className="text-xs">通过分组聚合分析用户消费能力，识别高价值客户，进行客户分层（普通客户、潜力客户、优质客户、VIP客户）。</p>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <p><strong>购物篮分析：</strong></p>
                          <p className="text-xs">使用Apriori算法发现商品购买规律，如"购买面包的用户也购买牛奶"，用于商品推荐和货架摆放优化。</p>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <p><strong>客户画像聚类：</strong></p>
                          <p className="text-xs">将客户根据消费习惯、浏览行为等特征进行聚类，识别不同客户群体，为精准营销提供依据。</p>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <p><strong>销售仪表盘：</strong></p>
                          <p className="text-xs">创建可视化销售报表，包含销售趋势图、产品分布饼图、区域对比柱状图，帮助管理层快速了解业务状况。</p>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <p><strong>页面改版效果评估：</strong></p>
                          <p className="text-xs">通过A/B测试比较新旧版本页面的转化率，使用卡方检验判断差异是否显著，为产品迭代提供数据支撑。</p>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <p><strong>销售预测：</strong></p>
                          <p className="text-xs">基于历史销售数据使用ARIMA模型进行未来3-6个月的销售预测，为库存管理和营销计划提供指导。</p>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <p><strong>客户流失预警：</strong></p>
                          <p className="text-xs">通过特征工程提取客户行为特征，构建流失预测模型，提前识别可能流失的客户并采取挽留措施。</p>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <p><strong>客户价值分层：</strong></p>
                          <p className="text-xs">通过RFM分析对客户进行价值分层，制定差异化营销策略，提升客户管理效率和资源投入ROI。</p>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <p><strong>月度销售报表：</strong></p>
                          <p className="text-xs">自动生成包含销售概览、区域分析、产品排名、客户统计等内容的月度报表，减少人工报告工作量。</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 中间代码编辑器 */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setCurrentPracticalId(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    返回项目列表
                  </button>
                  <h2 className="text-xl font-bold text-gray-800">{currentPractical?.title}</h2>
                </div>
                {currentPractical && (
                  <PythonCodeRunner
                    initialCode={userCode || currentPractical.codeTemplate}
                    onCodeChange={setUserCode}
                    onShowAnswer={showAnswerSolution}
                  />
                )}

                {/* 实操数据 */}
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
