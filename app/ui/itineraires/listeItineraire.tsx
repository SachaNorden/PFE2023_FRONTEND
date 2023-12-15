'use client';
import ItineraireCard from "@/app/ui/itineraires/itineraireCard";

// @ts-ignore
function ListeItineraires({itineraires}) {
    return (
        <div>
            {itineraires.map((itineraire: any) => (
                // eslint-disable-next-line react/jsx-key
                <ItineraireCard itineraire={itineraire}/>
            ))}
        </div>
    );
}

export default ListeItineraires;
