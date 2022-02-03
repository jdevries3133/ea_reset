import { FunctionComponent } from "react";
import { useTransition } from "remix";
import { LoadingSpinner } from "./loadingSpinner";

export const SubmitButton: FunctionComponent<{
  text: string;
  extraClasses?: string;
}> = ({ text, extraClasses = "" }) => {
  const transition = useTransition();
  return transition.state === "submitting" ? (
    <LoadingSpinner />
  ) : transition.state === "loading" ? (
    <p className="block">Saved!</p>
  ) : (
    <button type="submit" className={`block btn-primary ${extraClasses}`}>
      {text}
    </button>
  );
};
