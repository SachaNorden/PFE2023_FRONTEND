import {Button, Card, Form, message, Popconfirm} from 'antd';
import React, {useEffect, useState} from "react";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {updateClient} from "@/lib/api";
import {wait} from "next/dist/lib/wait";

function Article({ article, updateQuantity, quantite   }) {
    const [quantite1, setQuantite] = useState(quantite);

    const handleIncrement = () => {
        setQuantite( quantite1 + 1);
    };

    const handleDecrement = () => {
        if (quantite1 > 0) {
            setQuantite( quantite1 - 1);
        }
    };

    return (
        <div className='flex items-center mb-4'>
            <div>
                <p className="mb-0">
                    - <b className="text-base">{article}</b>{' '}
                    <Button onClick={handleDecrement} size="small" icon={<MinusOutlined/>} className="ml-5 mr-2"/>
                    <span className="text-base">{quantite1}</span>{' '}
                    <Button onClick={handleIncrement} size="small" icon={<PlusOutlined/>} className="ml-2"/>
                </p>
                <p>---------------------------------</p>
            </div>
        </div>
    );
}

export default Article;
