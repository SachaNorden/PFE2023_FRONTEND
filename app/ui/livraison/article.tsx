import {Button} from 'antd';
import React, {useState} from "react";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

// @ts-ignore
function Article({ article, quantite   }) {
    const [newQuantite, setNewQuantite] = useState(quantite);

    const handleIncrement = () => {
        setNewQuantite( newQuantite + 1);
    };

    const handleDecrement = () => {
        if (newQuantite > 0) {
            setNewQuantite( newQuantite - 1);
        }
    };

    return (
        <div className='flex items-center mb-4'>
            <div>
                <p className="mb-0">
                    - <b className="text-base">{article}</b>{' '}
                    <Button onClick={handleDecrement} size="small" icon={<MinusOutlined/>} className="ml-5 mr-2"/>
                    <span className="text-base">{newQuantite}</span>{' '}
                    <Button onClick={handleIncrement} size="small" icon={<PlusOutlined/>} className="ml-2"/>
                </p>
                <p>---------------------------------</p>
            </div>
        </div>
    );
}

export default Article;
