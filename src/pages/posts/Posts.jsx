import { useCallback, useEffect, useState } from 'react';
import PostsService from '@/api/posts.service.js';
import { Alert, CircularProgress } from '@mui/material';
import { Post } from '@/components';
import styles from './Posts.module.scss';
import classnames from 'classnames/bind';
import { toast } from 'react-toastify';
const cx = classnames.bind(styles);

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [areLoadingPosts, setAreLoadingPosts] = useState(false);
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      setAreLoadingPosts(true);
      const posts = await PostsService.getPosts({ userId: 1 });
      setPosts(posts);
      setAreLoadingPosts(false);
    } catch (err) {
      setAreLoadingPosts(false);
      setError(err);
    }
  }, []);

  async function deletePost(id) {
    try {
      setLoadingPostId(id);
      await PostsService.deletePost(id);
      toast(`Post with id ${id} has been deleted`);
      const deletedPostIndex = posts.findIndex((post) => post.id === id);
      if (deletedPostIndex !== -1) {
        setPosts([
          ...posts.slice(0, deletedPostIndex),
          ...posts.slice(deletedPostIndex + 1),
        ]);
      }
      setLoadingPostId(0);
    } catch {
      setLoadingPostId(0);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (areLoadingPosts) {
    return (
      <div className={cx(['posts__loader-wrapper'])}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <div className={cx(['posts'])}>
      {error ? <Alert severity="warning">{error}</Alert> : null}
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
          loading={post.id === loadingPostId}
          onDeletePost={deletePost}
        />
      ))}
    </div>
  );
}
