/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import _ from 'lodash';
import './style.css';
import Icons from './noun_more_712689.png';
import Icons2 from './Refresh_icon.svg.png';

class Actions {
  constructor(des, com, nums) {
    this.description = des;
    this.completed = com;
    this.index = nums;
  }
}

class List {
  constructor() {
    this.Lists = [];
  }

  addToEnd(Des, Com, Nums) {
    const NewAction = new Actions(Des, Com, Nums);
    this.Lists.push(NewAction);
  }

  addToFront(Des, Com, Nums) {
    const NewAction = new Actions(Des, Com, Nums);
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
  }

  printing() {
    const ans = [];
    for (let x = 0; x < this.Lists.length; x += 1) {
      ans.push(this.Lists[x]);
    }
    return ans;
  }
}

const to_Do_List = new List();
to_Do_List.addToEnd('Wash the dishes', false, 1);
to_Do_List.addToEnd('Cook Dinner', true, 3);
to_Do_List.addToEnd('Finish project', false, 2);
to_Do_List.addToEnd('project for sisters', true, 4);
to_Do_List.addToEnd('Finish emails', false, 5);
to_Do_List.addToEnd('comic run', true, 2);
to_Do_List.addToEnd('eat lunch', false, 6);

const section = document.querySelector('.top');
const title = document.querySelector('.head');

const icon2 = new Image();
icon2.src = Icons2;

title.append(icon2);

const sort = (arr) => {
  const next = [];
  for (let x = 0; x < arr.length; x += 1) {
    let confirm = true;
    for (let y = 0; y < next.length; y += 1) {
      if (arr[x].index <= next[y].index) {
        next.splice(y, 0, arr[x]);
        confirm = false;
        break;
      }
    }
    if (confirm) { next.push(arr[x]); }
  }
  return next;
};

const addListToPages = () => {
  const sorted = sort(to_Do_List.Lists);
  for (let x = 0; x < sorted.length; x += 1) {
    const container = document.createElement('div');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.name = 'complete';
    const des = document.createElement('p');
    const wrap = document.createElement('span');

    const icon = new Image();
    icon.src = Icons;

    section.append(container);
    container.append(check);
    container.append(wrap);
    wrap.append(des);
    container.append(icon);

    wrap.setAttribute('class', 'flex');
    container.setAttribute('class', 'listing flex');
    des.innerHTML = sorted[x].description;
  }
};

addListToPages();

const button = document.createElement('button');
section.append(button);
button.setAttribute('class', 'clear');
button.setAttribute('type', 'button');
button.innerHTML = 'Clear all Completed';
