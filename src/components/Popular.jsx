import { useEffect, useState } from "react";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => { getPopular() }, []);

  

  const getPopular = async() => {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    const data = await response.json();
    console.log(data);
    setPopular(data.recipes);
  }



  return (
    <div>
      {popular.map((recipe) => {
        return (
          <div key={recipe.id}>
            <p>div{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
          </div>
        )
      })}
    </div>
  )
}
