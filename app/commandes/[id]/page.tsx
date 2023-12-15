'use client'
import AjoutCommande from "@/app/ui/commandes/ajoutCommande";
import MenuDer from "@/app/ui/menu/menu";
import LogOutButton from "@/app/ui/logOutButton";

function Commandes() {
    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer/>
            <AjoutCommande/>
            <LogOutButton/>
        </div>
    );
}

export default Commandes;
