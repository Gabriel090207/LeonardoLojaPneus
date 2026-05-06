 import "./DeleteModal.css";

export default function DeleteModal({ onClose, onConfirm, type }: any) {
  return (
    <div className="deleteOverlay">

      <div className="deleteModal">

        <h3>Excluir {type}</h3>

        <p>
          Tem certeza que deseja excluir {type === "oferta" ? "esta oferta" : "este produto"}?
        </p>

        <div className="deleteActions">
          <button onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btnDeleteConfirm"
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>

      </div>

    </div>
  );
}