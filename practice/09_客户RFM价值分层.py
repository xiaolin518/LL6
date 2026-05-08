# ==============================================
# 项目9：客户RFM价值分层
# 核心工具: pandas, datetime, quantile, merge
# 业务目标: 基于RFM模型对客户进行价值分层，识别高价值客户
# ==============================================

import pandas as pd
import numpy as np
from io import StringIO

# 实操数据
data = """用户ID,订单日期,订单金额
1001,2024-01-15,299
1001,2024-02-20,159
1001,2024-03-10,459
1002,2024-01-10,89
1002,2024-02-05,199
1003,2024-01-05,599
1003,2024-01-20,799
1003,2024-02-10,399
1003,2024-03-01,699
1004,2024-01-25,129
1005,2024-02-15,359
1005,2024-03-20,499
1006,2024-01-01,99
1006,2024-01-15,149
1006,2024-02-01,199
1006,2024-02-15,249
1006,2024-03-01,299
1007,2024-03-15,899
1008,2024-01-20,199
1008,2024-03-05,299
1009,2024-01-10,49
1010,2024-02-25,1599"""

# 读取数据
df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])
print("=== 原始数据 ===")
print(df)
print()

# 设定分析日期（假设为2024年3月25日）
analysis_date = pd.to_datetime("2024-03-25")

# 计算RFM指标
rfm = df.groupby("用户ID").agg(
    Recency=("订单日期", lambda x: (analysis_date - x.max()).days),
    Frequency=("订单日期", "count"),
    Monetary=("订单金额", "sum")
).reset_index()

print("=== RFM指标 ===")
print(rfm)
print()

# 定义评分标准
def r_score(x):
    if x <= 5: return 5
    elif x <= 15: return 4
    elif x <= 30: return 3
    elif x <= 60: return 2
    else: return 1

def fm_score(x):
    if x >= 500: return 5
    elif x >= 300: return 4
    elif x >= 200: return 3
    elif x >= 100: return 2
    else: return 1

# 计算RFM评分
rfm["R_Score"] = rfm["Recency"].apply(r_score)
rfm["F_Score"] = rfm["Frequency"].apply(fm_score)
rfm["M_Score"] = rfm["Monetary"].apply(fm_score)

# 计算总评分
rfm["RFM_Score"] = rfm["R_Score"] + rfm["F_Score"] + rfm["M_Score"]

# 客户分层
def customer_segment(row):
    if row["RFM_Score"] >= 12:
        return "高价值客户"
    elif row["RFM_Score"] >= 9:
        return "潜力客户"
    elif row["RFM_Score"] >= 6:
        return "普通客户"
    else:
        return "低价值客户"

rfm["客户分层"] = rfm.apply(customer_segment, axis=1)

print("=== 客户RFM分层结果 ===")
print(rfm[["用户ID", "Recency", "Frequency", "Monetary", "RFM_Score", "客户分层"]])
print()

# 统计各分层客户数量
segment_counts = rfm["客户分层"].value_counts()
print("=== 客户分层统计 ===")
print(segment_counts)