import { getVenue, showVenue } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";

const credentials = {
    mapId: '659efcf1040fcba69696e7b6',
    key: '65a0422df128bbf7c7072349',
    secret: '5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4'
};

export async function initMap() {
    //Wait while the venue is downloaded.
    const venue = await getVenue(credentials);
    //Display the default map in the app div.
    const mapView = await showVenue(document.getElementById("app"), venue);
}