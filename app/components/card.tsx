import { FunctionComponent } from "react";

type CardTypes = {
  title: string;
  imageUrl: string;
};

export const Card: FunctionComponent<CardTypes> = ({ title, imageUrl }) => {
  return (
    <div className="flex flex-col items-center w-36 h-36 rounded-lg shadow-md justify-center bg-purple-100 hover:bg-purple-200 focus:bg-purple-200 min-w-md p-6 m-3">
      <h1 className="text-lg font-bold">{title}</h1>
      <img src={imageUrl} className="rounded-lg h-4/5" />
    </div>
  );
};
