import { FunctionComponent } from "react";

type CardTypes = {
  title: string;
  imageUrl: string;
  extraClasses?: string;
};

export const Card: FunctionComponent<CardTypes> = ({
  title,
  imageUrl,
  extraClasses = "",
}) => {
  return (
    <div
      className={
        "flex border-2 border-zinc-400 flex-col items-center w-36 h-36 rounded-lg shadow-md justify-center bg-purple-100 hover:bg-purple-200 focus:bg-purple-200 p-6 m-3 " +
        extraClasses
      }
    >
      <h1 className="text-lg font-bold">{title}</h1>
      <img src={imageUrl} className="rounded-lg h-4/5" />
    </div>
  );
};
