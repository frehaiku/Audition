# 移动端适配的相关概念以及几种方案

## 适配相关概念

1. **布局视口（layout viewport）**：html元素的上一级容器即顶级容器，用于解决页面在手机上显示的问题。大部分设备都将这个视口分辨率设置为`980px`，所以PC上的网页基本上能在手机上呈现，只不过看上去很小，一般默认可以通过手动缩放网页。获取当前布局视口用`document.documentElement.clientWidth`
2. **视觉视口（visual viewport）**：指用户可见页面区域，即屏幕显示器的物理像素。获取当前的视觉视口可以用`window.innerWidth`
3. **理想视口（ideal viewport）**：也就是我们通常说的屏幕分辨率。比如Iphone5物理像素是640，屏幕分辨率是320。设备像素比（dpr）是2。其是由设备和浏览器内部决定的，不能改变。可以通过`window.devicePixelRatio`来获取dpr。

## 使用viewport元标签控制布局

如下的viewport元标签的属性  
`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`

以下是每个属性的详细介绍：

属性名 | 取值 | 描述 
------| ----- | -----
width | 正整数或device-width | 定义layout viewport的值，设置为`device-width`时表示layout viewport的值等于 ideal viewport的值
height | 正整数或device-height | 定义viewport height，单位为像素，一般不用
initial-width | [0,0 - 10.0] | 定义初始缩放值。比如：设置`initial-width=1.5`就是将visual viewport设置成ideal viewport宽度的1 /1.5倍。**缩放比例 = ideal layout / visual layout**
maximum-scale | [0.0 - 10.0 ] | 用户能够放大的最大比例
minimum-scale | [0,0 - 10.0] | 用户能缩小的最小比例，一般不设置，因为太小的字不方便阅读
user-scalable | yes/no | 定义是否允许用户手动缩放页面，默认值为yes

## 方案

1. 网易的纯REM方案：
    1. 采用理想视口作为可视视口的尺寸，只需要把缩放比定为1。`<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no">`
    2. 计算 html 元素的 font-size
    > 750px 是设计稿的宽度（以iphone6的物理像素数为标准），100是期望的换算比例，即设计稿中 100px 的长度对应css中 1rem，将设计稿中的长度数值除以 100 得到的就是以 rem 为单位的 css 长度的数值，设计稿的宽换算为以 rem 为单位的 css 长度应为 (750/100) rem，同时设计稿的宽对应可视视口的宽，即有 (750/100) rem = 可视视口宽，1 rem = 可视视口宽 * (100/750)，(100/750)就是我们要的系数
    
    在页面初始化时设置一下 html 元素的 font-size：
    
    `document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px';`
2. 使layout viewport = visual viewport，layout viewport取设计稿的尺寸时，css像素对应设计稿的px，不需要进行单位换算

参考阅读：
- [网易和淘宝移动WEB适配方案再分析](https://zhuanlan.zhihu.com/p/25216275)
- [移动端高清、多屏适配方案](http://div.io/topic/1092)
- [说说移动前端中 viewport （视口）](http://www.css88.com/archives/5975)