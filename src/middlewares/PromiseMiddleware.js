export default function PromiseMiddleware({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      const { types, callAPI, shouldCallAPI = () => true, payload } = action;
      if (!types) {
        return next(action);
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.');
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected fetch to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        return Promise.resolve();
      }
      const [requestType, successType, failureType] = types;

      dispatch({
        type: requestType,
        data: payload
      });
      return callAPI(getState()).then(
        response => {
          let action = dispatch(
            Object.assign(
              {},
              {
                data: response,
                type: successType
              }
            )
          );
          return action;
        },
        error => {
          let message = error.message;
          dispatch(
            Object.assign(
              {},
              {
                data: error,
                type: failureType
              }
            )
          );
          throw error;
        }
      );
    };
  };
}
