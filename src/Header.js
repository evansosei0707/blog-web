import React from "react";
import { FaLaptop, FaMobileAlt, FaTabletAlt} from "react-icons/fa";
import useWindowSize from './Hooks/useWindowSize';


const Header = () => {
    const { width } = useWindowSize();

   
    return (
        <header className="Header">
            <h1>React Js Blog</h1>
            {width < 400 ? <FaMobileAlt /> : 
            width < 768 ? <FaTabletAlt /> :
            <FaLaptop /> }
        </header>
    )
}

export default Header
