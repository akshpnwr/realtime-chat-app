import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetGroups = () => {
    const [loading, setLoading] = useState(true)
    const [groups, setGroups] = useState([])

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('/api/message/groups')

                if (!res.ok) throw new Error('Failed to fetch groups')

                const data = await res.json();
                setGroups(data.groups)
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }

        fetchGroups()
    }, [])
    return { loading, groups }
}

export default useGetGroups;