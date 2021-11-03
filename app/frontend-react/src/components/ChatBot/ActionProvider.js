// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    helloWorldHandler = (message) => {
      this.setChatbotMessage(this.createChatBotMessage(message))
    }

    setChatbotMessage = (message) => {
      this.setState(state => ({ ...state, messages: [...state.messages, message] }))
    }
  }

export default ActionProvider;