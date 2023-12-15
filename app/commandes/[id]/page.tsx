'use client'
import AjoutCommande from "@/app/ui/commandes/ajoutCommande";
import MenuDer from "@/app/ui/menu/menu";

function Commandes() {
    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer/>
            <AjoutCommande/>
        </div>
    );
}

export default Commandes;
