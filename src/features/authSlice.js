const initialState = {
  isLogged: false,
  dataUser: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogged: true, dataUser: action.payload };

    case "LOGOUT":
      return { ...state, isLogged: false, dataUser: null };

    default:
      return state;
  }
}
