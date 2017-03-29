import fetch from 'isomorphic-fetch';

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response

  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJson (response) {
  return response.json()
}

export function request (url, requestAction, successAction, failureAction, options = {}) {
  return dispatch => {
    dispatch(requestAction());

    return (
      fetch(url, options)
      .then(checkStatus)
      .then(parseJson)
      .then(json => dispatch(successAction(json)))
      .catch(error => {
        if(error.response && error.response.json) {
          error.response.json().then(json => {
            console.log('error', json.message);
            return dispatch(failureAction(json.message));
          });

        } else {
          console.log('error', error);
          dispatch(failureAction(error));
        }
      })
    )
  }
}
