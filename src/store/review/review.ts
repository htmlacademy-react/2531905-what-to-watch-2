import {ReviewItem} from '@/types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '@/constants';
import {getReviews, sendReview} from '@/store/review/api-actions';

type ReviewState = {
  reviews: ReviewItem[];
  reviewRequestStatus: RequestStatus;
}

const initialState: ReviewState = {
  reviews: [],
  reviewRequestStatus: RequestStatus.Idle,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, {payload}) => {
        state.reviews = payload;
      })
      .addCase(getReviews.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(sendReview.pending, (state) => {
        state.reviewRequestStatus = RequestStatus.Pending;
      })
      .addCase(sendReview.rejected, (state) => {
        state.reviewRequestStatus = RequestStatus.Failed;
      });
  }
});
