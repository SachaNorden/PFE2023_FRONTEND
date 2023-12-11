import UserCard from "@/app/ui/users/userCard";

function ListeUsers({users, onDelete}) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1>Liste des livreurs</h1>
            {users.map((users) => (
                <UserCard key={users.id} user={users} onDelete={onDelete}/>
            ))}
        </div>
    );
}

export default ListeUsers;
