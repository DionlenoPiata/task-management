import { useState, useEffect, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { Avatar, CardHeader, Author, CardFooter, DragItem } from "./styles";
import TasksContext from "../../Contexts/TasksContext";
import { convertDataInListTasks } from "../../utils/tasksUtils";
import DialogUpdateTask from "../DialogUpdateTask";

function Card({ index, item, subItems }) {
  const subTaks = subItems.filter((el) => el.taskId === item.id);

  const [user, setUser] = useState(null);
  const [loadingDeleteTask, setLoadingDeleteTask] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

  const [elements, setElements] = useContext(TasksContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    async function makeRequest() {
      try {
        const response = await axios.request({
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL_API}/users/${item.userId}`,
          headers: {},
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (item.userId) {
      makeRequest();
    }
  };

  const handleClickOpen = () => {
    setOpenDialogUpdate(true);
  };

  const handleClose = () => {
    setOpenDialogUpdate(false);
  };

  const handleDeleteTask = async () => {
    setLoadingDeleteTask(true);
    async function makeRequest() {
      try {
        await axios.request({
          method: "delete",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_BASE_URL_API}/tasks/${item.id}`,
          headers: {},
        });
        const response = await axios.request({
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_BASE_URL_API}/tasks`,
          headers: {},
        });
        setTimeout(() => {
          setElements(convertDataInListTasks(response.data));
          setLoadingDeleteTask(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setLoadingDeleteTask(false);
      }
    }

    makeRequest();
  };

  return (
    <>
      <DialogUpdateTask
        openDialogCreate={openDialogUpdate}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        item={item}
      />

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
                  <IconButton onClick={handleClickOpen} aria-label="delete">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteTask} aria-label="delete">
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
                  {user && user.name}
                  <Avatar
                    src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png`}
                  />
                </Author>
              </CardFooter>
              {loadingDeleteTask && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              )}
            </DragItem>
          );
        }}
      </Draggable>
    </>
  );
}

export default Card;
