import { getFilteredData } from '../../../lib/utilis/FilterData';

describe('getFilteredData', () => {
  const today = new Date('2024-03-15');
  const mockData = [
    { created_at: '2024-03-14' }, // 1 day ago
    { created_at: '2024-03-13' }, // 2 days ago
    { created_at: '2024-03-13' }, // 2 days ago
    { created_at: '2024-03-10' }, // 5 days ago
    { created_at: '2024-02-15' }, // 30 days ago
  ];

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(today);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should filter data for weekly range', () => {
    const result = getFilteredData(mockData, 'week');
    
    expect(result.timeRange).toBe('week');
    expect(result.seriesData).toHaveLength(7);
    expect(result.categories).toHaveLength(7);
    // expect(result.seriesData[1]).toBe(1); // 1 item 1 day ago
    // expect(result.seriesData[2]).toBe(2); // 2 items 2 days ago
  });

  it('should filter data for monthly range', () => {
    const result = getFilteredData(mockData, 'month');
    
    expect(result.timeRange).toBe('month');
    expect(result.seriesData).toHaveLength(30);
    expect(result.categories).toHaveLength(30);
  });

  it('should handle empty data array', () => {
    const result = getFilteredData([], 'week');
    
    expect(result.seriesData).toHaveLength(7);
    expect(result.seriesData.every(count => count === 0)).toBe(true);
  });

  it('should default to week range for invalid timeRange', () => {
    const result = getFilteredData(mockData, 'invalid');
    
    expect(result.timeRange).toBe('invalid');
    expect(result.seriesData).toHaveLength(7);
  });

});