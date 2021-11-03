import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const CardList = ({ dogs }) => {
    const cardComponent = dogs.map((dog, i) => {
        return (
            <Link to={{
                pathname: `/dog-info/${dog.id}`,
                state: {
                    name: dog.name,
                    id: dog.id,
                    sex: dog.sex,
                    photo_url: dog.photo_url,
                    tags: dog.tags,
                    color: dog.color,
                    breed: dog.breed,
                    weight: dog.weight,
                    age: dog.age,
                    memo: dog.memo_text
                }
            }} >
                <Card key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    breed={dog.breed}
                    photo_url={dog.photo_url}
                />

            </Link>
        );
    })
    return (
        <div>
            {cardComponent}
        </div>
    );
}

export default CardList;