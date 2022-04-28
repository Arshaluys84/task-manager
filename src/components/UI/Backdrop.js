import styles from "./Backdrop.module.css";

export function Backdrop({ onCancel }) {
  return <div className={styles.backdrop} onClick={() => onCancel(false)} />;
}
