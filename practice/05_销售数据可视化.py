# ==============================================
# 项目5：销售数据可视化
# 核心工具: plot, bar, pie, line (Pandas内置), matplotlib, seaborn
# 业务目标: 销售趋势、地区分布、品类占比可视化，图表叙事与洞察总结
# ==============================================

import matplotlib.pyplot as plt
import pandas as pd
from io import StringIO

# 实操数据
data = """日期,销售额
2023-01,100
2023-02,120
2023-03,150
2023-04,130
2023-05,160
2023-06,180"""

# 读取数据
df = pd.read_csv(StringIO(data))
print("=== 原始数据 ===")
print(df)
print()

# 创建画布
plt.figure(figsize=(15, 5))

# 1. 折线图 - 销售趋势
plt.subplot(131)
plt.plot(df["日期"], df["销售额"], marker="o", color="#3B82F6", linewidth=2)
plt.title("销售趋势", fontsize=12)
plt.xlabel("月份")
plt.ylabel("销售额")
plt.xticks(rotation=45)
plt.grid(True, linestyle="--", alpha=0.7)

# 2. 饼图 - 销售额占比
plt.subplot(132)
plt.pie(df["销售额"], labels=df["日期"], autopct="%1.1f%%", 
        colors=["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"])
plt.title("销售额占比", fontsize=12)

# 3. 柱状图 - 销售额对比
plt.subplot(133)
plt.bar(df["日期"], df["销售额"], color="#3B82F6")
plt.title("销售额对比", fontsize=12)
plt.xlabel("月份")
plt.ylabel("销售额")
plt.xticks(rotation=45)

# 调整布局
plt.tight_layout()

# 显示图表
print("=== 图表已生成 ===")
plt.show()