## 2017-04 WPS广州场笔试题分享与总结

声明：题解不代表最终答案，若有更好的实现方式或发现错误，请提PR更正

> A,B,C分别输出什么? 

```javascript
var arr = [];  
arr['a'] = 1;  
console.log(arr.length); // A  
arr['2'] = 2;  
console.log(arr.length); // B  
arr.length = 0;  
console.log(arr); // C  
```

> 要求每隔1秒钟按顺序输出i值 [题解](./2017-4-15WPS02.js)

```javascript
for (var i = 0; i < 5; i++) {  
    //在此处编写代码
}
```

> 如下代码运行结果是？

```javascript
var f = function g() {
    return 23;
};
typeof g(); //输出什么
```

> 以下代码运行结果是什么？

```javascript
function showCase(value) {
    switch (value) {
    case 'A':
        console.log(1);
        break;
    case 'string':
        console.log(2);
        break;
    case undefined:
        console.log(3);
        break;
    case 'undefined':
        console.log(4);
        break; 
    default:
        console.log(5);
        break;              
    }
}

showCase(new String('A'));
```

> 请用JavaScript实现map的数据结构，要求数据只能通过map提供的接口进行访问 [题解](./2017-4-15WPS04.js)

>  给定一个排好序的整数数组，判断其中是否存在两个数之和等于指定的值，时间复杂度最好能达到O(n)。例如：[1, 2, 3, 4, 5, 9], 指定值为12， 结果为true [题解](./2017-4-15WPS06.js)