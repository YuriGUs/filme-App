import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./filme-info.css";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
          },
        })
        .then((res) => {
          setFilme(res.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilmes();
  }, [id, navigate]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("filmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Você já possui esse filme salvo.");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("filmes", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external noreferrer"
            href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
