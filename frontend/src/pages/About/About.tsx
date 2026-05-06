import "./About.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-page__hero">
          <span className="page__badge">Institucional</span>

          <h1>
            Sobre a <span className="text-red">Prime Pneus</span>
          </h1>

          <p>
            Uma empresa focada em oferecer pneus, serviços automotivos e
            atendimento especializado com segurança e qualidade.
          </p>
        </div>

        <div className="about-page__content">
          <div className="about-card about-card--large">
            <h2>Nossa história</h2>

            <p>
              A Prime Pneus nasceu com o propósito de simplificar a experiência
              de compra de pneus e serviços automotivos, oferecendo ao cliente
              um atendimento claro, rápido e confiável.
            </p>

            <p>
              Com o crescimento da demanda por soluções completas para veículos,
              expandimos nossa atuação para atender motoristas que buscam não
              apenas bons produtos, mas também orientação técnica, segurança na
              escolha e suporte antes e depois da compra.
            </p>

            <p>
              Hoje, nosso compromisso é unir variedade, qualidade e atendimento
              especializado em um só lugar, ajudando cada cliente a encontrar a
              melhor opção para sua necessidade.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <span>Missão</span>
              <h3>Entregar confiança</h3>
              <p>
                Oferecer pneus e serviços automotivos com qualidade,
                transparência e atendimento próximo, garantindo mais segurança
                para cada cliente.
              </p>
            </div>

            <div className="about-card">
              <span>Visão</span>
              <h3>Ser referência</h3>
              <p>
                Tornar-se uma marca reconhecida pela excelência no atendimento,
                pela variedade de produtos e pela confiança construída com os
                clientes.
              </p>
            </div>

            <div className="about-card">
              <span>Valores</span>
              <h3>Compromisso real</h3>
              <p>
                Trabalhamos com honestidade, responsabilidade, respeito ao
                cliente, qualidade nos produtos e cuidado em cada detalhe do
                atendimento.
              </p>
            </div>
          </div>

          <div className="about-card about-card--large">
            <h2>O que nos diferencia</h2>

            <div className="about-list">
              <div>
                <strong>Atendimento especializado</strong>
                <p>
                  Nossa equipe orienta o cliente na escolha ideal de acordo com
                  o veículo, uso e necessidade.
                </p>
              </div>

              <div>
                <strong>Produtos selecionados</strong>
                <p>
                  Trabalhamos com pneus e soluções automotivas pensadas para
                  oferecer segurança, durabilidade e desempenho.
                </p>
              </div>

              <div>
                <strong>Experiência completa</strong>
                <p>
                  Da escolha do produto ao suporte final, buscamos tornar todo o
                  processo mais simples, seguro e eficiente.
                </p>
              </div>

              <div>
                <strong>Compromisso com o cliente</strong>
                <p>
                  Nosso foco é construir relacionamento, não apenas realizar uma
                  venda.
                </p>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </section>
  );
}