/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import isCompleted from './complete.js';

class Actions {
  constructor(des) {
    this.description = des;
    this.completed = false;
    this.index = 0;
  }
}

class List {
  constructor() {
    this.Lists = [];
  }

  addToEnd(Des, next) {
    const NewAction = new Actions(Des);
    if (next === true) { NewAction.completed = next; }
    NewAction.index = this.Lists.length + 1;
    this.Lists.push(NewAction);
  }

  addToFront(Des) {
    const NewAction = new Actions(Des);
    NewAction.index = this.Lists.length;
    this.Lists.unshift(NewAction);
  }

  removeFromFront() {
    this.Lists.unshift();
  }

  removeFromBack() {
    this.Lists.pop();
  }

  removeAt(index) {
    this.Lists.splice(index, 1);
    for (let x = 0; x < this.Lists.length; x += 1) {
      this.Lists[x].index = x + 1;
    }
  }

  removeAtDes(des) {
    for (let x = 0; x < this.Lists.length; x += 1) {
      if (this.Lists[x].description === des) {
        this.removeAt(x);
        break;
      }
    }
  }

  returnDes(des) {
    let ans = {};
    for (let x = 0; x < this.Lists.length; x += 1) {
      if (this.Lists[x].description === des) {
        ans = this.Lists[x];
        break;
      }
    }
    return ans;
  }

  changeComplete(arg) {
    for (let x = 0; x < this.Lists.length; x += 1) {
      if (this.Lists[x] === arg) {
        isCompleted(this.Lists[x]);
      }
    }
  }

  printing() {
    const ans = [];
    for (let x = 0; x < this.Lists.length; x += 1) {
      ans.push(this.Lists[x]);
    }
    return ans;
  }

  clear() {
    this.Lists = [];
  }

  clearCompleted() {
    const sorted = this.Lists.filter((fills) => fills.completed === false);
    this.Lists = sorted;
  }

  changeDescription(old_des, new_des) {
    for (let x = 0; x < this.Lists.length; x += 1) {
      if (this.Lists[x].description === old_des) {
        this.Lists[x].description = new_des;
        break;
      }
    }
  }
}

export { List as default };