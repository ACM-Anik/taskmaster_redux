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
                                    "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
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