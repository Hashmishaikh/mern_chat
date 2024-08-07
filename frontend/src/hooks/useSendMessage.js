import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    let storagess = localStorage.getItem('chat-user');
        try {
          const headers = { 'Authorization': `Bearer ${JSON.parse(storagess).token}`};
      const res = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization,
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
    //   console.log('data-fetch', data?.newMessage)
	    setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
