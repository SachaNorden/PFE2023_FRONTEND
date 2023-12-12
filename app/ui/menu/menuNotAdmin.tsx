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
            </Menu>
        </div>
    );
}

export default MenuDer;
