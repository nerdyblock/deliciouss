import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

export default function Veggies() {
  const [veggies, setVeggies] = useState([]);

  useEffect(() => { getVeggies() }, []);

  const getVeggies = async() => {

    const check = localStorage.getItem("veggies");

    if(check) {
      setVeggies(JSON.parse(check));
    } else {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
      const data = await response.json();
      console.log(data);
      localStorage.setItem("veggies", JSON.stringify(data.recipes));
      setVeggies(data.recipes);
    }
  }

  return (
    <div>
          <Wrapper>
            <h3>Our Vegetarian Picks</h3>

            <Splide 
              options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "4em",
              }}
            >

              {veggies.map((recipe) => {
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
