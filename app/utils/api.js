import 'whatwg-fetch';
export const getApi = (dispatch, apiUrl, successCallback, errorCallback) => {
    return fetch( apiUrl+'?'+ new Date().getTime(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => response.json())
        .then(json => dispatch(successCallback(json)))
        .catch(err => errorCallback
            ? errorCallback(err)
            : function () {});
};

export const postApi = (dispatch, apiUrl, body, successCallback, errorCallback) => {
    return fetch( apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => dispatch(successCallback(json)))
        .catch(err => errorCallback
            ? errorCallback(err)
            : function () {});
};


export const promiseWrapper = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) => hasCanceled_
            ? reject({isCanceled: true})
            : resolve(val));
        promise.catch((error) => hasCanceled_
            ? reject({isCanceled: true})
            : reject(error));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        }
    };
};

