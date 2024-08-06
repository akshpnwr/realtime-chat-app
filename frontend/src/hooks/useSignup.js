import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullname, username, password, confirmPassword, gender })
        if (!success) return
        try {
            setLoading(true)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
            })

            if (!res.ok) throw new Error('Username already exists')

            const data = await res.json();

            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    };

    return { loading, signup }
}

const handleInputError = ({ fullname, username, password, confirmPassword, gender }) => {
    console.log(fullname, username, password, confirmPassword, gender);
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return false
    }
    return true
}

export default useSignup