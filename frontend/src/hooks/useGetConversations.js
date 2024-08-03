import { useEffect, useState } from "react";

const useGetConversations = () => {
  const [loading,setLoading] = useState(false);
  const [conversation,setConversation] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
        setLoading(true);
        let storagess = localStorage.getItem('chat-user');
        try {
          const headers = { 'Authorization': `Bearer ${JSON.parse(storagess).token}`};
            const res = await fetch('/api/users',{headers});
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            setConversation(data)
        } catch (error) {
           toast.error(error.message) 
        } finally{
            setLoading(false)
        }
    }

    getConversations()
  }, []);

  return {loading,conversation}
  
}

export default useGetConversations