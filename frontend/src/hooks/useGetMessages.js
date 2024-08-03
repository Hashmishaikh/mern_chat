import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      let storagess = localStorage.getItem('chat-user');
        try {
          const headers = { 'Authorization': `Bearer ${JSON.parse(storagess).token}`};
        const res = await fetch(`/api/messages/${selectedConversation?._id}`,{headers});
        const data = await res.json();
        if (data?.error) throw new Error(data.error);
        console.log('get-message', data)
        setMessages(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
