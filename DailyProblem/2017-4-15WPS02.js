/**
 * Created by 海枯 on 2017/4/15.
 * 题目要求：
 * for (var i = 0; i < 5; i++) {
    //在此处编写代码
    //每隔1秒钟按顺序输出i值
}
 */

for (var i = 0; i < 5; i++) {
    (index => {
        setTimeout(() => {
            console.log(index);
        }, (index + 1) * 1000);
    })(i);
}
