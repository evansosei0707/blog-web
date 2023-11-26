import { useState, useEffect} from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth } )

    useEffect(() => {
        function windowArea() {
            setWindowSize({ 
                width: window.innerWidth })
        }
      

        window.addEventListener('resize', windowArea);
        
        return (() => {
            window.removeEventListener('resize', windowArea)
        })

    }, []); 

    return windowSize;
    
}

export default useWindowSize;