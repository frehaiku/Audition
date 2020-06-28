/**
 * Created by 海枯 on 2019/7/21.
 */
const {EventEmitter} = require('events');
const heapdump = require('heapdump');

global.test = new EventEmitter();
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

function run3() {
  const innerData = new Buffer(100);
  const outClosure3 = function () {
    void innerData;
  };
  test.on('error', () => {
    console.log('error');
  });
  outClosure3();
}

for(let i = 0; i < 10; i++) {
  run3();
}

gc();

heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');