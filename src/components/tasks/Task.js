import { useSelector } from "react-redux";
import { useState } from "react";

import { TaskItem } from "./TaskItem";
import { TaskModal } from "../UI/TaskModal";

import { Button } from "../UI/Button";
import { Backdrop } from "../UI/Backdrop";

import styles from "./Task.module.css";

export const Task = ({ listId }) => {
  const tasks = useSelector((state) => state.tasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const filteredTasks = tasks.filter((i) => i.listId === listId);

  const onAddTaskHandler = () => {
    setIsAddingTask(true);
  };
  const onModalSubmitHandler = (isOpen) => {
    setIsAddingTask(isOpen);
  };
  return (
    <div className={styles.tasks}>
      <div>
        {listId > 0 && filteredTasks.length > 0 && (
          <Button onClick={onAddTaskHandler}>Add task</Button>
        )}
      </div>
      {isAddingTask && <Backdrop onCancel={onModalSubmitHandler} />}
      {isAddingTask && (
        <TaskModal
          onModalSubmitHandler={onModalSubmitHandler}
          listId={listId}
        />
      )}
      <div>
        {filteredTasks.map((t) => {
          return <TaskItem key={t.id} taskItem={t} listId={listId} />;
        })}
      </div>
    </div>
  );
};
