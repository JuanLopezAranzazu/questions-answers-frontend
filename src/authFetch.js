export const authFetch = (input, init, token) => {
  init = init || {};

  init.headers = {
    ...init.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(input, init);
};
