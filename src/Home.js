import Feed from './Feed';
import React from 'react';
import { useStoreState } from 'easy-peasy';

const Home = ({ fetchError, isLoading }) => {

   const searchResults = useStoreState((state) => state.searchResults);
    

    return (
        <main className="Home">
            { isLoading && <p className='loading' style={{color: 'green', marginTop : '2em'}}>Loading...</p>}
            {!isLoading && fetchError && <p style={{color: 'red', marginTop : '2em'}}>{fetchError}</p>}
            { !isLoading && !fetchError && 
                (searchResults.length ? 
                   ( <Feed posts={searchResults} /> ) :
                (
                    <p style={{ marginTop: "2rem" }}>
                        No posts to display.
                    </p>
            ))}
        </main>
    );
}

export default Home
