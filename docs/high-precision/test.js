function div(a, b) {
    const A = [];
    for(var i = a.length - 1; i >= 0; i --) A.push(+ a[i]);
    /* 1. 将a的每一位摘出来, 以低位的方式存储到A数组中. 省略... */
    const C = [];
    let r = 0;
    for(let i = A.length - 1; i >= 0; i --) {
        r = r * 10 + A[i];
        C.push(Math.floor(r / b));
        r = r % b;
    }
    reverse(0, C.length - 1, C);
    while(C.length > 1 && C[C.length - 1] == 0) C.pop();

    let s = "";
    for(let i = C.length - 1; i >= 0; i --) s += C[i];
    return {r: r, s: s}
}
// 逆转数组的元素
function reverse(l, r, arr) {
    let i = l, j = r;
    while(i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i ++, j --;
    }
}