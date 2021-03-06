import moment from "moment";
import { produce } from "immer";

/**
 * ACTION TYPES
 * {
 *   type: LOAD_REVIEW,
 *   review: review obj
 * }
 *
 * {
 *   type: UPDATE_COMMENTS,
 *   comments: array,
 *   id: string
 * }
 *
 * {
 *   type: UPDATE_RATING,
 *   rating: number
 *   id: string
 * }
 */
export const INSERT_COMMENT = "INSERT_COMMENT";
export const UPDATE_RATING = "UPDATE_RATING";

const MASTER_ID = "master";

export function reviewReducer(review, action) {
  return produce(review, (draftReview) => {
    switch (action.type) {
      case INSERT_COMMENT:
        const comment = {
          lastReviewed: moment(),
          value: action.comment
        };
        if (action.id === MASTER_ID) {
          draftReview.comments = [...draftReview.comments, comment];
          break;
        }
        // Section id
        for (let i = 0; i < review.questionList.length; ++i) {
          const item = draftReview.questionList[i];
          if (item.id === action.id) {
            item.notes = [...item.notes, comment];
            break;
          }
        }
        break;
      case UPDATE_RATING:
        if (action.id === MASTER_ID) {
          draftReview.rating = action.rating;
          break;
        }
        for (let i = 0; i < review.questionList.length; ++i) {
          const item = draftReview.questionList[i];
          if (item.id === action.id) {
            item.rating = action.rating;
            break;
          }
        }
        break;
      default:
        break;
    }
  });
}
