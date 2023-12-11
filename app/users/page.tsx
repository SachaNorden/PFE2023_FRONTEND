'use client'
import {Image} from "antd";
import {fetchUsers} from "@/lib/api";
import {useEffect, useState} from "react";
import AddButton from "@/app/ui/addButton";
import ListeUsers from "@/app/ui/users/listeUsers";

function Users() {
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
                console.error(error.message);
            }
        };
        fetchData();
    },);

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ListeUsers users={users} onDelete={handleDelete()}/>
            <AddButton link="/users/ajouterUser"/>
        </div>
    );
}

export default Users;
