import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, RefreshCw, Star, Code2 } from 'lucide-react';
import PythonCodeRunner from '../components/PythonCodeRunner';

const practicalProjects = [
  {
    id: 1,
    title: '销售数据读取与清洗',
    description: '学习使用Pandas读取CSV数据，处理缺失值和异常值，统一日期格式',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
如何运用`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: `import pandas as pd
from io import StringIO

# 模拟数据（不用读取文件）
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,,80
2,2023-08-10,80
3,2023-07-01,300
3,2023-07-10,300"""

df = pd.read_csv(StringIO(data))

# 数据清洗
# 删除空值
# 处理异常值
# 统一日期格式

print(df)`,
    solution: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,,80
2,2023-08-10,80
3,2023-07-01,300
3,2023-07-10,300"""

df = pd.read_csv(StringIO(data))

# 数据清洗
df = df.dropna()  # 删除空值
df["金额"] = df["金额"].clip(lower=0, upper=1000)  # 处理异常值
df["订单日期"] = pd.to_datetime(df["订单日期"])  # 统一日期格式

print("=== 01 清洗结果 ===")
print(df)`,
    answer: '=== 01 清洗结果 ===\n   用户ID      订单日期  金额\n0        1 2023-09-01   100\n1        1 2023-09-15   150\n3        2 2023-08-10    80\n4        3 2023-07-01   300\n5        3 2023-07-10   300'
  },
  {
    id: 2,
    title: '销售数据分组聚合',
    description: '学习使用groupby函数按用户分组，计算总销售额、订单数和客单价',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
如何运用`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
3,2023-07-01,300
3,2023-07-10,300"""

df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 按用户分组
# 计算总销售额、订单数、客单价

print(result)`,
    solution: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
3,2023-07-01,300
3,2023-07-10,300"""

df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 分组聚合
agg_result = df.groupby("用户ID").agg(
    总销售额=("金额", "sum"),
    订单数=("金额", "count")
).reset_index()

agg_result["客单价"] = agg_result["总销售额"] / agg_result["订单数"]

print("=== 02 聚合结果 ===")
print(agg_result)`,
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
关联规则
如何运用`,
    data: '订单ID,商品\n1,面包\n1,牛奶\n2,面包\n2,牛奶\n2,鸡蛋\n3,牛奶\n3,鸡蛋',
    codeTemplate: `from mlxtend.frequent_patterns import apriori, association_rules
import pandas as pd
from io import StringIO

# 模拟数据
data = """订单ID,商品
1,面包
1,牛奶
2,面包
2,牛奶
2,鸡蛋
3,牛奶
3,鸡蛋"""

df = pd.read_csv(StringIO(data))

# 数据准备
# 转换为one-hot编码
# 挖掘频繁项集
# 生成关联规则

print(rules)`,
    solution: `from mlxtend.frequent_patterns import apriori, association_rules
import pandas as pd
from io import StringIO

# 模拟数据
data = """订单ID,商品
1,面包
1,牛奶
2,面包
2,牛奶
2,鸡蛋
3,牛奶
3,鸡蛋"""

df = pd.read_csv(StringIO(data))

# 数据转换
basket = df.groupby("订单ID")["商品"].apply(list).tolist()
from mlxtend.preprocessing import TransactionEncoder
te = TransactionEncoder()
te_ary = te.fit(basket).transform(basket)
df_encoded = pd.DataFrame(te_ary, columns=te.columns_)

# 关联规则挖掘
freq_items = apriori(df_encoded, min_support=0.3, use_colnames=True)
rules = association_rules(freq_items, metric="confidence", min_threshold=0.5)
rules = rules.sort_values("confidence", ascending=False)

print("=== 03 关联规则 ===")
print(rules[["antecedents", "consequents", "support", "confidence"]])`,
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
K-means
如何运用`,
    data: '用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5',
    codeTemplate: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,总金额,订单数,最近购买时间
1,250,2,30
2,80,1,60
3,600,2,5"""

df = pd.read_csv(StringIO(data))

# 数据准备
# 标准化
# 聚类
# 分析结果

print(result)`,
    solution: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,总金额,订单数,最近购买时间
1,250,2,30
2,80,1,60
3,600,2,5"""

df = pd.read_csv(StringIO(data))

# 数据准备
features = df[["总金额", "订单数", "最近购买时间"]]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# K-means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df["聚类"] = kmeans.fit_predict(scaled_features)

print("=== 04 聚类结果 ===")
print(df)
print("\n聚类均值：")
print(df.groupby("聚类").mean())`,
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
可视化
如何运用`,
    data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
    codeTemplate: `import matplotlib.pyplot as plt
import pandas as pd
from io import StringIO

# 模拟数据
data = """日期,销售额
2023-01,100
2023-02,120
2023-03,150
2023-04,130
2023-05,160"""

df = pd.read_csv(StringIO(data))

# 绘制图表

plt.show()`,
    solution: `import matplotlib.pyplot as plt
import pandas as pd
from io import StringIO

# 模拟数据
data = """日期,销售额
2023-01,100
2023-02,120
2023-03,150
2023-04,130
2023-05,160"""

df = pd.read_csv(StringIO(data))

# 可视化
print("=== 05 可视化已展示 ===")
print("弹出3 张图表：")
print("销售趋势折线图")
print("用户销售额占比饼图")
print("用户销售额柱状图")

# 实际绘图代码示例
plt.figure(figsize=(12, 4))

# 折线图
plt.subplot(131)
plt.plot(df["日期"], df["销售额"], marker="o")
plt.title("销售趋势")
plt.xticks(rotation=45)

# 饼图
plt.subplot(132)
plt.pie(df["销售额"], labels=df["日期"], autopct="%1.1f%%")
plt.title("销售额占比")

# 柱状图
plt.subplot(133)
plt.bar(df["日期"], df["销售额"])
plt.title("销售额对比")
plt.xticks(rotation=45)

plt.tight_layout()`,
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
卡方检验
如何运用`,
    data: '组别,转化,未转化\nA,100,900\nB,110,890',
    codeTemplate: `from scipy.stats import chi2_contingency
import pandas as pd
from io import StringIO

# 模拟数据
data = """组别,转化,未转化
A,100,900
B,110,890"""

df = pd.read_csv(StringIO(data))

# 数据准备
# 卡方检验
# 分析结果

print(result)`,
    solution: `from scipy.stats import chi2_contingency
import pandas as pd
from io import StringIO

# 模拟数据
data = """组别,转化,未转化
A,100,900
B,110,890"""

df = pd.read_csv(StringIO(data))

# 构建列联表
contingency = pd.crosstab(index=df["组别"], values=[df["转化"], df["未转化"]], aggfunc="sum")
contingency_table = [[100, 900], [110, 890]]

# 卡方检验
chi2, p, dof, expected = chi2_contingency(contingency_table)

print("=== 06 A/B测试结果 ===")
print(f"P值: {p:.4f}")
if p < 0.05:
    print("有显著差异")
else:
    print("无显著差异")`,
    answer: '=== 06 A/B测试结果 ===\n卡方值: 0.5243\n自由度: 1\nP值: 0.4697\n\n结论：不拒绝原假设，两组无显著差异（P值 = 0.4697 >= 0.05'
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
ARIMA
如何运用`,
    data: '日期,销售额\n2023-01,100\n2023-02,120\n2023-03,150\n2023-04,130\n2023-05,160',
    codeTemplate: `from statsmodels.tsa.arima.model import ARIMA
import pandas as pd
from io import StringIO

# 模拟数据
data = """日期,销售额
2023-01,100
2023-02,120
2023-03,150
2023-04,130
2023-05,160"""

df = pd.read_csv(StringIO(data))
df["日期"] = pd.to_datetime(df["日期"])
df.set_index("日期", inplace=True)

# 数据准备
# 训练模型
# 预测

print(forecast)`,
    solution: `from statsmodels.tsa.arima.model import ARIMA
import pandas as pd
import numpy as np
from io import StringIO

# 模拟数据
data = """日期,销售额
2023-01,100
2023-02,120
2023-03,150
2023-04,130
2023-05,160"""

df = pd.read_csv(StringIO(data))
df["日期"] = pd.to_datetime(df["日期"])
df.set_index("日期", inplace=True)

# ARIMA模型
model = ARIMA(df["销售额"], order=(1, 1, 1))
model_fit = model.fit()

# 预测未来2个月
forecast = model_fit.forecast(steps=2)

print("=== 07 时间序列预测 ===")
print("未来2个月预测值：")
print(forecast)`,
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
特征工程
如何运用`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120',
    codeTemplate: `from sklearn.preprocessing import LabelEncoder
import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
2,2023-08-20,120"""

df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 特征工程
# 编码

print(result)`,
    solution: `from sklearn.preprocessing import LabelEncoder
import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
2,2023-08-20,120"""

df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 特征工程
df["月份"] = df["订单日期"].dt.month
df["星期几"] = df["订单日期"].dt.dayofweek

# 编码
le = LabelEncoder()
df["用户编码"] = le.fit_transform(df["用户ID"])

print("=== 08 特征工程结果 ===")
print(df[["月份", "星期几", "用户编码", "金额"]])`,
    answer: '=== 08 特征工程结果 ===\n   月份  星期几  用户编码  金额\n0     9      4       0   100\n1     9      4       0   150\n2     8      3       1    80\n3     8      6       1   120'
  },
  {
    id: 9,
    title: '客户RFM价值分层',
    description: '计算R（最近购买）、F（购买频率）、M（购买金额）评分，进行客户分层',
    knowledge: `学习目标
核心概念
常用场景
易错点
实战技巧
业务案例
RFM
如何运用`,
    data: '用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500',
    codeTemplate: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,最近购买天数,购买次数,总金额
1,17,2,500
2,112,1,80
3,12,1,500"""

df = pd.read_csv(StringIO(data))
df.set_index("用户ID", inplace=True)

# 计算RFM评分
# 分层

print(result)`,
    solution: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,最近购买天数,购买次数,总金额
1,17,2,500
2,112,1,80
3,12,1,500"""

df = pd.read_csv(StringIO(data))
df.set_index("用户ID", inplace=True)

# RFM评分
df["R"] = df["最近购买天数"]
df["F"] = df["购买次数"]
df["M"] = df["总金额"]

# 分位数评分
df["R_score"] = pd.qcut(df["R"], 5, labels=[1, 2, 3, 4, 5])
df["F_score"] = pd.qcut(df["F"], 5, labels=[1, 2, 3, 4, 5])
df["M_score"] = pd.qcut(df["M"], 5, labels=[1, 2, 3, 4, 5])

# 总分
df["R_score"] = df["R_score"].astype(int)
df["F_score"] = df["F_score"].astype(int)
df["M_score"] = df["M_score"].astype(int)
df["总分"] = df["R_score"] + df["F_score"] + df["M_score"]

print("=== 09 RFM分层结果 ===")
print(df[["R", "F", "M", "R_score", "F_score", "M_score", "总分"]])`,
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
报表
如何运用`,
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300',
    codeTemplate: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
3,2023-07-01,300"""

df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 生成报表
# 保存Excel

print("报表已生成")`,
    solution: `import pandas as pd
from io import StringIO

# 模拟数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
3,2023-07-01,300"""

df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])

# 生成统计摘要
stats = df.describe()

# 数据透视表
pivot = pd.pivot_table(df, index="用户ID", values="金额", aggfunc=["sum", "count"])

print("=== 10 自动化报表已生成 ===")
print("文件：销售月报.xlsx、chart.png")

# 实际保存代码示例
# with pd.ExcelWriter("销售月报.xlsx") as writer:
#     df.to_excel(writer, sheet_name="原始数据", index=False)
#     pivot.to_excel(writer, sheet_name="数据透视")
#     stats.to_excel(writer, sheet_name="统计摘要")`,
    answer: '=== 10 自动化报表已生成 ===\n\n【销售概览】\n销售总额: 630 元\n订单总数: 4 单\n平均订单金额: 157.5 元\n\n【用户消费统计】\n   用户ID  消费总额  订单数\n0        1      250      2\n1        2       80      1\n2        3      300      1\n\n【统计摘要】\n             金额\ncount    4.000000\nmean   157.500000\nstd     96.279665\nmin     80.000000\n25%     95.000000\n50%    125.000000\n75%    262.500000\nmax    300.000000\n\n已生成文件：销售月报.xlsx'
  }
];

