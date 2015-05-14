'use strict';

var assert = require('assert');

var Promise = require('bluebird');
var PromiseQueue = require('../lib');

var results = [];

var taskOne = function () {
  return new Promise(function (resolve, reject) {
    console.log('taskOne running');
    setTimeout(function () {
      console.log('taskOne complete');
      results.push('one');
      resolve();
    }, 500);
  });
}

var taskTwo = function () {
  return new Promise(function (resolve, reject) {
    console.log('taskTwo running');
    setTimeout(function () {
      console.log('taskTwo complete');
      results.push('two');
      resolve();
    }, 250);
  });
}

var check = function () {
  return new Promise(function (resolve, reject) {
    console.log('checking results');
    assert.equal('one', results[0], 'check taskOne completed first');
    assert.equal('two', results[1], 'check taskTwo completed first');
    console.log('results ok!');
    resolve();
  });
}

var promiseQueue = new PromiseQueue();

promiseQueue.queue(taskOne);
promiseQueue.queue(taskTwo);
promiseQueue.queue(check);
