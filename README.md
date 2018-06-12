# FactorioCaliculator

-   Factorio用生産設備数計算機(Ver 0.16)

## デモ

-   [DEMO](https://nekane1117.github.io/FactorioCaliculator/)

## 出力サンプル

サイエンスパック1を1個/sで生産する場合の出力

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

-   アイテム、生産速度を指定すると以下のものを計算できる
    1.  生産に必要な「原材料」の供給量(個/s)
    2.  「原材料」に至るまでの、各中間生成物の生産に必要な設備数
-   装置モード  
    1.  MAXIMUM → 現時点での実装では組み立て機が3固定になる
    2.  NORMAL  → 原材料の種類数によって組み立て機が2または3に切り替わる
    3.  MINIMUM → 原材料の種類数によって組み立て機が1,2または3に切り替わる

## 制約

-   「原材料」は以下とする
    1.  原木(Row_wood)
    2.  水(Water)
    3.  石炭(Coal)
    4.  原油(Crude_oil)
    5.  鉄板(Iron_plate)
    6.  銅板(Copper_plate)
    7.  鋼材(Steel_plate)
    8.  石(Stone)
    9.  ウラン238(Uranium_238)
    10. ウラン235(Uranium_235)
    11. 石レンガ(Stone_brick)


-   レシピが複数あるものは以下のレシピを使用する
    1.  原油精製 → 応用原油処理
    2.  固形燃料 → 軽油を固形燃料に


-   副産物の計算はしていない  
    プロパンガスが欲しいときの軽油・重油の量など

-   軽油・重油の変換はしていない

-   Kovarex濃縮もしない

-   モジュール未対応
-   レシピはWikiを見て作ったもの  
      [Factorio@JP Wiki > アイテム](https://wikiwiki.jp/factorio/アイテム)
