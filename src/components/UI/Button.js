import styles from "./Button.module.css";

export const Button = ({ children, onClick, btn }) => {
  return (
    <button className={`${styles.button} ${btn}`} onClick={onClick}>
      {children}
    </button>
  );
};
