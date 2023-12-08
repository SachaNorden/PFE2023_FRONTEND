import axios from 'axios';
import { GetServerSideProps } from 'next';

interface User {
    id: number;
    name: string;
}

interface Props {
    users: User[];
}

const List: React.FC<Props> = ({ users }) => {
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};
export async function getServerSideProps() {
    const response = await axios.get('http://localhost:8000/user/list');
    const users = response.data;

    return {
        props: {
            users,
        },
    };
}

export default List;