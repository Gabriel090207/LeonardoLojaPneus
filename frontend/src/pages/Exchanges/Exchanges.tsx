import "./Exchanges.css";

export default function Exchanges() {
  return (
    <section className="exchanges-page">
      <div className="container">

        {/* HERO */}
        <div className="exchanges-page__hero">
          <span className="page__badge">Suporte</span>

          <h1>
            Trocas e <span className="text-red">devoluções</span>
          </h1>

          <p>
            Confira as condições para troca ou devolução de produtos adquiridos
            em nossa loja. Nosso objetivo é garantir uma experiência segura e
            transparente.
          </p>
        </div>

        {/* CONTENT */}
        <div className="exchanges-page__content">

          <div className="exchange-card">
            <span>1. Prazo</span>
            <h3>Direito de arrependimento</h3>

            <p>
              O cliente pode solicitar a devolução do produto em até 7 dias
              corridos após o recebimento, conforme o Código de Defesa do
              Consumidor.
            </p>

            <p>
              Após esse período, a solicitação será analisada conforme as
              condições de garantia.
            </p>
          </div>

          <div className="exchange-card">
            <span>2. Condições</span>
            <h3>Requisitos para troca</h3>

            <p>
              O produto deve estar sem sinais de uso, com embalagem original e
              acompanhado de todos os acessórios e nota fiscal.
            </p>

            <p>
              Produtos com desgaste ou instalação não poderão ser trocados,
              salvo em caso de defeito de fabricação.
            </p>
          </div>

          <div className="exchange-card">
            <span>3. Defeitos</span>
            <h3>Garantia</h3>

            <p>
              Em caso de defeito, o produto será analisado para verificação e,
              se confirmado, poderá ser substituído ou reembolsado.
            </p>

            <p>
              O prazo de análise pode variar conforme o fabricante.
            </p>
          </div>

          <div className="exchange-card">
            <span>4. Reembolso</span>
            <h3>Formas de devolução</h3>

            <p>
              O reembolso será realizado conforme o método de pagamento
              utilizado na compra.
            </p>

            <p>
              Para pagamentos via cartão, o prazo depende da operadora. Para Pix,
              o valor pode ser devolvido em até poucos dias úteis.
            </p>
          </div>

          <div className="exchange-card">
            <span>5. Frete</span>
            <h3>Custos de envio</h3>

            <p>
              Em casos de defeito ou erro no pedido, o custo do frete será de
              responsabilidade da loja.
            </p>

            <p>
              Para devoluções por arrependimento, o frete pode ser de
              responsabilidade do cliente.
            </p>
          </div>

          <div className="exchange-card">
            <span>6. Processo</span>
            <h3>Como solicitar</h3>

            <p>
              Para iniciar uma solicitação, entre em contato com nosso suporte
              informando o número do pedido e o motivo da troca ou devolução.
            </p>

            <p>
              Nossa equipe irá orientar todo o processo até a finalização.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}