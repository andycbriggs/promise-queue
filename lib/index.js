'use strict';

var PromiseQueue = function () {
  this._queue = [];
};

PromiseQueue.prototype.queue = function (task) {
  var self = this;
  this._queue.push(function () {
    task().finally(function () {
      // this task just finished so remove it
      self._queue.shift();
      // and run the next one
      self._next();
    });
  });
  if (this._queue.length === 1) {
    // this was the first item so run it
    this._next();
  }
};

PromiseQueue.prototype._next = function () {
  // are there any tasks to run
  if (this._queue.length > 0) {
    // start the next item in the queue
    this._queue[0]();
  }
};

module.exports = PromiseQueue;
