import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

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
    return { loading, conversations };
}

export default useGetConversations;