import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    Button
} from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom';

const CardList = (props) => {
    const name = props.name;
    const id = props.id;
    const imgurl = props.imgurl;
    const login = props.temp;

    return (
        <Card style={{ display: 'flex', width: '165px', maxHeight: '350px', minHeight: '250px', margin: '20px' }}>
            <CardImg top style={{ width: "100%" }} src={imgurl} alt={name} />
            <CardBody>
                <CardText>{name}</CardText>
            </CardBody>
            <Link Link to={login}>
                <Button>
                    {login}
                </Button>
            </Link>
        </Card >
    )

}
export default CardList;