'use client';
import * as React from "react"

import {Image, Menu} from 'antd'; // npm install antd

function MenuDer() {
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;

    return (
        <div className="flex justify-between items-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' '/>

            <Menu mode="horizontal">
                <Menu.Item key="profil">
                    <a href={`/users/${userId}`}>Profil</a>
                </Menu.Item>
                {isAdmin ? (
                    <>
                        <Menu.Item key="newItineraire">
                            <a href="/itineraires/creation">Nouvel Itinéraire</a>
                        </Menu.Item>
                        <Menu.Item key="newClient">
                            <a href="/clients/ajouterClient">Nouveau Client</a>
                        </Menu.Item>
                        <Menu.Item key="listeClients">
                            <a href="/clients">Liste des Clients</a>
                        </Menu.Item>
                        <Menu.Item key="listeLivreurs">
                            <a href="/users">Liste des Livreurs</a>
                        </Menu.Item>
                    </>
                ) : (<></>)}
            </Menu>
        </div>
    );
}

export default MenuDer;
