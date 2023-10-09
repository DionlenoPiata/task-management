import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import List from "../List";
import { DragDropContextContainer, ListGrid } from "./styles";
import { convertDataInListTasks } from "../../utils/tasksUtils";

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

const lists = ["TASKS", "WAITING", "STARTED", "CLOSED"];

function Board() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    generateLists();
  }, []);

  const generateLists = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/tasks",
      headers: {},
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    let data = await makeRequest();

    setElements(convertDataInListTasks(data));
  };

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

  const getNameList = (name) => {
    switch (name) {
      case "WAITING":
        return "AGUARDANDO";
      case "STARTED":
        return "INICIADA";
      case "CLOSED":
        return "ENCERRADA";

      default:
        return "TAREFAS";
    }
  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <List
              elements={elements[listKey]}
              subElements={elements["SUB_TASKS"]}
              key={listKey}
              name={listKey}
              title={getNameList(listKey)}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default Board;
