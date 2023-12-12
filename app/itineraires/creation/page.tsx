'use client'
import {Image} from "antd";
import AjoutItineraire from "@/app/ui/itineraires/ajoutItineraire";

function Itineraire() {
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <AjoutItineraire />
        </div>
    );
}

export default Itineraire;
