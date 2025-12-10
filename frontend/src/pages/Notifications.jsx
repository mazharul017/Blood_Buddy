import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? `?isRead=${filter === 'read'}` : '';
      const response = await api.get(`/notifications${params}`);
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (error) {
      console.error('Mark read error:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      fetchNotifications();
    } catch (error) {
      console.error('Mark all read error:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'emergency_request':
        return '🚨';
      case 'donation_reminder':
        return '⏰';
      case 'appointment_reminder':
        return '📅';
      case 'donation_thanks':
        return '❤️';
      case 'verification_status':
        return '✅';
      default:
        return '🔔';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              <button
                onClick={markAllAsRead}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Mark All Read
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`bg-white rounded-lg shadow-md p-6 ${
                    !notification.isRead ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                        <h3 className="text-lg font-semibold">{notification.title}</h3>
                        {!notification.isRead && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No notifications found.
                </div>
              )}
            </div>
          )}
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Notifications;

