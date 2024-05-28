import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversationContext from "../context/ConversationContext";

const useConversation = () => {
    const [loading, setLoading] = useState(false);
    const { setConversations } = useConversationContext();

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users')
                if (!res.ok) throw new Error('Failed to fetch users')

                const data = await res.json();
                setConversations(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, []);
    return { loading };
}

export default useConversation;