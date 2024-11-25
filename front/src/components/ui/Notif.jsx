import React, { useState, useEffect } from 'react';
import "../../styles/ui/notif.css";
const generateId = () => Math.random().toString(36).substr(2, 9);

export const Notif = ({ notifMessage = {}, setNotifMessage }) => {
    const { message, error, success } = notifMessage;
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const addNotification = (type, content) => {
            setNotifMessage(prev => ({...prev, [type]: ""}));
            const id = generateId();
            setNotifications((prev) => [...prev, { id, type, content }]);

            setTimeout(() => {
                setNotifications((prev) => prev.filter(notification => notification.id !== id));
            }, 3500);
        };

        if (message) {
            addNotification('message', message);
        }

        if (error) {
            addNotification('error', error);
        }

        if (success) {
            addNotification('success', success);
        }
    }, [message, error, success, setNotifMessage]);

    return (
        <>
            {notifications.map(({ id, type, content }) => (
                <div key={id} className={`notification ${type}_notification`}>
                    <p>{content}</p>
                </div>
            ))}
        </>
    );
};
