import { ScriptHTMLAttributes, useEffect, useRef } from "react";
import { requestIdleCallback } from "./shared/requestIdlecallback";
export interface ScriptProps extends ScriptHTMLAttributes<HTMLScriptElement> {
  id?: string;
  onLoad?: (e: any) => void;
  getScriptOption?: "afterInteractive" | "requestIdleTime";
  onReady?: () => void;
  onError?: (e: any) => void;
}

const LocalScriptCache = new Set();

const ignoreProps = ["onLoad", "onReady", "onError", "getScriptOption"];

function Script(props: ScriptProps) {
  const { id, src = "", getScriptOption = "afterInteractive", onReady } = props;

  const initScriptOnReadyRef = useRef(false);

  useEffect(() => {
    const cacheKey = id || src;
    if (!initScriptOnReadyRef.current) {
      if (onReady && cacheKey && LocalScriptCache.has(cacheKey)) {
        onReady();
      }
      initScriptOnReadyRef.current = true;
    }
  }, [onReady, id, src]);

  const initScriptOnLoad = useRef(false);

  useEffect(() => {
    if (!initScriptOnLoad.current) {
      if (getScriptOption === "afterInteractive") {
        loadScript(props);
      } else if (getScriptOption === "requestIdleTime") {
        loadIdleTimeScript(props);
      }
      initScriptOnLoad.current = true;
    }
  }, [props, getScriptOption]);

  const loadIdleTimeScript = (props: ScriptProps) => {
    requestIdleCallback(() => {
      loadScript(props);
    });
  };

  return null;
}

function loadScript(props: ScriptProps) {
  const { src, id, onLoad = () => {}, onReady, onError } = props;

  const cacheKey = id || src;

  if (cacheKey && LocalScriptCache.has(cacheKey)) return;

  const script = document.createElement("script");


  if(src) {
    script.src = src;
  }

  for (const [k, value] of Object.entries(props)) {
    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    const attr = k.toLowerCase();
    script.setAttribute(attr, String(value));
  }

  new Promise<void>((resolve, reject) => {
    script.addEventListener("load", (e) => {
      resolve();
      if (onLoad) {
        onLoad(e);
      }
      if (onReady) {
        onReady();
      }
      LocalScriptCache.add(cacheKey);
    });
    script.addEventListener("error", (e) => {
      reject(e);
    });
  }).catch((e) => {
    if (onError) {
      onError(e);
    }
  });

  document.body.appendChild(script);
}

export default Script;
