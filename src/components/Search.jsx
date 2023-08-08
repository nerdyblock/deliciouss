import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const [input, setInput] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/'+input)
    };

  return (
    <FormStyle onSubmit={submitHandler}>
        <FaSearch/>
        <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0 10em;
    position: relative;
    width: 100%;

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1rem;
        color: white;
        padding: 0.8em 2.5em;
        border-radius: 1em;
        outline: none;
        width: 70%;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`
