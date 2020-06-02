import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {
  NEW_REVIEW,
  INITIAL_APP_LOAD,
  AUTHENTICATE_USER
} from "../Constants/ActionTypes";

//import the admin reducer
import adminReducer from "./admin";

//Reducers take 2 params, a state and an action
//Notice how the initial state is passed as a default parameter
function applications(state = [], action) {
  //console.log("Called app reducer");
  switch (action.type) {
    case INITIAL_APP_LOAD:
      return action.applications || [];
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return action.user;
    default:
      return state;
  }
}

function reviewCount(state = null, action) {
  switch (action.type) {
    case INITIAL_APP_LOAD:
      return action.reviewCount;
    case NEW_REVIEW:
      return state + 1;
    default:
      return state;
  }
}

function createRootReducer(history) {
  return combineReducers({
    reviewCount,
    router: connectRouter(history),
    applications,
    adminReducer,
    user
  });
}

//This returns the initial state
// return state;

//Remember: reducers produce the state of the application
export default createRootReducer;

//Extra notes
/*
We want to avoid mutating state in redux
The best way to do this is to use concat(), slice(), etc... for arrays and
object.assign(), etc... for objects

Notice how we are using an if statement (we could also use a switch)
When our app becomes big we will want to split up our reducer and combine them
using combineReducers
*/
