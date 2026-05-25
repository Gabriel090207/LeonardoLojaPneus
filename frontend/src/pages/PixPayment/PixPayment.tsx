import "./PixPayment.css";

import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";

import CustomToast from "../../components/CustomToast/CustomToast";

export default function PixPayment() {

  const location = useLocation();

  const pixData = location.state?.pixData;

  return (
    <div className="pix-payment">

      <div className="container">

        <div className="pix-payment__container">

          <div className="pix-payment__card">

            <div className="pix-payment__header">

              <span className="pix-payment__badge">
                Pagamento PIX
              </span>

              <h1>Aguardando pagamento</h1>

              <p>
                Finalize o pagamento utilizando o QR Code
                ou copie o código PIX abaixo.
              </p>

            </div>

            <div className="pix-payment__qr">

              <img
                src={pixData?.qr_code_base64}
                alt="QR Code PIX"
              />

            </div>

            <div className="pix-payment__copy">

              <textarea
                readOnly
                value={pixData?.pix_copy_paste || ""}
              />

              <button
                onClick={() => {

                  const text =
                    pixData?.pix_copy_paste || "";

                  const textarea =
                    document.createElement("textarea");

                  textarea.value = text;

                  document.body.appendChild(textarea);

                  textarea.select();

                  document.execCommand("copy");

                  document.body.removeChild(textarea);

                  toast.custom((t) => (
                    <CustomToast
                      type="success"
                      message="Código PIX copiado com sucesso"
                      t={t}
                    />
                  ));

                }}
              >
                Copiar código PIX
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}