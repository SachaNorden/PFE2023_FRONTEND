'use client'
import ProfilUser from "@/app/ui/users/profilUser";
import {getUserById} from "@/lib/api";
import {useEffect, useState} from "react";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Profil() {

    const [user, setUser] = useState([]);
    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const userId = parts[parts.length - 1];
        const fetchData = async () => {
            try {
                const data = await getUserById(userId);
                setUser(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer/>
            <ProfilUser user={user}/>
            <div>
                <LogOutButton/>
            </div>
        </div>
    );
}

export default Profil;
