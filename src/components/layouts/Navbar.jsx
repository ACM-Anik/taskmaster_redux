import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import MenuDropdown from '../ui/MenuDropdown';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../utils/firebase.config';


const Navbar = ({title}) => {
    // Setting the user Profile:-
    const [user, setUser] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);


    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-semibold text-3xl">{title}</h1>
                </div>
                {/* NavLinks/Buttons  */}
                <div className="flex gap-5">
                    <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                        <MagnifyingGlassIcon className="h-6 w-6" />
                    </button>
                    <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                        <BellIcon className="h-6 w-6" />
                    </button>

                    <MenuDropdown>
                        <div className="h-10 w-10 rounded-xl overflow-hidden">
                            <img
                                title={user?.displayName}
                                src={user?.photoURL ?
                                    user.photoURL
                                    :
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                alt="profile"
                                className="object-cover h-full w-full "
                            />
                        </div>
                    </MenuDropdown>
                </div>
            </div>
        </>
    );
};

export default Navbar;