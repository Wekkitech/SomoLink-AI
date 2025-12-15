import { useEffect, useRef, useState } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef(null);

  const WEBHOOK_URL = import.meta.env.VITE_CHATBOT_WEBHOOK || "";
  const targetOrigin =
    import.meta.env.MODE === "development" ? "*" : window.location.origin;

  useEffect(() => {
    if (!open) return;

    const id = setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      iframe.contentWindow.postMessage(
        {
          type: "APP_INIT",
          webhook: WEBHOOK_URL,
          token: localStorage.getItem("token"),
        },
        targetOrigin
      );
    }, 250);

    return () => clearTimeout(id);
  }, [open, WEBHOOK_URL, targetOrigin]);

  useEffect(() => {
    const onMessage = (e) => {
      if (e?.data?.type === "CHAT_CLOSE") {
        setOpen(false);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className={styles.container}>
      <button
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </button>

      <div className={`${styles.panel} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <span>SomoBot</span>
          <button
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <iframe
          ref={iframeRef}
          title="SomoBot"
          src="/chatbot/chatbot.html"
          className={styles.iframe}
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Chatbot;
