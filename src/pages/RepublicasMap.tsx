import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiUser, FiLogOut } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import 'leaflet/dist/leaflet.css';
import axios from 'axios';


import '../styles/pages/republicas-map.css';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';
import LogoutButton from './Logout';
import Login from './Login';

interface Republica {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}
interface SearchResponse {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    image: string;
    description: string;
    address: string;
    whatsapp: string;
}




function RepublicasMap() {

    const [republicas, setRepublicas] = useState<Republica[]>([]);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<SearchResponse[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        api.get('republicas').then(res => {
            setRepublicas(res.data);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);
    const handleSearch = async () => {

        const response = await axios.get<SearchResponse[]>(`http://localhost:3333/find?search=${search}`);

        setResults(response.data);
        console.log(response.data);
    };






    const dataToDisplay = search.length > 0 ? results : republicas;
    return (
        <div id="page-map">
            <aside>
                <header>

                    <h2>Escolha uma república no mapa</h2>
                    <p>Venha viver os melhores anos da sua vida</p>
                </header>

                <footer>
                    <strong>João Monlevade</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map
                center={[-19.8146624, -43.1849385]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {dataToDisplay.map(republica => {
                    return (
                        <Marker
                            key={republica.id}
                            icon={mapIcon}
                            position={[republica.latitude, republica.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {republica.name}
                                <Link to={`/republicas/${republica.id}`}>


                                    <FiArrowRight size={20} color="black" />
                                </Link>

                            </Popup>

                        </Marker>

                    )

                })}
            </Map>

            <div>

            </div>
            {!isAuthenticated && <Link to="login" className="login">
                <FiUser size={32} color='#FFF' />
            </Link>}

            <div id='search'>
                <input type="text" placeholder=' nome da república' id='searchInput' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="button" id='searchButton' onClick={handleSearch}>Buscar</button>
            </div>


            <Link to="/republicas/create" className="create-republica">
                <FiPlus size={32} color='#FFF' />
            </Link>
            {isAuthenticated && <LogoutButton />}

        </div>
    );


}


export default RepublicasMap;