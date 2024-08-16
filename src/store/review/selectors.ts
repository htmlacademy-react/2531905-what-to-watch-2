import {State} from '@/types/state';
import {NameSpace, RequestStatus} from '@/constants';
import {ReviewItem} from '@/types';

export const getReviewsList = (state: Pick<State, NameSpace.Review>): ReviewItem[] => state[NameSpace.Review].reviews;
export const getReviewRequestStatus = (state: Pick<State, NameSpace.Review>): RequestStatus => state[NameSpace.Review].reviewRequestStatus;
