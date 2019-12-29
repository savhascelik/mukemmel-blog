import * as React from "react";
import Auth from "../../components/Hoc/Auth";
import { User } from "../../@types/types/DatabaseTypes";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const Admin: React.FC = () => {
  return <AdminNavbar />;
};

export default Auth((session: any) => {
  let activeUser: User = null;

  if (session && session.activeUser.user !== null) {
    activeUser = session.activeUser.user;
  }

  return activeUser !== null ? activeUser.admin === true : false;
})(Admin);
