import "./Privacy.css";

export default function Privacy() {
  return (
    <section className="privacy-page">
      <div className="container">

        {/* HERO */}
        <div className="privacy-page__hero">
          <span className="page__badge">Legal</span>

          <h1>
            Política de <span className="text-red">privacidade</span>
          </h1>

          <p>
            Esta política descreve como coletamos, utilizamos e protegemos seus
            dados ao utilizar nosso site e serviços.
          </p>
        </div>

        {/* CONTENT */}
        <div className="privacy-page__content">

          <div className="privacy-card">
            <span>1. Coleta de dados</span>
            <h3>Informações coletadas</h3>

            <p>
              Coletamos informações fornecidas pelo usuário durante o cadastro,
              como nome, email, telefone, endereço e dados necessários para
              processamento de pedidos.
            </p>

            <p>
              Também podemos coletar dados automaticamente, como endereço IP,
              navegador utilizado e comportamento de navegação.
            </p>
          </div>

          <div className="privacy-card">
            <span>2. Uso das informações</span>
            <h3>Finalidade</h3>

            <p>
              Utilizamos seus dados para processar pedidos, melhorar sua
              experiência, personalizar conteúdos e oferecer suporte ao cliente.
            </p>

            <p>
              Também podemos utilizar informações para comunicação, como envio
              de atualizações sobre pedidos e promoções (quando autorizado).
            </p>
          </div>

          <div className="privacy-card">
            <span>3. Compartilhamento</span>
            <h3>Terceiros</h3>

            <p>
              Seus dados podem ser compartilhados com parceiros responsáveis
              por pagamento, logística e serviços essenciais ao funcionamento
              da plataforma.
            </p>

            <p>
              Não comercializamos dados pessoais com terceiros.
            </p>
          </div>

          <div className="privacy-card">
            <span>4. Armazenamento</span>
            <h3>Segurança</h3>

            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus
              dados contra acessos não autorizados, perda ou alteração.
            </p>

            <p>
              As informações são armazenadas em ambientes seguros e com acesso
              restrito.
            </p>
          </div>

          <div className="privacy-card">
            <span>5. Cookies</span>
            <h3>Uso de cookies</h3>

            <p>
              Utilizamos cookies para melhorar a navegação, lembrar preferências
              e analisar o uso do site.
            </p>

            <p>
              O usuário pode gerenciar ou desativar cookies diretamente no
              navegador.
            </p>
          </div>

          <div className="privacy-card">
            <span>6. Direitos do usuário</span>
            <h3>Controle dos dados</h3>

            <p>
              O usuário pode solicitar acesso, correção ou exclusão de seus
              dados pessoais a qualquer momento.
            </p>

            <p>
              Também é possível revogar consentimentos previamente concedidos.
            </p>
          </div>

          <div className="privacy-card">
            <span>7. Retenção</span>
            <h3>Tempo de armazenamento</h3>

            <p>
              Os dados são mantidos apenas pelo tempo necessário para cumprir
              as finalidades descritas ou exigências legais.
            </p>
          </div>

          <div className="privacy-card">
            <span>8. Alterações</span>
            <h3>Atualizações da política</h3>

            <p>
              Esta política pode ser atualizada periodicamente. Recomendamos
              revisá-la com frequência.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}