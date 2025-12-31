SIMON FILMES — CATÁLOGO DE FILMES E SÉRIES


DESCRIÇÃO DO PROJETO

O Simon Filmes é uma aplicação Single Page Application (SPA) desenvolvida em React,
que funciona como um catálogo interativo de filmes, consumindo dados dinamicamente
a partir de uma API RESTful.

A aplicação permite:
- Listar filmes do catálogo
- Aplicar filtros diretamente no back-end
- Paginar resultados
- Visualizar detalhes de um filme em um modal (pop-up), sem mudança de página

Este projeto foi desenvolvido como entrega principal do semestre, simulando
um cenário real de desenvolvimento front-end com integração a API.


TECNOLOGIAS UTILIZADAS

Front-end:
- React (Vite)
- Axios
- CSS puro

Back-end (API):
- Node.js
- Express.js
- CORS
- Dataset em CSV (imdb_top_1000.csv)


ESTRUTURA DO PROJETO

minimundos/
    api/
     movies/
         imdb_top_1000.csv
         index.js
         package.json
         README.md
    
    src/
         App.jsx
         main.jsx
         api.js
         App.css
    index.html
    package.json
    README.txt


COMO EXECUTAR O PROJETO

PRÉ-REQUISITOS
- Node.js (versão 14 ou superior)
- npm


EXECUTANDO A API (BACK-END)

1) Acesse a pasta da API:
   cd api/movies

2) Instale as dependências:
   npm install

3) Inicie o servidor:
   npm start

A API ficará disponível em:
http://localhost:3000

Rotas para teste no navegador:
- http://localhost:3000/movies
- http://localhost:3000/movies/1


EXECUTANDO O FRONT-END

1) Volte para a raiz do projeto:
   cd ../../

2) Instale as dependências:
   npm install

3) Inicie a aplicação:
   npm run dev

A aplicação ficará disponível em:
http://localhost:5173


INTEGRAÇÃO COM A API

A aplicação consome uma API RESTful que carrega os dados a partir de um arquivo CSV
(imdb_top_1000.csv) em memória.

Endpoints utilizados:
- GET /movies        → Listagem de filmes
- GET /movies/:id    → Detalhes de um filme específico

Observação sobre o ID:
O endpoint /movies/:id utiliza um ID sequencial baseado na posição do filme no dataset
(1 a 1000). No front-end, esse ID é obtido a partir do índice do array retornado pela API.


FILTROS (BACK-END)

Todos os filtros são aplicados exclusivamente no back-end, por meio de parâmetros
de query na URL.

Filtros disponíveis:
- Gênero (genre)
- Nota IMDb (busca parcial no campo imdb_rating)
- Ano mínimo de lançamento (released_year_gt)

Exemplo de requisição:
GET /movies?genre=Drama&imdb_rating=8&released_year_gt=2000


PAGINAÇÃO

A paginação também é realizada no back-end, utilizando os parâmetros:
- pag       → número da página
- pag-size  → quantidade de itens por página

Na aplicação:
- São exibidos 12 filmes por página
- Controles de navegação: Anterior e Próxima

Exemplo:
GET /movies?pag=1&pag-size=12


MODAL DE DETALHES

Ao clicar em um filme do catálogo:
- A aplicação não muda de página
- Um modal (pop-up) é exibido sobre a tela
- O modal consome o endpoint GET /movies/:id

Informações exibidas no modal:
- Título
- Ano
- Gênero
- Nota IMDb
- Diretor
- Sinopse (overview)


LAYOUT

- Conteúdo centralizado
- Grid com 4 colunas
- Layout responsivo
- Feedback visual de carregamento
- Mensagem exibida quando nenhum filme é encontrado


REQUISITOS ATENDIDOS

- SPA (Single Page Application)
- React com Vite
- Consumo de API RESTful
- Filtros e paginação no back-end
- Modal de detalhes sem mudança de rota
- Integração com API fornecida pelo Minimundos
- Organização clara e funcional do projeto

