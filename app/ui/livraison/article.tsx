import {Button, Card, Form, message, Popconfirm} from 'antd';
import React, {useEffect, useState} from "react";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {updateClient} from "@/lib/api";
import {wait} from "next/dist/lib/wait";

// @ts-ignore
function Article({ article }) {

    const [quantite, setQuantite] = useState(article.quantite);

    const handleIncrement = () => {
        setQuantite(quantite + 1);
    };

    const handleDecrement = () => {
        if (quantite > 0) {
            setQuantite(quantite - 1);
        }
    };

    return (
        <div className='flex items-center mb-4'>
            <div>
                <p className="mb-0">
                    - <b className="text-base">{article.article.nom}</b>{' '}
                    <Button onClick={handleDecrement} size="small" icon={<MinusOutlined/>} className="ml-5 mr-2"/>
                    <span className="text-base">{quantite}</span>{' '}
                    <Button onClick={handleIncrement} size="small" icon={<PlusOutlined/>} className="ml-2"/>
                </p>
                <p>---------------------------------</p>
            </div>
        </div>
    );
}

export default Article;
