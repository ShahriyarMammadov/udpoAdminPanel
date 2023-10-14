export const getUserAllDataAction = (data) => {
  try {
    return (dispatch) => {
      dispatch(data);
    };
  } catch (error) {
    console.log(error);
  }
};
