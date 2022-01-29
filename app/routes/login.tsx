import { Form } from "remix";

export default function Login() {
  return (
    <Form action="/auth/google" method="post">
      <button className="btn-primary">Login with Google</button>
    </Form>
  );
}
