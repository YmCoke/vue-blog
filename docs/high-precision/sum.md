# 高精度加法

要求实现一个函数, 返回a + b(a和b是string类型, 返回结果为string类型)

对于答案来说, 每一位进行计算时有三个值会对当前位造成影响, 分别是第一个数的当前位, 第二个数的当前位, 上一位的进位. 我们可以通过模拟加法运算, 然后用代码进行实现

## 代码模板

```js
function func(a, b) {
    var A = [], B = [];
    // 将a和b的每一位摘出来, 放到数组中
    for(var i = a.length - 1; i >= 0; i --) A.push(+ a[i]); // 摘出来的同时将字符串类型转换为number类型
    for(var i = b.length - 1; i >= 0; i --) B.push(+ b[i]);

    var C = sum(A, B); // 进行加法操作, 返回一个答案数组. 为低位存储
    var res = "";
    for(var i = C.length - 1; i >= 0; i --) res += C[i];

    return res; 
}
// 核心代码
function sum(A, B) {
    if(A.length < B.length) return sum(B, A); // 保证我们处理的时候A的长度大于等于B
    var C = []; // 存储A和B每位计算的结果
    var last = 0; // 上一位是否有进位
    for(var i = 0; i < A.length; i ++) {
        var t = A[i] + last;
        if(i < B.length) t += B[i]; // 如果B还有剩余位数
        C.push(t % 10);
        if(t >= 10) last = 1;
        else last = 0;
    }
    if(last) C.push(1); // 在计算完最后一位后也要看一下是否有进位, 如500 + 500
    return C;
}
```

## 代码解析

1. 循环条件

```js
for(var i = 0; i < Alen || i < blen || t; i ++) {/**/}
```

在以下三种情况的时候, 我们仍需进行计算:
- A还存在没有计算的位
- B还存在没有计算的位
- 进位位不为空

分别举一下三面的三个例子

(1) 100 + 1

我们计算完个位后, 虽然B已经全部算完, 但是A还有十位百位没有计算

(2) 与(1)同理

(3) 500 + 500

当我们计算完个位, 十位, 百位后, 结果为000. 此时千位的存在上一位的进位1, 我们要将进位进行计算.

2. 进位值的计算

```js
if(t > 10) last = 1;
else last = 0;
```

t是由a, b相同位上相加得到的结果, 如果大于10, 证明需要进位, 即取1. 反之为0.

## 课后习题

虽然是链表题, 但核心思路是加法的模拟

[leetcode: 2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)