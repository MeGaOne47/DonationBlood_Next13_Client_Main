import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationComponent: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Kết nối đến WebSocket server
    const socket = io('http://localhost:8000/ws'); // Đổi thành URL của server WebSocket của bạn

    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    // Lắng nghe sự kiện 'notification' từ server
    socket.on('notification', (message: string) => {
      setNotification(message);
      console.log('Received notification:', message);
    });

    socket.emit('customEvent', 'Hello from client!');

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notification</h2>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default NotificationComponent;
