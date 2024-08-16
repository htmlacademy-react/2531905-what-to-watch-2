import {RatingText} from '@/constants';

export const formatDate = (value: string) => {
  const date = new Date(value);
  const dateTime = value.substring(0, 10);
  const day = date.getDate();
  const month = date.toLocaleString('en-us',{month:'long'});
  const year = date.getFullYear();
  return {
    dateTime,
    dateText: `${month} ${day}, ${year}`,
    day,
    month,
    year,
  };
};

export const validateEmail = (value: string): boolean => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return regex.test(value);
};

export const validatePassword = (value: string): boolean => {
  const regex = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;

  return regex.test(value);
};

export const getTextByRating = (rating: number): string => {
  if (rating === 10) {
    return RatingText.Awesome;
  } else if (rating >= 8) {
    return RatingText.VeryGood;
  } else if (rating >= 5) {
    return RatingText.Good;
  } else if (rating >= 3) {
    return RatingText.Normal;
  } else if (rating >= 0) {
    return RatingText.Bad;
  }

  return '';
};

export const formatRunTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const hoursString = hours > 0 ? `${hours}h ` : '';
  const minutesString = min > 0 ? `${min}m` : '';
  return `${hoursString}${minutesString}`;
};
