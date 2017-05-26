/**
 * Created by 海枯 on 2017/5/25.
 */
window.onload = function() {

  var placeholder = document.querySelector('.placeholder'),
    small = placeholder.querySelector('.img-small')

  // 1: load small image and show it
  var img = new Image();
  img.src = small.src;
  img.onload = function () {
    small.classList.add('loaded');
  };

  // 2: load large image
  var imgLarge = new Image();
  imgLarge.src = placeholder.dataset.large;
  imgLarge.onload = function () {
    imgLarge.classList.add('loaded');
  };
  placeholder.appendChild(imgLarge);
}