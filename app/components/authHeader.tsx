import { FunctionComponent } from "react";
import { Link } from "remix";

export const AuthHeader: FunctionComponent<{
  auth: GmailUser;
}> = ({ auth }) => {
  return auth ? (
    <Link to="/logout">
      <button className="btn-primary mx-2">Log Out</button>
    </Link>
  ) : (
    <Link to="/login">
      <button className="btn-primary mx-2">Log In</button>
    </Link>
  );
};
