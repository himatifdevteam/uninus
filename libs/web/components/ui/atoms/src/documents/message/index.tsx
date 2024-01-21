import { FC, ReactElement } from "react";
import { TMessage } from "./type";
import { clsx } from "clsx";
import { match } from "ts-pattern";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";

export const NeoMessage: FC<TMessage> = (props): ReactElement => {
  const { status = "none" } = props;

  const statusIcon = match(status)
    .with("error", () => <BiErrorCircle />)
    .with("success", () => <BiCheckCircle />)
    .with("warning", () => <BiErrorCircle />)
    .with("none", () => null)
    .exhaustive();

  const className = clsx("text-xs flex items-center gap-x-1 mt-[-7px] py-[7px] border-0 p-0", {
    "text-red-4": status === "error",
    "text-green-6": status === "success",
    "text-gray-4": status === "none",
    "text-yellow-4": status === "warning",
  });

  return (
    <span className={className} {...props}>
      {statusIcon}
      {props.children}
    </span>
  );
};
