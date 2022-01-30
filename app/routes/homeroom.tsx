import { useRef, useState } from "react";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useParams,
} from "remix";
import { HOMEROOMS, ROOMS } from "~/constants";
import { AutoComplete } from "~/components/autocomplete";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  // parse form
  const form = await request.formData();
  const homeroom = form.get("homeroom");
  const roomNumber = form.get("roomNumber");

  // validation
  let isHomeroomValid =
    typeof homeroom === "string" && HOMEROOMS.includes(homeroom);
  let isRoomNumberValid =
    typeof roomNumber === "string" && ROOMS.includes(roomNumber);

  // redirects to nested routes, which are later cookie crumbs in the form
  if (isHomeroomValid && isRoomNumberValid) {
    return redirect(`/homeroom/${homeroom}/roomNumber/${roomNumber}/`);
  }

  if (isHomeroomValid) {
    return redirect(`/homeroom/${homeroom}/roomNumber/`);
  }

  // assemble validation errors
  const values = Object.fromEntries(form);
  const ret: { values: any; errors: string[] } = {
    values,
    errors: [],
  };
  if (!isHomeroomValid) ret.errors.push("homeroom is not valid");
  if (!isRoomNumberValid) ret.errors.push("room number is not valid");
  return ret;
};

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export default function Index() {
  const { homeroomId: homeroomIdParam } = useParams();
  const actionData = useActionData();
  const initialHomeroom = actionData ? actionData.homeroom : "";
  const [homeroom, setHomeroom] = useState(homeroomIdParam || initialHomeroom);

  return (
    <div className="flex flex-col items-center justify-center">
      <Form method="post">
        <h1 className="text-xl font-bold">Reset Request</h1>
        <AutoComplete
          name="homeroom"
          label="Homeroom"
          value={homeroom}
          disabled={!!homeroomIdParam}
          onChange={(e) => {
            setHomeroom((e.target as HTMLInputElement).value.toUpperCase());
          }}
          querySet={HOMEROOMS}
        />

        {actionData?.errors instanceof Array &&
          actionData.errors.map((err: String, i: Number) => (
            <p key={i.toString() + err} className="text-red-600">
              {err}
            </p>
          ))}

        <Outlet />
        <button className="block btn-primary">next</button>
      </Form>
      <Link to="/homeroom">
        <button className="btn-secondary">Restart</button>
      </Link>
    </div>
  );
}
