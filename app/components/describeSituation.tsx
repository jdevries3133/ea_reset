import { FunctionComponent, SyntheticEvent, useState } from "react";
import { Card } from "./card";

import fightUrl from "~/static/fight.jpg";
import angerUrl from "~/static/anger.jpg";
import defiantUrl from "~/static/defiance.jpg";

export const DescribeSituation: FunctionComponent<{
  studentNames: string[];
}> = ({ studentNames }) => {
  const [predicate, _setPredicate] = useState("Reset needed.");
  const [involvedStudents, setInvolvedStudents] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleInvolved = (student: string) => {
    const current = involvedStudents[student];
    setInvolvedStudents({
      ...involvedStudents,
      [student]: current === undefined ? true : !current,
    });
  };

  const setPredicate = (e: SyntheticEvent, predicate: string) => {
    e.preventDefault();
    _setPredicate(predicate);
  };

  const studentsInvolved = Object.keys(involvedStudents).filter(
    (k) => involvedStudents[k]
  );

  const generatedDescription =
    predicate +
    (studentsInvolved.length
      ? "\n\nStudents Involved: " + studentsInvolved.join(", ")
      : "");

  const CARD_SELECTED_CLASSES =
    "bg-red-100 hover:bg-red-200 focus:bg-red-200 border-4 border-red-400";

  return (
    <>
      <div className="flex flex-col">
        <div className="border-4 p-4 bg-red-50 border-red-200 shadow-md rounded-md ">
          <h1 className="text-md font-bold text-center">What is happening?</h1>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <button
              onClick={(e) =>
                setPredicate(e, "Incident Type: Fight / Physical Violence")
              }
            >
              <Card
                title="fight"
                imageUrl={fightUrl}
                extraClasses={
                  predicate.includes("Fight") ? CARD_SELECTED_CLASSES : ""
                }
              />
            </button>
            <button
              onClick={(e) =>
                setPredicate(e, "Incident type: emotional outburst")
              }
            >
              <Card
                title="emotional outburst"
                imageUrl={angerUrl}
                extraClasses={
                  predicate.includes("emotional outburst")
                    ? CARD_SELECTED_CLASSES
                    : ""
                }
              />
            </button>
            <button
              onClick={(e) => {
                setPredicate(e, "Incident type: excessive defiance");
              }}
            >
              <Card
                title="defiance"
                imageUrl={defiantUrl}
                extraClasses={
                  predicate.includes("excessive defiance")
                    ? CARD_SELECTED_CLASSES
                    : ""
                }
              />
            </button>
          </div>
        </div>
        <div className="block mt-4">
          <h1 className="text-md text-center">Who is involved?</h1>
          <div className="flex justify-center flex-wrap gap-2 ">
            {studentNames.sort().map((student: string) => {
              return (
                <button
                  className={`block btn-primary ${
                    involvedStudents[student]
                      ? "bg-red-100 hover:bg-red-200 focus:bg-red-200"
                      : "bg-blue-100 hover:bg-blue-200 focus:bg-blue-200"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleInvolved(student);
                  }}
                  key={Math.random()}
                >
                  {student}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <label className="block">
        Generated description
        <textarea
          className="w-full h-32 bg-gray-100 rounded "
          readOnly
          value={generatedDescription}
          name="description"
        ></textarea>
      </label>
      <label className="block">
        Additional custom description (optional)
        <textarea className="w-full rounded" name="extraDescription"></textarea>
      </label>
    </>
  );
};
