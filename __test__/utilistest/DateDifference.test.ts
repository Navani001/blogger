import { calculateDateDifference } from '../../src/lib/utilis/DateDifference';

describe('calculateDateDifference', () => {
  it('should calculate date difference correctly', () => {
    const startDate = '2024-01-01';
    const endDate = '2024-01-05';
    const difference = calculateDateDifference(startDate, endDate);
    expect(difference).toBe(4);
  });

  it('should handle same dates', () => {
    const date = '2024-01-01';
    const difference = calculateDateDifference(date, date);
    expect(difference).toBe(0);
  });

  it('should handle different months', () => {
    const startDate = '2024-01-01';
    const endDate = '2024-02-01';
    const difference = calculateDateDifference(startDate, endDate);
    expect(difference).toBe(31);
  });
});