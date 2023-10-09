import { Draggable } from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, CardHeader, Author, CardFooter, DragItem } from "./styles";

function Card({ item, index }) {
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
              <CardHeader>Deploy aplicação</CardHeader>
              <Stack direction="row">
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>

            <span>
              Inicia em: 10-10-2023 <br />
              Prazo finalizar: 12/10/2023
            </span>

            <span>
              SubTarefas
              <br />- Configurar docker
              <br />- Configurar Nginx
            </span>
            <CardFooter>
              <span>{"#47fh4d"}</span>
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
