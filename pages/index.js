// import styled from "styled-components";
import { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import data from "../src/assets/data";

import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons.js";

const ProfileSideBar = (props) => {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="foto github jovane"
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a
          href={`https://github.com/${props.githubUser}.png`}
          className="boxLink"
        >
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

const ProfileRelationsBox = (props) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/*{seguidores.map((seguidor) => {
          return (
            <li key={seguidor}>
              <a href={`https://github.com/${seguidor}.png`}>
                <img src={seguidor.image} />
                <span>{seguidor.title}</span>
              </a>
            </li>
          );
        })}*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

export default function Home() {
  const githubUser = "jcgsr";
  const [comunidades, setComunidades] = useState(data);
  const comunidade6 = comunidades.slice(0, 6);
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "john-smilga",
    "rebecapastl",
    "suelenmachado",
    "williammago",
    "OliveiraClaudio",
    "bot50",
  ];

  // FETCH
  const [seguidores, setSeguidores] = useState([]);
  // USEEFFECT
  useEffect(() => {
    fetch("https://api.github.com/users/jcgsr/followers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSeguidores(data);
      });

    //API GRAPHIQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "d0883301e18c044dd1ee0181793512",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query{
  allCommunities {
    title
    id
    imageUrl
    creatorSlug
    url
  }
}
`,
      }),
    })
      .then((res) => res.json())
      .then((resCompleta) => {
        const comunidadesDato = resCompleta.data.allCommunities;
        setComunidades(comunidadesDato);
      });
  }, []);
  const pessoas = pessoasFavoritas.slice(0, 6);
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                const comunidade = {
                  // id: new Date().toISOString(),
                  title: dadosDoForm.get("title"),
                  image: dadosDoForm.get("image"),
                  url: dadosDoForm.get("url"),
                  creatorSlug: githubUser,
                };

                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (res) => {
                  const dados = await res.json();
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                });
              }}
            >
              <div>
                <input
                  type="text"
                  name="title"
                  aria-label="Nome de sua comunidade"
                  placeholder="Nome de sua comunidade"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  aria-label="URL para usar de capa"
                  placeholder="URL para usar de capa"
                />
              </div>{" "}
              <div>
                <input
                  type="text"
                  name="url"
                  aria-label="url"
                  placeholder="url"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length} )</h2>
            <ul>
              {comunidade6.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`${comunidade.url}`}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoas.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
