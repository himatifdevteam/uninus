import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Buttons } from "./index";
import "@testing-library/jest-dom";

describe("Test Button Functionality", () => {
  it("Should have onClick", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
  });

  it("Should have ignore onClick when disabled", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons disabled onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalledTimes(0);
  });

  it("Should have type submit when type set to submit", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons type="submit" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "submit");
  });

  it("Should have type button when type set to button", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons type="button" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "button");
  });

  it("Should have type reset when type set to reset", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons type="reset" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "reset");
  });

  it("Should have children Loading... when loading props pass", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons type="button" isLoading onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveTextContent("Loading...");
  });

  it("Should have className", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons className="test" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveClass("test");
  });

  it("Should have style", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons style={{ color: "#FFF" }} onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveStyle({ color: "#FFF" });
  });

  it("Should have id", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Buttons id="test" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("id", "test");
  });
});
