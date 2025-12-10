import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../utils/api';

const CommunityFeed = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: 'general'
  });

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = category !== 'all' ? `?category=${category}` : '';
      const response = await api.get(`/posts${params}`);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', formData);
      setShowForm(false);
      setFormData({
        title: '',
        content: '',
        imageUrl: '',
        category: 'general'
      });
      fetchPosts();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to create post');
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await api.post(`/posts/${postId}/comment`, { comment });
      fetchPosts();
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      campaign: 'Campaign',
      tip: 'Tip',
      faq: 'FAQ',
      success_story: 'Success Story',
      awareness: 'Awareness',
      general: 'General'
    };
    return labels[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
          {isAuthenticated && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium"
            >
              {showForm ? 'Cancel' : '+ New Post'}
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'campaign', 'tip', 'faq', 'success_story', 'awareness'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg ${
                category === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Create Post Form */}
        {showForm && isAuthenticated && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="general">General</option>
                  <option value="campaign">Campaign</option>
                  <option value="tip">Tip</option>
                  <option value="faq">FAQ</option>
                  <option value="success_story">Success Story</option>
                  <option value="awareness">Awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium"
              >
                Post
              </button>
            </form>
          </div>
        )}

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {getCategoryLabel(post.category)}
                      </span>
                      <span className="text-sm text-gray-600">
                        by {post.postedBy?.name || 'Anonymous'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full rounded-lg mb-4 max-h-96 object-cover"
                  />
                )}

                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center gap-2 ${
                      post.likes?.some(like => like._id === user?.id) || post.likes?.includes(user?.id)
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    ❤️ {post.likes?.length || 0}
                  </button>
                  <span className="text-gray-600">💬 {post.comments?.length || 0} comments</span>
                </div>

                {/* Comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2">Comments</h4>
                    {post.comments.map((comment, idx) => (
                      <div key={idx} className="mb-2 text-sm">
                        <span className="font-semibold">{comment.userId?.name || 'Anonymous'}: </span>
                        <span>{comment.comment}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment */}
                {isAuthenticated && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          handleComment(post._id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No posts found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;

