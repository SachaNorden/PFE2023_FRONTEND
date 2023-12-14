'use client'
import {Image} from "antd";
import AjoutClient from "@/app/ui/clients/ajoutClient";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Clients() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer />
            {isAdmin ? (
                <AjoutClient/>
            ) : (
                <div>
                    <div>Vous n'avez pas accès à cette page, veuillez contacter l'administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Clients;
