import React from 'react';
import { useParams } from 'react-router-dom';

const CommentsPage = () => {
  const { postId } = useParams();


  return (
    <div>
      CommentsPage. PostId: {postId}
    </div>
  );
}

export default CommentsPage;
