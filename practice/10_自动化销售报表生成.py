# ==============================================
# 项目10：自动化销售报表生成
# 核心工具: pandas, groupby, pivot_table, openpyxl
# 业务目标: 自动生成周期性销售报表，包含多维度分析
# ==============================================

import pandas as pd
from io import StringIO

# 实操数据
data = """日期,地区,产品类别,销售额,利润
2024-01-05,华东,电子产品,2500,500
2024-01-05,华东,服装,1200,240
2024-01-05,华南,电子产品,1800,360
2024-01-05,华南,食品,800,160
2024-01-10,华东,电子产品,3200,640
2024-01-10,华北,服装,900,180
2024-01-10,华南,电子产品,2100,420
2024-01-15,华东,食品,600,120
2024-01-15,华北,电子产品,1500,300
2024-01-15,华南,服装,1100,220
2024-01-20,华东,服装,1800,360
2024-01-20,华北,食品,500,100
2024-01-20,华南,食品,700,140
2024-01-25,华东,电子产品,2800,560
2024-01-25,华北,电子产品,1200,240
2024-01-25,华南,电子产品,1900,380
2024-01-30,华东,食品,400,80
2024-01-30,华北,服装,700,140
2024-01-30,华南,服装,1300,260"""

# 读取数据
df = pd.read_csv(StringIO(data))
df["日期"] = pd.to_datetime(df["日期"])
print("=== 原始销售数据 ===")
print(df)
print()

# 1. 总体销售概览
total_sales = df["销售额"].sum()
total_profit = df["利润"].sum()
profit_margin = (total_profit / total_sales) * 100

print("=" * 40)
print("           销售报表概览")
print("=" * 40)
print(f"销售总额: {total_sales:>12,.0f} 元")
print(f"利润总额: {total_profit:>12,.0f} 元")
print(f"利润率:    {profit_margin:>12.2f} %")
print("=" * 40)
print()

# 2. 按地区汇总
regional_report = df.groupby("地区").agg(
    销售总额=("销售额", "sum"),
    利润总额=("利润", "sum"),
    订单数=("日期", "count")
).reset_index()

print("=== 按地区销售汇总 ===")
print(regional_report.to_string(index=False))
print()

# 3. 按产品类别汇总
category_report = df.groupby("产品类别").agg(
    销售总额=("销售额", "sum"),
    利润总额=("利润", "sum"),
    利润率=("利润", lambda x: (x.sum() / df.loc[x.index, "销售额"].sum()) * 100)
).reset_index()

print("=== 按产品类别销售汇总 ===")
print(category_report.to_string(index=False))
print()

# 4. 地区-产品交叉报表
cross_report = df.pivot_table(
    index="地区",
    columns="产品类别",
    values="销售额",
    aggfunc="sum",
    fill_value=0
)

print("=== 地区-产品交叉分析 ===")
print(cross_report)
print()

# 5. 每日销售趋势
daily_report = df.groupby("日期")["销售额"].sum().reset_index()
print("=== 每日销售趋势 ===")
print(daily_report.to_string(index=False))