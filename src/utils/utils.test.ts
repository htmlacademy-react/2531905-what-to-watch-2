import {formatDate, formatRunTime, getDisplayedTime, getTextByRating, validateEmail, validatePassword} from '@/utils/index';
import {RatingText} from '@/constants';

describe('Utils helpers functions', () => {
  describe('Function: formatDate', () => {
    it('should return formated date when value is correct', () => {
      const date = '2024-09-05T12:00:00.565Z';
      const expectedResult = {
        dateTime: '2024-09-05',
        dateText: 'September 5, 2024',
        day: 5,
        month: 'September',
        year: 2024,
      };

      const result = formatDate(date);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('Function: validateEmail', () => {
    it('should return true when value is correct', () => {
      const email = 'test@test.com';

      const result = validateEmail(email);

      expect(result).toBe(true);
    });

    it('should return false when value is not correct', () => {
      const email = 'test_test.com';

      const result = validateEmail(email);

      expect(result).toBe(false);
    });
  });

  describe('Function: validatePassword', () => {
    it('should return true when password is valid', () => {
      const password = 'ValidPassword1';

      const result = validatePassword(password);

      expect(result).toBe(true);
    });

    it('should return false when password is not valid', () => {
      const password = 'not_valid_password';

      const result = validatePassword(password);

      expect(result).toBe(false);
    });
  });

  describe('Function: getTextByRating', () => {
    it('should return correct rating text', () => {
      const rating = 2;
      const expectedResult = RatingText.Bad;

      const result = getTextByRating(rating);

      expect(result).toBe(expectedResult);
    });
  });

  describe('Function: formatRunTime', () => {
    it('should return correct run time text', () => {
      const runtime = 210;
      const expectedResult = '3h 30m';

      const result = formatRunTime(runtime);

      expect(result).toBe(expectedResult);
    });
  });

  describe('Function: getDisplayedTime', () => {
    it('should return correct displayed time text', () => {
      const time = 7590;
      const expectedResult = '02:06:30';

      const result = getDisplayedTime(time);

      expect(result).toBe(expectedResult);
    });
  });
});
