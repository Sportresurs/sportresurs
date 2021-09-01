import styles from "./Grid.module.scss";

function Col({ col = 1, children }) {
  return <div className={styles[`grid-elem-sm-${col}`]}>{children}</div>;
}

function Grid({ children }) {
  return <div className={styles["grid-container"]}>{children}</div>;
}

export { Grid, Col };
