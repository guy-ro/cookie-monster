import React from "react";
import styled from "styled-components";

import RatingList from "../RatingList/RatingList";
import { UPDATE_RATING } from "../Application/reviewReducer";

const SectionWrapper = styled.div`
  font-size: inherit;
  h3 {
    font-size: inherit;
    line-height: 20px;
    margin: 0;
  }
  .rating-info {
    color: #888888;
  }
`;

function SectionRating({ id, update, rating }) {
  function onRatingChange(newRating) {
    update({
      type: UPDATE_RATING,
      rating: newRating,
      id
    });
  }

  return (
    <SectionWrapper>
      <h3>Rating</h3>
      <span className="rating-info">
        Your rating for this question affects the overall suggested rating for
        this applicant.
      </span>
      <RatingList onRatingChange={onRatingChange} selectedRating={rating} />
    </SectionWrapper>
  );
}

export default SectionRating;
