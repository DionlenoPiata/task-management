import React from "react";

import { MdAdd } from "react-icons/md";
import { Container } from "./styles";
import Card from "../Card";

function List({ title, creatable = false, done = false }) {
  return (
    <Container done={done}>
      <header>
        <h2>{title}</h2>
        {creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>
      <ul>
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
    </Container>
  );
}

export default List;
