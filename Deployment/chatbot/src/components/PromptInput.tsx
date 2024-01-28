import { useState } from "react";
import styled from "styled-components";
import {
  ConversationProps,
  getBotResponse,
  loadingBubbleState,
} from "../utils";
import { useAppContext } from "../contexts/AppContext";

const PromptContainer = styled.form`
  display: flex;
  height: max-content;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  align-self: stretch;
`;

const Input = styled.input`
  display: flex;
  outline: none;
  height: 60px;
  padding: 17px 17px 17px 19px;
  align-items: center;
  flex: 1 0 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Button = styled.button`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 10px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--sec);
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 4px 4px 0px var(--sec-light);
  &:active {
    box-shadow: 0px 4px 4px 0px transparent;
  }
`;

export const PromptInput = () => {
  const [value, setValue] = useState("");
  const { setConversation, conversation } = useAppContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userPrompt: ConversationProps = {
      id: crypto.randomUUID(),
      text: value,
      author: "user",
      time: new Date(),
    };

    setConversation((prev: ConversationProps[]) => [...prev, userPrompt]);

    setConversation((prev: ConversationProps[]) => [
      ...prev,
      loadingBubbleState,
    ]);

    const conversationCopy: ConversationProps[] = [
      ...conversation,
      userPrompt,
      loadingBubbleState,
    ];

    getBotResponse(value).then((response) => {
      conversationCopy.pop();
      setConversation([
        ...conversationCopy,
        {
          id: crypto.randomUUID(),
          text: response.response,
          author: "bot",
          time: new Date(response.time),
        },
      ]);
    });
    setValue("");
  };

  return (
    <PromptContainer onSubmit={handleSubmit}>
      <Input
        onChange={(e: any) => setValue(e.target.value)}
        value={value}
        required
        placeholder="Enter prompt here..."
      />
      <Button type="submit">
        <img src="ic_round-send.svg" alt="send" />
      </Button>
    </PromptContainer>
  );
};
