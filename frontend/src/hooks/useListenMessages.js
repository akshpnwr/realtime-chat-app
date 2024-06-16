import { useEffect } from 'react';
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../context/SocketContext';

const useListenMessages = () => {
    const { messages, setMessages } = useConversation();
    const { socket } = useSocketContext();

    useEffect(() => {
        // Listen for new messages
        socket.on('newMessage', (message) => {
            console.log(message);
            setMessages([...messages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [setMessages, messages, socket]);
}

export default useListenMessages