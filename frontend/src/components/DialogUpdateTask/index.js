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

function DialogCreateTask({ item, openDialogCreate, handleClose }) {
  const [loadingUpdateTask, setLoadingUpdateTask] = useState(false);
  const [elements, setElements] = useContext(TasksContext);

  const [name, setName] = useState(item.name);
  const [startDate, setStartDate] = useState(dayjs(item.startDate));
  const [endDate, setEndDate] = useState(dayjs(item.endDate));
  const [userSelect, setUserSelect] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.request({
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL_API}/users`,
          headers: {},
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  }, []);

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
        setUserSelect(response.data.id);
      } catch (error) {
        console.log(error);
      }
    }
    if (item.userId) {
      makeRequest();
    }
  };

  const handleChangeUser = (event) => {
    setUserSelect(event.target.value);
  };

  const handleUpdateTask = () => {
    setLoadingUpdateTask(true);
    let data = JSON.stringify({
      name: name,
      userId: userSelect,
      startDate: startDate,
      endDate: endDate,
      status: item.status,
    });

    async function makeRequest() {
      try {
        await axios.request({
          method: "put",
          url: `${process.env.REACT_APP_BASE_URL_API}/tasks/${item.id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        });

        const response = await axios.request({
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_BASE_URL_API}/tasks`,
          headers: {},
        });
        setElements(convertDataInListTasks(response.data));
        setTimeout(() => {
          setLoadingUpdateTask(false);
          handleClose();
        }, 1000);
      } catch (error) {
        console.log(error);
        setLoadingUpdateTask(false);
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
                    Responsável
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
              </Stack>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <LoadingButton
            loading={loadingUpdateTask}
            onClick={handleUpdateTask}
            autoFocus
          >
            Atualizar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default DialogCreateTask;
