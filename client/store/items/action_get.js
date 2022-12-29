// @ts-nocheck
export const LOAD_DISCIPLINES_DATA_SUCCESS = "LOAD_DISCIPLINES_DATA_SUCCESS";
export const LOAD_GROUPS_DATA_SUCCESS = "LOAD_GROUPS_DATA_SUCCESS";

const loadDisciplinesFetchDataSuccess = (disciplines) => {
  return {
    type: LOAD_DISCIPLINES_DATA_SUCCESS,
    disciplines,
  };
};

const loadGroupsFetchDataSuccess = (groups) => {
  return {
    type: LOAD_GROUPS_DATA_SUCCESS,
    groups,
  };
};

export const loadItemsFetchData = (data) => async (dispatch) => {
  const { url, values, setValues } = data;
  let response = await fetch(url, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(
      !values.getGroups
        ? loadDisciplinesFetchDataSuccess(response)
        : loadGroupsFetchDataSuccess(response)
    );
  } else {
    console.log({ message: "Error!!!" });
  }
};
