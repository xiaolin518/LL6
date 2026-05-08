# ==============================================
# 项目8：机器学习特征工程
# 核心工具: get_dummies, LabelEncoder, cut/qcut, corr, SelectKBest
# 业务目标: 衍生特征创建、分类变量编码、特征筛选与建模数据准备
# ==============================================

from sklearn.preprocessing import LabelEncoder, StandardScaler
import pandas as pd
from io import StringIO

# 实操数据
data = """用户ID,订单日期,金额,性别,城市
1,2023-09-01,100,男,北京
1,2023-09-15,150,男,北京
2,2023-08-10,80,女,上海
2,2023-08-20,120,女,上海
3,2023-07-01,300,男,广州
3,2023-07-10,250,男,广州"""

# 读取数据
df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])
print("=== 原始数据 ===")
print(df)
print()

# 特征工程

# 1. 时间特征
df["月份"] = df["订单日期"].dt.month
df["星期几"] = df["订单日期"].dt.dayofweek
df["是否周末"] = df["星期几"].apply(lambda x: 1 if x >= 5 else 0)

# 2. 分类特征编码
le = LabelEncoder()
df["性别编码"] = le.fit_transform(df["性别"])
df["城市编码"] = le.fit_transform(df["城市"])

# 3. 数值特征分箱
df["金额区间"] = pd.qcut(df["金额"], 3, labels=["低", "中", "高"])

# 4. 聚合特征
user_stats = df.groupby("用户ID").agg(
    总订单数=("金额", "count"),
    总金额=("金额", "sum"),
    平均金额=("金额", "mean")
).reset_index()

print("=== 特征工程结果 ===")
print(df[["用户ID", "月份", "星期几", "是否周末", "性别编码", "城市编码", "金额区间"]])
print()

print("=== 用户统计特征 ===")
print(user_stats)