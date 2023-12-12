import FormComponent from "@/app/ui/Form.component";


export default function Commandes() {
    return (
        <div>
            <FormComponent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">commande 1 :</span>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">finie</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">commande 2 :</span>
                        <button className="text-blue-700 hover:text-blue-900 text-xs font-semibold">détails</button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">commande 3 :</span>
                        <button className="text-blue-700 hover:text-blue-900 text-xs font-semibold">détails</button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">commande 4 :</span>
                        <button className="text-blue-700 hover:text-blue-900 text-xs font-semibold">détails</button>
                    </div>
                </div>
            </FormComponent>
        </div>
    )
}
