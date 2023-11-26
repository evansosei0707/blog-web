import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';


const EditPost = () => {
  const { id } = useParams();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const getPostById = useStoreState((state) => state.getPostById);
    const editablePost = getPostById(id);

    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const ediPost = useStoreActions((actions) => actions.editPost);
    const navigate = useNavigate(); 


    function handleEdit(id) {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        ediPost(updatedPost);
        navigate(`/post/${id}`); 
    }
       
    
    useEffect(() => {
       if (editablePost) {
        setEditTitle(editablePost.title);
        setEditBody(editablePost.body);
       }
    }, [editablePost,setEditBody, setEditTitle ]);
    

  return (
    <main className="NewPost">
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label> 
            <input
                id="postTitle"
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
                id="postBody"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
            />
                <button type="button" onClick={() => handleEdit(editablePost.id)} >Edit</button>
        </form>
    </main>
  )
   
}

export default EditPost