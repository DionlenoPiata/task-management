import React from "react";

import { MdAdd } from "react-icons/md";
import { Container } from "./styles";
import Card from "../Card";

import { Droppable } from "react-beautiful-dnd";

function List({ name, elements, subElements }) {
  return (
    <Container task={name === "TASKS"} done={name === "CLOSED"}>
      <header>
        <h4>{name}</h4>
        {name === "TASKS" && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
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
