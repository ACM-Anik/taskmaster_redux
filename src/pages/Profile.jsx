import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../utils/firebase.config';


const Profile = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.usersSlice);
  // console.log(user);
  // const [userData, useuserData] = useState();


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

  const handleChangeName = (e) => {
    const name = e.target.value;
    console.log('name', name);

    if (name) {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    // dispatch(setUser({ ...user, [name]: value }));
    // dispatch(
    //   setUser({
    //     name: value,
    //   })
    // )
  };

  const handleChangeEmail = (e) => {
    const email = e.target;
    console.log('email', email);
  };



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
          <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
