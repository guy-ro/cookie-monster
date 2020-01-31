const proxy =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER
    : "http://localhost:4000";

async function getReviewAPI(user, applicationId) {
    const token = await user.getIdToken();
    const response = await fetch(proxy + `/api/ratings/${user.uid}/${applicationId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`
      }
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

module.exports = { getReviewAPI};