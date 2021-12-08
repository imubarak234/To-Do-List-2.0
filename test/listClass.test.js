/**
 * @jest-environment jsdom
 */

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
