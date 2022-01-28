import Fuse from "fuse.js";

import { FunctionComponent } from "react";

type SuggestionProps = {
  current: string;
  targets: string[];
  makeCompletion: (v: string) => void;
};

export const Suggestions: FunctionComponent<SuggestionProps> = ({
  current,
  targets,
  makeCompletion,
}) => {
  const fuse = new Fuse(targets, { shouldSort: true, includeMatches: true });
  const result = fuse.search(current);

  const onClick = (value: string) => {
    makeCompletion(value);
  };

  return (
    <div>
      {result.slice(0, 20).map((res, i) => (
        <button
          className="block rounded focus:bg-purple-100 hover:bg-purple-100 hover:border-black px-3"
          key={i + res.toString()}
          onClick={(e) => {
            e.preventDefault();
            onClick(res.matches[0].value);
          }}
        >
          <p>{res.matches[0].value}</p>
        </button>
      ))}
    </div>
  );
};
