import React from "react"
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/components";
import { StyledTimeline } from "../src/components/Timeline";
import Search, {StyledSearch} from "../src/components/Menu/components/Search"
import { ThemeProvider } from "styled-components";
 


function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");


  return (
    <>
      <div>
        <Menu valorDoFiltro={valorDoFiltro} 
        setValorDoFiltro={setValorDoFiltro}/>
        <Header></Header>
        <Timeline searchValue={valorDoFiltro}
        playlist={config.playlists} />
        </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({theme}) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
      background-image: url(${config.bg});
      width: 100%;
      height: 230px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
`


function Header() {
  return (
    <StyledHeader>
        <StyledBanner/>
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({searchValue,...props}) {
  const playlistNames = Object.keys(props.playlist);

  return (
        <StyledTimeline>
            {playlistNames.map((playlistsName) => {
                const videos = props.playlist[playlistsName];
                return (
                    <section>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos.filter((video) => {
                              const titleNormalized = video.title.toLowerCase(); 
                              const searchValueNormalized = searchValue.toLowerCase();
                              return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a href={video.url} target="_blankZ">
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

