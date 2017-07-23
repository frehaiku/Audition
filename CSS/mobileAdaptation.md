# 移动端适配的相关概念以及几种方案总结

## 适配相关概念

1. **布局视口（layout viewport）**：html元素的上一级容器即顶级容器，用于解决页面在手机上显示的问题。大部分移动设备都将这个视口分辨率设置为`980px`，所以PC上的网页基本上能在手机上呈现，只不过看上去很小，一般默认可以通过手动缩放网页。获取当前布局视口用`document.documentElement.clientWidth`
2. **视觉视口（visual viewport）**：指用户可见页面区域，即屏幕显示器的物理像素。获取当前的视觉视口可以用`window.innerWidth`
3. **理想视口（ideal viewport）**：也就是我们通常说的屏幕分辨率。比如Iphone5屏幕分辨率是320。

## 使用viewport元标签控制布局

如下的viewport元标签的属性  
`<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">`

以下是每个属性的介绍：

属性名 | 取值 | 描述 
------| ----- | -----
width | 正整数或device-width | 定义**layout viewport**的值
height | 正整数或`device-height` | 定义viewport `height`，单位为像素，一般不用
initial-scale | [0,0 - 10.0] | 定义初始缩放值。比如：设置`initial-width=1.5` 就是将`visual viewport`设置成`ideal viewport`宽度的`1 /1.5倍`。
maximum-scale | [0.0 - 10.0 ] | 用户能够放大的最大比例
minimum-scale | [0,0 - 10.0] | 用户能缩小的最小比例，一般不设置，因为太小的字不方便阅读
user-scalable | yes/no | 定义是否允许用户手动缩放页面，默认值为yes

`width`的详细介绍：设置为`device-width`时表示`layout viewport`的宽度等于`ideal viewport`的值。同时设置`width`与`intital-scale`时，最终的视口宽度等于两者较大的那一个。也就是说①当`layout viewport`小于`visual viewport`时，视口宽度最终是`visual viewport`的值（经测试，`layout viewport`的值**也会**自动变成`visual viewport`）②当`layout viewport`大于`visual viewport`时，视口宽度最终是`layout viewport`的值（经测试，`visual viewport`的值**不会**变成这时`layout viewport`的值）

`initial-scale`的详细介绍：**缩放比例 = `ideal layout` / `visual layout`** 。`ideal viewport`是不会改变的，这个值是为了改变`visual viewport`。缩放比例也有默认值，没有设置`initial-scale`时，浏览器会取适当的缩放比例使`布局视口`正好铺满屏幕即有 **可视视口（visual viewport）尺寸=理想视口尺寸（ideal viewport）**。也就是说设置`width=device-width`与设置`initial-scale=1.0`效果相同。

## 方案

1. 荔枝FM的方案：将`layout viewport`定义为设计稿的宽度，这样的好处在于css像素对应设计稿的px（以640px为例），不需要进行单位换算。但是有几点需要注意的地方。
    1. 为了保证最终的视口的值都是640px，而不会变成其他值（前面说过，最终视口的值会取width与initial-scale属性的最大值）。要把`visual viewport`设置成与`layout viewport`一样大，即设置`initial-scale`的值为 `ideal viewport / 640`。之前也有一个属性代替了这个操作，`target-densitydpi=device-dpi`,但资料显示`target-densitydpi=device-dpi`是一个被抛弃的属性，不推荐使用
    
2. 网易的纯REM方案：
    1. 采用`理想视口`作为`可视视口`的尺寸，只需要把缩放比定为1。`<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no">`
    2. 计算 html 元素的 font-size
    > 750px 是设计稿的宽度（以iphone6的物理像素数为标准），100是期望的换算比例，即设计稿中 100px 的长度对应css中 1rem，将设计稿中的长度数值除以 100 得到的就是以 rem 为单位的 css 长度的数值，设计稿的宽换算为以 rem 为单位的 css 长度应为 (750/100) rem，同时设计稿的宽对应可视视口的宽，即有 (750/100) rem = 可视视口宽，1 rem = 可视视口宽 * (100/750)，(100/750)就是我们要的系数
    
    在页面初始化时设置一下 html 元素的 font-size：
    
    `document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px';`

3. 最后一种方案也是最合理的---来自于手淘的最佳实践
    1. 以上两种方案都存在一个问题，就是在retina屏幕上没有处理`dpr（device pixel ratio）`的副作用，何为`dpr`：`物理像素 / 设备独立的像素（ideal viewport）`。在JS中可以通过`window.devicePixelRatio`获取当前设备的`dpr`。
    2. 为何要处理`dpr`：在retina屏幕上，物理像素会被放大为原本的`dpr`倍。这时候就会存在以下几个问题
        - 图片变模糊了
        - `border: 1px`问题，边框自然会被放大为`dpr`倍
        - ...
    3. 解决方案：使用`initial-scale=1/dpr`对含有px单位的元素做处理，但是单纯这么做会导致字体元素的大小都会缩小。如何解决这个问题呢？答案就是在第二种方案的`根元素设置fontSize`的基础上再乘以一个`dpr`，这样对于以`rem`衡量的元素又能正常适配了。


参考阅读：
- [网易和淘宝移动WEB适配方案再分析](https://zhuanlan.zhihu.com/p/25216275)
- [移动端高清、多屏适配方案](http://div.io/topic/1092)
- [说说移动前端中 viewport （视口）](http://www.css88.com/archives/5975)