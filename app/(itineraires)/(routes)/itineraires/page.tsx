import {Form, Input, Image} from 'antd';
import { Button } from '@/components/ui/button'; // Example path, adjust according to your structure


export default function Itineraires() {
    return (
        <div className='min-h-screen flex flex-col bg-orange-200 '>
            <p className="text-6xl flex flex-col justify-center items-center">itineraires</p>
            <Form
                initialValues={{ remember: true }}
                autoComplete="off"
                className='
                  p-8
                  border-2 border-gray-300
                  rounded-lg
                  shadow-xl
                  bg-white
                  relative
                  z-20'
            ></Form>
        </div>
    )
}
