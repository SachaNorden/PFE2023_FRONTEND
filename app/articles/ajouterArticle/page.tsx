'use client'
import {Image} from "antd";
import AjoutArticle from "@/app/ui/articles/ajoutArticle";
import LogOutButton from "@/app/ui/logOutButton";

function Articles() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            {isAdmin ? (
                <AjoutArticle/>
            ) : (
                <div>
                    <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Articles;
