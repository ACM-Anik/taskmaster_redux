import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import MenuDropdown from '../components/ui/MenuDropdown';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../utils/firebase.config';
import { useGetUsersQuery } from '../redux/features/users/usersApi';


const Chat = () => {
  const [user, setUser] = useState();
  const { data: allUsers } = useGetUsersQuery();
  const [chattingUser, setChattingUser] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  // Setting the user Profile:--
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    setNewMessage('');
  }, []);

  // Chatting with an user:--
  const handleMember = (member) => {
    if (allUsers && user) {
      const filteredUser = allUsers.filter((single) => single.email == member.email);
      setChattingUser(filteredUser[0]);
    }
  }

  // Functions for sending messages:--
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
      sender: `${user?.displayName} `,
      timestamp: new Date().toISOString(),
      content: newMessage.trim() // Trim any leading or trailing whitespace from the message content
    };

    if (message.content) {
      setMessages([...messages, message]);
      setButtonDisabled(false);
      setNewMessage('');
    } else {
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

  return (
    <>
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-9 px-10 pt-10 h-screen">
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

          {/* Chatting Page(Interface):---------- */}
          <div className="mt-6 relative overflow-hidden bg-sky-200">
            {/* Chatting member */}
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-3 rounded-md">
              {chattingUser ?
                <div className="flex gap-2">
                  <img className="h-10 w-10 rounded-full overflow-hidden" src={chattingUser?.photoURL} alt="profile" />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">{chattingUser?.name}</h1>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                :
                <h1 className="text-lg font-semibold">Select an member to chat</h1>
              }
              {/* Chatting member Profile Info:----------- */}
              <div className="flex justify-center items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </div>
            </div>
            {/* Rendering Chat Messages */}
            <div className="overflow-x-hidden overflow-y-auto p-2" style={{ height: "calc(100vh - 240px)" }}>
              <div className="">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender === user.displayName ? 'sent' : 'received'}`}>
                    <div className="">
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
          {chattingUser &&
            <div className="chat-input flex gap-2 z-100 pt-2">
              <input
                className="rounded-md"
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={handleMessageChange}
                onKeyUp={handleKeyDown}
              />
              <button
                className={` rounded-xl p-2 flex gap-1 transition-all cursor-pointer ${!newMessage ? 'bg-gray-300 cursor-not-allowed text-gray-400' : 'border-2 border-secondary/20 text-secondary bg-blue-100 hover:text-white border-primary hover:bg-primary'}`}
                onClick={sendMessage}
                disabled={buttonDisabled}
              >
                <span>Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </button>
            </div>
          }
        </div>

        {/* Chat Contacts:---------- */}
        <div className="col-span-3 border-l-2 border-secondary/20 px-6 pt-10 h-screen overflow-hidden overflow-y-scroll">
          <h1 className="text-xl text-center">Chat Contacts</h1>
          <div className="flex flex-col items-center gap-3 mt-3">
            {allUsers?.map((member) =>
              <div
                key={member?._id}
                onClick={() => handleMember(member)}
                className={`bg-[#D3DDF9] px-2 py-1 rounded-md cursor-pointer flex items-center w-full hover:shadow-lg hover:bg-sky-200 ${chattingUser?.email == member.email ? "bg-sky-200" : ""}`}
              >
                <div className="h-10 w-10 m-2 rounded-xl overflow-hidden">
                  <img
                    src={member.photoURL}
                    alt="member"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{member.name}</h1>
                  <p className="text-xs font-thin">{"last seen at 8pm"}</p>
                </div>
              </div>
            )};
          </div>

        </div>
      </div>
    </>
  );

};

export default Chat;
