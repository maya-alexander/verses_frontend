import api from "../apis/api";
import * as actionTypes from "./actionTypes";
import * as actions from "../actions/index";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (response) => {
  console.log(response)
  return {
    type: actionTypes.AUTH_SUCCESS,
    response: response,
    cart: response.cart,
    cart_items: response.cart_items
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, name, isSignup) => async (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    name: name,
    returnSecureToken: true,
  };
  let path = !isSignup ? `/session` : `/users/`;

  await api
    .post(path, authData)
    .then((response) => {
      dispatch(authSuccess(response.data));
    })
    .catch((response) => dispatch(authFail(response)));
};

export const fetchUser = () => async (dispatch, getState) => {
  let user = getState().auth.userId;
  dispatch(authStart());
  JSON.stringify(user);
  await api
    .get(`/users/${user}`)
    .then((response) => {
      dispatch(authSuccess(response.data));
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};

// export const fetchUserFail = (error) => {
//   return {
//     type: actionTypes.FETCH_USER_FAIL,
//     error: error,
//   };
// };

// export const fetchUserSuccess = (response) => {
//   return {
//     type: actionTypes.FETCH_USER_SUCCESS,
//     user: response.user
//   };
// };

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
