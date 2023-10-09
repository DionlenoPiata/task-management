import React from "react";

import Button from "@mui/material/Button";
import { Container } from "./styles";
import Card from "../Card";

import { Droppable } from "react-beautiful-dnd";

function List({ name, title, elements, subElements }) {
  return (
    <Container task={name === "TASKS"} done={name === "CLOSED"}>
      <header>
        <h4>{title}</h4>
        {name === "TASKS" && <Button variant="outlined">Nova </Button>}
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
