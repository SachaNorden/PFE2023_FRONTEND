'use client'
import AjoutItineraire from "@/app/ui/itineraires/ajoutItineraire";
import MenuDer from "@/app/ui/menu/menu";

function Itineraire() {
    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer/>
            <AjoutItineraire/>
        </div>
    );
}

export default Itineraire;
