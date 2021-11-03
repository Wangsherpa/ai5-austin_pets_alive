import React from 'react';
import { Chatbot, createChatBotMessage } from 'react-chatbot-kit';
import Config from './Config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import { useLocation } from 'react-router';
import BotAvatar from './BotAvatar';

const ChatBot = (props) => {
    const {id, name} = useLocation().state;
    Config.state.dog_id = id;
    Config.botName = name;
    Config.customComponents = {
        botAvatar: (props) => <BotAvatar name={name[0]} />
    }
    return (
        <div className="tc center">
            <header>
                <Chatbot config={Config} actionProvider={ActionProvider} messageParser={MessageParser} />
            </header>
        </div>
    );
}

export default ChatBot;