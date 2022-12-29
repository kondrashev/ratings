// @ts-nocheck
import {
  updateDisciplineFetchDataSuccess,
  updateGroupFetchDataSuccess,
} from "./action_add";

export const updateItemFetchData = (data) => async (dispatch) => {
  const { url, id, moodle, setShowInputEditItem, values, setValues } = data;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json",
    },
    body: !values.getGroups
      ? JSON.stringify({ id, name: values.nameDiscipline })
      : JSON.stringify({ id, name: values.nameGroup, moodle }),
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(
      !values.getGroups
        ? updateDisciplineFetchDataSuccess(response)
        : updateGroupFetchDataSuccess(response)
    );
    setValues({ ...values, nameDiscipline: "", nameGroup: "" });
    setShowInputEditItem(false);
  } else {
    setValues({
      ...values,
      errorForm: true,
      errorMessage: `Error from server №${response.status} ${response.statusText}!!!`,
    });
  }
};
