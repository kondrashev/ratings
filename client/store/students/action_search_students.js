// @ts-nocheck
export const SEARCH_STUDENTS_DATA_SUCCESS = 'SEARCH_STUDENTS_DATA_SUCCESS';

export const searchStudentsFetchDataSuccess = (search) => {
  return {
    type: SEARCH_STUDENTS_DATA_SUCCESS,
    search,
  };
};

export const searchStudentsFetchData = (data) => async (dispatch) => {
  const { url } = data;
  let response = await fetch(url, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(searchStudentsFetchDataSuccess(response));
  } else {
    console.log({ message: 'Error!!!' });
  }
};
