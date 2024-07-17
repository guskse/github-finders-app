import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

//env variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //useReducer stuff
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Search Users
  const searchUsers = async (text) => {
    setLoading(); //before fetching, set the loading to true

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    //from the response, get only the items object
    const { items } = await response.json();

    //use Reducer Stuff
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //Get Single User
  const getUser = async (login) => {
    setLoading(); //before fetching, set the loading to true

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    //if can't get the user, redirect to /notfound page
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      //get the user data
      const data = await response.json();
      //use Reducer Stuff
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //Get user Repos
  const getUserRepos = async (login) => {
    setLoading(); //before fetching, set the loading to true

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    //from the response, get only the items object
    const data = await response.json();

    //use Reducer Stuff
    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  //Clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
