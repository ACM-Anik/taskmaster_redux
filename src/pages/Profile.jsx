import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import auth from '../utils/firebase.config';
// import { setUser } from '../redux/features/users/usersSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const [userBio, setUserBio] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserBio({
          name: user.displayName,
          email: user.email,
        });
      }
    })
  }, []);

  useEffect(() => {
    dispatch(
      setUser({
        name: user.displayName,
        email: user.email,
      })
    );
  }, []);


  const [user, setUser] = useState({
    name: "Anik C Mojumder",
    email: "anik@gmail.com",
    bio: "There are something i don't know.",
  });

  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Logic to save changes
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset form fields if necessary
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {editing ? (
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          <label className="block mb-2">Bio:</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          <div className="flex justify-between">
            <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4">
              Save
            </button>
            <button onClick={handleCancelClick} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
