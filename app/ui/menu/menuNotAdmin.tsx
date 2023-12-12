'use client';
import * as React from "react"

import {Menu, Dropdown, Button, Image} from 'antd';  // npm install antd

function MenuDer() {
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

    return (
        <div className="flex justify-between items-center">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' '/>

            <Menu mode="horizontal">
                <Menu.Item key="profil">
                    <a href={`/users/${userId}`}>Profil</a>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuDer;
