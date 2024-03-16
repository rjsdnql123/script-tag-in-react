import React, { useEffect, useState } from "react";
import Script from "../index";
import { fireEvent, render, waitFor } from "@testing-library/react";

const url: string = "https://example.com/script.js";

describe("should load the external script", () => {
  const triggerLoadEvent = () => {
    const scriptElementAll = document.querySelectorAll("script");
    const scriptElement = scriptElementAll[scriptElementAll.length - 1];
    return scriptElement;
  };

  test("When loading the script, tags should be generated.", async () => {
    render(<Script id="1" src={url} />);

    const scriptElement = document.querySelector("script");
    fireEvent(scriptElement, new Event("load"));

    expect(document.querySelector("script")).not.toBeNull();
  });

  describe("Script Component containing an id", () => {
    test("OnLoad and onReady should be triggered upon the first execution.", async () => {
      const onLoad = jest.fn();
      const onReady = jest.fn();

      render(
        <Script id="onLoad1" onLoad={onLoad} onReady={onReady} src={url} />
      );

      const scriptElement = triggerLoadEvent();
      fireEvent(scriptElement, new Event("load"));

      expect(onLoad).toHaveBeenCalled();
      expect(onReady).toHaveBeenCalled();
    });

    test("If it's the same ID, only onReady should function.", async () => {
      const onLoad = jest.fn();
      const onReady = jest.fn();

      render(
        <Script id="onLoad1" onLoad={onLoad} onReady={onReady} src={url} />
      );

      const scriptElement = triggerLoadEvent();
      fireEvent(scriptElement, new Event("load"));

      expect(onLoad).not.toHaveBeenCalled();
      expect(onReady).toHaveBeenCalled();
    });
  });

  describe("Script component without an ID", () => {
    test("OnLoad and onReady should be triggered upon the first execution", async () => {
      const onReady = jest.fn();
      const onLoad = jest.fn();

      render(<Script onLoad={onLoad} onReady={onReady} src={url} />);

      const scriptElement = triggerLoadEvent();
      fireEvent(scriptElement, new Event("load"));

      expect(onReady).toHaveBeenCalled();
      expect(onLoad).toHaveBeenCalled();
    });

    test("If it's the same ID, only onReady should function", async () => {
      const onReady = jest.fn();
      const onLoad = jest.fn();

      render(<Script onLoad={onLoad} onReady={onReady} src={url} />);

      const scriptElement = triggerLoadEvent();
      fireEvent(scriptElement, new Event("load"));

      expect(onReady).toHaveBeenCalled();
      expect(onLoad).not.toHaveBeenCalled();
    });
  });

  test("If an error occurs during script loading, onError should be triggered.", async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    render(<Script id="3" onReady={onLoad} onError={onError} src={url} />);

    const scriptElement = triggerLoadEvent();
    fireEvent(scriptElement, new Event("error"));

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
