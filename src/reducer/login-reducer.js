export const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: ""
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "change": {
      return {
        ...state,
        [action.field]: action.payload
      };
    }
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case "success": {
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: ""
      };
    }
    case "failure": {
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
