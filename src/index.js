/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-alert */

import _, { before } from 'lodash';
import './style.css';
import Icons from './noun_more_712689.png';
import Icons2 from './Refresh_icon.svg.png';
import List from './listClass.js';

const to_Do_List = new List();

const section = document.querySelector('.main-list');
const title = document.querySelector('.head');

const icon2 = new Image();
icon2.src = Icons2;

title.append(icon2);

function populate() {
  const instances = {
    figures: [],
  };
  instances.figures.push(to_Do_List);
  localStorage.setItem('instances', JSON.stringify(instances));
}

const addListToPages = (description, next) => {
  to_Do_List.addToEnd(description, next);

  const container = document.createElement('div');
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.name = 'complete';
  if (next) { check.checked = true; } else { check.checked = false; }
  check.setAttribute('class', 'checker');
  const des = document.createElement('p');
  const wrap = document.createElement('span');

  const button = document.createElement('button');
  button.setAttribute('class', 'option');

  const drops = document.createElement('div');
  drops.setAttribute('class', 'dropdown-content');
  const edit = document.createElement('a');
  const remove = document.createElement('a');
  edit.innerHTML = 'Edit';
  remove.innerHTML = 'Remove';
  drops.style.display = 'none';

  const icon = new Image();
  icon.src = Icons;

  section.append(container);
  container.append(check);
  container.append(wrap);
  wrap.append(des);
  container.append(button);
  button.append(icon);
  container.append(drops);
  drops.append(edit);
  drops.append(remove);

  wrap.setAttribute('class', 'flex');
  container.setAttribute('class', 'listing flex');
  des.innerHTML = description;

  remove.addEventListener('click', (e) => {
    const move = e.target.parentNode.parentNode;
    const des = move.querySelector('p');
    const content = des.innerHTML;
    to_Do_List.removeAtDes(content);
    move.parentNode.removeChild(move);
    if (drops.style.display === 'block') { drops.style.display = 'none'; }
    populate();
  });

  edit.addEventListener('click', (e) => {
    const message = prompt('Enter a new Task Description');
    const move = e.target.parentNode.parentNode;
    const des = move.querySelector('p');
    if (message !== '') {
      to_Do_List.changeDescription(des.innerHTML, message);
      des.innerHTML = message;
    }
    if (drops.style.display === 'block') { drops.style.display = 'none'; }
    populate();
  });

  button.addEventListener('click', (e) => {
    if (drops.style.display === 'none') {
      drops.style.display = 'block';
    } else {
      drops.style.display = 'none';
    }
  });

  check.addEventListener('change', (e) => {
    const ans = to_Do_List.returnDes(des.innerHTML);
    if (e.target.checked) {
      to_Do_List.changeComplete(ans);
      populate();
    } else {
      to_Do_List.changeComplete(ans);
      populate();
    }
  });
};

const clear = document.querySelector('.clear');
clear.addEventListener('click', (e) => {
  const allList = document.querySelectorAll('.listing');
  to_Do_List.clearCompleted();
  populate();
  allList.forEach((element) => {
    const checks = element.querySelector('.checker');
    if (checks.checked) { element.parentNode.removeChild(element); }
  });
});

/** This method adds an eventlistener to input field that checks if
 * The enter keypressed if so a task object is created and added
 * to list and displayed on the page
 */

const addfield = document.getElementById('addlist');
addfield.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addListToPages(addfield.value);
    document.getElementById('addlist').value = '';
    populate();
  }
});

function setForm() {
  const restore = JSON.parse(localStorage.getItem('instances'));

  restore.figures[0].Lists.forEach((element) => {
    addListToPages(element.description, element.completed);
  });
}

if (localStorage.getItem('instances')) {
  setForm();
}