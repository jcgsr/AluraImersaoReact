// import styled from "styled-components";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons.js";

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

const ProfileSideBar = (props) => {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="foto github jovane"
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
};

export default function Home() {
  const githubUser = "jcgsr";
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "john-smilga",
    "suelenmachado",
    "williammago",
    "OliveiraClaudio",
    "bot50",
  ];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
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
