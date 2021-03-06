import { LoaderFunction } from "remix";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.logout(request, {
    redirectTo: "/login",
  });
};

export default function Logout() {
  return <p>Logging Out...</p>;
}
