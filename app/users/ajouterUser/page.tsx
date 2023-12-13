'use client'
import {Image} from "antd";
import AjoutUser from "@/app/ui/users/ajoutUser";
import LogOutButton from "@/app/ui/logOutButton";

function Users() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            {isAdmin ? (
                <AjoutUser/>
            ) : (
                <div>
                    <div>Vous n'avez pas accès à cette page, veuillez contacter l'administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Users;
