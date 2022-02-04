import { Link } from "remix";

export default function Success() {
  return (
    <div className="flex items-center justify-center">
      <div className="prose-md">
        <h1 className="text-xl font-bold text-green-500">Success</h1>
        <p>Help is on the way.</p>
        <p>
          You can see the email in your Gmail outbox to confirm its delivery.
        </p>
        <Link to="/getHelp">
          <button className="btn-primary">Request Help Again</button>
        </Link>
      </div>
    </div>
  );
}
