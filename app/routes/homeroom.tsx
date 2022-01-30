import { useState } from "react";
import { ActionFunction, Form, LoaderFunction, Outlet, redirect } from "remix";
import { HOMEROOMS, HOMEROOM_TO_ROOM_MAPPING } from "~/constants";
import { AutoComplete } from "~/components/autocomplete";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const homeroom = form.get("homeroom");
  const roomNumber = form.get("roomNumber");

  // TODO: validation

  if (roomNumber) {
    return redirect(`/homeroom/${homeroom}/${roomNumber}/`);
  }

  return redirect(`/homeroom/${homeroom}/`);
};

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

const initialState = {
  roomNumber: "",
  homeroom: "",
  teacher: "",
  customHomeroom: false,
};

export default function Index() {
  const [state, setState] = useState(initialState);

  const homeroomMatched = state.homeroom in HOMEROOM_TO_ROOM_MAPPING;

  return (
    <div className="flex flex-col items-center justify-center">
      <Form method="post">
        <h1 className="text-xl font-bold">Reset Request</h1>
        <AutoComplete
          name="homeroom"
          label="Homeroom"
          value={state.homeroom}
          onChange={(e) => {
            setState({
              ...state,
              homeroom: (e.target as HTMLInputElement).value.toUpperCase(),
            });
          }}
          querySet={HOMEROOMS}
        />
        <Outlet />
        {homeroomMatched && <button className="block btn-primary">next</button>}
        <button className="block btn-secondary">start over</button>
      </Form>
    </div>
  );
}
