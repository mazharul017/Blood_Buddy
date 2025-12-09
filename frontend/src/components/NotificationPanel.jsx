import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import api from '../utils/api';
import toast from 'react-hot-toast';

const NotificationPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Fetch initial notifications
    fetchNotifications();

    // Join user's room for notifications
    const userId = user._id || user.id;
    socket.emit('join_user_room', userId);

    // Listen for new notifications via socket
    const handleNewNotification = (notification) => {
      // Show toast notification
      const getNotificationIcon = (type) => {
        switch (type) {
          case 'emergency_request': return '🚨';
          case 'donation_reminder': return '⏰';
          case 'appointment_reminder': return '📅';
          case 'donation_thanks': return '❤️';
          case 'verification_status': return '✅';
          default: return '🔔';
        }
      };

      toast(
        (t) => (
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="font-semibold text-white">{notification.title}</p>
              <p className="text-sm text-white/90 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        ),
        {
          duration: 6000,
          icon: getNotificationIcon(notification.type),
          style: {
            background: '#dc2626',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
        }
      );

      // Add to notifications list
      setNotifications(prev => [notification, ...prev]);
    };

    // Listen for donation reminders
    const handleDonationReminder = (data) => {
      const { notification } = data;
      handleNewNotification(notification);
    };

    // Listen for emergency requests
    const handleEmergencyRequest = (data) => {
      if (data.emergencyRequest) {
        handleNewNotification({
          _id: `emergency_${Date.now()}`,
          type: 'emergency_request',
          title: 'Emergency Blood Request',
          message: `New emergency request for ${data.emergencyRequest.bloodGroup} blood`,
          isRead: false,
          createdAt: new Date().toISOString(),
          link: `/emergency/${data.emergencyRequest._id}`,
        });
      }
    };

    // Listen for general notifications
    socket.on('new_notification', handleNewNotification);
    socket.on('donationReminder', handleDonationReminder);
    socket.on('new_emergency', handleEmergencyRequest);

    // Listen for user-specific notifications
    socket.on(`notification_${userId}`, handleNewNotification);

    return () => {
      socket.off('new_notification', handleNewNotification);
      socket.off('donationReminder', handleDonationReminder);
      socket.off('new_emergency', handleEmergencyRequest);
      socket.off(`notification_${userId}`, handleNewNotification);
      if (user) {
        socket.emit('leave_user_room', userId);
      }
    };
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    
    if (notification.link) {
      navigate(notification.link);
      setIsOpen(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'emergency_request': return '🚨';
      case 'donation_reminder': return '⏰';
      case 'appointment_reminder': return '📅';
      case 'donation_thanks': return '❤️';
      case 'verification_status': return '✅';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-red-600 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                  <p>Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id || notification.id || Math.random()}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-gray-800">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          {notification.metadata?.nextEligibleDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Eligible: {new Date(notification.metadata.nextEligibleDate).toLocaleDateString()}
                            </p>
                          )}
                          {notification.createdAt && (
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 flex gap-2">
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setIsOpen(false);
                  }}
                  className="flex-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={async () => {
                      try {
                        await api.patch('/notifications/read-all');
                        fetchNotifications();
                      } catch (error) {
                        console.error('Error marking all as read:', error);
                      }
                    }}
                    className="flex-1 text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Mark All Read
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;

