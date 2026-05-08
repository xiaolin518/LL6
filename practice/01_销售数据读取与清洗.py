# ==============================================
# 项目1：销售数据读取与清洗
# 核心工具: read_csv, dropna, fillna, astype, drop_duplicates
# 业务目标: 数据完整性校验、格式统一、脏数据清理
# ==============================================

import pandas as pd
from io import StringIO

# 实操数据
data = """用户ID,订单日期,金额
1,2023-09-01,100
1,2023-09-15,150
2,,80
2,2023-08-10,80
3,2023-07-01,300
3,2023-07-10,300"""

# 读取数据
df = pd.read_csv(StringIO(data))
print("=== 原始数据 ===")
print(df)
print()

# 数据清洗
# 1. 删除空值
df_clean = df.dropna()

# 2. 处理异常值（金额限制在0-1000之间）
df_clean["金额"] = df_clean["金额"].clip(lower=0, upper=1000)

# 3. 统一日期格式
df_clean["订单日期"] = pd.to_datetime(df_clean["订单日期"])

print("=== 清洗结果 ===")
print(df_clean)
print()

# 数据类型转换示例
print("=== 数据类型 ===")
print(df_clean.dtypes)