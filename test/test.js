/**
 * @jest-environment jsdom
 */

import List from '../src/listClass.js';

const testlist = new List();

describe('Testing the add function and process', () => {
  test('Adds element to list properly', () => {
    testlist.addToEnd('eating', true);
    expect(testlist.Lists).toHaveLength(1);
  });

  test('Add another element in the list', () => {
    testlist.addToEnd('coding', false);
    expect(testlist.Lists).toEqual([{
      description: 'eating',
      completed: true,
      index: 1
    },{
      description: 'coding',
      completed: false,
      index: 2
    }]);
  });


  test('Testing the boolean completed', () => {
    testlist.addToEnd('Come home early', false);
    expect((testlist.returnDes('Come home early')).completed).toBeFalsy();
  });
});

describe('Testing the remove functions', () => {
  test('Check if the element is removed', () => {
    testlist.addToEnd('Walk the dog', true);
    const count = testlist.Lists.length;
    testlist.removeAt(0);
    expect(testlist.Lists.length).toBeLessThan(count);
  });
});
