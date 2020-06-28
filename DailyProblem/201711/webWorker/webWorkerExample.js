/**
 * Created by 海枯 on 2017/11/22.
 */
self.onmessage = (event) => {
  var data = event.data
  data.sort((a, b) => a - b)
  self.postMessage(data)
}