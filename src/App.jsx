import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;


  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");

  async function fetchMovies(query = "") {
    setLoading(true);
    try {
      const response = await api.get(`/movies${query}`);
      setMovies(response.data);
    } catch (error) {
      alert("Erro ao buscar filmes");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMovieDetails(id) {
    const response = await api.get(`/movies/${id}`);
    setSelectedMovie(response.data);
  }

async function fetchMovies(customPage = page, customQuery = "") {
  setLoading(true);
  try {
    const response = await api.get(
      `/movies?pag=${customPage}&pag-size=${PAGE_SIZE}${customQuery}`
    );
    setMovies(response.data);
    setPage(customPage);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function applyFilters() {
  let query = "";

  if (genre) query += `&genre=${genre}`;
  if (rating) query += `&imdb_rating=${rating}`;
  if (year) query += `&released_year_gt=${year}`;

  fetchMovies(1, query);
}

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>Simon Filmes</h1>
              <section className="filters">
        <input
          placeholder="Gênero"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          placeholder="Nota mínima"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          placeholder="Ano mínimo"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={applyFilters}>Filtrar</button>
      </section>
      </header>



      {/* CONTEÚDO */}
      <main className="container">
        {loading && <p>Carregando...</p>}

        {!loading && movies.length === 0 && (
          <p>Nenhum filme encontrado</p>
        )}

        <div className="grid">
          {movies.map((movie, index) => (
            <div
            key={index}
            className="card"
            onClick={() => fetchMovieDetails(index + 1)}
          >
            <img src={movie.poster_link} alt={movie.series_title} />

            <h3>{movie.series_title}</h3>

            <p className="year">{movie.released_year}</p>

            <span className="genre">{movie.genre}</span>

            <div className="rating">
              ⭐ {movie.imdb_rating}
            </div>
          </div>
          ))}
        </div>
     

      {/* MODAL */}
{selectedMovie && (
  <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="close" onClick={() => setSelectedMovie(null)}>
        ✖
      </button>

      <h2>{selectedMovie.series_title}</h2>

      <p>
        <strong>Ano:</strong> {selectedMovie.released_year}
      </p>

      <p>
        <strong>Gênero:</strong> {selectedMovie.genre}
      </p>

      <p>
        <strong>Nota IMDb:</strong> ⭐ {selectedMovie.imdb_rating}
      </p>

      <p>
        <strong>Diretor:</strong> {selectedMovie.director}
      </p>

      <hr />

      <p>
        <strong>Sinopse:</strong><br />
        {selectedMovie.overview}
      </p>
    </div>
  </div>
)}


      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => fetchMovies(page - 1)}
        >
          Anterior
        </button>

        <span>Página {page}</span>

        <button
          onClick={() => fetchMovies(page + 1)}
        >
          Próxima
        </button>
      </div>
    </main>
      {/* FOOTER */}
      <footer>
        <p>© 2025 - Simon Filmes</p>
      </footer>
    </>
  );
}
