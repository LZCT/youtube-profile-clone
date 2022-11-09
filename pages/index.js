import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline, StyledTopArtist } from "../src/components/Timeline";



function HomePage() {
    const estilo = {/**/ };
    const [searchValue, setSearchValue] = React.useState();
    return (
        <>
        <CSSReset />
        <div style={estilo}>
            <Menu searchValue={searchValue} setSearchValue={setSearchValue}/>
            <Header banner={config.banner}/>
            <Timeline searchValue={searchValue} playlists={config.playlists} artists={config.topArtists}/>
        </div>
        </>
    )
}

export default HomePage


const StyledHeader = styled.div`
    .profile-photo{
        width:80px;
        height:80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        
    }
    .banner{
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: 100% 75%;

    }
`;

function Header(props) {
    return (
        <StyledHeader>
            <img className="banner" src={props.banner}/>
            <section className="user-info">
                <img className ="profile-photo" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>

            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    const topArtists = props.artists;
    return (
        <>
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                
                                if (searchValue){
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized);
                                }
                                else
                                    return titleNormalized;
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img className="video-thumb" src={video.thumb} />
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
        <StyledTopArtist>
            <section>
                <h2>Your Most-streamed Artists</h2>
                <div>
                {topArtists.map((artist) => {
                    return(
                        <a href={artist.url}>
                            <img className="artist-thumb"src={artist.thumb}/>
                            <span>
                                {artist.name}
                            </span>
                        </a>
                    )
                })}
                </div>
            </section>
        </StyledTopArtist>
        </>
    )
}


