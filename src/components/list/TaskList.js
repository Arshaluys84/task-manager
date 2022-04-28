import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sleep } from "../../helpers/config";
import { deleteList, isNotLoading, loading } from "../../store/store";

import { Backdrop } from "../UI/Backdrop";
import { Button } from "../UI/Button";
import { ListModal } from "../UI/ListModal";
import { Loading } from "../Loading/Loading";
import { Task } from "../tasks/Task";

import styles from "./TaskList.module.css";

export const TaskList = () => {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [listId, setListId] = useState();
  const [listEl, setListEl] = useState({});

  const isLoading = useSelector((state) => state.loading);
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const onAddClickHandler = () => {
    setListEl({});
    setIsAdding(true);
  };

  const onModalSubmitHandler = (isOpen) => {
    setIsAdding(isOpen);
  };

  const onClickHandler = (id) => {
    navigate(`/${id}`);
    if (id === listId) {
      setIsClicked((prev) => !prev);
    } else {
      setIsClicked(true);
    }
    setListId(id);
  };
  const onListDeleteHandler = (list) => {
    dispatch(loading());
    sleep(2000).then(() => {
      dispatch(deleteList(list));
      setListId(-1);
      navigate("/");
      dispatch(isNotLoading());
    });
  };
  const onListEditHandler = (list) => {
    setIsAdding(true);
    setListEl(list);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div>
          <Button onClick={onAddClickHandler}>Add List</Button>
        </div>
        <div>
          {lists.map((l) => (
            <div key={l.id} className={styles.links}>
              <Link to={`/${l.id} `} onClick={() => onClickHandler(l.id)}>
                {l.name}
              </Link>
              {isAdding && <Backdrop onCancel={onModalSubmitHandler} />}
              {isAdding && (
                <ListModal
                  onModalSubmitHandler={onModalSubmitHandler}
                  task={listEl}
                />
              )}
              <span className={styles.buttons}>
                <Button onClick={() => onListEditHandler(l)}>
                  <img src="/edit.png" alt="edit" />
                </Button>
                <Button onClick={() => onListDeleteHandler(l)}>X</Button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {isClicked && <Task listId={listId} />}
      {isLoading && <Loading />}
      {isLoading && <Backdrop />}
    </div>
  );
};
