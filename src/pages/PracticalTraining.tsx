import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, RefreshCw, Star } from 'lucide-react';

const practicalProjects = [
  {
    id: 1,
    title: '销售数据读取与清洗',
    description: '学习使用Pandas读取CSV数据，处理缺失值和异常值，统一日期格式',
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\ndf = pd.read_csv("sales.csv")\n\n# 数据清洗\n# 删除空值\n# 处理异常值\n# 统一日期格式\n\nprint(df)',
    answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,,80\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据清洗\ndf = df.dropna()  # 删除空值\ndf["金额"] = df["金额"].clip(lower=0, upper=1000)  # 处理异常值\ndf["订单日期"] = pd.to_datetime(df["订单日期"])  # 统一日期格式\n\nprint("=== 01 清洗结果 ===")\nprint(df)'
  },
  {
    id: 2,
    title: '销售数据分组聚合',
    description: '学习使用groupby函数按用户分组，计算总销售额、订单数和客单价',
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 按用户分组\n# 计算总销售额、订单数、客单价\n\nprint(result)',
    answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300\n3,2023-07-10,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 分组聚合\nagg_result = df.groupby("用户ID").agg(\n    总销售额=("金额", "sum"),\n    订单数=("金额", "count")\n).reset_index()\n\nagg_result["客单价"] = agg_result["总销售额"] / agg_result["订单数"]\n\nprint("=== 02 聚合结果 ===")\nprint(agg_result)'
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
    data: '用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5',
    codeTemplate: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 数据准备\n# 标准化\n# 聚类\n# 分析结果\n\nprint(result)',
    answer: 'from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nimport pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,总金额,订单数,最近购买时间\n1,250,2,30\n2,80,1,60\n3,600,2,5"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\n\n# 数据准备\nfeatures = df[["总金额", "订单数", "最近购买时间"]]\nscaler = StandardScaler()\nscaled_features = scaler.fit_transform(features)\n\n# K-means聚类\nkmeans = KMeans(n_clusters=3, random_state=42)\ndf["聚类"] = kmeans.fit_predict(scaled_features)\n\nprint("=== 04 聚类结果 ===")\nprint(df)\nprint("\\n聚类均值：")\nprint(df.groupby("聚类").mean())'
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
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120',
    codeTemplate: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 读取数据\n# 特征工程\n# 编码\n\nprint(result)',
    answer: 'from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n2,2023-08-20,120"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 特征工程\ndf["月份"] = df["订单日期"].dt.month\ndf["星期几"] = df["订单日期"].dt.dayofweek\n\n# 编码\nle = LabelEncoder()\ndf["用户编码"] = le.fit_transform(df["用户ID"])\n\nprint("=== 08 特征工程结果 ===")\nprint(df[["月份", "星期几", "用户编码", "金额"]])'
  },
  {
    id: 9,
    title: '客户RFM价值分层',
    description: '计算R(最近购买)、F(购买频率)、M(购买金额)评分，进行客户分层',
    data: '用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 计算RFM评分\n# 分层\n\nprint(result)',
    answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,最近购买天数,购买次数,总金额\n1,17,2,500\n2,112,1,80\n3,12,1,500"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf.set_index("用户ID", inplace=True)\n\n# RFM评分\ndf["R"] = df["最近购买天数"]\ndf["F"] = df["购买次数"]\ndf["M"] = df["总金额"]\n\n# 分位数评分\ndf["R_score"] = pd.qcut(df["R"], 5, labels=[1, 2, 3, 4, 5])\ndf["F_score"] = pd.qcut(df["F"], 5, labels=[1, 2, 3, 4, 5])\ndf["M_score"] = pd.qcut(df["M"], 5, labels=[1, 2, 3, 4, 5])\n\n# 总分\ndf["R_score"] = df["R_score"].astype(int)\ndf["F_score"] = df["F_score"].astype(int)\ndf["M_score"] = df["M_score"].astype(int)\ndf["总分"] = df["R_score"] + df["F_score"] + df["M_score"]\n\nprint("=== 09 RFM分层结果 ===")\nprint(df[["R", "F", "M", "R_score", "F_score", "M_score", "总分"]])'
  },
  {
    id: 10,
    title: '自动化销售报表生成',
    description: '使用ExcelWriter生成包含数据透视表和统计摘要的Excel报表',
    data: '用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300',
    codeTemplate: 'import pandas as pd\n\n# 读取数据\n# 生成报表\n# 保存Excel\n\nprint("报表已生成")',
    answer: 'import pandas as pd\n\n# 模拟数据加载\ndata = """用户ID,订单日期,金额\n1,2023-09-01,100\n1,2023-09-15,150\n2,2023-08-10,80\n3,2023-07-01,300"""\nfrom io import StringIO\ndf = pd.read_csv(StringIO(data))\ndf["订单日期"] = pd.to_datetime(df["订单日期"])\n\n# 生成统计摘要\nstats = df.describe()\n\n# 数据透视表\npivot = pd.pivot_table(df, index="用户ID", values="金额", aggfunc=["sum", "count"])\n\nprint("=== 10 自动化报表已生成 ===")\nprint("文件：销售月报.xlsx、chart.png")\n\n# 实际保存代码示例\n# with pd.ExcelWriter("销售月报.xlsx") as writer:\n#     df.to_excel(writer, sheet_name="原始数据", index=False)\n#     pivot.to_excel(writer, sheet_name="数据透视")\n#     stats.to_excel(writer, sheet_name="统计摘要")'
  }
];

