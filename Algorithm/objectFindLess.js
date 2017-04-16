/**
 * Created by 海枯 on 2017/4/17.
 * 获取字符串中出现次数最少的字符
 */
function getRareChar(str) {
    let hash = {};
    // 将各个字符名字、首次出现位置及出现次数存到hash表
    for (let i = 0, len = str.length; i < len; i++) {
        // 如果hash[str[i]]不存在，则对其进行初始化
        hash[str[i]] = hash[str[i]] || {index: i, count: 0};
        hash[str[i]].count++; // count计数自增
    }
    // 因为哈希表不好排序，将它转成数组
    return Object.keys(hash).map(function (key) {
        return Object.assign({char: key}, hash[key]);
        // 根据count属性进行升序排序
    }).sort(function (a, b) {
        return a.count - b.count;
        // 取出count最小的
    }).filter(function (e, i, arr) {
        return e.count === arr[0].count;
        // 在count值最小的集合里面再根据index属性进行升序排序
    }).sort(function (a, b) {
        return a.index - b.index;
    })[0].char;
}
// 测试数据
var str = 'ablfdasfdarleoeorwqajhfdsafdlladaasrjhehafdalhewadadfahwesaew';
console.log(getRareChar(str));