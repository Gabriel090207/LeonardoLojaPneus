import "./Shipping.css";

export default function Shipping() {
  return (
    <section className="shipping-page">
      <div className="container">

        {/* HERO */}
        <div className="shipping-page__hero">
          <span className="page__badge">Entrega</span>

          <h1>
            Como funciona nossa <span className="text-red">entrega</span>
          </h1>

          <p>
            Entenda como realizamos o envio dos produtos, prazos e todas as
            etapas até o recebimento do seu pedido.
          </p>
        </div>

        {/* CONTENT */}
        <div className="shipping-page__content">

          <div className="shipping-card">
            <span>1. Processamento</span>
            <h3>Confirmação do pedido</h3>

            <p>
              Após a confirmação do pagamento, seu pedido entra em processo de
              separação e preparação para envio.
            </p>

            <p>
              Esse processo pode levar até 1 dia útil, dependendo da
              disponibilidade do produto.
            </p>
          </div>

          <div className="shipping-card">
            <span>2. Envio</span>
            <h3>Despacho do produto</h3>

            <p>
              Após a preparação, o pedido é enviado para transporte por nossos
              parceiros logísticos.
            </p>

            <p>
              Você receberá atualizações sobre o andamento da entrega sempre que
              houver mudanças no status.
            </p>
          </div>

          <div className="shipping-card">
            <span>3. Prazo</span>
            <h3>Tempo de entrega</h3>

            <p>
              O prazo varia conforme sua localização e será informado no momento
              da compra.
            </p>

            <p>
              Fatores externos como clima, logística ou alta demanda podem
              impactar esse prazo.
            </p>
          </div>

          <div className="shipping-card">
            <span>4. Recebimento</span>
            <h3>Entrega do pedido</h3>

            <p>
              É importante que haja alguém disponível no local para receber o
              pedido no endereço informado.
            </p>

            <p>
              Caso não haja ninguém, poderão ser feitas novas tentativas de
              entrega.
            </p>
          </div>

          <div className="shipping-card">
            <span>5. Rastreamento</span>
            <h3>Acompanhe seu pedido</h3>

            <p>
              Assim que o pedido for enviado, você poderá acompanhar o status
              diretamente pela sua conta.
            </p>

            <p>
              As atualizações são feitas conforme o avanço da entrega.
            </p>
          </div>

          <div className="shipping-card">
            <span>6. Problemas na entrega</span>
            <h3>Suporte</h3>

            <p>
              Caso ocorra algum problema com a entrega, nossa equipe está pronta
              para ajudar e resolver o mais rápido possível.
            </p>

            <p>
              Entre em contato com nosso suporte informando o número do pedido.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}