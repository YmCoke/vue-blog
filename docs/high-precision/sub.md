# 高精度减法

经过上一篇的学习, 我们已经掌握了将一个字符串转换为低位存储到数组中的代码实现. 所以接下来省去这部操作, 直接对俩个低位存储的数组进行操作

要求实现一个函数, 返回a - b, 提供其的低位存储数组A和B, 要求返回结果(string类型)

减法操作与加法操作大同小异, 我们先看代码(优先关注核心代码的逻辑, 可以结合下方的解释进行理解)

## 代码模板

```js
// 核心代码
function sub(A, B) {
    var C = [], last = 0;
    for(var i = 0; i < A.length; i ++) {
        var t = A[i] - last;
        if(i < B.length) t -= B[i];
        C.push(t + 10 % 10);
        if(t < 0) last = 1;
        else last = 0;
    }
    // 去除前导0
    while(C.length > 1 && C[C.length - 1] == 0) C.pop();
    return C;
}
// 判断a是否大于等于b
function cmp(A, B) {
    if(A.length != B.length) return A.length > B.length;
    for(var i = A.length - 1; i >= 0; i --)
        if(A[i] != B[i]) return A[i] > B[i];
    return true;
}
function func(A, B) {
    var flag = 1, // 记录计算后的结果是整数or负数
        C = [];
    if(cmp(A, B)) C = sub(A, B);
    else {
        C = sub(B, A);
        flag = -1;
    }
    var res = "";
    for(var i = C.length - 1; i >= 0; i --) res += C[i];
    if(flag == -1) res = '-' + res;
    return res;
}
```

## 代码解析

1. cmp函数

相比加法运算, 减法运算引入了一个cmp函数. **用于判断A是否大于等于B**. 可以在我们计算之前提前预知计算的结果(是正or负). 

2. 核心逻辑

变量C用于存储我们的答案, last用于记录当前上一次运算是否有向高位借位, t用于记录当前计算过程的值

举个栗子:

```
A    34
B   -17
--------
C    x7 
```

在我们进行个位的运算时:

首先我们看当前位是否被上一位借位, 因为当前是个位, 所以last = 0

让```t = A[i] - B[i] = 4 - 7 = -7```

我们观察这行代码```C.push(t + 10 % 10);```, 若t是负数, 那么t将会被转换成正数. 若t为正数, t会保持不变. 所以说C[i]被赋予7

然后就是更新一下last的值, 若t < 0则证明我们向高位借位了, 若t > 0则证明我们没有向高位借位.

3. 去除前导0

举个例子:

```
A    11110
B   -11100
-----------
C    00010
```

最终计算出来C的结果是[0,1,0,0,0] 我们需要将前导0去除. 所以使用下面这句代码

```js
while(C.length > 1 && C[C.length - 1] == 0) C.pop();
```

但同时的, 若最终计算的结果是0, 我们不希望把剩下的唯一的0也删去, 所以判断条件引入了```C.length > 1```