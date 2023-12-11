'use client'
import {Image} from "antd";
import AjoutClient from "@/app/ui/clients/ajoutClient";

function Clients() {
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <AjoutClient />
        </div>
    );
}

export default Clients;
