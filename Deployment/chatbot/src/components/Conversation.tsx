import styled from "styled-components";
import { Brand } from "./Brand";
import { PromptInput } from "./PromptInput";
import { Responses } from "./Responses";

const Container = styled.div`
  position: relative;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100svh;
`;

export const Conversation = () => {
  return (
    <Container className="container">
      <Brand />
      <Responses />
      <PromptInput />
    </Container>
  );
};
