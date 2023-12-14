'use client'
import {Image} from "antd";
import {fetchUsers} from "@/lib/api";
import {useEffect, useState} from "react";
import AddButton from "@/app/ui/addButton";
import ListeUsers from "@/app/ui/users/listeUsers";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Users() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const [users, setUsers] = useState([]);
    const handleDelete = async () => {
        //const updatedClients = await fetchClients();
        //setClients(updatedClients);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer />
            {isAdmin ? (
                <div>
                    <ListeUsers users={users} onDelete={handleDelete()}/>
                    <AddButton link="/users/ajouterUser"/>
                    <LogOutButton/>
                </div>
            ) : (
                <div>
                    <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Users;
