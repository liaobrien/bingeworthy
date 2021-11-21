import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ME } from "../../utils/queries";
import { DELETE_LIST } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { Jumbotron, Container, Row, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./list.css";

const Lists = () => {
    const [userData, setUserData] = useState([]);
    const { loading, data } = useQuery(GET_ME);
    const savedLists = data?.me.lists || [];
    const [removeList, { error }] = useMutation(DELETE_LIST)
    
    useEffect(() => {
        const getUserData = async () => {

            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
        
                if (!token) {
                return false;
                }
        
                setUserData(savedLists);
            } catch (err) {
                console.error(err);
            }
        };
    
        getUserData();
    }, [loading]);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const handleDeleteList = async (listID) => {
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
            removeList({
                variables: { id: listID }
            });
            
            window.location.replace('/movies')
        } catch (err) {
            console.error(err);
        }
      };

    return(
       <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1 className="text-center">Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 className="text-center">
          {userData.length
            ? `Viewing ${userData.length} saved ${userData.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved lists!'}
        </h2>
        <div className="d-flex container-fluid">
            <Row className="justify-content-center">
                
                {userData.map((list) => {
                    return (
                    <Card className="col-lg-3 col-md-5 col-sm-12 list-item m-3" key={list.movies[0].imdbID} border='dark'>
                        {list.movies[0].poster ? <Card.Img src={list.movies[0].poster} alt={`The cover for ${list.movies[0].title}`} variant='top' /> : null}
                        <Card.Body className="bg-dark d-flex flex-column justify-content-between">
                            <Card.Title className="text-info">{list.movies[0].title}</Card.Title>
                            <p className='small'><strong>Actors: </strong>{list.movies[0].actors}</p>
                            <Card.Text>{list.movies[0].plot}</Card.Text>
                            <div className="container-fluid d-flex justify-content-center">
                                <Button className='mx-2 btn-block btn-danger mt-auto' onClick={() => handleDeleteList(list._id)}>
                                    Delete this Movie!
                                </Button>
                                <Button className='mx-2 btn-block btn-primary mt-auto'>
                                    <Link
                                        to={`/movie/${list.movies[0].imdbID}`}
                                        className="text-light text-decoration-none"
                                    >
                                        View this Movie!
                                    </Link>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    );
                })}
            
            </Row>
        </div>
      </Container>
    </>
    );
};

export default Lists;