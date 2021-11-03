import React, { Component } from 'react';
import CardList from '../../components/Card/CardList';

class Similar extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.id,
            dogs: []
        }
    }

    componentDidMount() {
        const HOSTNAME_TAG = "<hostname>"
        let BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
        if(BASE_API_URL.includes(HOSTNAME_TAG)){
        //window.location.hostname
        BASE_API_URL = BASE_API_URL.replace(HOSTNAME_TAG, window.location.hostname);
        }

        fetch(`${BASE_API_URL}/dogs/similar/${this.state.id}`)
        .then(response => response.json())
        .then(dogs => {
            this.setState({ dogs: dogs.data})
        })
    }
    render() {
        return (
            <div className="tc">
                <CardList dogs={this.state.dogs} />
            </div>
        );
    };
}

export default Similar;