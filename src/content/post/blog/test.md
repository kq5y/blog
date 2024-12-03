---
title: "テスト用ページ"
date: "2022-07-01"
tags:
  - "test_tag"
  - "test2_tag"
hidden: true
---

https://www.npmjs.com/package/rollup-preserve-directives

## 概要

これは概要です。  
改行した概要です。

### テスト

`test`というのは**test**であり、

```python
import test

print("test")
```

で*出力*できます。[^1]
[^1]: 注釈です

~~詳しくは[Link](https://example.com)を確認してください。~~

[Internal](/blog)

> 引用です

---

> > 更に<font color="Red">引用</font>です

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## $\KaTeX$

$$
y = 2x + 1
$$

$$
\int_{0}^{1} f(x) \ dx
= \lim_{n \to \infty} \dfrac{1}{n} \sum_{k=0}^{n-1} f \left (\dfrac{k}{n} \right)
$$

```math
\int_{0}^{1} f(x) \ dx
= \lim_{n \to \infty} \dfrac{1}{n} \sum_{k=0}^{n-1} f \left (\dfrac{k}{n} \right)
```

### テーブルのテスト

| col1 | col2 |
| ---- | ---- |
| val1 | val2 |

| th左 | th中央 | th右 |
| :--- | :----: | ---: |
| td   |   td   |   td |

### 箇条書きのテスト1

- val1
  - val11
  - val22
- val2
- val3

### 箇条書きのテスト2

1. yes1
   1. yes11
   1. yes22
1. yes2
1. yes3

### チェックリスト

- [ ] not checked
- [x] checked

### 折りたたみテスト

<details><summary>サンプルコード</summary>

```rb
puts 'Hello, World'
```

</details>
