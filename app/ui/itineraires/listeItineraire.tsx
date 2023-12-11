'use client';
import ItineraireCard from "@/app/ui/itineraires/itineraireCard";

function ListeItineraires({itineraires}) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            {itineraires.map((itineraire) => (
                // eslint-disable-next-line react/jsx-key
                <ItineraireCard itineraire={itineraire}/>
            ))}
        </div>
    );
}

export default ListeItineraires;
