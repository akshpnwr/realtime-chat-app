import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation';
import { useState } from 'react';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation, isGroupChat } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            if (message === "") throw new Error('Message cannot be empty')

            const uri = isGroupChat ? `api/message/sendToGroup/${selectedConversation._id}` : `api/message/send/${selectedConversation._id}`
            const res = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })
            if (!res.ok) {
                throw new Error('Message not sent')
            }
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }
}

export default useSendMessage