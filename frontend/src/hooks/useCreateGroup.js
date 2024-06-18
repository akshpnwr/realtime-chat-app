import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const { groupParticipants, setGroupParticipants } = useConversation();

    const createGroup = async (groupName) => {
        setLoading(true);
        try {
            if (groupName.trim() === "") {
                throw new Error("Group name cannot be empty");
            }
            const res = await fetch(`/api/message/createGroup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: groupName,
                    participants: groupParticipants,
                }),
            });

            if (!res.ok) throw new Error("Failed to create group");

            setGroupParticipants([])
            toast.success("Group created successfully");
        } catch (error) {
            toast.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, createGroup };
}

export default useCreateGroup