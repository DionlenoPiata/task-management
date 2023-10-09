import { Container, Label } from "./styles";

function Card() {
  return (
    <Container>
      <header>
        <Label color="#FF405F" />
      </header>
      <p>Fazer a migração completa de servidor</p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
        alt=""
      />
    </Container>
  );
}

export default Card;
