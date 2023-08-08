import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instruction');

  let params = useParams();

  useEffect(() => {

    const fetchDetails = async () => {
      const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
      const detailData = await data.json();
      setDetails(detailData);
    }

    fetchDetails();
  }, [params.name]);
  
  return (
    <DetailsWrapper>
      <div>
        <h3>{details.title}</h3>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button onClick={() => setActiveTab("instruction")} className={activeTab === 'instruction' ? "active" : ""} >Instructions</Button>
        <Button onClick={() => setActiveTab("ingredient")} className={activeTab === 'ingredient' ? "active" : ""}>Ingredients</Button>
        {activeTab === "instruction" && (
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
            <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {activeTab === "ingredient" && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
        )}
      </Info>
    </DetailsWrapper>
  )
}

const DetailsWrapper = styled.div`
  margin: 5em 0;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2em;
  }
  li {
    font-size: 1rem;
    line-height: 2.5em;
  }
  ul {
    margin-top: 2em;
  }
  img {
    width: 100%;
  }
`

const Info = styled.div`
  margin-left: 8em;
  h4 {
    margin-bottom: 2em;
    line-height: 1.6em;
  }
`

const Button = styled.button`
  padding: 1em 2em;
  background: white;
  color: #313131;
  font-weight: 600;
  margin-right: 2em;
  margin-bottom: 2em;
  border: 2px solid black;
`

export default Recipe