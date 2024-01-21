import { forwardRef, ReactElement } from "react";
import { inputClassName } from "../class-name";
import { TInputText } from "./type";

export const NeoInputText = forwardRef<HTMLInputElement, TInputText>(
  ({ size, ...props }, ref): ReactElement => {
    return (
      <input
        {...props}
        data-testid="input-text"
        className={inputClassName({ size, ...props })}
        ref={ref}
        id={props.name}
      />
    );
  },
);

NeoInputText.displayName = "NeoInputText";
