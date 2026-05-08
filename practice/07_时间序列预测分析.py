# ==============================================
# 项目7：时间序列预测分析
# 核心工具: resample, rolling, shift, ARIMA/Prophet
# 业务目标: 销售趋势分析、季节性识别、月度/季度销量预测
# ==============================================

from statsmodels.tsa.arima.model import ARIMA
import pandas as pd
from io import StringIO

# 实操数据
data = """日期,销售额
2023-01,100
2023-02,120
2023-03,150
2023-04,130
2023-05,160
2023-06,180
2023-07,170
2023-08,190
2023-09,210
2023-10,200
2023-11,220
2023-12,250"""

# 读取数据
df = pd.read_csv(StringIO(data))
df["日期"] = pd.to_datetime(df["日期"])
df.set_index("日期", inplace=True)
print("=== 原始数据 ===")
print(df)
print()

# 查看统计信息
print("=== 统计摘要 ===")
print(df.describe())
print()

# ARIMA模型 (p=1, d=1, q=1)
model = ARIMA(df["销售额"], order=(1, 1, 1))
model_fit = model.fit()

# 预测未来3个月
forecast = model_fit.forecast(steps=3)
forecast_df = pd.DataFrame({"预测销售额": forecast})

print("=== 时间序列预测 ===")
print("未来3个月预测值：")
print(forecast_df)
print()

# 查看模型摘要
print("=== 模型摘要 ===")
print(model_fit.summary().tables[0])