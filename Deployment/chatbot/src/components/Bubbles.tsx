import styled from "styled-components";
import { ConversationProps } from "../utils";

const BotDiv = styled.div`
  display: flex;
  width: 386px;
  padding: 20px;
  overflow-wrap: anywhere;
  align-items: flex-start;
  gap: 20px;
  border-radius: 25px;
  border: 1px solid var(--prim);
  background: #fff;
  box-shadow: 0px 4px 4px 0px var(--prim-light);
`;

const UserDiv = styled.div`
  display: flex;
  width: 326px;
  padding: 12px 19px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 25px;
  border: 1px solid var(--sec);
  background: #fff;
  box-shadow: 0px 4px 4px 0px var(--sec-light);
`;

const BotImg = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 0.586px 0.586px 0.723px 0.586px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

function LoadingBubble() {
  return (
    <div className="bot-bubble-wrapper">
      <BotDiv data-loading="true">
        <BotImg src="logo.svg" alt="chat_logo" />
        <p className="text-wrap mw-100">Thinking...</p>
      </BotDiv>
    </div>
  );
}

function BotBubble(props: ConversationProps) {
  let text = props.text;
  if (text.includes("website")) {
    text = text.replace(
      "website",
      `<a href="https://moringaschool.com/" target="_blank">website</a>`
    );
  }
  return (
    <div className="bot-bubble-wrapper">
      <BotDiv id={`bubble-${props.id}`}>
        <BotImg src="logo.svg" alt="chat_logo" />
        <p
          dangerouslySetInnerHTML={{
            __html: props.text.replace(
              "website",
              `<a href="https://moringaschool.com/" target="_blank">website</a>`
            ),
          }}
        ></p>
      </BotDiv>
    </div>
  );
}

function UserBubble(props: ConversationProps) {
  return (
    <div className="user-bubble-wrapper">
      <UserDiv id={`bubble-${props.id}`}>
        <p className="">{props.text}</p>
        <strong>You</strong>
      </UserDiv>
    </div>
  );
}

export function Bubble(props: ConversationProps) {
  if (!props?.author) {
    return <LoadingBubble />;
  }
  return (
    <>
      {props.author === "bot" ? (
        <BotBubble {...props} />
      ) : (
        <UserBubble {...props} />
      )}
    </>
  );
}
