'use client'
import {Image} from "antd";
import AjoutCommande from "@/app/ui/commandes/ajoutCommande";

function Commandes() {
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <AjoutCommande />
        </div>
    );
}

export default Commandes;
