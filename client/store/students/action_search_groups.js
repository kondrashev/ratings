// @ts-nocheck
export const SEARCH_GROUPS_DATA_SUCCESS = 'SEARCH_GROUPS_DATA_SUCCESS';

export const searchGroupsFetchDataSuccess = (search) => {
  return {
    type: SEARCH_GROUPS_DATA_SUCCESS,
    search,
  };
};

export const searchGroupsFetchData = (data) => async (dispatch) => {
  const { url } = data;
  let response = await fetch(url, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(searchGroupsFetchDataSuccess(response));
  } else {
    console.log({ message: 'Error!!!' });
  }
};
