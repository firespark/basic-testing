// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 10, b: 5, action: Action.Subtract, expected: 5 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly calculate $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'two', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });
});
