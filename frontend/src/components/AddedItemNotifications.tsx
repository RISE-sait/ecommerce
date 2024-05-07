import { useState, useEffect } from "react";

export class Notifications {
    static NotificationQueue: Notification[] = []

    static updateNotificationQueue: (() => void) | undefined
}

export enum ActionType {
    ADD, REMOVE
}

type Notification = {
    timeout?: NodeJS.Timeout;
    action: ActionType
}

export default () => {

    const [notificationQueue, setNotificationQueue] = useState(Notifications.NotificationQueue);

    useEffect(() => {
        Notifications.updateNotificationQueue = () => {

            setNotificationQueue(Notifications.NotificationQueue)

            setNotificationQueue(() => {

                const newQueue = [...Notifications.NotificationQueue].map((notification) => {
                    if (!notification.timeout) {
                        notification.timeout = setTimeout(() => {
                            setNotificationQueue(prevQueue => 
                                prevQueue.filter((item) => item !== notification)
                            )
                            Notifications.NotificationQueue.shift()
                        }, 3000);
                    }
                    return notification
                })

                return newQueue;
            });
        };

        return () => {
            Notifications.updateNotificationQueue = undefined
        }

    }, []);

    return <div className="fixed top-16 right-0 z-20 flex flex-col gap-4">
        {
            notificationQueue.map((notification, idx) => {
                return <h2 className={`p-5 ${notification.action === ActionType.ADD ? "bg-green-500" : "bg-red-500"}`} key={idx}>
                    {notification.action === ActionType.ADD ? "Added 1 item to cart" : "Removed 1 item from cart"}
                </h2>
            })
        }
    </div>
}