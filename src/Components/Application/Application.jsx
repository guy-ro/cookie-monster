import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback
} from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import Rating from "../Rating/Rating";
import Files from "../Files/Files";
import LoadingOverlay from "../Common/LoadingOverlay";
//column categories
import {
  createReview,
  transpileCategoryData,
  transpileFileData,
  transpileLongAnswerData,
  transpileCheckBoxData
} from "./applicationDataHelpers";
import { reviewReducer } from "./reviewReducer";
import { connect } from "react-redux";
import { newReview } from "../../Actions";
import usePromise from "../../Hooks/usePromise";
import { getReviewAPI } from "../../requests/get";
import * as UPDATE from "../../requests/update";
import { ProgramContext } from "../../Contexts/ProgramContext";

const PageWrapper = styled.div`
  padding-top: 50px;
`;

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding-left: 80px;
  padding-right: 80px;
  max-width: 800px;
  h1 {
    font-size: 28px;
    font-weight: normal;
    .all-applicants {
      display: block;
      color: #888888;
      border-radius: 0;
      transform: translateX(-4px);
    }
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  hr {
    border: 0px solid #cccccc;
    border-bottom-width: 1px;
    margin: 20px 0;
  }
  button {
    text-transform: none;
  }
`;

const ApplicationSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 37px;
  button {
    border-radius: 0px;
  }
`;

function Application({ newReview, history, match, user, program }) {
  const appId = match.params.organizationId;
  const isRated = useRef(false);
  const [review, setReview] = useState(null);

  const loadedApplications = useContext(ProgramContext);
  const blankReview = useMemo(() => createReview(user, appId), [appId, user]);
  const [loadedReview] = usePromise(
    getReviewAPI,
    { user, applicationId: appId },
    null,
    [program]
  );

  const applications = loadedApplications.applications;

  useEffect(() => {
    if (loadedReview.isPending) return;
    const rev = loadedReview.value;
    const reviewExists = rev != null;
    if (reviewExists) {
      isRated.current = rev.rating > -1;
    }
    setReview(reviewExists ? rev : blankReview);
  }, [loadedReview, blankReview]);

  const dispatchReviewUpdate = useCallback(
    async (action) => {
      try {
        const updatedReview = reviewReducer(review, action);
        if (!isRated.current && updatedReview.rating > -1) {
          isRated.current = true;
          newReview();
        }
        const res = await UPDATE.updateReviewAPI(updatedReview);
        if (res.ok !== 1) {
          throw res;
        }
        setReview(updatedReview);
      } catch (e) {
        alert("Error in saving your review!");
      }
    },
    [newReview, review]
  );

  const [application, appIndex, appData] = useMemo(() => {
    const [_application, _appIndex] = getApplicationDetails(
      applications,
      appId
    );
    let _appData = null;
    if (_application != null) {
      _appData = {
        categoryData: transpileCategoryData(_application, program),
        fileData: transpileFileData(_application, program),
        longAnswers: transpileLongAnswerData(_application, program),
        checkBoxAnswers: transpileCheckBoxData(_application, program)
      };
    }
    return [_application, _appIndex, _appData];
  }, [applications, appId, program]);

  const previousApplication =
    applications && appIndex > 0
      ? "/submissions/" + applications[appIndex - 1]["_id"]
      : null;
  const nextApplication =
    applications && appIndex < applications.length - 1
      ? "/submissions/" + applications[appIndex + 1]["_id"]
      : null;

  return (
    <PageWrapper>
      <LoadingOverlay show={!review} />
      <BodyWrapper>
        <h1>
          <Button
            className="all-applicants"
            onClick={() => history.push("/applications")}
          >
            &lt; All applicants
          </Button>
          <br />
          {application ? (
            application["Organization Name"] ||
            application["Organization Name (legal name)"]
          ) : (
            <div>
              <p> Loading... </p>
            </div>
          )}
        </h1>
        {/*}<Rubric />*/}
        <hr />
        {applications.length > 0 && application != null ? (
          <div className="application-information">
            <Categories categoryData={appData.categoryData} />
            <hr />
            <Files fileData={appData.fileData} />
            <hr />
            <DecisionCanvas
              categoryData={appData.longAnswers}
              update={dispatchReviewUpdate}
              review={review}
            />
            <hr />
            <Rating review={review} update={dispatchReviewUpdate} />
            <hr />
          </div>
        ) : null}
        <ApplicationSelector>
          <Button
            variant="contained"
            color="primary"
            disabled={!previousApplication}
            onClick={() => {
              previousApplication && history.push(previousApplication);
            }}
          >
            Previous applicant
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!nextApplication}
            onClick={() => {
              nextApplication && history.push(nextApplication);
            }}
          >
            Next applicant
          </Button>
        </ApplicationSelector>
      </BodyWrapper>
    </PageWrapper>
  );
}

//Helper function
// returns tuple: [appData, appIndex in appList]
function getApplicationDetails(appList, appId) {
  for (let i = 0; i < appList.length; ++i) {
    const app = appList[i];
    if (app["_id"] === appId) {
      return [app, i];
    }
  }
  return [null, -1];
}

const mapStateToProps = (state) => ({
  program: state.program
});

const mapDispatchToProps = {
  newReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
