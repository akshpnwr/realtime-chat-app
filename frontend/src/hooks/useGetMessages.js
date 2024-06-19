import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation, isGroupChat } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const uri = isGroupChat ? `/api/message/group/${selectedConversation._id}` : `/api/message/${selectedConversation._id}`

                const res = await fetch(uri);

                const data = await res.json()
                if (data.error) throw new Error(data.error)

                console.log(data);
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false);
            }
        }
        if (selectedConversation?._id) getMessages()

    }, [selectedConversation?._id, setLoading])
    return { messages, loading }
}

export default useGetMessages;