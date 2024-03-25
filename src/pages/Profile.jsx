import { useEffect, useState } from 'react';
import { sendEmailVerification, updateEmail, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import auth from '../utils/firebase.config';


const Profile = () => {
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const user = useSelector((state) => state.usersSlice);

  useEffect(() => {
    setNewName(user?.name);
    setNewEmail(user?.email);

    console.log('newUserName=', user.name);
    console.log('newUserEmail=', user.email);
  }, []);

  // Edit the profile:-
  const [editing, setEditing] = useState(false);
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = () => {
    setEditing(false);
  };
  const handleCancelClick = () => {
    setEditing(false);
  };

  // Changing the name:-
  const handleChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    console.log('title=', inputName);
    console.log('value=', value);

    if (inputName === "name") {
      updateProfile(auth.currentUser, {
        displayName: value,
      });
      setNewName(value);
    }
    else if (inputName === "email") {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });

      updateEmail(auth.currentUser, `${value}`)
        .then(() => {
          setNewEmail(value);
        }).catch((error) => {
          console.log('UpdateEmailError=', error);
        });
    }
  };

  const handleDelete = () => {
    console.log('Delete', 'Delete');
  }


  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {editing ? (
        <div>
          <label className="block mb-2">Name:</label>
          <input type="text" name="name"
            value={user ? newName : "Set Your Name"}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />

          <label className="block mb-2">Email:</label>
          <input type="email" name="email"
            value={newEmail}
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
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <div className="flex justify-between">
            <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
              Edit Account
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
