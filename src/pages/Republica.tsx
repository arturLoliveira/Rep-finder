import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/republica.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";


import { Link, useHistory, useParams } from "react-router-dom";

import api from "../services/api";

interface Republica {
  id:number
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  address: string;
  whatsapp: number
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface RepublicaParams {
  id: string;
}

export default function Republicas() {
  const params = useParams<RepublicaParams>();
  const [republica, setRepublica] = useState<Republica>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    api.get(`republicas/${params.id}`).then(res => {
      setRepublica(res.data);
    });
  }, [params.id]);

  if (!republica) {
    return <p>Carregando...</p>;
  }
  function handleDelete(){
    api.post(`republicasExclude/${params.id}`);
    history.push('/exclude');
 }


  return (
    <div className="republica-details-content">
      <div id="page-republica">
        <Sidebar />
        <main>
        <div className="republica-details">
          <img src={republica.images[activeImageIndex].url} alt={republica.name} />

          <div className="images">
            {republica.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => {
                  setActiveImageIndex(index);
                }}
                >
                  <img src={image.url} alt={republica.name} />
                </button>
              );
            })}
  
          </div>
          
            <div className="republica-details-content">
              <h1>{republica.name}</h1>
              <p>{republica.about}</p>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{republica.address}</p>

              <div className="map-container">
                <Map
                  center={[republica.latitude, republica.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
            
                  <Marker interactive={false} icon={mapIcon} position={[republica.latitude, republica.longitude]} />
                </Map>
                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${republica.latitude}, ${republica.longitude}`}>Ver rotas no Google Maps</a>
                </footer>

              </div>


              <div className="open-details">
                {republica.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Temos Vagas!
                  </div>
                ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não temos vagas!
                  </div>
                )}
              </div>

              <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?l=pt_BR&phone=${republica.whatsapp}`}>
                <button type="button" className="contact-button">
                  <FaWhatsapp size={20} color="#FFF" />
                  Entrar em contato
                </button>
              </a>
              <div className="edit-block">
              <div className="edit-republica">
                <Link to={`/republicasEdit/${republica.id}`}>
                  <span>EDITAR</span>
                </Link>
                </div>
                <div className="exclude-republica">
                <button onClick={handleDelete} className="button-exclude">
                  <span>EXCLUIR</span>
                </button>
                </div>
             
                
                </div>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}