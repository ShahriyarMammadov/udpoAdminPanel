let initialState = { loading: false, data: null, error: null };

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case "PENDING":
      return {
        loading: true,
      };
    case "FULFILLED":
      return {
        loading: false,
        data: action.payload,
      };
    case "REJECTED":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
