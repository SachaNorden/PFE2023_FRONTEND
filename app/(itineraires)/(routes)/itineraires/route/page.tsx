import FormComponent from "@/components/ui/Form.component";


export default function Route (routeDetails){
    return(
        <div className="items-center justify-center h-1/3">
        <div className="flex flex-col items-center justify-center h-1/2">
            <div className="text-lg font-bold">Ma route: {routeDetails.livreur}</div>
        </div>
            <FormComponent >
                <div>
                <div className="font-bold text-lg mb-4">Itinéraire {routeDetails.id}:</div>
                <p>Article totaux:</p>
                {/* Ici, tu listes les articles de l'itinéraire. */}
                {/* Tu devrais mapper sur un tableau d'articles pour les afficher. */}

                    <h2>Langes S:</h2>
                    <p>48</p>

                <button className="mt-4 bg-blue-500 text-white p-2 rounded">Sélectionner</button>

                </div>
            </FormComponent>

        </div>
    )
}
