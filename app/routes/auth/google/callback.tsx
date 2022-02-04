import { LoaderFunction } from "remix";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/getHelp",
    failureRedirect: "/login",
  });
};
