import React, { useEffect} from 'react';
import  Layout  from './Layout';
import  Home  from './Home';
import  NewPost  from './NewPost';
import  PostPage  from './PostPage';
import  About  from './About';
import  Missing  from './Missing';
import  { Route, Routes } from 'react-router-dom'; 
import EditPost from './EditPost';
import useAxiosFetch from './Hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';


function App() {

  const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:3000/blog');  
  const setPosts = useStoreActions((actions) => actions.setPosts);

    useEffect(() => {
        setPosts(data);
      },[data, setPosts]);

  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home
          isLoading={isLoading}
          fetchError={fetchError} 
          
          />} />
          <Route path="post/">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} /> 
          </Route>
          <Route path='EditPost/:id' element={<EditPost/>} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
  );  
}

export default App;
