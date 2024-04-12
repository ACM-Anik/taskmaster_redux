import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import MenuDropdown from '../components/ui/MenuDropdown';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../utils/firebase.config';
import { useGetUsersQuery } from '../redux/features/users/usersApi';


const Chat = () => {
  const [user, setUser] = useState();
  const { data: allUsers } = useGetUsersQuery();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  // Setting the user Profile:-
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    setNewMessage('');
  }, []);

  useEffect(() => {
    // if (allUsers && user) {
    //   const filteredUser = allUsers.filter(single => {
    //     const normalizedName = single.name.toLowerCase().trim();
    //     const normalizedDisplayName = user.displayName.toLowerCase().trim();
    //     return normalizedName === normalizedDisplayName;
    //   });
    //   console.log("filteredUser", filteredUser);
    //   setChattingMember(filteredUser);
    // }
  }, [allUsers, user]);


  const handleMessageChange = (e) => {
    const inputValue = e.target.value;
  
    if (inputValue === null || undefined) {
      setButtonDisabled(true);
    } else {
      setNewMessage(inputValue);
      setButtonDisabled(false);
    }
  };

  const sendMessage = () => {
    // Create a message object with sender (assuming current user), timestamp, and content
    const message = {
      sender: user?.displayName,
      timestamp: new Date().toISOString(),
      content: newMessage.trim() // Trim any leading or trailing whitespace from the message content
    };
    // For demonstration purposes, we'll just update the UI by adding the new message to the messages state

    if (message.content) {
      setMessages([...messages, message]);
      setButtonDisabled(false);
      setNewMessage('');
    }else{
      console.log('67', 67)
      setButtonDisabled(true);
      setNewMessage('');
    }
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === 'Enter') {
      sendMessage();
      setButtonDisabled(true);
      setNewMessage('');
    }
  };

  // External styles:-
  const containerStyle = {
    height: 'calc(100% - 800px)',
    background: "lightblue",
  };

  return (
    <>
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-9 px-10 pt-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-3xl">Chat</h1>
            </div>
            {/* Nav Buttons:---------- */}
            <div className="flex gap-5">
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                <BellIcon className="h-6 w-6" />
              </button>
              {/* Profile Dropdown:----------- */}
              <MenuDropdown>
                <div className="h-10 w-10 rounded-xl overflow-hidden">
                  <img
                    title={user?.displayName}
                    src={user?.photoURL ?
                      user.photoURL
                      :
                      "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
                    }
                    alt="profile"
                    className="object-cover h-full w-full "
                  />
                </div>
              </MenuDropdown>
            </div>
          </div>

          {/* Chatting Page:---------- */}
          <div className="mt-6 relative overflow-hidden">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-3 rounded-md">
              <div className="flex gap-2">
                <img className="h-10 w-10 rounded-full overflow-hidden" src={user?.photoURL} alt="profile" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">{user?.displayName}</h1>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {allUsers?.length}
              </p>
            </div>
            {/* Render Chat Messages */}
            <div className="overflow-x-hidden overflow-y-scroll border-2 p-2 my-2" style={containerStyle}>
              <div className="">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender === user.displayName ? 'sent' : 'received'}`}>
                    <div className="metadata">
                      <span className="username">{message.sender}</span>
                      <span className="timestamp">{message.timestamp}</span>
                    </div>
                    <div className="content">{message.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Message Input Box */}
          <div className="chat-input flex gap-2 z-100">
            <input
              className="rounded-md"
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleMessageChange}
              onKeyUp={handleKeyDown}
            />
            <button
              className={`border-2 border-secondary/20 rounded-xl p-2 flex gap-1 transition-all cursor-pointer ${!newMessage ? 'bg-gray-300 cursor-not-allowed disabled' : ' text-secondary hover:text-white hover:border-primary hover:bg-primary'}`}

              onClick={sendMessage}
              disabled={buttonDisabled}
            >
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Chat Contacts:---------- */}
        <div className="col-span-3 border-l-2 border-secondary/20 px-6 pt-10 h-screen overflow-hidden overflow-y-scroll">
          <h1 className="text-xl text-center">Chat Contacts</h1>
          <div className="flex flex-col items-center gap-3 mt-3">
            {allUsers?.map((member) =>
              <div key={member?._id} className="bg-blue-200 p-2 rounded-lg cursor-pointer flex items-center justify-center">
                <div className="h-10 w-10 m-2 rounded-xl overflow-hidden">
                  <img
                    src={member.photoURL}
                    alt="member"
                    className="object-cover h-full w-full"
                  />
                </div>
                <h1 className="text-lg font-semibold">{member.name}</h1>
              </div>
            )};
          </div>

        </div>
      </div>
    </>
  );

};

export default Chat;
