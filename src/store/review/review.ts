import {ReviewItem} from '@/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '@/constants';
import {getReviews, sendReview} from '@/store/review/api-actions';

type ReviewState = {
  reviews: ReviewItem[];
  reviewRequestStatus: RequestStatus;
  reviewsListStatus: RequestStatus;
}

const initialState: ReviewState = {
  reviews: [],
  reviewRequestStatus: RequestStatus.Idle,
  reviewsListStatus: RequestStatus.Idle,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.reviewsListStatus = RequestStatus.Pending;
      })
      .addCase(getReviews.fulfilled, (state, {payload}) => {
        state.reviews = payload;
        state.reviewsListStatus = RequestStatus.Success;
      })
      .addCase(getReviews.rejected, (state) => {
        state.reviews = [];
        state.reviewsListStatus = RequestStatus.Failed;
      })
      .addCase(sendReview.pending, (state) => {
        state.reviewRequestStatus = RequestStatus.Pending;
      })
      .addCase(sendReview.rejected, (state) => {
        state.reviewRequestStatus = RequestStatus.Failed;
      });
  }
});
