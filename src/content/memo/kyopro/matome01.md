---
title: "競プロまとめ#01"
excerpt: "競プロの学習メモ"
date: "2024-10-06"
tags:
  - "競技プログラミング"
  - "学習メモ"
---

## 全探索

考えられる全てのパターンを試す方法。制約がゆるい場合に使える。

### bit全探索

`0, 1, 10, 11, 100, 101, 110, 111` のように全ての組み合わせを試す方法。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    int n = 3;
    for(int bit = 0; bit < (1 << n); bit++){
        for(int i = 0; i < n; i++){
            if(bit & (1 << i)){
                cout << "1" << endl;
            } else {
                cout << "0" << endl;
            }
        }
    }
}
```

### 組み合わせ全探索

`{0, 1, 2, 3}` のような配列から、全ての組み合わせを試す方法。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    vector<int> a = {1, 2, 3, 4};
    do {
        for(int i = 0; i < a.size(); i++){
            cout << a.at(i) << " ";
        }
        cout << endl;
    } while(next_permutation(a.begin(), a.end()));
}
```
