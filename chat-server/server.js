const dotenv = require("dotenv");
const mongoose= require("mongoose");
dotenv.config({path: "./config.env"});
const path = require("path");
const {Server} = require("socket.io");
const app = require("./app");
const OneToOneMessage = require("./models/OneToOneMessage");
const AudioCall = require("./models/audioCall"); 
process.on("uncaughtException", (err) =>{
    console.log(err);
    process.exit(1);
});
const {promisify} = require("util");
const http = require("http");
const FriendRequest = require("./models/friendRequest");
// const { default: mongoose } = require("mongoose");
const server =http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET","POST"],
    },
});

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
}).then((con)=>{
    console.log("DB connection is successful")
}).catch((err)=>{
     console.log(err);
});
//3000, 5000

const port = process.env.PORT || 8000;

server.listen(port, () =>{ 
    console.log(`App is running on port ${port}...`);
});

io.on("connection", async (socket) => {
    //console.log(JSON.stringify(socket.handshake.query));
    //console.log(socket);
    const user_id = socket.handshake.query["user_id"];
    const socket_id = socket.id;
    console.log(`User connected ${socket.id}`);
    if(Boolean(user_id)){
        await User.findByIdAndUpdate(user_id, {socket_id, status: "Online"});
    }
    
    socket.on("friend_request", async(data) => {
       console.log(data.to);
       
       const to_user = await User.findById(data.to).select("sockect_id");
       const from_user = await User.findById(data.from).select("sockect_id");
       
       await FriendRequest.create({
           sender: data.from,
           recipient: data.to,
       })

       io.to(to_user.socket_id).emit("new_friend_request",{
          messaage: "New Friend Request Received"
       });
       io.to(from_user.socket_id).emit("request_sent",{
        messaage: "Request Sent Successfully!"
     });
    });
    socket.on("accept_request", async (data) => {
        // accept friend request => add ref of each other in friends array
        console.log(data);
        const request_doc = await FriendRequest.findById(data.request_id);
        console.log(request_doc);    
        const sender = await User.findById(request_doc.sender);
        const receiver = await User.findById(request_doc.recipient);
    
        sender.friends.push(request_doc.recipient);
        receiver.friends.push(request_doc.sender);
    
        await receiver.save({ new: true, validateModifiedOnly: true });
        await sender.save({ new: true, validateModifiedOnly: true });
    
        await FriendRequest.findByIdAndDelete(data.request_id);
    
        // delete this request doc
        // emit event to both of them
    
        // emit event request accepted to both
        io.to(sender.socket_id).emit("request_accepted", {
          message: "Friend Request Accepted",
        });
        io.to(receiver.socket_id).emit("request_accepted", {
          message: "Friend Request Accepted",
        });
    });

    socket.on("get_direct_conversations", async ({ user_id }, callback) => {
        const existing_conversations = await OneToOneMessage.find({
          participants: { $all: [user_id] },
        }).populate("participants", "firstName lastName _id email status");
    
        // db.books.find({ authors: { $elemMatch: { name: "John Smith" } } })
    
        console.log(existing_conversations);
    
        callback(existing_conversations);
      });
      socket.on("start_conversation", async (data) => {
        // data: {to: from:}
    
        const { to, from } = data;
    
        // check if there is any existing conversation
    
        const existing_conversations = await OneToOneMessage.find({
          participants: { $size: 2, $all: [to, from] },
        }).populate("participants", "firstName lastName _id email status");
    
        console.log(existing_conversations[0], "Existing Conversation");
    
        // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
        if (existing_conversations.length === 0) {
          let new_chat = await OneToOneMessage.create({
            participants: [to, from],
          });
    
          new_chat = await OneToOneMessage.findById(new_chat._id).populate(
            "participants",
            "firstName lastName _id email status"
          );
    
          console.log(new_chat);
    
          socket.emit("start_chat", new_chat);
        }
        // if yes => just emit event "start_chat" & send conversation details as payload
        else {
          socket.emit("start_chat", existing_conversations[0]);
        }
      });
      
    socket.on("get_messages", async (data, callback) => {
          const { messages } = await OneToOneMessage.findById(
            data.conversation_id
          ).select("messages");
          callback(messages);
        // catch (error) {
        //   console.log(error);
        //}
      });

    socket.on("text_message", async (data) => {
        console.log("Received message", data);
    
        // data: {to, from, message, conversation_id, type}
    
        const { message, conversation_id, from, to, type } = data;
    
         const to_user = await User.findById(to);
         const from_user = await User.findById(from);
    
        // // message => {to, from, type, created_at, text, file}
    
        const new_message = {
          to: to,
          from: from,
          type: type,
          created_at: Date.now(),
          text: message,
        };
    
        // // fetch OneToOneMessage Doc & push a new message to existing conversation
         const chat = await OneToOneMessage.findById(conversation_id);
         chat.messages.push(new_message);
        // // save to db`
         await chat.save({});
    
        // // emit incoming_message -> to user
    
         io.to(to_user.socket_id).emit("new_message", {
           conversation_id,
           message: new_message,
         });
    
        // // emit outgoing_message -> from user
         io.to(from_user.socket_id).emit("new_message", {
           conversation_id,
           message: new_message,
         });
      });

      socket.on("file_message", (data) => {
        console.log("Received message", data);
    
        // data: {to, from, text, file}
    
        // Get the file extension
        const fileExtension = path.extname(data.file.name);
    
        // Generate a unique filename
        const filename = `${Date.now()}_${Math.floor(
          Math.random() * 10000
        )}${fileExtension}`;
          
        // upload file to AWS s3
    
        // create a new conversation if its dosent exists yet or add a new message to existing conversation
    
        // save to db
    
        // emit incoming_message -> to user
    
        // emit outgoing_message -> from user
      });

      socket.on("start_audio_call", async (data) => {
        const { from, to, roomID } = data;
    
        const to_user = await User.findById(to);
        const from_user = await User.findById(from);
    
        console.log("to_user", to_user);
    
        // send notification to receiver of call
        io.to(to_user?.socket_id).emit("audio_call_notification", {
          from: from_user,
          roomID,
          streamID: from,
          userID: to,
          userName: to,
        });
      });
    
      // handle audio_call_not_picked
      socket.on("audio_call_not_picked", async (data) => {
        console.log(data);
        // find and update call record
        const { to, from } = data;
    
        const to_user = await User.findById(to);
    
        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Missed", status: "Ended", endedAt: Date.now() }
        );
    
        // TODO => emit call_missed to receiver of call
        io.to(to_user?.socket_id).emit("audio_call_missed", {
          from,
          to,
        });
      });
    
      // handle audio_call_accepted
      socket.on("audio_call_accepted", async (data) => {
        const { to, from } = data;
    
        const from_user = await User.findById(from);
    
        // find and update call record
        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Accepted" }
        );
    
        // TODO => emit call_accepted to sender of call
        io.to(from_user?.socket_id).emit("audio_call_accepted", {
          from,
          to,
        });
      });
    
      // handle audio_call_denied
      socket.on("audio_call_denied", async (data) => {
        // find and update call record
        const { to, from } = data;
    
        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Denied", status: "Ended", endedAt: Date.now() }
        );
    
        const from_user = await User.findById(from);
        // TODO => emit call_denied to sender of call
    
        io.to(from_user?.socket_id).emit("audio_call_denied", {
          from,
          to,
        });
      });
    
      // handle user_is_busy_audio_call
      socket.on("user_is_busy_audio_call", async (data) => {
        const { to, from } = data;
        // find and update call record
        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Busy", status: "Ended", endedAt: Date.now() }
        );
    
        const from_user = await User.findById(from);
        // TODO => emit on_another_audio_call to sender of call
        io.to(from_user?.socket_id).emit("on_another_audio_call", {
          from,
          to,
        });
      });
    
    
    
     socket.on("end", async(data) => {
        if(data.user_id){
            await User.findByIdAndUpdate(data.user_id,{ status:"Offline"});
        }
        console.log("Closing connection");
        socket.disconnect(0);
     });
    
});



process.on("unhandledRejection", (err) =>{
    console.log(err);
    server.close(()=>{
       process.exit(1);
    });
});
