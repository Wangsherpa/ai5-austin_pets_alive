import React from 'react';

import './BotAvatar.css';

const BotAvatar = (props) => {
    return (
    <div className="dog-bot-avatar">{props.name}</div>
    );
}

export default BotAvatar;