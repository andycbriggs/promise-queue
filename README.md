# Promise Queue

Nothing special, runs promises sequentially.

Developed for use where nested promises are being used that may conflict (eg: db queries)

## Usage

```javascript

var Promise = require('bluebird');
var PromiseQueue = require('promise-queue');

var promiseQueue = new PromiseQueue();

var task = function () {
  return new Promise(function (resolve, reject) {
    // do async stuff
    resolve();
  });
}

// task will run immediately, further tasks will be queued to run one completion
promiseQueue.queue(task);

```