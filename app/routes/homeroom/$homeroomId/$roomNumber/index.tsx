/**
 * Now that we have homeroom and room number, we can take a description of
 * what is happening, through one final form, and then fire off the email.
 */

import { ActionFunction, Form, useParams } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const description = form.get("description");
  const homeroom = form.get("homeroom");
  const roomNumber = form.get("roomNumber");

  console.log("GETTING HELP: ", description, homeroom, roomNumber);
};

export default function Index() {
  const { homeroomId, roomNumber } = useParams();

  return (
    <Form method="post">
      <label className="block">
        What is happening
        <textarea className="block" name="description"></textarea>
        <button
          className="my-2 p-2 bg-green-100 hover:bg-green-200 focus:bg-green-200 shadow hover:shadow-none"
          type="submit"
        >
          get help now
        </button>
        <input type="hidden" name="homeroom" value={homeroomId} />
        <input type="hidden" name="roomNumber" value={roomNumber} />
      </label>
    </Form>
  );
}
