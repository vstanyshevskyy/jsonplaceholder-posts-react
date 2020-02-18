import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import './index.css';
import Config from '../../config';

const setDocumentTitle = () => {
  document.title = 'Posts App';
};

let clickDownMoment, clickUpMoment;

// The assignment requires the whole row to be clickable.
// However preserving the link and using it for navigation is benefitial for SEO, accessibility and tracking.
// This is built around time diff on mouse events, because I don't want to block a user from selecting text.
// 200 ms is enough to click and if the interaction time is longer it means user selects text.
// Please see https://inclusive-components.design/cards/#theredundantclickevent
// I also added checks for left button, to not block context menu
const onMouseUp = (e, url) => {
  const clickThreshhold = 200;
  const isLeftButton = e.button === 0;
  if (!isLeftButton) {
    return;
  }
  clickUpMoment = +new Date();
  if ((clickUpMoment - clickDownMoment) < clickThreshhold) {
    window.location = url;
  }
}

const onMouseDown = (e) => {
  const isLeftButton = e.button === 0;
  if (!isLeftButton) {
    return;
  }
  clickDownMoment = +new Date();
}

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${Config.apiBaseUrl}/posts`)
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch(err => alert(err));;
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  setDocumentTitle();

  return (
    <table className='posts-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        { 
          posts.map(({ id, title, body }) => {
            const postUrl = `/post/${id}`;
            return (
              <tr
                key={id}
                className='posts-table__post-row'
                onMouseUp={e => onMouseUp(e, postUrl)}
                onMouseDown={e => onMouseDown(e)}
              >
                <td className='posts-table__post-cell'>{id}</td>
                <td className='posts-table__post-cell'>
                  <Link to={postUrl}>{title}</Link>
                </td>
                <td className='posts-table__post-cell'>{body}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
