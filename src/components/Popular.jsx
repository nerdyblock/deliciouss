import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => { getPopular() }, []);

  const getPopular = async() => {

    const check = localStorage.getItem("popular");

    if(check) {
      setPopular(JSON.parse(check));
    } else {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      const data = await response.json();
      console.log(data);
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  }

  return (
    <div>
          <Wrapper>
            <h3>Popular Picks</h3>

            <Splide 
              options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "4em",
              }}
            >

              {popular.map((recipe) => {
                return (
                  <SplideSlide key={recipe.id}>
                    <Card >
                      <Link to={"/recipe/" + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient/>
                      </Link>
                    </Card>
                  </SplideSlide>
                )
              })}

            </Splide>

          </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Card = styled.div`
  min-height: 15rem;
  position: relative;

  img  {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    margin: 0;
    z-index: 10;
    bottom: 0%;
    transform: translate(-50% 0%);
    color: white;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  border-radius: 2rem;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
`


