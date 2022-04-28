import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../Loading/Loading";
import { sleep } from "../../helpers/config";
import {
  editList,
  addList,
  addTask,
  isNotLoading,
  loading,
} from "../../store/store";

import { Button } from "./Button";
import { Input } from "./Input";

import styles from "./Modal.module.css";

export const ListModal = ({ onModalSubmitHandler, task }) => {
  const tasks = useSelector((state) => state.tasks);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [newUserData, setNewUserData] = useState(task);
  const [isError, setIsError] = useState(false);

  const onChangeHandler = (event) => {
    setNewUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (!newUserData.name) {
      setIsError(true);
      return;
    }

    let lId = Date.now();
    dispatch(loading());
    sleep(2000).then(() => {
      if (!newUserData.id) {
        dispatch(addList({ id: lId, name: newUserData.name }));
      } else {
        dispatch(editList(newUserData));
      }

      if (tasks.filter((i) => i.listId === lId).length === 0) {
        dispatch(
          addTask({
            id: lId,
            title: "task mock title",
            description: "task mock description",
            listId: lId,
          })
        );
      }
      dispatch(isNotLoading());
      onModalSubmitHandler(false);
    });
  };

  return (
    <form onSubmit={submitHandler} className={styles.modal}>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        id="name"
        placeholder="only letters and numbers"
        name="name"
        pattern="[a-zA-Z0-9-]+"
        required
        value={newUserData.name || ""}
        onChange={onChangeHandler}
      />
      {isError && <p className="error"> Please,Enter something</p>}
      <Button>Save</Button>
      {isLoading && <Loading />}
    </form>
  );
};
