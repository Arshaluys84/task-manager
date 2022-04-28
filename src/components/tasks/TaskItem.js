import React, { useState } from "react";

import { Backdrop } from "../UI/Backdrop";
import { Modal } from "../UI/Modal";

import styles from "./TaskItem.module.css";

export const TaskItem = ({ taskItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onTaskClickHandler = () => {
    setIsOpen(true);
  };

  const onModalSubmitHandler = (isOpen) => {
    setIsOpen(isOpen);
  };

  return (
    <div onClick={onTaskClickHandler} className={styles.tasks}>
      <div>Task N:{taskItem.id}</div>
      <div>Title :{taskItem.title}</div>
      <div>Description :{taskItem.description}</div>
      {isOpen && <Backdrop onCancel={onModalSubmitHandler} />}
      {isOpen && (
        <Modal task={taskItem} onModalSubmitHandler={onModalSubmitHandler} />
      )}
    </div>
  );
};
