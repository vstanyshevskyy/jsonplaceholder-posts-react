import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
import Loader from '../loader';
import './index.css';

const setDocumentTitle = ({ author, post }) => {
  document.title = `${post} by ${author} - Posts App`;
}

export default () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${Config.apiBaseUrl}/posts/${id}`)
      .then(response => response.json())
      .then(post => {
        setPost(post);
        return fetch(`${Config.apiBaseUrl}/users/${post.userId}`)
      })
      .then(response => response.json())
      .then(user => {
        setUser(user);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  setDocumentTitle({ author: user.name, post: post.title });

  return (
    <div>
      <h1>{post.title}</h1>
      <div className='post__author'>
        By <a href={`mailto:${user.email}`}>{user.name}</a>
      </div>
      <div>{post.body}</div>
    </div>
  );
}
