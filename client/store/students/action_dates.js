// @ts-nocheck
export const LOAD_DATES_DATA_SUCCESS = "LOAD_DATES_DATA_SUCCESS";
export const UPDATE_DATES_DATA_SUCCESS = "UPDATE_DATES_DATA_SUCCESS";

const loadDatesFetchDataSuccess = (dates) => {
  return {
    type: LOAD_DATES_DATA_SUCCESS,
    dates,
  };
};

const updateDatesFetchDataSuccess = (dates) => {
  return {
    type: UPDATE_DATES_DATA_SUCCESS,
    dates,
  };
};

export const addDatesFetchData = (data) => async (dispatch) => {
  const { url, values, setValues, id, sortDate } = data;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listDates: sortDate, groupId: id }),
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(updateDatesFetchDataSuccess(response));
  } else {
    setValues({
      ...values,
      errorForm: true,
      errorMessage: `Error from server №${response.status} ${response.statusText}!!!`,
    });
  }
};

export const loadListDatesFetchData = (data) => async (dispatch) => {
  const { url, values, setValues } = data;
  let response = await fetch(url, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  if (response.status === 200) {
    response = await response.json();
    // dispatch(updateDatesFetchDataSuccess(response));
    dispatch(loadDatesFetchDataSuccess(response));
  } else {
    console.log({ message: "Error!!!" });
  }
};
