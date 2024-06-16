import { useEffect } from 'react';
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../context/SocketContext';
import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
    const { messages, setMessages } = useConversation();
    const { socket } = useSocketContext();

    useEffect(() => {
        // Listen for new messages
        socket.on('newMessage', (message) => {
            console.log(message);
            message.shouldShake = true;
            const sound = new Audio(notificationSound)
            sound.play();
            setMessages([...messages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [setMessages, messages, socket]);
}

export default useListenMessages