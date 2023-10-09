import { Draggable } from "react-beautiful-dnd";
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
            <CardHeader>Deploy aplicação</CardHeader>
            <span>
              Inicia em: 10-10-2023 <br />
              Prazo finalizar: 12/10/2023
            </span>

            <span>SubTarefas</span>
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
