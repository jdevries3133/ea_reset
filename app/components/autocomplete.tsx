/**
 * Simple autocomplete component
 */

import { Suggestions } from "./suggestions";

import { EventHandler, FunctionComponent, SyntheticEvent } from "react";

type AutoCompleteProps = {
  name: string;
  label: string;
  value: string;
  onChange: EventHandler<SyntheticEvent>;
  querySet: string[];
  readOnly?: boolean;
};

export const AutoComplete: FunctionComponent<AutoCompleteProps> = ({
  name,
  label,
  value,
  onChange,
  querySet,
  readOnly = false,
}) => {
  // hijack the onChange method to propagate a click on suggestion
  const makeCompletion = (value: string) => {
    const evt = { target: { value: value } } as any as SyntheticEvent;
    onChange(evt);
  };

  const isPerfectMatch = querySet.includes(value);

  return (
    <label className="mt-2 flex flex-col text-sm">
      {label}
      <input
        type="text"
        autoComplete="off"
        readOnly={readOnly}
        name={name}
        className={`disabled:bg-gray-100 rounded ${
          isPerfectMatch && !readOnly ? "bg-green-100" : null
        }`}
        value={value}
        onChange={onChange}
      />
      {isPerfectMatch ? null : (
        <Suggestions
          current={value}
          targets={querySet}
          makeCompletion={makeCompletion}
        />
      )}
    </label>
  );
};
