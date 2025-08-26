import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function BlogPost({ post, user }) {
  const { t } = useTranslation();
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      setLiked(post.likes?.includes(user.id) || false);
    }
  }, [user, post.likes]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      alert(t('loginToComment'));
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${post._id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments(response.data.comments);
      setNewComment('');
    } catch (error) {
      console.error(error);
      alert(t('commentFailed'));
    }
  };

  const handleLike = async () => {
    if (!user || !user.token) {
      alert(t('loginToComment'));
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/blogs/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
    } catch (error) {
      console.error(error);
      alert(t('likeFailed'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border mb-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
      <p>{post.content}</p>
      <img
        src={post.images?.[0] || '/assets/forestation1.jpg'}
        alt={post.title}
        className="w-full h-48 object-cover my-4"
      />
      <div className="flex items-center mb-4">
        <button
          onClick={handleLike}
          disabled={!user}
          className={`px-4 py-2 ${liked ? 'bg-red-600' : 'bg-blue-600'} text-white rounded`}
        >
          {likes} {liked ? 'Unlike' : 'Like'}
        </button>
      </div>
      {user ? (
        <form onSubmit={handleComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border"
            placeholder={t('addComment')}
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {t('comment')}
          </button>
        </form>
      ) : (
        <p>{t('loginToComment')}</p>
      )}
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="p-2 border-t">
            <p><strong>{comment.user}</strong>: {comment.text}</p>
            <p className="text-gray-600 text-sm">{new Date(comment.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPost;