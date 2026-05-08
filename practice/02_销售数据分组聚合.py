# ==============================================
# 项目2：销售数据分组聚合
# 核心工具: groupby, agg, sum, mean, count
# 业务目标: 多维度销售指标统计（销售额、销量、客单价）
# ==============================================

import pandas as pd
from io import StringIO

# 实操数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,2023-08-10,80
3,2023-07-01,300
3,2023-07-10,300"""

# 读取数据
df = pd.read_csv(StringIO(data))
df["订单日期"] = pd.to_datetime(df["订单日期"])
print("=== 原始数据 ===")
print(df)
print()

# 分组聚合
agg_result = df.groupby("用户ID").agg(
    总销售额=("金额", "sum"),
    订单数=("金额", "count")
).reset_index()

# 计算客单价
agg_result["客单价"] = agg_result["总销售额"] / agg_result["订单数"]

print("=== 聚合结果 ===")
print(agg_result)
print()

# 多维度聚合示例
print("=== 按月统计 ===")
df["月份"] = df["订单日期"].dt.month
monthly_stats = df.groupby("月份").agg(
    总销售额=("金额", "sum"),
    订单数=("金额", "count"),
    平均金额=("金额", "mean")
)
print(monthly_stats)