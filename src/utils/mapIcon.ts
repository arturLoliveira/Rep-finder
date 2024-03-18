import mapMarkerImg from '../images/Local.svg';
import Leaflet from 'leaflet';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,  

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

export default mapIcon;
