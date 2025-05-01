import React, { FormEvent, useEffect, useState } from "react";
import { MapContainer , Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/pages/republica.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import { LeafletMouseEvent } from "leaflet";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

interface Republica {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  address: string;
  whatsapp: string;
  open_on_weekends: boolean;
}

export default function EditRepublica() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [republica, setRepublica] = useState<Republica | null>(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }
  function MapClickHandler({ onClick }: { onClick: (event: LeafletMouseEvent) => void }) {
    useMapEvents({
      click: onClick,
    });
  
    return null;
  }
  useEffect(() => {
    const fetchRepublica = async () => {
      try {
        if (!params.id) return;

        const republicaRef = doc(db, "Republicas", params.id);
        const docSnap = await getDoc(republicaRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRepublica({
            id: docSnap.id,
            name: data.name || "",
            about: data.about || "",
            address: data.address || "",
            latitude: data.latitude || 0,
            longitude: data.longitude || 0,
            open_on_weekends: data.open_on_weekends ?? false,
            whatsapp: data.whatsapp?.toString() || ""
          });

          setName(data.name || "");
          setAbout(data.about || "");
          setAddress(data.address || "");
          setWhatsapp(data.whatsapp?.toString() || "");
          setOpenOnWeekends(data.open_on_weekends ?? false);
          setPosition({
            latitude: data.latitude || 0,
            longitude: data.longitude || 0,
          });
        }
      } catch (err) {
        console.error("Erro ao buscar dados da república:", err);
      }
    };

    fetchRepublica();
  }, [params.id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!params.id) return;

    const { latitude, longitude } = position;

    try {
      const republicaRef = doc(db, "Republicas", params.id);

      await updateDoc(republicaRef, {
        name,
        about,
        address,
        latitude,
        longitude,
        open_on_weekends,
        whatsapp,
      });

      setMessage("República atualizada com sucesso!");
      navigate("/success");
    } catch (error) {
      console.error("Erro ao atualizar república:", error);
      setMessage("Erro ao atualizar república.");
    }
  }

  return (
    <div id="page-create-republica">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-republica-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer 
              center={[position.latitude || -19.8146624, position.longitude || -43.1849385]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <MapClickHandler onClick={handleMapClick} />
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </MapContainer >

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <input
                id="address"
                value={address}
                onChange={event => setAddress(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                id="whatsapp"
                value={whatsapp}
                onChange={event => setWhatsapp(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'disable' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          {message && <p className="form-message">{message}</p>}

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
