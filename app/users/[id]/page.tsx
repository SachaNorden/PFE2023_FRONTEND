'use client'
import {Image} from "antd";
import ProfilUser from "@/app/ui/users/profilUser";
import {getUserById} from "@/lib/api";
import {useEffect, useState} from "react";

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
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ProfilUser user={user}/>
        </div>
    );
}

export default Profil;
