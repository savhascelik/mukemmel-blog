import * as React from "react";
import Head from "next/head";
import Home from "./Home/Home";
import "../utils/css/index.css";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import SessionWrapperHOC from "../components/Hoc/SessionWrapperHOC";
import { User } from "../@types/types/DatabaseTypes";

// pages
import BlogDetails from "./BlogDetails/BlogDetails";
import LoginPage from "./Login/LoginPage";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import CategoryPage from "./Categories/CategoryPage";
import Admin from "./Admin/Admin";

// components
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AdminNavbar from "../components/Navbar/AdminNavbar";

type Props = {
  session: any;
};

const App: React.FC<Props> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Berkay'ın Bloğu</title>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar session={session} />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/login" render={() => <LoginPage />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route
          exact
          path="/blog/details/:id"
          render={() => <BlogDetails session={session} />}
        />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route
          exact
          path="/category/:category"
          render={() => <CategoryPage session={session} />}
        />
        <Route exact path="/admin" render={() => <Admin />} />
        <Route exact path="*" render={() => <div>No page.</div>} />
      </Switch>
      <Footer />
    </>
  );
};

export default SessionWrapperHOC(App);
