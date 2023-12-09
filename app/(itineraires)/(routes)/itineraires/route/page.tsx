import FormComponent from "@/components/ui/Form.component";
import back from "@/public/arrow-left.svg";


export default function Route (routeDetails){
    return(
        <div className="items-center justify-center h-1/3">
            <br></br>
        <div className="w-full flex items-center justify-between px-4 py-4">
            <div className="flex-initial">
                {/* Remplace ce div par ton icône de flèche */}

            </div>
            {/* Titre "Ma route" centré */}
            <div className="flex-grow text-center text-lg font-bold">
                Ma route: {routeDetails.livreur}
            </div>
        </div>
            <FormComponent >
                <div>
                    <img src={back.src} alt="Back" className="w-6 h-6" />
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
