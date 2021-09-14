import styles from "./Grid.module.scss";

function Col({ col = 1, children }) {
  return <div className={styles[`gridElemCol${col}`]}>{children}</div>;
}

function Grid({ children }) {
  return <div className={styles.gridContainer}>{children}</div>;
}

export { Grid, Col };
