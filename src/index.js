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

// const section = document.querySelector('.main-list');
const title = document.querySelector('.head');

const icon2 = new Image();
icon2.src = Icons2;

if ((icon2 != null) && (title != null)) title.append(icon2);

function populate() {
  const instances = {
    figures: [],
  };
  instances.figures.push(to_Do_List);
  localStorage.setItem('instances', JSON.stringify(instances));
}

// const test = document.getElementById('test-button');

// test.addEventListener('click' , (e) => {

   const sgMail = require('@sendgrid/mail');

// // import sgMail from './node_modules/@sendgrid/mail/index.js'
// // import sgMail from '@sendgrid/mail';
// sgMail.setApiKey('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');

//   const msg = {
//     to: 'shithappens242@gmail.com', // Change to your recipient
//     from: 'imubarak2424@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }
  
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     })

// })

const addListToPages = (description, next) => {
  to_Do_List.addToEnd(description, next);
  const section = document.querySelector('.main-list');

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
if (clear != null) {
  clear.addEventListener('click', (e) => {
    const allList = document.querySelectorAll('.listing');
    to_Do_List.clearCompleted();
    populate();
    allList.forEach((element) => {
      const checks = element.querySelector('.checker');
      if (checks.checked) { element.parentNode.removeChild(element); }
    });
  });
}

/** This method adds an eventlistener to input field that checks if
 * The enter keypressed if so a task object is created and added
 * to list and displayed on the page
 */

const addfield = document.getElementById('addlist');
if (addfield != null) {
  addfield.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addListToPages(addfield.value);
      document.getElementById('addlist').value = '';
      populate();
    }
  });
}

function setForm() {
  const restore = JSON.parse(localStorage.getItem('instances'));

  restore.figures[0].Lists.forEach((element) => {
    addListToPages(element.description, element.completed);
  });
}

if (localStorage.getItem('instances')) {
  setForm();
}

export { addListToPages as default };