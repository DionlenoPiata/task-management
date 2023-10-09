import React from "react";

import { MdAdd } from "react-icons/md";
import { Container } from "./styles";
import Card from "../Card";

import { Droppable } from "react-beautiful-dnd";

function List({ name, elements }) {
  return (
    <Container done={name === "ENCERRADA"}>
      <header>
        <h4>{name}</h4>
        {name === "TAREFAS" && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <Droppable droppableId={`${name}`}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <Card key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </Container>
  );
}

export default List;
