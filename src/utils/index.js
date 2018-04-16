export let RequestAPI = (url, method, payload, queries) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    if (queries) {
      url += '?' + queries;
    }
    request.open(method, url);
    if (method === 'POST' && typeof payload === 'object') {
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8'
      );
      request.send(JSON.stringify(payload));
    } else if (queries) {
      request.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );
      request.setRequestHeader('Accept', 'text/*');
      request.send(queries);
    } else {
      request.send(queries);
    }

    request.onload = () => {
      if (request.responseText) {
        resolve(JSON.parse(request.responseText));
      } else {
        resolve();
      }
    };

    request.onerror = error => {
      reject(request);
    };
  });
};
