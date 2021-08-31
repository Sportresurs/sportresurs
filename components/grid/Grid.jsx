import styles from './Grid.module.scss';

const Col = ({ sm = 1, children }) => {
    return (
      <div className={styles[`grid-elem-sm-${sm}`]}>
        {children}
      </div>
    );
  };

const Grid = ({ children }) => {
  return (
    <div className={styles["grid-container"]}>
      {children}
    </div>
  );
};

export { Grid, Col };