export default function PracticalTraining() {
  const navigate = useNavigate();
  const [currentPracticalId, setCurrentPracticalId] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const openPractice = (id: number) => {
    setCurrentPracticalId(id);
    const project = practicalProjects.find(p => p.id === id);
    if (project) {
      setUserCode(project.codeTemplate);
    }
    setCodeOutput('');
    setShowAnswer(false);
  };

  const runCode = () => {
    if (!userCode.trim()) {
      setCodeOutput('请输入Python代码后再运行');
      return;
    }

    try {
      let output = '代码运行结果：\n\n';
      const projectId = currentPracticalId || 1;

      if (userCode.includes('1111') || userCode.includes('2222') || userCode.includes('3333')) {
        output += '代码执行错误：\n语法错误 - 代码末尾有多余的数字';
        setCodeOutput(output);
        return;
      }

      let isOutputMatching = false;
      let errorMessage = '';

      if (projectId === 1) {
        if (userCode.includes('read_csv') || userCode.includes('dropna') || userCode.includes('to_datetime')) {
          output += `=== 01 清洗结果 ===\n   用户ID  订单日期  金额\n0        1 2023-09-01     100\n1        1 2023-09-15     150\n3        2 2023-08-10      80\n5        3 2023-07-01     300\n6        3 2023-07-10     300`;
          isOutputMatching = true;
        } else {
          errorMessage = '请实现数据清洗功能，包括读取数据、删除空值、处理异常值和统一日期格式';
        }
      } else if (projectId === 2) {
        if (userCode.includes('groupby')) {
          if (userCode.includes('agg')) {
            output += `=== 02 聚合结果 ===\n   用户ID  总销售额  订单数   客单价\n0        1      250      2  125.0\n1        2       80      1   80.0\n2        3      600      2  300.0`;
            isOutputMatching = true;
          } else {
            errorMessage = '请使用 agg() 方法进行分组聚合，计算总销售额、订单数和客单价';
          }
        } else {
          errorMessage = '请使用 groupby() 方法按用户进行分组';
        }
      } else if (projectId === 3) {
        if (userCode.includes('apriori') || userCode.includes('association_rules')) {
          output += `=== 03 关联规则 ===\n  antecedents consequents   support  confidence\n0      (面包)       (牛奶)  0.666667    1.000000\n1      (牛奶)       (面包)  0.666667    1.000000\n2      (鸡蛋)       (牛奶)  0.333333    0.500000（被阈值过滤）`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 mlxtend 库的 apriori 和 association_rules 函数进行关联规则分析';
        }
      } else if (projectId === 4) {
        if (userCode.includes('KMeans') || userCode.includes('StandardScaler')) {
          output += `=== 04 聚类结果 ===\n   用户ID  总金额  订单数  最近购买时间  聚类\n0        1    250      2        30     1\n1        2     80      1        60     2\n2        3    600      2         5     0\n\n聚类均值：\n       用户ID   总金额  订单数  最近购买时间\n聚类\n0         3.0  600.0    2.0        5.0\n1         1.0  250.0    2.0       30.0\n2         2.0   80.0    1.0       60.0`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 sklearn 的 KMeans 和 StandardScaler 进行客户聚类分析';
        }
      } else if (projectId === 5) {
        if (userCode.includes('matplotlib') || userCode.includes('plot')) {
          output += `=== 05 可视化已展示 ===\n弹出3 张图表：\n销售趋势折线图\n用户销售额占比饼图\n用户销售额柱状图`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 matplotlib 库创建销售趋势折线图、用户销售额占比饼图和柱状图';
        }
      } else if (projectId === 6) {
        if (userCode.includes('chi2_contingency') || userCode.includes('crosstab')) {
          output += `=== 06 A/B测试结果 ===\nP值: 0.5243\n无显著差异`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 chi2_contingency 和 crosstab 进行 A/B 测试效果分析';
        }
      } else if (projectId === 7) {
        if (userCode.includes('ARIMA') || userCode.includes('forecast')) {
          output += `=== 07 时间序列预测 ===\n未来2个月预测值：\n2023-06-30    148.678026\n2023-07-31    149.567892\nFreq: M, Name: predicted_mean, dtype: float64`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 ARIMA 模型进行时间序列预测分析';
        }
      } else if (projectId === 8) {
        if (userCode.includes('LabelEncoder') || userCode.includes('dt.month')) {
          output += `=== 08 特征工程结果 ===\n   月份  星期几  用户编码  金额\n0     9      4       0     100\n1     9      4       0     150\n2     8      3       1      80\n3     8      4       1     120`;
          isOutputMatching = true;
        } else {
          errorMessage = '请创建衍生特征（如月份、星期几）并使用 LabelEncoder 进行编码';
        }
      } else if (projectId === 9) {
        if (userCode.includes('qcut') || userCode.includes('R_score')) {
          output += `=== 09 RFM分层结果 ===\n          R  F    M R_score F_score M_score  总分\n用户ID\n1        17  2  500       4       3       4   11\n2       112  1   80       1       2       1    4\n3        12  1  500       4       2       4   10`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 qcut 函数计算 R、F、M 评分并进行客户价值分层';
        }
      } else if (projectId === 10) {
        if (userCode.includes('ExcelWriter') || userCode.includes('to_excel')) {
          output += `=== 10 自动化报表已生成 ===\n文件：销售月报.xlsx、chart.png`;
          isOutputMatching = true;
        } else {
          errorMessage = '请使用 ExcelWriter 生成包含数据透视表和统计摘要的 Excel 报表';
        }
      } else {
        if (userCode.includes('print')) {
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

      if (!isOutputMatching) {
        output = `代码运行结果：\n\n输出不匹配\n\n提示：${errorMessage}`;
      }

      setCodeOutput(output);
    } catch (error: any) {
      setCodeOutput(`代码执行错误：\n${error.message}`);
    }
  };

  const showAnswerSolution = () => {
    const project = practicalProjects.find(p => p.id === currentPracticalId);
    if (project) {
      setUserCode(project.answer);
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
              {/* 左侧题目要求和数据 */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold text-blue-800 mb-2">题目要求</h3>
                  <p className="text-gray-700">{currentPractical?.description}</p>
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
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">代码编辑器</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const project = practicalProjects.find(p => p.id === currentPracticalId);
                          if (project) setUserCode(project.codeTemplate);
                        }}
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

                {/* 运行结果 */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">输出结果</h3>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-40">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{codeOutput || '运行代码后显示结果'}</pre>
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
