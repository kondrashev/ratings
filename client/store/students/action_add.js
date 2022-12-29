// @ts-nocheck
export const UPDATE_STUDENT_DATA_SUCCESS = "UPDATE_STUDENT_DATA_SUCCESS";

export const updateStudentFetchDataSuccess = (student) => {
  return {
    type: UPDATE_STUDENT_DATA_SUCCESS,
    student,
  };
};

export const addStudentFetchData = (data) => async (dispatch) => {
  const { url, values, setValues, id } = data;
  const { nameStudent } = values;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ surName: nameStudent, groupId: id }),
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(updateStudentFetchDataSuccess(response));
    if (response.surName) {
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
