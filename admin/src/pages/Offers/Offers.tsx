import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import OfferModal from "../../components/OfferModal/OfferModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./Offers.css";

import { db } from "../../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Offers() {

  const [offers, setOffers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<any | null>(null);

  // 🔥 carregar ofertas
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "offers"));

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOffers(data);
      } catch (error) {
        console.error("Erro ao carregar ofertas:", error);
      }
    };

    loadOffers();
  }, []);

  // 🔥 salvar oferta
  const handleSave = async (offer: any) => {
    try {
      const docRef = await addDoc(collection(db, "offers"), offer);

      setOffers((prev) => [
        ...prev,
        { id: docRef.id, ...offer }
      ]);

      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar oferta:", error);
    }
  };

  // 🔥 deletar oferta
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "offers", id));

      setOffers((prev) =>
        prev.filter((o) => o.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <AdminLayout>

      <div className="offers">

        {/* HEADER */}
        <div className="offersHeader">
          <h2>Ofertas</h2>

          <button
            className="offersBtnNew"
            onClick={() => setShowModal(true)}
          >
            + Nova Oferta
          </button>
        </div>

        {/* TABELA */}
        <div className="offersTableWrapper">
          <table className="offersTable">

            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço Antigo</th>
                <th>Preço Novo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {offers.length === 0 ? (
                <tr className="offersEmptyRow">
                  <td colSpan={4}>
                    <div className="offersEmptyWrapper">
                      Nenhuma oferta criada
                    </div>
                  </td>
                </tr>
              ) : (
                offers.map((offer) => (
                  <tr key={offer.id}>

                    <td>{offer.name}</td>

                    <td>
                      {Number(offer.oldPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </td>

                    <td>
                      {Number(offer.newPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </td>

                    <td className="offersActions">
                      <button
                        className="btnDelete"
                        onClick={() => {
                          setOfferToDelete(offer);
                          setShowDelete(true);
                        }}
                      >
                        Excluir
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>

      {/* MODAL CRIAR */}
      {showModal && (
        <OfferModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {/* MODAL DELETE */}
      {showDelete && (
        <DeleteModal
  type="oferta"
  onClose={() => {
    setShowDelete(false);
    setOfferToDelete(null);
  }}
  onConfirm={() => {
    handleDelete(offerToDelete.id);
    setShowDelete(false);
    setOfferToDelete(null);
  }}
/>
      )}

    </AdminLayout>
  );
}