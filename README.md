# News Explorer


## Visão Geral

News Explorer é uma aplicação web responsiva que permite aos usuários pesquisar notícias de várias fontes usando a News API. Os usuários podem pesquisar por palavras-chave, visualizar os resultados e salvar artigos em suas contas.

O projeto foi desenvolvido como parte do programa de desenvolvedor web da TripleTen, aplicando conceitos de React, trabalho com APIs externas e gerenciamento de estado.

## Funcionalidades

- **Pesquisa de notícias**: Pesquise notícias recentes por palavras-chave
- **Visualização de resultados**: Exibe artigos relevantes com imagens, títulos e descrições
- **Autenticação de usuários**: Registro e login de usuários
- **Salvar artigos**: Permite que usuários logados salvem artigos favoritos
- **Exibir artigos salvos**: Visualize artigos salvos em uma página dedicada
- **Design responsivo**: Interface adaptável para desktop, tablet e dispositivos móveis

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface
- **React Router**: Navegação entre páginas
- **HTML5 & CSS3**: Markup e estilização
- **News API**: API para pesquisa de notícias
- **LocalStorage**: Armazenamento local de dados (versão atual)
- **JWT**: Autenticação via tokens (preparado para integração com back-end)

## Instalação e Execução

1. Clone o repositório:
2. Navegue até o diretório do projeto:
3. Instale as dependências:
4. Crie um arquivo `.env` na raiz do projeto e adicione sua chave da News API:
5. Inicie o servidor de desenvolvimento:
6. Abra [http://localhost:5173](http://localhost:5173) no seu navegador para ver a aplicação.

## API

Este projeto utiliza duas APIs:

1. **News API**: Para buscar notícias. Documentação disponível em [https://newsapi.org/docs](https://newsapi.org/docs)

2. **News Explorer API**: (Em desenvolvimento) Uma API personalizada para autenticação de usuários e salvamento de artigos.

## Implantação

A aplicação está implantada em [https://seu-dominio.com](https://seu-dominio.com)

## Próximos Passos

- Integração com back-end para persistência de dados
- Implementação de busca avançada com mais filtros
- Adição de funcionalidade de compartilhamento de artigos
- Melhorias de acessibilidade

## Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um pull request ou abrir uma issue.

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adicionar MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Autor

Alisson - [meu e-mail](rodrigues101112@gmail.com)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE.md para detalhes.

## Agradecimentos

- [TripleTen](https://tripleten.com) pelo programa educacional
- [News API](https://newsapi.org) por fornecer acesso à API de notícias
- Todos os revisores e mentores que contribuíram com feedback