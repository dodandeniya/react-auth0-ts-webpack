import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./HomePage/Home";
import Profile from "./ProfilePage/Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./CallBack/Callback";
import Public from "./PublicPage/Public";
import Private from "./PrivatePage/Private";
import Courses from "./CoursesPage/Courses";

function App(props: any) {
  let auth = new Auth(props.history);
  return (
    <>
      <Nav auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={(props) => <Home auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={(props) =>
            auth.isAuthenticated() ? (
              <Profile auth={auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route path="/public" component={Public} />
        <Route
          path="/private"
          render={(props) =>
            auth.isAuthenticated() ? (
              <Private auth={auth} {...props} />
            ) : (
              <Home auth={auth} {...props} />
            )
          }
        />
        <Route
          path="/courses"
          render={(props) =>
            auth.isAuthenticated() && auth.userHasScopes(["read:courses"]) ? (
              <Courses auth={auth} {...props} />
            ) : (
              <Home auth={auth} {...props} />
            )
          }
        />
      </div>
    </>
  );
}

export default App;
