/**
 * Created by 海枯 on 2017/5/14.
 */
(function (line) {
    var input_arrays = line.split(' ');
    var row = +input_arrays[0];
    var lie = +input_arrays[1];
    input_arrays.splice(0, 2);

    var arr = [];
    for (var i = 0; i < row; i++) {
        var inner = [];
        for (var j = 0; j < lie; j++) {
            inner.push(+input_arrays[j+lie*i]);
        }
        arr.push(inner);
    }

    var result = [];

    /**
     *
     * @param sOuter 行开始index
     * @param sInner 列开始index
     * @param mW 最大行序号
     * @param mH 最大列序号
     */
    function dp(sInner, sOuter, mW, mH) {
        //最上面向右
        for (var wr = sInner; wr < mW; wr++) {
            if (result.indexOf(arr[sOuter][wr]) == -1) {
                result.push(arr[sOuter][wr]);
            }
        }
        //最上面向下
        for (var hb = sOuter + 1; hb < mH; hb++) {
            if (result.indexOf(arr[hb][mW - 1]) == -1) {
                result.push(arr[hb][mW - 1]);
            }
        }
        //最下面向左
        for (var wl = mW - 2; wl >= sInner; wl--) {
            if (result.indexOf(arr[mH - 1][wl]) == -1) {
                result.push(arr[mH - 1][wl]);
            }
        }
        //最下面向上
        for (var ht = mH - 2; ht > sOuter; ht--) {
            if (result.indexOf(arr[ht][sInner]) == -1) {
                result.push(arr[ht][sInner]);
            }
        }
        if (++sInner != --mW && ++sOuter != --mH) {
            dp(sInner, sOuter, mW, mH);
        }
//            console.log(result);
    }
//        console.log(arr);
    dp(0, 0, lie, row);
    console.log(result.join(' '));
})('3 4 1 2 3 4 5 6 7 8 9 10 11 13');