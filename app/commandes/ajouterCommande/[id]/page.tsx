'use client'
import {Image} from "antd";
import AjoutCommande from "@/app/ui/commandes/ajoutCommande";

function Commandes() {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const clientId = parts[parts.length - 1];

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <AjoutCommande clientId={clientId}/>
        </div>
    );
}

export default Commandes;
