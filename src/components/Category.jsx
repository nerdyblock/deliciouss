import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Category() {
  return (
    <List>
        <Slink to="/cuisine/Italian">
            <FaPizzaSlice/>
            <h4>Italian</h4>
        </Slink>
        <Slink to="/cuisine/American">
            <FaHamburger/>
            <h4>American</h4>
        </Slink>
        <Slink to="/cuisine/Thai">
            <GiNoodles/>
            <h4>Thai</h4>
        </Slink>
        <Slink to="/cuisine/Japanese">
            <GiChopsticks/>
            <h4>Japanese</h4>
        </Slink>
    </List>
  )
}

const List = styled.div`
    display: flex;
    margin: 2em 0;
    justify-content: center;
    gap: 2em;
`

const Slink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    gap: 0.5em;
    width: 6em;
    height: 6em;
    cursor: pointer;
    transform: scale(0.8);

    h4 {
        color: white;
        font-size: 0.8rem;
    }
    svg {
        color: white;
        font-size: 1.5rem;
    }

    &.active {
        background: linear-gradient(to right, #f27121, #e94057);
    }
`
