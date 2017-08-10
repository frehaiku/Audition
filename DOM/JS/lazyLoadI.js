/**
 * Created by 海枯 on 2017/8/7.
 */
window.onload = init

let timer, debTimer;
// 节流
function throttle(fn, interval) {
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, interval)
    }
  }
}
// 防抖
function debounce(fn, interval) {
  return function () {
    debTimer != null && clearTimeout(debTimer)
    debTimer = setTimeout(() => fn(), interval)
  }
}

function init() {
  let lazyBox = document.getElementById('lazyBox')
  let imgs = document.getElementsByTagName('img')
  let lazyImgs = []
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].dataset.src && lazyImgs.push(imgs[i])
  }

  lazyBox.onscroll = throttle(onscroll, 500)

  let maxHgt = window.innerHeight

  function onscroll() {
    console.log(window.scrollY)
    let dels = []
    for (let i = 0; i < lazyImgs.length; i++) {
      let lazyImg = lazyImgs[i]
      let rect = lazyImg.getBoundingClientRect()
      if (rect.top >= 0 && rect.top <= maxHgt) {
        lazyImg.src = lazyImg.dataset.src
        dels.push(i)
      }
    }
    dels.forEach(item => lazyImgs.splice(item, 1))
    isScrollBottom()
  }
  
  function isScrollBottom() {
    let uri = "http://img.hkuboss.cn/mine/horizontal-img-220-124.jpg"
    if (lazyBox.scrollHeight == lazyBox.scrollTop + lazyBox.clientHeight) {
      let fragment = document.createElement('img')
      fragment.src = uri
      fragment.width = 300
      fragment.height = 300
      lazyBox.appendChild(fragment)
    }
  }

  onscroll()
}