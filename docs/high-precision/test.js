// 核心代码
function sub(A, B) {
    var C = [], t = 0;
    for(var i = 0; i < A.length; i ++) {
        t = A[i] - t;
        if(i < B.length) t -= B[i];
        C.push(t + 10 % 10);
        if(t < 0) t = 1;
        else t = 0;
    }
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