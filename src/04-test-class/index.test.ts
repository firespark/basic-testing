// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow('Insufficient funds: cannot withdraw more than 50');
  });

  test('should throw error when transferring more than balance', () => {
    const accountA = getBankAccount(50);
    const accountB = getBankAccount(100);

    expect(() => accountA.transfer(60, accountB)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(40);
    expect(account.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(100);
    const accountB = getBankAccount(50);

    accountA.transfer(30, accountB);

    expect(accountA.getBalance()).toBe(70);
    expect(accountB.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(lodash.random(1, 100, false))
      .mockReturnValueOnce(1);
    const result = await account.fetchBalance();
    expect(result).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const newBalance = 300;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError)
  });

});

