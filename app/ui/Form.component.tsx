import {Form} from "antd";

// @ts-ignore
export default function FormComponent({children, ...props}){
    return(
        <Form {...props}
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

            {children}
        </Form>
    )

}
