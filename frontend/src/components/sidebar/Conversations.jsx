import { useEffect } from "react";
import useConversationContext from "../../context/ConversationContext";
import useConversation from "../../hooks/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading } = useConversation();
  const { conversations } = useConversationContext();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <p>Loading...</p>}
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} {...conversation} />
      ))}
    </div>
  );
};
export default Conversations;
