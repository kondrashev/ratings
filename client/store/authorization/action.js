// @ts-nocheck
export const CHECK_USER_DATA_SUCCESS = "CHECK_USER_DATA_SUCCESS";

const checkUserFetchDataSuccess = (user) => {
  return {
    type: CHECK_USER_DATA_SUCCESS,
    user,
  };
};
export const checkUserFetchData = (data) => async (dispatch) => {
  const { url, values, setValues } = data;
  const { login, password } = values;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(checkUserFetchDataSuccess(response));
    setValues({ ...values, login: response.login, typeUser: response.role });
    localStorage.setItem("token", `Bearer ${response.token}`);
  } else {
    setValues({
      ...values,
      errorForm: true,
      errorMessage: "Incorrect login or password!!!",
    });
  }
};
