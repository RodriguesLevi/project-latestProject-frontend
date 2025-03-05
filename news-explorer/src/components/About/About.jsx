// About.js
import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image"></div>
        <div className="about__content">
          <h2 className="about__title">Sobre o autor</h2>
          <p className="about__text">
            Este projeto foi desenvolvido como parte do curso de Desenvolvimento Web Full Stack da Practicum. O autor aprendeu React, Node.js, Express e MongoDB para criar uma aplicação web completa que permite aos usuários buscar e salvar notícias de seu interesse.
          </p>
          <p className="about__text">
            Durante o desenvolvimento, foram aplicados conceitos de design responsivo, organização de código, autenticação de usuários e chamadas de API, resultando em uma aplicação funcional e amigável.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;