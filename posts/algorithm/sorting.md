---
title: "ソート"
excerpt: "アルゴリズムとデータ構造の学習メモ。ソート編(3章,7章)"
createdDate: "2024-04-26 00:00:00"
tags:
  - "アルゴリズム"
  - "学習メモ"
---

↓ 比較ソートのシミュレーションを行うツール

https://tools.kq5.jp/simulation/sorting

## 挿入ソート

- 最悪計算量 $ O(n^2) $
- 平均計算量 $ O(n^2) $

1 から最後まで順に、その要素の左の要素に対し比較し、適切な位置に置く。

```python
def insertion_sort(A, N):
    for i in range(1, N):
        v = A[i]
        j = i - 1
        while j >= 0 and A[j] > v:
            A[j + 1] = A[j]
            j -= 1
        A[j + 1] = v
```

## バブルソート

- 最悪計算量 $ O(n^2) $
- 平均計算量 $ O(n^2) $

末尾の要素から最小値比較を行う。これをソートが完了するまで行う。

```python
def bubble_sort(A, N):
    flag = 1
    i = 0
    while flag:
        flag = 0
        for j in range(N-1, i, -1):
            if A[j] < A[j - 1]:
                A[j], A[j - 1] = A[j - 1], A[j]
                flag = 1
        i += 1
```

## 選択ソート

- 最悪計算量 $ O(n^2) $
- 平均計算量 $ O(n^2) $

未ソート部の最小値と未ソート部の先頭を入れ替える。これを`N-1`回行う。

```python
def selection_sort(A, N):
    for i in range(0, N):
        min_j = i
        for j in range(i, N):
            if A[j] < A[min_j]:
                min_j = j
        A[i], A[min_j] = A[min_j], A[i]
```

## マージソート

- 最悪計算量 $ O(n\log{n}) $
- 平均計算量 $ O(n\log{n}) $

再帰的に 2 つの部分配列に分割し、ソート済み配列を merge して統合する。

```python
def merge(A, l, m, r):
    nL = m - l + 1
    nR = r - m
    L = A[l:m + 1]
    R = A[m + 1:r + 1]
    i, j, k = 0, 0, l
    while i < nL and j < nR:
        if L[i] <= R[j]:
            A[k] = L[i]
            i += 1
        else:
            A[k] = R[j]
            j += 1
        k += 1
    while i < nL:
        A[k] = L[i]
        i += 1
        k += 1
    while i < nR:
        A[k] = R[j]
        j += 1
        k += 1

def merge_sort(A, l, r):
    if l < r:
        m = (l + r) // 2
        merge_sort(A, l, m)
        merge_sort(A, m + 1, r)
        merge(A, l, m, r)
```

## クイックソート

- 最悪計算量 $ O(n^2) $
- 平均計算量 $ O(n\log{n}) $

再帰的に、partition を用いて最後の要素を基準にし配列を 2 分し、quickSort を行う。

```python
def partition(A, p, r):
    x = A[r]
    i = p - 1
    for j in range(p, r):
        if A[j] <= x:
            i += 1
            A[i], A[j] = A[j], A[i]
    A[i + 1], A[r] = A[r], A[i + 1]
    return i + 1

def quick_sort(A, p, r):
    if p < r:
        q = partition(A, p, r)
        quick_sort(A, p, q - 1)
        quick_sort(A, q + 1, r)
```

## 計数ソート

- 最悪計算量 $ O(n+k) $

各要素の出現個数をカウントし、それに基づいてそれを用いて順々にソートする。

```python
def counting_sort(A, B, k):
    C = [0] * (k + 1)
    for j in range(len(A)):
        C[A[j]] += 1
    for i in range(1, k + 1):
        C[i] += C[i - 1]
    for j in range(len(A) - 1, -1, -1):
        B[C[A[j]] - 1] = A[j]
        C[A[j]] -= 1
```

## コムソート

- 最悪計算量 $ O(n^2) $
- 平均計算量 $ O(n\log{n}) $

バブルソートの改良版。適当な間隔で整列後、間隔を少しずつ狭めて整列していく。

## 基数ソート

- 最悪計算量 $ O(nk) $
- 平均計算量 $ O(nk) $

下の桁から順番にソートし、最後に最上位桁でソートする。

## シェルソート

- 最悪計算量 $ O(n^{1.5}) $
- 平均計算量 $ O(n\log{n}) $

挿入ソートの改良版。配列の中である程度間隔が離れた要素の組ごとに挿入ソートを行い、間隔を小さくしながら同様のソートを繰り返す。
