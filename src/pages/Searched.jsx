import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Searched() {
    const [searched, setSearched] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const data = await response.json();
        setSearched(data.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search])

  return (
    <Grid>
        {searched.map((item) => {
            return (
                <Card key={item.id}>
                    <Link to={"/recipe/" + item.id}>
                        <img src={item.image} alt="" />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            );
        })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    grid-gap: 2em;
`

const Card = styled.div` 
    img {
        width: 100%;
        border-radius: 2em;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1em;
    }
`
