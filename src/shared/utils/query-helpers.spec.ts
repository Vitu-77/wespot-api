import {
  contains,
  dateRange,
  hasEvery,
  hasSome,
  isIn,
  paginate,
} from './query-helpers';

describe('query-helpers', () => {
  describe('paginate', () => {
    it('should return skip and take for the first page', () => {
      expect(
        paginate({
          pageNumber: 1,
          pageSize: 20,
        }),
      ).toEqual({
        skip: 0,
        take: 20,
      });
    });

    it('should return skip and take for another page', () => {
      expect(
        paginate({
          pageNumber: 3,
          pageSize: 10,
        }),
      ).toEqual({
        skip: 20,
        take: 10,
      });
    });
  });

  describe('contains', () => {
    it('should return undefined when filter is not provided', () => {
      expect(contains()).toBeUndefined();
    });

    it('should return contains filter', () => {
      expect(contains('wespot')).toEqual({
        contains: 'wespot',
        mode: undefined,
      });
    });

    it('should return contains filter with mode', () => {
      expect(contains('wespot', 'insensitive')).toEqual({
        contains: 'wespot',
        mode: 'insensitive',
      });
    });
  });

  describe('isIn', () => {
    it('should return undefined for an empty array', () => {
      expect(isIn([])).toBeUndefined();
    });

    it('should return undefined for undefined values', () => {
      expect(isIn(undefined as any)).toBeUndefined();
    });

    it('should return in filter', () => {
      expect(isIn(['A', 'B'])).toEqual({
        in: ['A', 'B'],
      });
    });
  });

  describe('hasEvery', () => {
    it('should return undefined for an empty array', () => {
      expect(hasEvery([])).toBeUndefined();
    });

    it('should return undefined for undefined values', () => {
      expect(hasEvery(undefined as any)).toBeUndefined();
    });

    it('should return hasEvery filter', () => {
      expect(hasEvery(['A', 'B'])).toEqual({
        hasEvery: ['A', 'B'],
      });
    });
  });

  describe('hasSome', () => {
    it('should return undefined for an empty array', () => {
      expect(hasSome([])).toBeUndefined();
    });

    it('should return undefined for undefined values', () => {
      expect(hasSome(undefined as any)).toBeUndefined();
    });

    it('should return hasSome filter', () => {
      expect(hasSome(['A', 'B'])).toEqual({
        hasSome: ['A', 'B'],
      });
    });
  });

  describe('dateRange', () => {
    it('should return undefined dates when no range is provided', () => {
      expect(dateRange({})).toEqual({
        gte: undefined,
        lte: undefined,
      });
    });

    it('should return only gte when fromAt is provided', () => {
      const result = dateRange({
        fromAt: '2026-01-01' as any,
      });

      expect(result).toEqual({
        gte: new Date('2026-01-01'),
        lte: undefined,
      });
    });

    it('should return only lte when toAt is provided', () => {
      const result = dateRange({
        toAt: '2026-01-31' as any,
      });

      expect(result).toEqual({
        gte: undefined,
        lte: new Date('2026-01-31'),
      });
    });

    it('should return gte and lte when both dates are provided', () => {
      const result = dateRange({
        fromAt: '2026-01-01' as any,
        toAt: '2026-01-31' as any,
      });

      expect(result).toEqual({
        gte: new Date('2026-01-01'),
        lte: new Date('2026-01-31'),
      });
    });
  });
});
