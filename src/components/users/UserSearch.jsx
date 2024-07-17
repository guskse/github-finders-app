import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

function UserSearch() {
  const [text, setText] = useState("");

  const { setAlert } = useContext(AlertContext);

  //context stuff
  const { users, searchUsers, clearUsers } = useContext(GithubContext);

  //change the text based on what the user type in the searchbar
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  //when submitting form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something.", "error");
    } else {
      //use the searchUsers function from the GithubContext
      //to search the user typed in the text input.
      searchUsers(text);

      //empty text after submitting.
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                type="text"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                type="submit"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      {/*if there are users, show the clear button */}
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={clearUsers}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
