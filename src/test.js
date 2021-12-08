/**
 * @jest-environment jsdom
 */

import List from './listClass.js';

const testlist = new List();

describe('Testing the add function and process', () => {
  test('Adds element to list properly', () => {
    testlist.addToEnd('eating', true);
    expect(testlist.Lists).toHaveLength(1);
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
