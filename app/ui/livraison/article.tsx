import {Button, Card, Form, Input, message, Popconfirm} from 'antd';
import React, {useEffect, useState} from "react";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {updateClient} from "@/lib/api";
import {wait} from "next/dist/lib/wait";

function Article({ article, articleID, quantite, updateQuantity   }) {
    const [quantite1, setQuantite] = useState(quantite);

    const handleIncrement = () => {
        const newQuantite = quantite1 + 1;
        setQuantite(newQuantite);
        updateQuantity(articleID, newQuantite);
    };

    const handleDecrement = () => {
        if (quantite1 > 0) {
            const newQuantite = quantite1 - 1;
            setQuantite(newQuantite);
            updateQuantity(articleID, newQuantite);
        }
    };

    const handleQuantiteChange = (e) => {
        const newQuantite = parseInt(e.target.value, 10);
        setQuantite(newQuantite);
        updateQuantity(articleID, newQuantite);
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
                <p className="mb-0">
                    --- <b className="text-base">{article}</b>{' '}
                    <Input
                        type="number"
                        value={quantite1}
                        onChange={handleQuantiteChange}
                        style={{ width: '60px', marginLeft: '10px' }}
                    />
                </p>
            </div>
        </div>
    );
}

export default Article;
