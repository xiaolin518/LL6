# ==============================================
# 项目6：A/B测试效果分析
# 核心工具: groupby, crosstab, scipy.stats (T-test/Chi2)
# 业务目标: 实验数据统计、转化率差异显著性检验、P值解读与方案评估
# ==============================================

from scipy.stats import chi2_contingency
import pandas as pd
from io import StringIO

# 实操数据
data = """组别,转化,未转化
A,100,900
B,110,890"""

# 读取数据
df = pd.read_csv(StringIO(data))
print("=== 原始数据 ===")
print(df)
print()

# 计算转化率
df["转化率"] = df["转化"] / (df["转化"] + df["未转化"]) * 100
print("=== 转化率 ===")
print(df[["组别", "转化率"]])
print()

# 构建列联表
contingency_table = [[df.loc[0, "转化"], df.loc[0, "未转化"]], 
                     [df.loc[1, "转化"], df.loc[1, "未转化"]]]
print("=== 列联表 ===")
print(f"      转化  未转化")
print(f"组A   {df.loc[0, '转化']:4d}  {df.loc[0, '未转化']:4d}")
print(f"组B   {df.loc[1, '转化']:4d}  {df.loc[1, '未转化']:4d}")
print()

# 卡方检验
chi2, p, dof, expected = chi2_contingency(contingency_table)

print("=== A/B测试结果 ===")
print(f"卡方值: {chi2:.4f}")
print(f"自由度: {dof}")
print(f"P值: {p:.4f}")
print()

# 结论
alpha = 0.05
if p < alpha:
    print(f"结论：拒绝原假设，两组有显著差异（P值 = {p:.4f} < {alpha}）")
else:
    print(f"结论：不拒绝原假设，两组无显著差异（P值 = {p:.4f} >= {alpha}）")