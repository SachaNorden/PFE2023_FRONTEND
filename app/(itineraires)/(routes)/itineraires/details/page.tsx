import {Form, Input, Image} from 'antd';
import { Button } from '@/components/ui/button'; // Example path, adjust according to your structure
//rajouter un [id] dans la route

export default function Itineraires() {
    return (
        <div className='min-h-screen flex flex-col '>
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' ' />

            <p className="text-4xl flex flex-col justify-center items-center">Itineraire 2</p>
            <Form
                initialValues={{remember: true}}
                autoComplete="off"
                className='
                  p-8
                  border-2 border-gray-300
                  rounded-lg
                  shadow-xl
                  bg-white
                  relative
                  z-20'
            >
                <p className="text-base">- <b className="text-lg">itinéraire 1</b> : livreur1.nom <span
                    className="text-xl text-red-300 font-bold">DEPOT</span></p>
                <p className="text-sm"> creche1 - creche2 - creche3 - creche4</p>
                <p>---------------------------------</p>
                <p className="text-base">- <b className="text-lg">itinéraire 2</b> : livreur2.nom <span
                    className="text-xl text-green-300 font-bold">EN COURS</span></p>
                <p className="text-sm"> creche1 - creche2 - creche3 - creche4</p>
                <p>---------------------------------</p>
                <p className="text-base">- <b className="text-lg">itinéraire 3</b> : livreur3.nom <span
                    className="text-xl text-green-300 font-bold">EN COURS</span></p>
                <p className="text-sm"> creche1 - creche2 - creche3 - creche4</p>
                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">itinéraire 4</b> : livreur4.nom <span
                    className="text-xl font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche1 - creche2 - creche3 - creche4</p>
                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">itinéraire 5</b> : livreur5.nom <span
                    className="text-xl font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche1 - creche2 - creche3 - creche4</p>
                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">itinéraire 6</b> : livreur6.nom <span
                    className="text-xl font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche1 - creche2 - creche3 - creche4</p>
                <p>---------------------------------</p>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image width={60} src="/plus.png" preview={false} className='absolute -top-21 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5' />

            </Form>
        </div>
    )
}
