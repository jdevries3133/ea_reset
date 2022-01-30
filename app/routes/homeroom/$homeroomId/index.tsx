/**
 * This is where we select a custom room number, if needed
 */

import { useState } from "react";
import { ActionFunction, Form, redirect, useParams } from "remix";
import { AutoComplete } from "~/components/autocomplete";
import { ROOMS } from "~/constants";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const roomNumber = form.get("roomNumber");

  // TODO: validation

  return redirect(`${request.url}/${roomNumber}`);
};

export default function Index() {
  const [roomNumber, setRoomNumber] = useState("");

  return (
    <Form method="post">
      <AutoComplete
        name="roomNumber"
        label="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber((e.target as HTMLInputElement).value)}
        querySet={ROOMS}
      />
      <button
        className="bg-green-100 shadow hover:shadow-none hover:bg-green-200 focus:bg-green-200 p-2 my-2"
        type="submit"
      >
        Next
      </button>
    </Form>
  );
}
