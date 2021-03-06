import { useState } from "react";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
} from "remix";
import { HOMEROOMS, HOMEROOM_TO_ROOM_MAPPING, ROOMS } from "~/constants";
import { AutoComplete } from "~/components/autocomplete";
import { authenticator } from "~/services/auth.server";
import { requestHelp } from "~/services/requestHelp.server";
import { SubmitButton } from "~/components/submitButton";
import { ChooseRoom } from "~/components/chooseRoomNumber";
import { DescribeSituation } from "~/components/describeSituation";
import { STUDENTS } from "~/services/students.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let homeroom = form.get("homeroom");
  let roomNumber = form.get("roomNumber");
  let description = form.get("description");
  let extraDescription = form.get("extraDescription");

  // combine description and extraDescription. Append extraDescription if
  // description is provided, or use only extraDescription if description is
  // falsy
  if (typeof extraDescription === "string") {
    description =
      typeof description === "string"
        ? `${description}\n${extraDescription}`
        : extraDescription;
  }

  // validation
  let errors = {
    homeroom: false,
    roomNumber: false,
    description: false,
  };

  // homeroom must be present, and a member of HOMEROOM_TO_ROOM_MAPPING
  if (!homeroom) errors.homeroom = true;
  if (
    homeroom !== null &&
    !((homeroom as string) in HOMEROOM_TO_ROOM_MAPPING)
  ) {
    errors.homeroom = true;
  }
  // roomNumber must be present, and a member of ROOMS
  if (!roomNumber) errors.roomNumber = true;
  if (roomNumber !== null && !ROOMS.includes(roomNumber as string)) {
    errors.roomNumber = true;
  }
  // either description or extraDescription must be present
  if (!description && !extraDescription) errors.description = true;

  const wholeFormValid = Object.values(errors).every((v) => !v);

  if (wholeFormValid) {
    const validatedData = {
      homeroom: homeroom as any as keyof typeof HOMEROOM_TO_ROOM_MAPPING,
      roomNumber: roomNumber as any as string,
      description: description as any as string,
    };
    await requestHelp(request, validatedData);
    return redirect("/success");
  }

  let students: string[] = [];
  if (typeof homeroom === "string" && homeroom in STUDENTS) {
    students = STUDENTS[homeroom as keyof typeof STUDENTS];
  }

  return {
    values: { homeroom, roomNumber, description },
    errors,
    students,
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!/(\w+)@empacad.org/.test(user.username)) {
    return redirect("/empacadOnly");
  }
  return user;
};

/**
 * A cookie crumb form, where the next field is only shown once the previous
 * field is set.
 */
export default function Index() {
  const actionData = useActionData();

  const [state, setState] = useState(
    actionData?.values || {
      homeroom: "",
      roomNumber: "",
      studentsInvolved: [],
    }
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Form method="post" className="max-w-3xl">
        <h1 className="text-xl font-bold">Reset Request</h1>
        {/* homeroom picker becomes disabled after initial selection */}
        <AutoComplete
          name="homeroom"
          label="Homeroom"
          readOnly={!!actionData?.values?.homeroom}
          value={state.homeroom}
          onChange={(e) =>
            setState({
              ...state,
              homeroom: (e.target as HTMLInputElement).value.toUpperCase(),
            })
          }
          querySet={HOMEROOMS}
        />
        {actionData?.errors?.homeroom && (
          <p className="block text-red-600">homeroom cannot be blank</p>
        )}
        {actionData?.values?.homeroom && (
          <ChooseRoom
            homeroom={state.homeroom}
            roomNumber={state.roomNumber}
            setRoomNumber={(r) => setState({ ...state, roomNumber: r })}
            disabled={actionData?.values?.roomNumber}
          />
        )}
        {actionData?.values?.roomNumber && (
          <DescribeSituation studentNames={actionData?.students} />
        )}
        <SubmitButton
          text={actionData?.values?.roomNumber ? "Send Reset Request" : "next"}
          extraClasses={
            actionData?.values?.roomNumber
              ? "bg-green-100 hover:bg-green-200 focus:bg-green-200"
              : ""
          }
        />
      </Form>
      <Link to="/getHelp" tabIndex={-1}>
        <button className="btn-secondary">Restart</button>
      </Link>
    </div>
  );
}
