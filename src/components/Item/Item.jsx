import React from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

import MyButton from "../UI/button/myButton";
import { updateCurrentId } from "../../store/action";

import classes from "./Item.module.css";

const Item = ({
  text,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dropHandler,
  removeBoard,
  id,
  tasks,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function getId(e) {
    const currentId = e.target.id;
    dispatch(updateCurrentId(currentId));
  }
  return (
    <div
      onDragStart={dragStartHandler}
      onDragLeave={dragEndHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      className={classes.item}
      draggable={true}
    >
      <Link
        id={id}
        onClick={getId}
        to="/Tasks"
        className={classes.link}
        draggable={"false"}
      >
        {text}
      </Link>
      <div className={classes.tasks}>{tasks}</div>
      <div className={classes.button}>
        <MyButton onClick={removeBoard} startIcon={<DeleteIcon />}>
          Удалить
        </MyButton>
      </div>
    </div>
  );
};

export default Item;
