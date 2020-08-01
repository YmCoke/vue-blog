# 单调栈例题

原题连接: [LeetCode: 84. 柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

这道题目还是比较经典的, 听一些校招的同学说, 有一段时间该题十分频繁的出现在一些大厂的笔面试题目中.

## 题目分析

对于一道题目, 都是从**性质或者条件**入手, 观察有没有适合的数据结构和算法可以使用. 本题中: 条件**最大面积**就是我们要抓住的关键点.

求一个矩形的面积, 由小学知识可知: S = 底 * 高. 我们应该从底或者高的角度切入这道题目. 

我们先思考枚举所有的底, 也就是我们要用俩个变量i, j来标注当前枚举的底边的**起始位置和终止位置**. 然后该底边对应的高度最高可以是多少. 以此来计算出最大的矩形面积. 这样的时间复杂度是O(n ^ 2)的

接下来我们思考一下枚举所有的高度, 每个柱子有自己的高度, 枚举所有的高度是O(n)的复杂度, 然后对于每一个柱子而言, **以当前的高度向左右俩边扩充最多可以扩充多少, 就是该高度对应的最大矩形面积**. 可以发现, 可以向左右俩边扩充的最远地方是**第一个小于当前柱子高度的地方**. 我们可以惊奇的发现, 这是一个单调栈模型, 我们可以提前处理出每个柱子左边以及右边第一个小于当前高度的柱子的位置. 这需要俩次循环, 最后计算答案的时候又是一重循环, 总共是三重循环. 我们的时间复杂度是O(n)的.

## 代码实现

```js
/**
 * @param {number[]} heights
 * @return {number}
 */
Array.prototype.top = function () {
    return this[this.length - 1];
}

var largestRectangleArea = function(h) {
    const l = [], // l[i]表示第i个柱子左边第一个比它小的柱子的下标, 若没有则为-1
          r = [], // r[i]表示第i个柱子右边第一个比它小的柱子的下标, 若没有则为n
          n = h.length;
    let stk = []; // 单调栈, 
    for(let i = 0; i < n; i ++) {
        while(stk.length && h[i] <= h[stk.top()]) stk.pop();
        if(stk.length) l[i] = stk.top();
        else l[i] = -1;
        stk.push(i);
    }
    stk = [];
    for(let i = n - 1; i >= 0; i --) {
        while(stk.length && h[i] <= h[stk.top()]) stk.pop();
        if(stk.length) r[i] = stk.top();
        else r[i] = n;
        stk.push(i);
    }
    let ans = 0;
    for(let i = 0; i < n; i ++) {
        let len = r[i] - l[i] - 1; // 计算当前这根柱子最大的扩充长度, 即底边最多可以是多少.
        ans = Math.max(ans, len * h[i]);
    }
    return ans;
};
```

## 扩展题目

[leetcode: 85. 最大矩形](https://leetcode-cn.com/problems/maximal-rectangle/)

扩展题目是本章题目的扩展版, 实际就是从一维扩展到二维, 感兴趣的同学可以尝试一下.