import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sleep } from "../../helpers/config";
import { deleteTask, editTask, isNotLoading, loading } from "../../store/store";

import { Loading } from "../Loading/Loading";
import { Button } from "./Button";
import { Input } from "./Input";

import styles from "./Modal.module.css";

export const Modal = ({ onModalSubmitHandler, task }) => {
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [newUserData, setNewUserData] = useState(task);

  const onChangeHandler = (event) => {
    setNewUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(loading());
    sleep(2000).then(() => {
      dispatch(editTask(newUserData));
      onModalSubmitHandler(false);
      dispatch(isNotLoading());
    });
  };
  const onDeleteHandler = () => {
    sleep(2000).then(() => {
      dispatch(deleteTask(newUserData));
      dispatch(isNotLoading());
    });
  };
  return (
    <form onSubmit={submitHandler} className={styles.modal}>
      <label htmlFor="title">Title</label>
      <Input
        type="text"
        id="title"
        placeholder="more 1 letter"
        name="title"
        value={newUserData.title}
        onChange={onChangeHandler}
      />
      <label htmlFor="description">Description</label>
      <Input
        type="text"
        id="description"
        placeholder="more 5 letters"
        name="description"
        value={newUserData.description}
        onChange={onChangeHandler}
      />

      <Button>Save</Button>
      <Button onClick={onDeleteHandler} type="submit">
        Delete
      </Button>
      {isLoading && <Loading />}
    </form>
  );
};
