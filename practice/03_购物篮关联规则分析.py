# ==============================================
# 项目3：购物篮关联规则分析
# 核心工具: mlxtend.frequent_patterns, itertools.combinations
# 业务目标: 热销搭配挖掘、强关联商品识别、支持度/置信度计算
# ==============================================

from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import pandas as pd
from io import StringIO

# 实操数据
data = """订单ID,商品
1,面包
1,牛奶
2,面包
2,牛奶
2,鸡蛋
3,牛奶
3,鸡蛋"""

# 读取数据
df = pd.read_csv(StringIO(data))
print("=== 原始数据 ===")
print(df)
print()

# 数据转换 - 转换为事务格式
basket = df.groupby("订单ID")["商品"].apply(list).tolist()
print("=== 事务数据 ===")
print(basket)
print()

# 转换为one-hot编码
te = TransactionEncoder()
te_ary = te.fit(basket).transform(basket)
df_encoded = pd.DataFrame(te_ary, columns=te.columns_)
print("=== One-hot编码 ===")
print(df_encoded)
print()

# 挖掘频繁项集
freq_items = apriori(df_encoded, min_support=0.3, use_colnames=True)
print("=== 频繁项集 ===")
print(freq_items)
print()

# 生成关联规则
rules = association_rules(freq_items, metric="confidence", min_threshold=0.5)
rules = rules.sort_values("confidence", ascending=False)

print("=== 关联规则 ===")
print(rules[["antecedents", "consequents", "support", "confidence", "lift"]])