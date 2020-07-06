# 高精度乘法

要求实现一个函数, 返回a * b, 提供其的低位存储数组A和B, 要求返回结果(string类型)

首先回忆一下小学乘法的运算过程

![](./src/mul-progress.jpg)

但是这种做法用代码并不好模拟, 我们采取一种变种的方式: 在每一位进行乘法运算的时, 不进位, 将结果保存在当前位置, 最后再低位到高位进行进位. 过程如下

![](./src/mul-code-progress.jpg)

## 代码模板

```js
function mul(a, b) {
    /* 1. 将a, b的每一位摘出来, 以低位的方式存储到A, B数组中. 省略... */
    const n = A.length, m = B.length;

    /* 2. 初始化一个长度为n + m, 值为0的数组用于存储a * b的结果 */
    const C = Array.from({length: n + m}, () => 0);

    /* 3. 将A * B不处理进位计算的结果存放在C数组中 */
    for(let i = 0; i < n; i ++)
        for(let j = 0; j < m; j ++)
            C[i + j] += A[i] * B[j];

    /* 4. 处理进位 */
    let t = 0;
    for(let i = 0; i < C.length; i ++) {
        C[i] += t;
        t = Math.floor(C[i] / 10);
        C[i] = C[i] % 10;
    }
    if(t) C[i].push(t);

    /* 5. 处理前导0 */
    while(C.length > 1 && C[C.length - 1] == 0) C.pop();

    /* 6. 获取答案, 返回答案 */
    let res = "";
    for(let i = C.length - 1; i >= 0; i --) res += C[i];
    return res;
}
```

## 代码解析

1. 为什么要初始化一个值都为0的数组C

在js语言中, 数组默认值为`undefined`. 如果没有初始化为0的话, 后续进行`C[i + j] += A[i] * B[j]`操作时, 计算出来的结果是NaN(undefined + 类型为number的值结果都是NaN)

2. C[i + j] += A[i] * B[j]的理解

这是一个规律, 建议自行手写一遍不进位乘法运算. 

## 课后习题

[leetcode: 43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)