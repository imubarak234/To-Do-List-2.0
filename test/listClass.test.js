/**
 * @jest-environment jsdom
 */

import addListToPages from '../src/index.js';
import List from '../src/listClass.js';

describe('Testing the add function and process', () => {
  const testlist = new List();

  test('Adds element to list properly', () => {
    testlist.addToEnd('eating', true);
    expect(testlist.Lists).toHaveLength(1);
  });

  test('Add another element in the list', () => {
    testlist.addToEnd('coding', false);
    expect(testlist.Lists).toEqual([{
      description: 'eating',
      completed: true,
      index: 1,
    }, {
      description: 'coding',
      completed: false,
      index: 2,
    }]);
  });

  test('Testing the boolean completed', () => {
    testlist.addToEnd('Come home early', false);
    expect((testlist.returnDes('Come home early')).completed).toBeFalsy();
  });

  test('Add div containing elements for a complete to do list section to the page', () => {
    document.body.innerHTML = '<div class="head">'
    + ' <div class="main-list"></div>'
    + '</div>';
    addListToPages('cooking', false);
    const list = document.querySelectorAll('.main-list .listing');
    expect(list).toHaveLength(1);
  });
});

describe('Testing the remove functions', () => {
  const testlist = new List();

  testlist.addToEnd('Walk the dog', false);
  testlist.addToEnd('Finish my homeworks', false);

  test('Check if the element is removed by index', () => {
    const count = testlist.Lists.length;
    testlist.removeAt(testlist.Lists[0].index);
    expect(testlist.Lists.length).toBeLessThan(count);
  });

  test('Check if the element is removed by description', () => {
    testlist.removeAt('Finish my homeworks');
    expect(testlist.Lists).toHaveLength(0);
  });
});

describe('Testing the editing task functions', () => {
  const testlist = new List();
  testlist.addToEnd('Playing games later', 'false');
  testlist.changeDescription('Playing games later', 'ready to go');

  test('Check to see if the task is actually edited', () => {
    expect(testlist.returnDes('ready to go').description)
      .toBe('ready to go');
  });

  test('test if the the pervious task has been removed', () => {
    expect(testlist.returnDes('Playing games later').description)
      .toBeUndefined();
  });
});

describe('Test for checking update', () => {
  const testlist = new List();
  testlist.addToEnd('Playing games later', 'false');
  testlist.addToEnd('Walk the dog and the cat and the lions', true);

  test('Check if the status was updated to true from false', () => {
    const test = testlist.returnDes('Playing games later');
    testlist.changeComplete(test);
    expect(test.completed).toBeTruthy();
  });

  test('Check if the status changes from true to false', () => {
    const test = testlist.returnDes('Walk the dog and the cat and the lions');
    testlist.changeComplete(test);
    expect(test.completed).toBeFalsy();
  });
});

describe('Test for the Clear \'all completed function\'', () => {
  const testlist = new List();

  testlist.addToEnd('Make a cake', false);
  testlist.addToEnd('Wash up', true);
  testlist.addToEnd('Pray extra prayers', false);
  testlist.addToEnd('Hashmaps all day', false);

  test('Calling the function its suppose to discard the task marked as true', () => {
    testlist.clearCompleted();
    expect(testlist.Lists.length).toBe(3);
  });
});
