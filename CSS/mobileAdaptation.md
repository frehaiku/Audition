# 移动端适配的相关概念以及几种方案

## 适配相关概念

1. **布局视口（layout viewport）**：html元素的上一级容器即顶级容器，用于解决页面在手机上显示的问题。大部分设备都将这个视口分辨率设置为`980px`，所以PC上的网页基本上能在手机上呈现，只不过看上去很小，一般默认可以通过手动缩放网页。获取当前布局视口用`document.documentElement.clientWidth`
2. **视觉视口（visual viewport）**：指用户可见页面区域，即屏幕显示器的物理像素。获取当前的视觉视口可以用`window.innerWidth`
3. **理想视口（ideal viewport）**：也就是我们通常说的屏幕分辨率。比如Iphone5物理像素是640，屏幕分辨率是320。设备像素比（dpr）是2。其是由设备和浏览器内部决定的，不能改变。可以通过`window.devicePixelRatio`来获取dpr。

## 方案

1. 网易的纯REM方案：
    1. 采用理想视口作为可视视口的尺寸，只需要把缩放比定为1。`<meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">`
    2. 计算 html 元素的 font-size
    > 750px 是设计稿的宽度（以iphone6的物理像素数为标准），100是期望的换算比例，即设计稿中 100px 的长度对应css中 1rem，将设计稿中的长度数值除以 100 得到的就是以 rem 为单位的 css 长度的数值，设计稿的宽换算为以 rem 为单位的 css 长度应为 (750/100) rem，同时设计稿的宽对应可视视口的宽，即有 (750/100) rem = 可视视口宽，1 rem = 可视视口宽 * (100/750)，(100/750)就是我们要的系数
    
    在页面初始化时设置一下 html 元素的 font-size：
    
    `document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px';`