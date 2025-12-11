import React, { useEffect, useRef, useState } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef(null);

  // Vite env name (works with import.meta.env)
  const WEBHOOK_URL = import.meta.env.VITE_CHATBOT_WEBHOOK || "";

  const isDev = import.meta.env.MODE === "development";
  // allow * in dev to simplify local testing, use explicit origin in prod
  const targetOrigin = isDev ? "*" : window.location.origin;

  const postInit = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const token = localStorage.getItem("token") || null;

    let attempts = 0;
    const tryPost = () => {
      // iframe.contentWindow exists even in sandbox, we can postMessage to it
      if (!iframe.contentWindow) {
        if (attempts++ < 6) setTimeout(tryPost, 150);
        return;
      }

      try {
        iframe.contentWindow.postMessage(
          { type: "APP_INIT", webhook: WEBHOOK_URL, token },
          targetOrigin
        );
        // debug: you can remove or comment this in prod
        // eslint-disable-next-line no-console
        console.debug("Chatbot APP_INIT posted", {
          webhook: WEBHOOK_URL,
          token,
          targetOrigin,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Chatbot postMessage failed", err);
        if (attempts++ < 6) setTimeout(tryPost, 150);
      }
    };

    tryPost();
  };

  const onIFrameLoad = () => {
    // only post init if panel open (avoids unnecessary posts)
    if (open) postInit();
  };

  useEffect(() => {
    if (!open) return;
    // small delay to ensure iframe has registered its message listener
    const id = setTimeout(postInit, 200);
    return () => clearTimeout(id);
    // include WEBHOOK_URL so changes re-init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, WEBHOOK_URL]);

  // optional: listen for messages coming back from iframe
  useEffect(() => {
    const onMessage = (e) => {
      const data = e?.data || {};
      // in production verify e.origin matches your app origin
      if (data?.type === "CHAT_CLOSE") setOpen(false);
      if (data?.type === "CHAT_LOG") {
        // forward logs from iframe to parent console
        // eslint-disable-next-line no-console
        console.debug("iframe log:", data.msg);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className={styles.container} aria-live="polite">
      <button
        className={styles.toggle}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        type="button"
      >
        {open ? "✕" : "💬"}
      </button>

      <div
        className={`${styles.panel} ${open ? styles.open : ""}`}
        role="dialog"
        aria-hidden={!open}
      >
        <iframe
          title="Chatbot"
          ref={iframeRef}
          src="/chatbot/chatbot.html"
          className={styles.iframe}
          frameBorder="0"
          // note security tradeoff: allow-same-origin enables storage like IndexedDB
          // remove allow-same-origin if you want stronger isolation and use parent storage
          sandbox="allow-scripts allow-forms allow-same-origin"
          onLoad={onIFrameLoad}
        />
      </div>
    </div>
  );
};

export default Chatbot;
