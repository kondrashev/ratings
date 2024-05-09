// @ts-nocheck
export const LOAD_STUDENTS_DATA_SUCCESS = 'LOAD_STUDENTS_DATA_SUCCESS';
export const SEARCH_STUDENT_DATA_SUCCESS = 'SEARCH_STUDENT_DATA_SUCCESS';

export const loadStudentsFetchDataSuccess = (students) => {
  return {
    type: LOAD_STUDENTS_DATA_SUCCESS,
    students,
  };
};
export const searchStudentFetchDataSuccess = (search) => {
  return {
    type: SEARCH_STUDENT_DATA_SUCCESS,
    search,
  };
};

export const loadStudentsFetchData = (data) => async (dispatch) => {
  const { url, values, setValues } = data;
  let response = await fetch(url, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  if (response.status === 200) {
    response = await response.json();
    if (values.typeUser === 'ADMIN') {
      dispatch(!values.isShowSearchStudent ? loadStudentsFetchDataSuccess(response) : searchStudentFetchDataSuccess(response));
    } else {
      dispatch(loadStudentsFetchDataSuccess(response));
    }
    setValues({ ...values });
  } else {
    setValues({
      ...values,
      nameStudent: '',
      showNavigationItemDiscipline: false,
      showNavigationItemGroup: false,
      showNavigationItemStudent: false,
      errorForm: values.isShowSearchStudent ? true : false,
      errorMessage: values.typeUser === 'ADMIN' ? "This student wasn't found!!!" : "This group wasn't found!!!",
    });
    console.log({ message: 'Error!!!' });
  }
};
