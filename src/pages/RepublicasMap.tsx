import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebaseConfig";
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiUser, FiLogOut } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/pages/republicas-map.css';
import mapIcon from '../utils/mapIcon';
import LogoutButton from './Logout';

interface Republica {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  address: string;
  open_on_weekends: boolean;
  whatsapp: number;
}

function RepublicasMap() {
  const [republicas, setRepublicas] = useState<Republica[]>([]);
  const [search, setSearch] = useState('');
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const fetchRepublicas = async () => {
      try {
        const republicasRef = collection(db, "Republicas");
        const q = query(republicasRef);
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((docSnap) => {
          const republicaData = docSnap.data();
          return {
            id: docSnap.id,
            name: republicaData.name || "",
            about: republicaData.about || "",
            address: republicaData.address || "",
            latitude: republicaData.latitude || 0,
            longitude: republicaData.longitude || 0,
            open_on_weekends: republicaData.open_on_weekends || true,
            whatsapp: republicaData.whatsapp || 0
          };
        });

        setRepublicas(data);
      } catch (err) {
        console.error("Erro ao buscar repúblicas:", err);
      }
    };

    if (!loading) {
      fetchRepublicas();
    }
  }, [loading]);

  const handleSearch = async () => {
    try {
      if (!search.trim()) return;

      const q = query(collection(db, "Republicas"), where("name_lower", "==", search.toLowerCase()));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((docSnap) => {
        const republicaData = docSnap.data();
        return {
          id: docSnap.id,
          name: republicaData.name || "",
          about: republicaData.about || "",
          address: republicaData.address || "",
          latitude: republicaData.latitude || 0,
          longitude: republicaData.longitude || 0,
          open_on_weekends: republicaData.open_on_weekends || true,
          whatsapp: republicaData.whatsapp || 0
        };
      });

      setRepublicas(data);
    } catch (err) {
      console.error("Erro ao buscar república:", err);
    }
  };

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

      <MapContainer
        center={[-19.8146624, -43.1849385]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {republicas.map((republica) => (
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
        ))}
      </MapContainer>

      <div id="search">
        <input
          type="text"
          placeholder="nome da república"
          id="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" id="searchButton" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      <Link to="/republicas/create" className="create-republica">
        <FiPlus size={32} color="#FFF" />
      </Link>

      {!user ? (
        <Link to="/login" className="login">
          <FiUser size={32} color="#FFF" />
        </Link>
      ) : (
        <div className="logout-icon">
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default RepublicasMap;
