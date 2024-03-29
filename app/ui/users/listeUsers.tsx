import UserCard from "@/app/ui/users/userCard";
import {Key} from "react";

// @ts-ignore
function ListeUsers({users}) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1>Liste des livreurs</h1>
            {users.map((users: { id: Key | null | undefined; }) => (
                <UserCard key={users.id} user={users}/>
            ))}
        </div>
    );
}

export default ListeUsers;
