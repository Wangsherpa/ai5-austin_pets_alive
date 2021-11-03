import React from 'react'

const Card = (props) => {
    const { name, breed, photo_url } = props;
    return (
        <div className=" tc bg-light-blue dib br3 pa3 ma2 grow shadow-5">
            <img alt="robots" src={photo_url} width="200" height="200" />
            <div>
                <h2 className="f3">{name}</h2>
                <h2 className="f4 green">{breed}</h2>
            </div>
        </div>
    );
}

export default Card;