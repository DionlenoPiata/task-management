import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "../List";
import { DragDropContextContainer, ListGrid } from "./styles";

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`,
    };
  });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["TAREFAS", "AGUARDANDO", "INICIADA", "ENCERRADA"];

const generateLists = () => {
  return lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(3, listKey) }),
    {}
  );
};

function Board() {
  const [elements, setElements] = useState(generateLists());

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <List elements={elements[listKey]} key={listKey} name={listKey} />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default Board;
