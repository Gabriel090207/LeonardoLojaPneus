import "./Terms.css";

export default function Terms() {
  return (
    <section className="terms-page">
      <div className="container">

        {/* HERO */}
        <div className="terms-page__hero">
          <span className="page__badge">Legal</span>

          <h1>
            Termos de <span className="text-red">uso</span>
          </h1>

          <p>
            Ao acessar e utilizar este site, você concorda com as condições
            descritas abaixo. Recomendamos a leitura completa antes de
            realizar qualquer compra.
          </p>
        </div>

        {/* CONTENT */}
        <div className="terms-page__content">

          <div className="terms-card">
            <span>1. Uso da plataforma</span>
            <h3>Condições gerais</h3>

            <p>
              O usuário se compromete a utilizar este site de forma adequada,
              respeitando a legislação vigente e não realizando ações que
              possam prejudicar o funcionamento da plataforma.
            </p>

            <p>
              É proibido o uso indevido das informações, tentativa de invasão,
              fraude ou qualquer atividade que comprometa a segurança do
              sistema.
            </p>
          </div>

          <div className="terms-card">
            <span>2. Cadastro</span>
            <h3>Responsabilidade do usuário</h3>

            <p>
              Para realizar compras, o usuário deve fornecer informações
              verdadeiras e atualizadas.
            </p>

            <p>
              O usuário é responsável por manter a confidencialidade de seus
              dados de acesso, não devendo compartilhá-los com terceiros.
            </p>
          </div>

          <div className="terms-card">
            <span>3. Produtos e serviços</span>
            <h3>Disponibilidade e informações</h3>

            <p>
              Os produtos e serviços oferecidos estão sujeitos à disponibilidade
              de estoque e podem ser alterados sem aviso prévio.
            </p>

            <p>
              Buscamos sempre fornecer informações precisas, porém não
              garantimos ausência total de erros tipográficos ou técnicos.
            </p>
          </div>

          <div className="terms-card">
            <span>4. Pagamentos</span>
            <h3>Processamento</h3>

            <p>
              Os pagamentos podem ser realizados por meio das opções disponíveis
              no site, como cartão, Pix ou boleto.
            </p>

            <p>
              A confirmação do pedido está condicionada à aprovação do pagamento.
            </p>
          </div>

          <div className="terms-card">
            <span>5. Entregas</span>
            <h3>Prazos e condições</h3>

            <p>
              Os prazos de entrega são estimados e podem variar conforme a
              localização e disponibilidade logística.
            </p>

            <p>
              A responsabilidade pela entrega é da empresa parceira de logística.
            </p>
          </div>

          <div className="terms-card">
            <span>6. Cancelamentos</span>
            <h3>Direito do consumidor</h3>

            <p>
              O cliente pode solicitar cancelamento conforme as políticas
              vigentes e dentro do prazo legal.
            </p>

            <p>
              Após o envio do produto, as regras de devolução passam a ser
              aplicadas.
            </p>
          </div>

          <div className="terms-card">
            <span>7. Limitação de responsabilidade</span>
            <h3>Isenção</h3>

            <p>
              Não nos responsabilizamos por danos indiretos decorrentes do uso
              da plataforma ou de falhas externas.
            </p>

            <p>
              Também não garantimos funcionamento ininterrupto do site.
            </p>
          </div>

          <div className="terms-card">
            <span>8. Alterações</span>
            <h3>Atualização dos termos</h3>

            <p>
              Estes termos podem ser alterados a qualquer momento sem aviso
              prévio.
            </p>

            <p>
              Recomendamos que o usuário revise esta página periodicamente.
            </p>
          </div>


       
        </div>
      </div>
    </section>
  );
}