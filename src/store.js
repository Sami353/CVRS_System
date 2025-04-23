import { legacy_createStore as createStore } from "redux";

const initialState = {
  sidebarShow: true,
  theme: "light",

  // user: {
  //   name: "Guest",
  //   role: "client",
  // },

  user: null,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };

    case "SET_USER": {
      // to avoid accidentally passing other non user fields
      const { name, role } = rest;
      return { ...state, user: { name, role } };
    }

    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
