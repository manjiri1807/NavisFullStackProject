import buildAction from './buildAction';

const TEST_ACTION = 'TEST_ACTION';

test('buildAction works with no payload', () => {
  const expected = {
    type: TEST_ACTION,
  };

  const actual = buildAction(TEST_ACTION);

  expect(expected).toEqual(actual);
});

test('buildAction works with a payload', () => {
  const expected = {
    type: TEST_ACTION,
    payload: 'the payload',
  };

  const actual = buildAction(TEST_ACTION, 'the payload');

  expect(expected).toEqual(actual);
});
