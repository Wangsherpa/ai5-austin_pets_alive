// Config starter code
import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";

const config = {
  initialMessages: [createChatBotMessage("Hi, It's nice to meet you!")],
  botName: "Doggie",
  customComponents: {
      botAvatar: (props) => <BotAvatar name={"D"} />
  },
  customStyles: {
      // overrides the chatbot message styles
      botMessageBox: {
          backgroundColor: "purple",
      },
      // overrides the chat button styles
      chatButton: {
          backgroundColor: "purple",
      }
  },
  state: {
      dog_id: 0
  }
}

export default config