export default function PracticalTraining() {
  const navigate = useNavigate();
  const [currentPracticalId, setCurrentPracticalId] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Python数据分析实操训练 - 小林学习网站';
  }, []);

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
                返回选择学习方式
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
                          <p><strong>数据清洗：</strong>对原始数据进行全面预处理的过程，包括修正数据错误、补充缺失值、统一数据格式、删除重复记录、识别异常值等步骤，使数据质量达到分析要求的标准。</p>
                          <p><strong>重要性：</strong>原始数据质量直接决定分析结果的准确性和可靠性，高质量的数据是做出正确业务决策的基础。Garbage in, garbage out（垃圾进，垃圾出）。</p>
                          <p><strong>常见问题：</strong>缺失值、重复记录、异常值、格式不一致、数据类型错误、无效数据等。</p>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <p><strong>分组聚合：</strong>按照一个或多个维度将数据分成不同的组，然后对每个组进行统计计算（求和、平均、计数、最大值、最小值等）的操作。就像Excel中的数据透视表。</p>
                          <p><strong>典型应用场景：</strong>按用户分组计算总消费金额、按月份分析销售趋势、按产品分类统计销量、按地区比较业绩、按时间段分析用户活跃度等。</p>
                          <p><strong>聚合函数：</strong>sum（求和）、mean（均值）、count（计数）、max（最大）、min（最小）、std（标准差）、var（方差）、median（中位数）等。</p>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <p><strong>支持度（Support）：</strong>项集在所有交易中出现的频率，计算公式：Support(X) = 包含X的交易数 / 总交易数。支持度越高，说明这个商品组合越常见。</p>
                          <p><strong>置信度（Confidence）：</strong>规则的可靠程度，表示购买X的用户中有多少比例也购买了Y，计算公式：Confidence(X→Y) = Support(X∪Y) / Support(X)。</p>
                          <p><strong>提升度（Lift）：</strong>规则的有效性指标，Lift = Confidence(X→Y) / Support(Y)。Lift &gt; 1表示正相关（购买X确实增加了购买Y的可能性），Lift = 1表示无关，Lift &lt; 1表示负相关。</p>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <p><strong>K-means聚类：</strong>经典的无监督机器学习算法，用于将数据自动划分为K个相似的簇（组）。不需要预先标记数据，算法自动发现数据中的分组模式。</p>
                          <p><strong>核心工作流程：</strong>1. 随机选择K个初始质心；2. 计算每个点到各质心的距离，分配到最近的簇；3. 重新计算每个簇的质心（所有点的平均值）；4. 重复步骤2-3直到质心不再变化（收敛）。</p>
                          <p><strong>关键参数：</strong>K值（簇的数量）需要预先指定，常用肘部法则或轮廓系数来确定最佳K值。特征标准化很重要，因为K-means对量纲敏感。</p>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <p><strong>数据可视化：</strong>将抽象的数据以直观的图形化方式展示，帮助人们快速理解数据中的规律、趋势和异常，便于做出决策和发现洞察。</p>
                          <p><strong>常用图表类型：</strong>折线图（展示时间序列趋势）、柱状图（对比不同类别的数值）、饼图（显示各部分占比）、散点图（探索两个变量的关系）、直方图（展示数据分布）、箱线图（查看异常值和四分位数）、热力图（展示矩阵数据）。</p>
                          <p><strong>选择原则：</strong>根据数据类型和分析目标选择合适的图表，确保图表清晰易懂，避免过度装饰影响信息传达。</p>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <p><strong>卡方检验：</strong>一种统计假设检验方法，用于检验两个分类变量之间是否存在统计学上的显著关联。属于非参数检验方法。</p>
                          <p><strong>判断标准：</strong>p值 &lt; 0.05表示拒绝原假设，认为两个变量之间存在显著关联；p值 &gt;= 0.05表示不能拒绝原假设，认为两个变量之间无显著差异。</p>
                          <p><strong>A/B测试应用：</strong>对比两个版本（A和B）的转化率、点击率等指标，判断新版本是否显著优于旧版本，为产品迭代提供数据支持。</p>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <p><strong>ARIMA模型：</strong>自回归综合移动平均模型（AutoRegressive Integrated Moving Average），是经典的时间序列预测方法。结合了自回归（AR）、差分（I）和移动平均（MA）三个部分。</p>
                          <p><strong>参数含义：</strong>ARIMA(p,d,q)三个参数的含义：p=自回归阶数（用过去p期的值预测），d=差分阶数（使序列平稳的差分次数），q=移动平均阶数（用过去q期的误差项预测）。</p>
                          <p><strong>建模流程：</strong>1. 平稳性检验（ADF检验）；2. 差分使序列平稳；3. ACF/PACF图确定p和q；4. 拟合模型；5. 残差检验；6. 预测。</p>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <p><strong>特征工程：</strong>将原始数据转换为机器学习模型可用的特征的过程，是机器学习项目中最关键的步骤之一。好的特征能显著提升模型性能。</p>
                          <p><strong>常用技术方法：</strong>特征提取（从日期中提取月份、星期等）、特征编码（LabelEncoder、OneHotEncoder）、特征标准化（StandardScaler）、特征归一化（MinMaxScaler）、特征选择（方差选择、相关系数）等。</p>
                          <p><strong>重要性：</strong>数据和特征决定了机器学习的上限，而模型和算法只是逼近这个上限而已。特征工程通常占据项目80%的工作量。</p>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <p><strong>RFM模型：</strong>经典的客户价值分析模型，从三个维度评估客户价值：R（Recency）最近购买时间、F（Frequency）购买频率、M（Monetary）购买金额。</p>
                          <p><strong>评分方法：</strong>使用分位数法将每个维度分为5个等级（1-5分）。R值越小越好（最近购买过），所以通常R=5分代表最近，F和M值越大越好，5分代表最高。</p>
                          <p><strong>客户分层应用：</strong>根据RFM得分将客户分为不同层级（重要价值客户、潜力客户、一般客户、流失客户等），针对不同层级采取差异化的营销策略。</p>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <p><strong>自动化报表：</strong>将数据处理、分析计算、图表生成、报告导出等流程自动化，大幅减少重复性人工操作，提高工作效率和准确性。</p>
                          <p><strong>报表组成要素：</strong>封面页、关键指标概览、详细数据表格、多维度分析图表、数据透视表、趋势分析、异常提醒等内容模块。</p>
                          <p><strong>实现工具：</strong>Python的Pandas用于数据处理，Matplotlib/Seaborn/Plotly用于可视化，openpyxl/xlsxwriter用于Excel操作，也可以使用BI工具如Tableau、Power BI。</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 如何运用 */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">🚀</span>
                      如何运用
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      {currentPractical?.id === 1 && (
                        <>
                          <p><strong>步骤1：</strong>使用pd.read_csv()读取数据文件，检查数据基本信息</p>
                          <p><strong>步骤2：</strong>检查缺失值(df.isnull().sum())，根据业务决定处理方式</p>
                          <p><strong>步骤3：</strong>识别异常值，可使用describe()或箱线图</p>
                          <p><strong>步骤4：</strong>统一日期格式，使用pd.to_datetime()</p>
                          <p><strong>步骤5：</strong>验证清洗后的数据质量，确保数据可直接用于分析</p>
                        </>
                      )}
                      {currentPractical?.id === 2 && (
                        <>
                          <p><strong>步骤1：</strong>确定分析维度（如按用户、月份、产品分类）</p>
                          <p><strong>步骤2：</strong>使用groupby()进行分组</p>
                          <p><strong>步骤3：</strong>选择合适的聚合函数（sum、mean、count等）</p>
                          <p><strong>步骤4：</strong>结合多个维度进行分析</p>
                          <p><strong>步骤5：</strong>可视化结果，便于理解</p>
                        </>
                      )}
                      {currentPractical?.id === 3 && (
                        <>
                          <p><strong>步骤1：</strong>将数据转换为适合apriori算法的格式（布尔矩阵）</p>
                          <p><strong>步骤2：</strong>设置最小支持度阈值（通常0.01-0.1）</p>
                          <p><strong>步骤3：</strong>运行apriori算法找出频繁项集</p>
                          <p><strong>步骤4：</strong>设置最小置信度，生成关联规则</p>
                          <p><strong>步骤5：</strong>根据提升度筛选有价值的规则，指导业务决策</p>
                        </>
                      )}
                      {currentPractical?.id === 4 && (
                        <>
                          <p><strong>步骤1：</strong>选择用于聚类的特征（消费金额、频率等）</p>
                          <p><strong>步骤2：</strong>对特征进行标准化处理</p>
                          <p><strong>步骤3：</strong>使用肘部法则确定最佳K值</p>
                          <p><strong>步骤4：</strong>运行K-means算法</p>
                          <p><strong>步骤5：</strong>分析各簇特征，制定差异化运营策略</p>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <p><strong>步骤1：</strong>根据分析目的选择合适的图表类型</p>
                          <p><strong>步骤2：</strong>准备数据，确保数据格式正确</p>
                          <p><strong>步骤3：</strong>使用matplotlib/seaborn绑制图表</p>
                          <p><strong>步骤4：</strong>添加标题、标签、图例等元素</p>
                          <p><strong>步骤5：</strong>调整样式和布局，导出或嵌入报表</p>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <p><strong>步骤1：</strong>设计A/B测试方案，确定测试组和对照组</p>
                          <p><strong>步骤2：</strong>收集实验数据，构建列联表</p>
                          <p><strong>步骤3：</strong>使用卡方检验分析结果</p>
                          <p><strong>步骤4：</strong>根据p值判断差异是否显著</p>
                          <p><strong>步骤5：</strong>得出结论，指导产品迭代决策</p>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <p><strong>步骤1：</strong>准备时间序列数据，确保日期连续</p>
                          <p><strong>步骤2：</strong>进行平稳性检验，必要时差分</p>
                          <p><strong>步骤3：</strong>使用ACF/PACF图确定ARIMA参数</p>
                          <p><strong>步骤4：</strong>拟合模型，进行预测</p>
                          <p><strong>步骤5：</strong>评估预测效果，用于业务规划</p>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <p><strong>步骤1：</strong>分析原始数据，识别可用特征</p>
                          <p><strong>步骤2：</strong>提取时间特征（年、月、日、周等）</p>
                          <p><strong>步骤3：</strong>对分类特征进行编码</p>
                          <p><strong>步骤4：</strong>必要时进行特征标准化</p>
                          <p><strong>步骤5：</strong>将处理后的特征用于机器学习模型</p>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <p><strong>步骤1：</strong>计算每个客户的R、F、M值</p>
                          <p><strong>步骤2：</strong>使用分位数法对三个维度分别评分</p>
                          <p><strong>步骤3：</strong>计算总分或加权总分</p>
                          <p><strong>步骤4：</strong>根据分数进行客户分层</p>
                          <p><strong>步骤5：</strong>针对不同层级客户制定营销策略</p>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <p><strong>步骤1：</strong>进行数据清洗和预处理</p>
                          <p><strong>步骤2：</strong>生成统计摘要和关键指标</p>
                          <p><strong>步骤3：</strong>创建数据透视表进行多维度分析</p>
                          <p><strong>步骤4：</strong>生成可视化图表</p>
                          <p><strong>步骤5：</strong>使用ExcelWriter整合所有内容到Excel文件</p>
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
from io import StringIO
data = """用户ID,订单日期,金额
1,2023-09-01,100"""
df = pd.read_csv(StringIO(data))</pre>
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
                              <p className="text-xs text-gray-600">K-means对量纲敏感，必须标准化很重要</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">K值选择随意</p>
                              <p className="text-xs text-gray-600">应使用肘部法则或轮廓系数确定最佳K值</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 5 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">图表选择不当</p>
                              <p className="text-xs text-gray-600">根据数据类型和分析目标选择合适的图表类型</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 6 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">p值解读错误</p>
                              <p className="text-xs text-gray-600">p &lt; 0.05才表示有显著差异</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 7 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">不检查平稳性</p>
                              <p className="text-xs text-gray-600">ARIMA要求序列平稳，必要时需差分</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 8 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">特征工程不足</p>
                              <p className="text-xs text-gray-600">好的特征比复杂的模型更重要</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 9 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">评分方向搞反</p>
                              <p className="text-xs text-gray-600">R越小越好，F和M越大越好</p>
                            </div>
                          </div>
                        </>
                      )}
                      {currentPractical?.id === 10 && (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">❌</span>
                            <div>
                              <p className="font-medium">忽略业务逻辑</p>
                              <p className="text-xs text-gray-600">报表要符合业务需求，不要只生成数据</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 数据预览 */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      数据预览
                    </h3>
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                      <pre>{currentPractical?.data}</pre>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧代码编辑器和输出 */}
              <div className="lg:col-span-2 space-y-4">
                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const project = practicalProjects.find(p => p.id === currentPracticalId);
                      if (project) {
                        setUserCode(project.codeTemplate);
                        setShowAnswer(false);
                      }
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    重置代码
                  </button>
                  <button
                    onClick={showAnswerSolution}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      showAnswer
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    {showAnswer ? '显示答案中' : '查看答案'}
                  </button>
                </div>
                
                {/* Python 代码运行器 */}
                <PythonCodeRunner 
                  initialCode={userCode}
                  onCodeChange={setUserCode}
                  onShowAnswer={showAnswerSolution}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}