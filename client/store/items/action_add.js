// @ts-nocheck
export const UPDATE_DISCIPLINES_DATA_SUCCESS =
  "UPDATE_DISCIPLINES_DATA_SUCCESS";
export const UPDATE_GROUPS_DATA_SUCCESS = "UPDATE_GROUPS_DATA_SUCCESS";

export const updateDisciplineFetchDataSuccess = (discipline) => {
  return {
    type: UPDATE_DISCIPLINES_DATA_SUCCESS,
    discipline,
  };
};

export const updateGroupFetchDataSuccess = (group) => {
  return {
    type: UPDATE_GROUPS_DATA_SUCCESS,
    group,
  };
};

export const addItemFetchData = (data) => async (dispatch) => {
  const { url, values, setValues, id, moodle } = data;
  const { nameDiscipline, nameGroup } = values;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json",
    },
    body: values.checkedRadioDiscipline
      ? JSON.stringify({ name: nameDiscipline })
      : values.checkedRadioGroup
      ? JSON.stringify({ name: nameGroup, disciplineId: id, moodle })
      : null,
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(
      values.checkedRadioDiscipline
        ? updateDisciplineFetchDataSuccess(response)
        : values.checkedRadioGroup
        ? updateGroupFetchDataSuccess(response)
        : null
    );
    if (response.name) {
      setValues({
        ...values,
        nameDiscipline: "",
        nameGroup: "",
        nameStudent: "",
      });
    } else {
      setValues({
        ...values,
        errorForm: true,
        errorMessage: `This ${
          values.checkedRadioDiscipline
            ? "discipline"
            : values.checkedRadioGroup
            ? "group"
            : "student"
        } has already created!!!`,
      });
    }
  } else {
    setValues({
      ...values,
      errorForm: true,
      errorMessage: `Error from server №${response.status} ${response.statusText}!!!`,
    });
  }
};
