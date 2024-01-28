import styled from "styled-components";

const Img = styled.img`
  width: 230px;
  height: 53px;
  flex-shrink: 0;
`;

const P = styled.p`
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
`;

const ChatLogo = styled.img`
  width: 98.633px;
  height: 98.355px;
  filter: drop-shadow(0px 4px 2px var(--sec));
`;

const ChatLogoDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const Brand = () => {
  return (
    <div>
      <P>AI Chatbot</P>
      <Img src="moringa_logo.png" alt="moringa_logo" />
      <ChatLogoDiv>
        <ChatLogo src="logo.svg" alt="moringa_logo" />
      </ChatLogoDiv>
    </div>
  );
};
