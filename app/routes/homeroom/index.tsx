import { useState } from "react";
import { ActionFunction, Form, Outlet } from "remix";
import { HOMEROOMS, HOMEROOM_TO_ROOM_MAPPING } from "~/constants";
import { AutoComplete } from "~/components/autocomplete";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  console.log(form);
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
        {homeroomMatched ? (
          <>
            <button
              className="p-2 my-1 rounded bg-green-100 shadow hover:bg-green-200 hover:shadow-none focus:shadow-none"
              onClick={() => {
                setState({
                  ...state,
                  roomNumber:
                    HOMEROOM_TO_ROOM_MAPPING[state.homeroom] ||
                    state.roomNumber,
                });
              }}
            >
              I am in room {HOMEROOM_TO_ROOM_MAPPING[state.homeroom]}, which is
              the default for this homeroom
            </button>
            <button className="rounded p-2 my-2 bg-yellow-100 shadown hover:bg-yellow-200 hover:shadow-none focus:shadow-none">
              I with the homeroom in a different room
            </button>
            <input type="hidden" value={state.roomNumber} name="roomNumber" />
          </>
        ) : null}
        <Outlet />
      </Form>
    </div>
  );
}
