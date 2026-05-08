# ==============================================
# 项目4：客户聚类分析
# 核心工具: StandardScaler, KMeans, silhouette_score
# 业务目标: 客户群体划分、高价值/流失/潜力客户识别、簇中心解读
# ==============================================

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import pandas as pd
from io import StringIO

# 实操数据
data = """用户ID,总金额,订单数,最近购买时间
1,250,2,30
2,80,1,60
3,600,2,5
4,400,3,15
5,120,1,45
6,800,4,10"""

# 读取数据
df = pd.read_csv(StringIO(data))
print("=== 原始数据 ===")
print(df)
print()

# 数据准备
features = df[["总金额", "订单数", "最近购买时间"]]

# 标准化
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# K-means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df["聚类"] = kmeans.fit_predict(scaled_features)

print("=== 聚类结果 ===")
print(df)
print()

# 计算轮廓系数
silhouette_avg = silhouette_score(scaled_features, df["聚类"])
print(f"=== 轮廓系数: {silhouette_avg:.3f} ===")
print()

# 分析各簇特征
print("=== 聚类均值 ===")
print(df.groupby("聚类").mean())