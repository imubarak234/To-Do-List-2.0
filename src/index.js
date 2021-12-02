/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import _ from 'lodash';
import './style.css';
import Icons from './noun_more_712689.png';
import Icons2 from './Refresh_icon.svg.png';
import isCompleted from './complete.js';

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
}

const to_Do_List = new List();
to_Do_List.addToEnd('Wash the dishes', false, 1);
to_Do_List.addToEnd('Cook Dinner', false, 3);
to_Do_List.addToEnd('Finish project', false, 7);
to_Do_List.addToEnd('project for sisters', false, 4);
to_Do_List.addToEnd('Finish emails', false, 8);
to_Do_List.addToEnd('comic run', false, 10);
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

let count = 0;
const addListToPages = (pages) => {
  const sorted = sort(pages);
  pages = sorted;
  to_Do_List.Lists = sort(to_Do_List.Lists);
  to_Do_List.Lists = pages;
  for (let x = 0; x < pages.length; x += 1) {
    const container = document.createElement('div');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.name = 'complete';
    check.checked = pages[x].completed;
    check.setAttribute('class', 'checker');
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
    des.innerHTML = pages[x].description;
  }

  const button = document.createElement('button');
  section.append(button);
  button.setAttribute('class', 'clear');
  button.setAttribute('type', 'button');
  button.innerHTML = 'Clear all Completed';
  count += 1;
};

if (count === 0) addListToPages(to_Do_List.Lists);

function populate() {
  const instances = {
    figures: [],
  };
  instances.figures.push(to_Do_List);
  localStorage.setItem('instances', JSON.stringify(instances));
}

const box = document.querySelectorAll('.checker');
box.forEach((element) => {
  element.addEventListener('change', (e) => {
    const parent = e.target.parentNode;
    const des = parent.querySelector('p');
    const content = des.innerHTML;
    const ans = to_Do_List.returnDes(content);
    if (e.target.checked) {
      to_Do_List.changeComplete(ans);
      populate();
    } else {
      to_Do_List.changeComplete(ans);
      populate();
    }
  });
});

function setForm() {
  const restore = JSON.parse(localStorage.getItem('instances'));
  addListToPages(restore.figures[0].Lists);

  const box = document.querySelectorAll('.checker');
  box.forEach((element) => {
    element.addEventListener('change', (e) => {
      const parent = e.target.parentNode;
      const des = parent.querySelector('p');
      const content = des.innerHTML;
      const ans = to_Do_List.returnDes(content);
      if (e.target.checked) {
        to_Do_List.changeComplete(ans);
        populate();
      } else {
        to_Do_List.changeComplete(ans);
        populate();
      }
    });
  });
}

if (localStorage.getItem('instances')) {
  setForm();
}