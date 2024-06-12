import React from "react";
import { createRoot } from "react-dom/client";

import styles from "./index.module.scss";

let Greet = (props: { text: string }) => (
  <div className={styles.greet}>
    <h1>{props.text}</h1>
  </div>
);

const container = document.getElementById("app");

if (container) {
  const root = createRoot(container);
  root.render(<Greet text="esbuild react template" />);
}
