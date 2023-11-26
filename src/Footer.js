import React from "react";
import { useStoreState } from "easy-peasy";


const Footer = () => {
    const getPostCount = useStoreState((state) => state.getPostCount);
        return (
        <footer className='Footer'>
            <p>{getPostCount}</p>
        </footer>
    )
}

export default Footer
