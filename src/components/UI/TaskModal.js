import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, isNotLoading, loading } from "../../store/store";
import { sleep } from "../../helpers/config";

import { Loading } from "../Loading/Loading";
import { Button } from "./Button";
import { Input } from "./Input";

import styles from "./Modal.module.css";

export const TaskModal = ({ onModalSubmitHandler, listId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  const [newUserData, setNewUserData] = useState({
    id: 0,
    title: "",
    description: "",
    listId: listId,
  });
  const [isError, setIsError] = useState(false);
  const onChangeHandler = (event) => {
    setNewUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      newUserData.title.trim().length < 2 ||
      newUserData.description.trim().length < 2
    ) {
      setIsError(true);
      return;
    }
    dispatch(loading());

    sleep(2000).then(() => {
      dispatch(
        addTask({
          id: Date.now(),
          title: newUserData.title,
          description: newUserData.description,
          listId: listId,
        })
      );
      onModalSubmitHandler(false);
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

      {isError && <p className="error"> Please,Enter something</p>}
      <Button>Save</Button>
      {isLoading && <Loading />}
    </form>
  );
};
