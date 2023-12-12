'use client';
import ItineraireCard from "@/app/ui/itineraires/itineraireCard";

function ListeItineraires({itineraires, isAdmin}) {
    return (
        <div className='flex flex-col items-start'> {/* Adjust this line */}
            {itineraires.map((itineraire) => (
                <ItineraireCard key={itineraire.id} itineraire={itineraire} isAdmin={isAdmin} />
            ))}
        </div>
    );
}

export default ListeItineraires;
