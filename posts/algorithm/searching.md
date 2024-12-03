---
title: "探索・木"
excerpt: "アルゴリズムとデータ構造の学習メモ。探索・木編(5章,8章,9章)"
date: "2024-04-27"
hidden: true
tags:
  - "アルゴリズム"
  - "学習メモ"
---

# 探索

## 線形探索

- 計算量 $ O(n) $

配列の最初から愚直に探索していく。

```python
def linear_search(A, k):
    for i in range(len(A)):
        if A[i] == key:
            return i
    return -1
```

## 二分探索

- 計算量 $ Q(\log{n}) $

ソート済みの配列から、半分に分割しながら探索する。

```python
def binary_search(A, k):
    l, r = 0, len(A)
    while l < r:
        m = (l + r) // 2
        if A[m] == k:
            return m
        elif k < A[m]:
            r = m
        else:
            l = m + 1
    return -1
```
