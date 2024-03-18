import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import '../styles/pages/create-republica.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import { FiPlus } from "react-icons/fi";




export default function CreateRepublica() {

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [previousImages, setPreviousImages] = useState<string[]>([]); 
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });

  }
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const SelectedImages = Array.from(event.target.files);

    setImages(SelectedImages);

    const SelectedImagesPreview = SelectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviousImages(SelectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('address', address);
    data.append('whatsapp', String(whatsapp));
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })
    await api.post('/republicas', data)
    history.push('/success')
  }


  return (
    <div id="page-create-republica">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-republica-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-19.8146624, -43.1849385]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 700 caracteres</span></label>
              <textarea
                id="name"
                maxLength={700}
                value={about}
                onChange={event => setAbout(event.target.value)}
                wrap="off" 
                 />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previousImages.map(image => {
                  return (
                    <img  key={image} src={image} alt={name}/>
                  )
                })}

              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Endereço</label>
              <input
                id="instructions"
                value={address}
                onChange={event => setAddress(event.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="number"
                id="whatsapp"
                value={whatsapp}
                onChange={event => setWhatsapp(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Tem vaga disponível?</label>

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

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
