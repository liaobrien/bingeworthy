import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ME, GET_LIST } from "../../utils/queries";
import Auth from '../../utils/auth';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

const Movies = (props) => {
    const { data, error, loading } = useQuery(GET_LIST, {
        variables: {
            id: props.id
        }
    })

    return 
}

const Lists = () => {
    const [userData, setUserData] = useState([]);
    const { loading, data } = useQuery(GET_ME);
    console.log(data);
    const savedLists = data?.me.lists || [];

    // const listArray = userData.map((list) => {
    //     return list._id;
    // });
    // console.log(listArray);

    
    useEffect(() => {
        const getUserData = async () => {
    

            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
        
                if (!token) {
                return false;
                }
        
                console.log(savedLists[1].movies[0]);
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

    return(
       <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved lists!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.length
            ? `Viewing ${userData.length} saved ${userData.length === 1 ? 'list' : 'lists'}:`
            : 'You have no saved lists!'}
        </h2>
        <CardColumns>
          {userData.map((list) => {
            return (
              <Card key={list.movies[0].imdbID} border='dark'>
                {list.movies[0].poster ? <Card.Img src={list.movies[0].poster} alt={`The cover for ${list.movies[0].title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{list.movies[0].title}</Card.Title>
                  <p className='small'>Actors: {list.movies[0].actors}</p>
                  <Card.Text>{list.movies[0].plot}</Card.Text>
                  {/* <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
    );
};

export default Lists;