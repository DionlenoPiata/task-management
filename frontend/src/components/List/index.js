import React, { useState } from "react";

import Button from "@mui/material/Button";
import { Container } from "./styles";
import Card from "../Card";

import { Droppable } from "react-beautiful-dnd";
import DialogCreateTask from "../DialogCreateTask";

function List({ name, title, elements, subElements }) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  const handleClickOpen = () => {
    setOpenDialogCreate(true);
  };

  const handleClose = () => {
    setOpenDialogCreate(false);
  };

  return (
    <Container task={name === "TASKS"} done={name === "CLOSED"}>
      <DialogCreateTask
        openDialogCreate={openDialogCreate}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <header>
        <h4>{title}</h4>
        {name === "TASKS" && (
          <Button variant="outlined" onClick={handleClickOpen}>
            Nova{" "}
          </Button>
        )}
      </header>

      <Droppable droppableId={`${name}`}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {elements &&
              elements.map((item, index) => (
                <Card
                  key={item.id}
                  item={item}
                  subItems={subElements}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </Container>
  );
}

export default List;
