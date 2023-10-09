import React, { useEffect, useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import axios from "axios";
import TasksContext from "../../Contexts/TasksContext";
import { convertDataInListTasks } from "../../utils/tasksUtils";

function DialogCreateTask({ openDialogCreate, handleClose }) {
  //const [openCreateUser, setOpenCreateUser] = useState(false);

  const [loadingCreateTask, setLoadingCreateTask] = useState(false);
  const [elements, setElements] = useContext(TasksContext);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(dayjs("2022-04-17"));
  const [endDate, setEndDate] = useState(dayjs("2022-04-17"));
  const [userSelect, setUserSelect] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:8080/users",
      headers: {},
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  }, []);

  const handleChangeUser = (event) => {
    setUserSelect(event.target.value);
  };

  const handleCreateTask = () => {
    setLoadingCreateTask(true);
    let data = JSON.stringify({
      name: name,
      userId: userSelect,
      startDate: startDate,
      endDate: endDate,
      status: null,
    });

    async function makeRequest() {
      try {
        await axios.request({
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:8080/tasks",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        });

        const response = await axios.request({
          method: "get",
          maxBodyLength: Infinity,
          url: "http://localhost:8080/tasks",
          headers: {},
        });
        setElements(convertDataInListTasks(response.data));
        setTimeout(() => {
          setLoadingCreateTask(false);
          handleClose();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={openDialogCreate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Criar nova tarefa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column" spacing={2}>
              <TextField
                id="standard-basic"
                label="Nome"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <DemoContainer components={["DateField", "DateField"]}>
                <DateField
                  label="Iniciar em"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  format="DD-MM-YYYY"
                />
                <DateField
                  label="Finalizar em"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  format="DD-MM-YYYY"
                />
              </DemoContainer>
              <Stack direction="row" spacing={2}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Usuários
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={userSelect}
                    label="Age"
                    onChange={handleChangeUser}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {users.map((el) => (
                      <MenuItem value={el.id}>{el.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <Button onClick={() => setOpenCreateUser(!openCreateUser)}>
                  Criar
                </Button> */}
              </Stack>
              {/* {openCreateUser && (
                <Stack direction="row" spacing={2}>
                  <TextField
                    size="small"
                    id="standard-basic"
                    label="Nome do usuário"
                    variant="standard"
                  />
                  <Button>Salvar</Button>
                </Stack>
              )} */}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <LoadingButton
            loading={loadingCreateTask}
            onClick={handleCreateTask}
            autoFocus
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default DialogCreateTask;
