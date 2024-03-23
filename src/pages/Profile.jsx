import { useEffect, useState } from 'react';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/users/usersSlice';
import auth from '../utils/firebase.config';


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersSlice);
  // console.log(user);

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

  const handleChangeName = (e) => {
    const value = e.target;
    console.log('value', value);

    // dispatch(
    //   setUser({
    //     name: value,
    //   })
    // )
  };

  const handleChangeEmail = (e) => {
    const value = e.target;
    console.log('value', value);

    // dispatch(
    //   setUser({
    //     email: value,
    //   })
    // )
  };

  useEffect(() => {
    // updateProfile(auth.currentUser, {
    //   displayName: name,
    // });
  }, []);


  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {editing ? (
        <div>
          <label className="block mb-2">Name:</label>
          <input type="text" name="name"
            value={user?.name}
            onChange={handleChangeName}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          <label className="block mb-2">Email:</label>
          <input type="email" name="email"
            value={user?.email}
            onChange={handleChangeEmail}
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
          {/* Display other user info */}
          <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
