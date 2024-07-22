import { useState, useEffect } from "react"

export class Notifications {

    static updateNotificationQueue: (notificationType: ActionType) => void
}

export enum ActionType {
    ADD, REMOVE
}

type Notification = {
    createdTime: number
    timeout: NodeJS.Timeout
    action: ActionType
}

export default function AddedItemNotifications() {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        Notifications.updateNotificationQueue = (notificationType: ActionType) => {
            setNotifications(prevNotifications => {
                // Create a new notification object
                const newNotification = {
                    action: notificationType,
                    createdTime: Date.now(),
                    timeout: setTimeout(() => {
                        // Remove the notification after 2000ms
                        setNotifications(notifications => notifications.filter(n => n.createdTime !== newNotification.createdTime));
                    }, 2000)
                };

                // Add the new notification to the state
                return [...prevNotifications, newNotification];
            });
        }
    }, [])

    return <div className="top-16 fixed right-0 z-20">
        {
            notifications.map((notification, idx) => {
                return <h2
                    key={notification.createdTime}
                    className={`p-4 relative ${notification.action === ActionType.ADD ? "bg-green-500" : "bg-red-500"} transition-transform duration-1000`}
                    style={{ transform: `translateY(${idx * 15}px)` }}
                >
                    {notification.action === ActionType.ADD ? "Added 1 item to cart" : "Removed 1 item from cart"}
                </h2>
            })
        }
    </div>
}