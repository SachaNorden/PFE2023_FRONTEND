'use client'
import {Image} from "antd";
import AjoutArticle from "@/components/articles/ajoutArticle";

function Articles() {
    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <AjoutArticle />
        </div>
    );
}

export default Articles;
