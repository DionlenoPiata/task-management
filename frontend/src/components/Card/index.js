import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, CardHeader, Author, CardFooter, DragItem } from "./styles";

function Card({ index, item, subItems }) {
  const subTaks = subItems.filter((el) => el.taskId === item.id);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Stack direction="row" justifyContent="space-between" spacing={0}>
              <CardHeader>{item.name}</CardHeader>
              <Stack direction="row">
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>

            {(item.startDate || item.endDate) && (
              <span>
                {item.startDate && `Inicia em: ${item.startDate}`} <br />
                {item.endDate && `Prazo finalizar: ${item.endDate}`}
              </span>
            )}

            {subTaks.length > 0 && (
              <span>
                Sub Tarefas
                <br />
                {subTaks.map((el) => (
                  <>
                    <br />- {el.name}
                  </>
                ))}
              </span>
            )}

            <CardFooter>
              <span>{`#${item.id.substr(0, 5)}`}</span>
              <Author>
                {"Dionleno"}
                <Avatar
                  src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png`}
                />
              </Author>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
}

export default Card;
