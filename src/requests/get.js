let proxy = "http://localhost:4000";
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

async function getReviewAPI(user, applicationId) {
  const token = await user.getIdToken();
  const response = await fetch(
    proxy + `/api/ratings/${user.uid}/${applicationId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`
      }
    }
  );
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getUserReviewsAPI(user) {
  const token = await user.getIdToken();
  const response = await fetch(proxy + `/api/ratings/${user.uid}`, {
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
}

//Admin stats stuff
//-----------------------------------------------------------------------------
async function getApplicationReviewsAPI(app) {
  const response = await fetch(proxy + `/api/ratings/app/${app}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getAllRankingsAPI() {
  const response = await fetch(proxy + `/api/stackings`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getAllReviewsAPI() {
  const response = await fetch(proxy + `/api/ratings`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

//-----------------------------------------------------------------------------

async function getApplicationTableData(user) {
  const token = await user.getIdToken();
  const response = await fetch(proxy + `/api/applications/${user.uid}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getReviewCountAPI(user) {
  const token = await user.getIdToken();
  const url = new URL(
    proxy + `/api/ratings/${user.uid}/?` + new URLSearchParams({ count: true })
  );
  const response = await fetch(url, {
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
}

async function getApplicationCount() {
  const response = await fetch(
    proxy + "/api/applications/?" + new URLSearchParams({ count: true }),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  );
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getApplicationDetails(applicationId, user) {
  const response = await fetch(
    proxy + `/api/applications/${applicationId}/${user.uid}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  );
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getAllStackingsAPI(user) {
  const response = await fetch(proxy + `/api/stackings/${user.uid}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getUserAPI(user) {
  const response = await fetch(proxy + `/api/users/${user.uid}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getAllUsersAPI() {
  const response = await fetch(proxy + `/api/users/all`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getAllApplicationsAPI() {
  const response = await fetch(proxy + "/api/applications", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

export {
  getAllStackingsAPI,
  getAllApplicationsAPI,
  getApplicationCount,
  getApplicationDetails,
  getApplicationTableData,
  getReviewAPI,
  getUserReviewsAPI,
  getReviewCountAPI,
  getUserAPI,
  getAllReviewsAPI,
  getAllUsersAPI,
  getAllRankingsAPI,
  getApplicationReviewsAPI
};