// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {

  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(input)).toStrictEqual(expectedOutput);
  });

  test('should generate linked list from values 2', () => {
    const input = [4, 5, 6];

    expect(generateLinkedList(input)).toMatchSnapshot();
  });
});

