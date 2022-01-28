import { Component, FunctionComponent } from "react";

type ChoiceProps = {
  name: string;
  render?: Component;
  image: string;
  imageAlt: string;
};

export const Choice: FunctionComponent<ChoiceProps> = ({
  name,
  render,
  image,
  imageAlt,
}) => {
  return (
    <div>
      <div>
        <h3>{name}</h3>
        {render}
        <div>
          <img src={image} alt={imageAlt} />
        </div>
      </div>
    </div>
  );
};
