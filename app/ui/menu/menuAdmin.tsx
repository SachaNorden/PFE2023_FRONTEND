'use client';
import * as React from "react"

import {Menu, Dropdown, Button, Image} from 'antd';  // npm install antd

function MenuDer() {
    return (
        <div className="flex justify-between items-center">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' '/>

            <Menu mode="horizontal">
                <Menu.Item key="profil">
                    <a href="/profil">Profil</a>
                </Menu.Item>
                <Menu.Item key="newItineraire">
                    <a href="/itineraires/creation">Nouvel Itinéraire</a>
                </Menu.Item>
                <Menu.Item key="newClient">
                    <a href="/clients/ajouterClient">Nouveau Client</a>
                </Menu.Item>
                <Menu.Item key="newCommande">
                    <a href="/commandes/creation">Nouvelle Commande</a>
                </Menu.Item>
                <Menu.Item key="listeClients">
                    <a href="/clients">Liste des Clients</a>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuDer;
