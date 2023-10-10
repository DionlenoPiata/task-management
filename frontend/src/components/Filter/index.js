import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import LinearProgress from "@mui/material/LinearProgress";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import axios from "axios";
import TasksContext from "../../Contexts/TasksContext";
import { convertDataInListTasks } from "../../utils/tasksUtils";

function Filter() {
  const [elements, setElements] = useContext(TasksContext);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const [typeFilter, setTypeFilter] = useState("");

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [users, setUsers] = useState([]);
  const [userSelect, setUserSelect] = useState(null);

  const [statusSelect, setStatusSelect] = useState(null);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL_API}/users`,
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

  const handleChangeStatus = (event) => {
    setStatusSelect(event.target.value);
  };

  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSearch = async () => {
    setLoadingSearch(true);
    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    try {
      let url = `${process.env.REACT_APP_BASE_URL_API}/tasks`;

      switch (typeFilter) {
        case "date":
          if (startDate) {
            url = `${url}/search/startDateAndEndDate?startDate=${formattedStartDate}`;
          }
          if (endDate) {
            url = `${url}/search/startDateAndEndDate?endDate=${formattedEndDate}`;
          }
          if (startDate && endDate) {
            url = `${url}/search/startDateAndEndDate?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
          }
          break;
        case "user":
          if (userSelect) {
            url = `${url}/search/byUserAndStatus?userId=${userSelect}`;
          }
          if (userSelect && statusSelect) {
            url = `${url}&status=${statusSelect}`;
          }
          break;
        case "late":
          url = `${url}/search/allLate`;
          break;

        default:
          url = `${process.env.REACT_APP_BASE_URL_API}/tasks`;
          break;
      }

      let config = {
        method: "get",
        url: url,
      };

      const response = await axios.request(config);
      setTimeout(() => {
        setElements(convertDataInListTasks(response.data));
        setLoadingSearch(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoadingSearch(false);
    }
  };

  const handleClean = () => {
    setTypeFilter("");
    setStartDate();
    setEndDate();
    setUserSelect(null);
    setStatusSelect(null);

    setLoadingSearch(true);
    setTimeout(() => {
      setLoadingSearch(false);
    }, 500);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Accordion sx={{ margin: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 2,
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Stack direction="column" spacing={0}>
              <Stack direction="row" justifyContent="flex-end" spacing={0}>
                <Typography sx={{ marginTop: 4 }} variant="h6" gutterBottom>
                  Filtar por:
                </Typography>
                <FormControl sx={{ m: 2, minWidth: 240 }}>
                  <InputLabel></InputLabel>
                  <Select
                    displayEmpty
                    value={typeFilter}
                    onChange={handleChangeTypeFilter}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value={"date"}>
                      Data inicial e data final
                    </MenuItem>
                    <MenuItem value={"user"}>Responsável</MenuItem>
                    <MenuItem value={"late"}>Atrasadas</MenuItem>
                  </Select>
                  <FormHelperText>Selecione o tipo do filtro</FormHelperText>
                </FormControl>
              </Stack>
              {typeFilter === "" && <div>Sem filtros</div>}

              {typeFilter === "date" && (
                <div>
                  Data inicial e data final
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
                </div>
              )}

              {typeFilter === "user" && (
                <div>
                  <Stack direction="row" spacing={2}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 240 }}
                    >
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
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 240 }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Situação da tarefa
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={statusSelect}
                        label="Age"
                        onChange={handleChangeStatus}
                      >
                        <MenuItem value={null}>
                          <em>Todos</em>
                        </MenuItem>
                        <MenuItem value="WAITING">Aguardando</MenuItem>
                        <MenuItem value="STARTED">Iniciada</MenuItem>
                        <MenuItem value="CLOSED">Encerrada</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </div>
              )}

              {typeFilter === "late" && <div>Atrasadas</div>}

              <Stack direction="row" justifyContent="flex-end" spacing={0}>
                <LoadingButton
                  sx={{ margin: 2 }}
                  variant="outlined"
                  onClick={handleClean}
                  color="error"
                >
                  Limpar
                </LoadingButton>
                <LoadingButton
                  sx={{ margin: 2 }}
                  variant="outlined"
                  loading={false}
                  onClick={handleSearch}
                  autoFocus
                >
                  Buscar
                </LoadingButton>
              </Stack>
              {loadingSearch && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              )}
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
}

export default Filter;
