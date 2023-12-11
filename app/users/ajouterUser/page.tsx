'use client'
import {Image} from "antd";
import AjoutUser from "@/components/users/ajoutUser";

function Users() {
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <AjoutUser/>
        </div>
    );
}

export default Users;
