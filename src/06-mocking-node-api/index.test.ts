import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './index';


describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();

    doStuffByTimeout(cb, 100);

    expect(setTimeout).toBeCalledWith(cb, 100);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {

    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();

    doStuffByInterval(cb, 100);

    expect(setInterval).toBeCalledWith(cb, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(require('path'), 'join');

    await readFileAsynchronously('test.txt');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'test.txt');
  });



  test('should return null if file does not exist', async () => {
    jest.spyOn(require('fs'), 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true);
    jest.spyOn(require('fs/promises'), 'readFile').mockResolvedValue(Buffer.from('File content'));

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBe('File content');
  });
});
