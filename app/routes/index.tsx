import { Link } from "remix";

export default function Index() {
  return (
    <div className="flex justify-center justify-center h-screen w-screen">
      <div className="max-w-sm flex items-center justify-center flex-col">
        <h1 className="block text-lg">EA Reset Request</h1>
        <p className="block text-gray-800 text-justify">
          A nifty form that integrates with google classroom, and helps you ask
          for help faster.
        </p>

        <Link to="/getHelp">
          <button className="btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
