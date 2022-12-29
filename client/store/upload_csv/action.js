// @ts-nocheck
export const UPLOAD_FILE_DATA_SUCCESS = "UPLOAD_FILE_DATA_SUCCESS";

const uploadFileFetchDataSuccess = (payload) => {
  return {
    type: UPLOAD_FILE_DATA_SUCCESS,
    payload,
  };
};

export const uploadFileFetchData = (data) => async (dispatch) => {
  const url = data.get("url");
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
      },
      body: data,
    });
    response = await response.json();
    dispatch(uploadFileFetchDataSuccess(response));
  } catch (error) {
    console.error("Error:", error);
  }
};
