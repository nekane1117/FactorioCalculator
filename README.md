# FactorioCaliculator

- Factorio用生産設備数計算機(Ver 0.16)

## 出力サンプル
【原材料リスト】  
Copper_plate    1  
Iron_plate    2  
【生産ツリー】  
【サイエンスパック1】  
装置種類  : Assembly_Machine_2  
必要装置数 : 5  
必要生産速度 : 1  
━━【銅板】  
　　装置種類 : input  
　　必要装置数 : NaN  
　　必要生産速度 : 1  
━━【鉄の歯車】  
　　装置種類 : Assembly_Machine_2  
　　必要装置数 : 1  
　　必要生産速度 : 1  
━━━━【鉄板】  
　　　　装置種類 : input  
　　　　必要装置数 : NaN  
　　　　必要生産速度 : 2  

## 機能
- アイテム、生産速度を指定すると以下のものを計算できる
  1. 生産に必要な「原材料」の供給量(個/s)
  1. 「原材料」に至るまでの、各中間生成物の生産に必要な設備数
- 装置モード  
  1. MAXIMUM → 現時点での実装では組み立て機が3固定になる
  1. MINIMUM → 原材料の種類数によって組み立て機が2か3で切り替わる



## 制約  
- 「原材料」は以下とする
  1. 水(Water)
  1. 石炭(Coal)
  1. 原油(Crude_oil)
  1. 鉄板(Iron_plate)
  1. 銅板(Copper_plate)
  1. 鋼材(Steel_plate)
  1. 石(Stone)
  1. ウラン238(Uranium_238)
  1. ウラン235(Uranium_235)
  1. 石レンガ(Stone_brick)


- レシピが複数あるものは以下のレシピを使用する
  1. 原油精製 → 応用原油処理
  1. 固形燃料 → 軽油を固形燃料に


- 副産物の計算はしていない  
プロパンガスが欲しいときの軽油・重油の量など

- 軽油・重油の変換はしていない

- モジュール未対応
- レシピはWikiを見て作ったもの  
    [https://wikiwiki.jp/factorio/アイテム](Factorio@JP Wiki)
