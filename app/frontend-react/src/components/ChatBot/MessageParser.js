// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const HOSTNAME_TAG = "<hostname>"
      let BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
      if(BASE_API_URL.includes(HOSTNAME_TAG)){
      //window.location.hostname
      BASE_API_URL = BASE_API_URL.replace(HOSTNAME_TAG, window.location.hostname);
    }

      fetch(`${BASE_API_URL}/chat/${this.state.dog_id}/${message}`)
      .then(resp => resp.json())
      .then(response => {
        this.actionProvider.helloWorldHandler(response.data)
      })
      
    }
  }
  
export default MessageParser;