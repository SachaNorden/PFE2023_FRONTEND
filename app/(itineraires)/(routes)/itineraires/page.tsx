import {Form, Input, Image} from 'antd';
import { Button } from '@/components/ui/button'; // Example path, adjust according to your structure


export default function Itineraires() {
    return (
        <div className='min-h-screen flex flex-col '>
            <p className="text-6xl flex flex-col justify-center items-center">itineraires</p>
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
                <p>- <b>itinéraire 1</b> : livreur1.nom <p className="font-size:4px">DEPOT</p></p>
                <p>---------------------------------</p>
                <p>- <b>itinéraire 2</b> : livreur2.nom</p>
                <p>---------------------------------</p>
                <p>- <b>itinéraire 3</b> : livreur3.nom</p>
                <p>---------------------------------</p>
                <p>- <b>itinéraire 4</b> : livreur4.nom</p>
                <p>---------------------------------</p>
                <p>- <b>itinéraire 5</b> : livreur5.nom</p>
                <p>---------------------------------</p>
                <p>- <b>itinéraire 6</b> : livreur6.nom</p>
                <p>---------------------------------</p>
                <p>+</p>
            </Form>
        </div>
    )
}
