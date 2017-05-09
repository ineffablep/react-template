import 'whatwg-fetch';


const HTTP_CODE_OK = 200;
const HTTP_CODE_MULTIPLE_CHOICES = 300;

export const getApi = (dispatch, apiUrl, successCallback, errorCallback, putDateStamp=true) => {
    let hasError = false;
    return fetch((!putDateStamp) ? apiUrl : apiUrl + '?' + new Date().getTime(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    })
        .then(response => {
            if (response.status < HTTP_CODE_OK || response.status >= HTTP_CODE_MULTIPLE_CHOICES) {
                hasError = true;
            }
            return response.json();
        })
        .then(json => {
            return hasError ? dispatch(errorCallback(json[0])) : dispatch(successCallback(json));
        });
};


export const postApi = (dispatch, apiUrl, body, successCallback, errorCallback) => {
    let hasError = false;
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.status < HTTP_CODE_OK || response.status >= HTTP_CODE_MULTIPLE_CHOICES) {
                hasError = true;
            }
            return response.json();
        })
        .then(json => {
            return hasError ? dispatch(errorCallback(json[0])) : dispatch(successCallback(json));
        });

};


export const promiseWrapper = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) => hasCanceled_
            ? reject({ isCanceled: true })
            : resolve(val));
        promise.catch((error) => hasCanceled_
            ? reject({ isCanceled: true })
            : reject(error));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        }
    };
};

