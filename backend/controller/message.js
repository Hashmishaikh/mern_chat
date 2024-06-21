import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id)
    }
    // await conversation.save();
    // await newMessage.save();
    //  this will run in parallel
    await Promise.all([ conversation.save(),newMessage.save()])

    // socket io functionality here 
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
        // io.to().emit used to send event to the specific client
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendmessage controller",error.message)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("message"); //NOT REFERENCE BUT ACTUAL MESSAGES

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.message
         
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getmessage controller",error.message)
        res.status(500).json({ error: "Internal Server Error" });
      }
}
