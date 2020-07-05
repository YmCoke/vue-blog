# 归并排序

## 算法介绍

归并排序,它有两大核心操作.

一个是将数组一分为二,一个无序的数组成为两个数组.

另外一个操作就是,合二为一,将两个有序数组合并成为一个有序数组.

学习归并排序最为核心的就是需要掌握分而治之的思想.

## 算法过程

1. 找到中心点

2. 根据中心将当前数组分成俩个部分, 递归排序俩个部分

3. 拿到俩个排好序的数组, 对俩个排好序的数组进行合并

## 代码实现

```js
const tmp = [];
function merge_sort(l, r, nums) {
    if(l >= r) return ; // 边界处理, 当区间为1时直接返回

    // 1. 获取中心点坐标
    let mid = l + r >> 1;

    // 2。递归排序俩个区间
    merge_sort(l, mid), merge_sort(mid + 1, r);

    // 3. 合并俩个排好序的数组
    let i = l, j = mid + 1, k = 0;
    while(i <= mid && j <= r) {
        if(nums[i] <= nums[j]) tmp[k ++] = nums[i ++];
        else tmp[k ++] = nums[j ++];
    }
    while(i <= mid) tmp[k ++] = nums[i ++]; // 左区间还剩余元素
    while(j <= r) tmp[k ++] = nums[j ++]; // 右区间还剩余元素
    // 将临时数组中排好序的元素放回到nums的l ~ r区间中
    for(let i = l, j = 0; i <= r; i ++, j ++) nums[i] = tmp[j];
}
```

## 代码讲解

1. 为什么要在全局申明一个tmp数组

tmp数组也可以申明在局部, 但这样每次递归就会多创建一个变量, 递归结束后变成垃圾数据需要回收. 因为每次都是覆盖tmp的区间, 上次存放在tmp中的数据不会对本次造成影响, 所以可以放在全局可以进行复用. 

2. while循环这么多, 会不会造成性能影响

```js
while(i <= mid && j <= r) {
    if(nums[i] <= nums[j]) tmp[k ++] = nums[i ++];
    else tmp[k ++] = nums[j ++];
}
while(i <= mid) tmp[k ++] = nums[i ++];
while(j <= r) tmp[k ++] = nums[j ++];
```
这三个while循环是为了做一件事情, 将nums[l ~ mid]和nums[mid + 1 ~ r]俩区间的数字按照顺序放在tmp区间中.
W
在第一个while中, 每次都会取出nums[i]和nums[j]的最小值放在tmp数组中. 因为nums[l ~ mid]和nums[mid + 1 ~ r]是排好序的区间, 所以若nums[i]小于nums[j], 那就证明nums[i]是俩个区间的最小值, 反之是nums[j].

第二和第三个while循环只会有一个会触发, 因为当触发是要不是i > mid, 就是j > r. 这俩个while循环就是为了将剩余的没有放进tmp数组中的元素放到tmp数组中.

这整个过程实际上是让俩个指针遍历俩个区间, 时间复杂度是O(第一个区间长度 + 第二个区间长度)

## 复杂度分析

### 时间复杂度

归并排序的时间复杂度十分稳定, 就是O(NlogN). 每次都可以将数组平均拆分成俩半(分), 合并的时候遍历数组中的每个元素(并), 每层需要计算N次, 总共logN层, 所以时间复杂度是O(NlogN)的

### 空间复杂度

我们需要一个额外的数组空间临时存放排序的数组元素, 所以额外空间复杂度是O(N)

## 课后作业

### 模板题

[leetcode: 912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/)

### 扩展题

[剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)