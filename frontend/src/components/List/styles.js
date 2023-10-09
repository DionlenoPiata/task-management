import styled from "styled-components";

export const Container = styled.div`
  padding: 0 15px;
  margin: 5px;
  height: 100%;
  flex: 0 0 320px;
  background: ${(props) => (props.task ? "#d4d4d4" : "#d4d4d4")};
  opacity: ${(props) => (props.done ? 0.6 : 1)};

  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h4 {
      padding: 10px 10px;
      margin: 10px;
    }

    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
    }
  }

  ul {
    margin-top: 30px;
  }
`;
