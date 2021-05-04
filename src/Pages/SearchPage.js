import React, { useState, useEffect } from "react";
import NoImage from "../images/no-image-available.png";
import APIUtility from "../utils/APIUtility";
import GameCard from "../Components/GameCard";
import Spinner from "../Components/Spinner";


const SearchPage = ({ gameTitle, gameGenre }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCoverSizeBig = (imageURL) => {
        //this function returns the big cover image url
        const regex = /thumb/;
        let originalImageURL = imageURL;
        let newImageURL = originalImageURL.replace(regex, "cover_big");
        return newImageURL;
    };

    useEffect(() => {
        async function fetchGames() {
            let apiUtil = new APIUtility();
            let response;
            
            if (gameTitle === 'bygenre') {
                response = await apiUtil.searchGameByGenre(gameGenre);
            } else if (gameGenre === 'all'){
                response = await apiUtil.searchGameByTitle(gameTitle);
            } else {
                response = await apiUtil.searchGameByTitleAndGenre(gameTitle, gameGenre);
            }
            console.log("Response", response);
            setGames(response);
            setLoading(false);
        }
        fetchGames();
    }, []);

    return (
        <>
            <h1>Search Results {gameTitle === 'bygenre' ? 'Genre:' : `${gameTitle}`} {gameGenre}</h1>
            <div className="grid">
                {games.map((game) => (
                    <GameCard
                        gameName={game.name}
                        imageUrl={getCoverSizeBig(game.cover ? game.cover.url : `${NoImage}`)}
                        gameRating={game.rating}
                        gameID={game.id}
                    />
                ))}
            </div>
            {loading && <Spinner />}
        </>
    );
};

export default SearchPage;