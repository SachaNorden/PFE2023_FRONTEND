import {Form, Input, Image, Button} from 'antd';
/*
 <Button type="primary" icon={<EditOutlined/>} >
                Modifier
  </Button>
 */
import { EditOutlined } from '@ant-design/icons'; // Importer l'icône de modification
import FormComponent from '@/components/ui/Form.component';
// import { Button } from '@/components/ui/button'; // Example path, adjust according to your structure
//rajouter un [id] dans la route

export default function Itineraires() {
    function handleModifierClick() {
        console.log("cliqué (rajouter 'commandeId: any' en param");
    }

    return (
        <div className='min-h-screen flex flex-col '>
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' '/>

            <p className="text-3xl flex flex-col justify-center items-center">Détails Itineraire</p>
            <FormComponent >

                <p className="text-base"><b className="text-xl">Itinéraire 2</b> <span
                    className="text-2xl text-green-300 font-bold">EN COURS</span></p>
                <p className="text-base">livreur2.nom</p>
                <br/>

                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">commande1</b> <span
                    className="text-lg text-red-500 font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche.adresse</p>
                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">commande2</b> <span
                    className="text-lg text-red-500 font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche.adresse</p>
                <p>---------------------------------</p>
                <div
                    className="flex items-center justify-between"> {/* Utilisez justify-between pour aligner à droite */}
                    <div>
                        <p className="text-base">
                            - <b className="text-lg">commande3</b> <span className="text-lg text-green-300 font-bold">EN COURS</span>
                        </p>
                        <p className="text-sm"> commande.adresse</p>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Modifier
                    </button>
                </div>
                <p>---------------------------------</p>
                <div
                    className="flex items-center justify-between">
                    <div>
                        <p className="text-base">
                            - <b className="text-lg">commande4</b> <span className="text-lg text-green-300 font-bold">EN COURS</span>
                        </p>
                        <p className="text-sm"> commande.adresse</p>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Modifier
                    </button>
                </div>
                <p>---------------------------------</p>
                <div
                    className="flex items-center justify-between">
                    <div>
                        <p className="text-base">
                            - <b className="text-lg">commande5</b> <span className="text-lg text-green-300 font-bold">EN COURS</span>
                        </p>
                        <p className="text-sm"> commande.adresse</p>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Modifier
                    </button>
                </div>
                <p>---------------------------------</p>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image width={60} src="/plus.png" preview={false}
                       className='absolute -top-21 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5'/>

            </FormComponent >
        </div>
    )
}
