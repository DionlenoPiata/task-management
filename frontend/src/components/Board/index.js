import List from "../List";
import { Container } from "./styles";

function Board() {
  return (
    <Container>
      <List title={"TAREFAS"} creatable />
      <List title={"AGUARDANDO"} />
      <List title={"INICIADA"} />
      <List title={"ENCERRADA"} done />
    </Container>
  );
}

export default Board;
