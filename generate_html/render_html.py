import json
from jinja2 import Environment, FileSystemLoader

# JSONデータを読み込む
with open('titles.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# Jinja2テンプレート環境をセットアップ
env = Environment(loader=FileSystemLoader('.'))
template = env.get_template('template.html')

# HTMLを生成
rendered_html = template.render(items=items)

# 出力ファイルに保存
with open('output.html', 'w', encoding='utf-8') as f:
    f.write(rendered_html)

print("HTMLファイルを出力しました：output.html")
