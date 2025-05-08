import React, { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { FaWhatsapp } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import '../styles/pages/republica.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

interface Republica {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  address: string;
  whatsapp: string;
  open_on_weekends: boolean;
  role: string;
  images?: string[];
  views?: number;
}

export default function Republicas() {
  const params = useParams();
  const navigate = useNavigate();
  const [republica, setRepublica] = useState<Republica | null>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepublica = async () => {
      if (!params.id) return;

      try {
        const docRef = doc(db, "Republicas", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRepublica({
            id: docSnap.id,
            name: data.name || "",
            about: data.about || "",
            address: data.address || "",
            latitude: data.latitude || 0,
            longitude: data.longitude || 0,
            open_on_weekends: !!data.open_on_weekends,
            whatsapp: data.whatsapp?.toString() || "",
            role: data.role || "",
            images: data.images || [],
            views: data.views || 0
          });

          await updateDoc(docRef, {
            views: increment(1)
          });
        } else {
          console.error("República não encontrada");
        }
      } catch (err) {
        console.error("Erro ao buscar república:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepublica();
  }, [params.id]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserRole(data.role || null);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Republicas", id));
      console.log("República excluída com sucesso");
      navigate("/exclude");
    } catch (error) {
      console.error("Erro ao excluir a república:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  if (!republica) return <p>República não encontrada.</p>;

  return (
    <div className="republica-details-content">
      <div id="page-republica">
        <Sidebar />
        <main>
          <div className="republica-details">
            <div className="republica-details-content">

              {republica.images && republica.images.length > 0 ? (
                <div className="images">
                  {republica.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Imagem da república ${republica.name} - ${index + 1}`}
                      className="republica-image"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-images">Nenhuma imagem disponível.</p>
              )}

              <h1>{republica.name}</h1>
              <p>{republica.about}</p>
              <p>Visualizações: {republica.views}</p>
              <hr />

              <h2>Instruções para visita</h2>
              <p>{republica.address}</p>

              <div className="map-container">
                <MapContainer
                  center={[republica.latitude, republica.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker interactive={false} icon={mapIcon} position={[republica.latitude, republica.longitude]} />
                </MapContainer>
                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${republica.latitude},${republica.longitude}`}>
                    Ver rotas no Google Maps
                  </a>
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

              {userRole === "admin" && (
                <div className="edit-block">
                  <div className="edit-republica">
                    <Link to={`/republicasEdit/${republica.id}`}>
                      <span>EDITAR</span>
                    </Link>
                  </div>
                  <div className="exclude-republica">
                    <button onClick={() => handleDelete(republica.id)} className="button-exclude">
                      <span>EXCLUIR</span>
                    </button>
                  </div>
                  <p>Visualizações: {republica.views}</p>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
