import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    
    await throttledGetDataFromApi('posts');
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

  });

  test('should perform request to correct provided url', async () => {
    const axiosClientMock = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi('/posts/1');
    jest.runOnlyPendingTimers();
    expect(axiosClientMock).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockData = { data: 'Post 1' };
    
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve(mockData));

    const result = await throttledGetDataFromApi('/posts/1');
    expect(result).toEqual(mockData.data);
  });
});