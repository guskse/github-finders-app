import { useContext } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

//loading spinner component
import SpinnerComponent from "../layout/Spinner";

function UserResults() {
  // get the props from the context provider (githubContext file)
  const { loading, users } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          //pass user as a prop to the UserItem Component
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <SpinnerComponent />;
  }
}

export default UserResults;
