import { Form } from "remix";

export default function Login() {
  return (
    <Form
      className="flex w-screen h-screen items-center justify-center"
      action="/auth/google"
      method="post"
    >
      <button className="btn-primary bg-blue-100 hover:bg-blue-200 active:bg-blue-200">
        Login with Google
      </button>
    </Form>
  );
}
