import { Grid, Typography } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react'
import Header from '../../common/header/Header';
import YouTube from 'react-youtube';
import './Details.css'
import { ImageListItem, ImageListItemBar,Rating } from '@mui/material';
//import { FavoriteBorderOutlined, StarBorderOutlined } from '@material-ui/icons';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { yellow } from '@material-ui/core/colors';

const Details = (props) => {
    const movieId = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1)
    const [ratingValue, setRatingValue] = React.useState(0);
    let movieGenre = ''
    const [movieDetails, setMovieDetails] = useState({
        title:'',
        genres:[],
        duration:'',
        release_date:'',
        rating:'',
        plot:'',
        trailerUrl:'',
        artists:[],
        posterUrl:''
    })

    useEffect(() => {
        fetch(props.baseUrl + 'movies/' + movieId, {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        .then((response) => response.json())
        .then((response) => { 
            setMovieDetails(...movieDetails, {
                title:response.title,
                genres:response.genres !== null? response.genres : [],
                duration:response.duration.toString(),
                release_date:response.release_date,
                rating:response.rating,
                plot:response.storyline,
                trailerUrl:response.trailer_url,
                artists: response.artists !== null? response.artists : [],
                posterUrl: response.poster_url
            })
        })
    }, [])
    debugger;
    console.log(movieDetails)

    const opts = {
        height: '350',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: yellow,
        },
        '& .MuiRating-iconHover': {
          color: yellow,
        },
      });

    return (
        <Fragment>
            <Header/>
            <div className='back-to-home'>
                <a href='/' className='back-to-home-anchor'><Typography variant="h6" sx={{color:'#000', height:'24px', cursor:'pointer'}}>
                    {'< Back to Home'}
                </Typography></a>
            </div>
            <div className='main-details-container'>
                <div className='left-part-page'>
                    <div className='movie-image'>
                        <img className='movie-details-img-property' src={movieDetails.posterUrl} alt={movieDetails.title}/>
                    </div>
                </div>
                <div className='center-part-page'>
                    <Typography variant="h2" className='title-text'>
                        {movieDetails.title}
                    </Typography>
                    <Typography variant="subtitle1" className='genre-text'>
                        {
                            movieDetails.genres.forEach((element, index) => {
                                index === movieDetails.genres.length -1
                                ?
                                movieGenre = movieGenre + element
                                :
                                movieGenre = movieGenre + element + ', '
                            })
                        }
                        <b>Genre: </b> {movieGenre}
                    </Typography>
                    <Typography variant="subtitle1" className='duration-text'>
                        <b>Duration: </b>{movieDetails.duration}
                    </Typography>
                    <Typography variant="subtitle1" className='m-detail-text'>
                        <b>Release Date: </b>{movieDetails.release_date}
                    </Typography>
                    <Typography variant="subtitle1" className='m-detail-text'>
                        <b>Rating: </b>{movieDetails.rating}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1" className='m-detail-text'>
                        <b>Plot: </b>{movieDetails.plot}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1" className='m-detail-text'>
                        <b>Trailer:</b>
                    </Typography>
                    <div className='youtube-player-container'>
                        <YouTube videoId={movieDetails.trailerUrl.substring(movieDetails.trailerUrl.indexOf('v=') + 2)} opts={opts} />
                    </div>
                </div>
                <div className='right-part-page'>
                    <div className='right-part-page-container'>
                        <Typography variant="subtitle1" className='m-detail-text'>
                            <b>Rate this movie:</b>
                        </Typography>
                        <StyledRating
                            name="customized-color"
                            defaultValue={ratingValue}
                            getLabelText={(value) => `${ratingValue} Heart${ratingValue !== 1 ? 's' : ''}`}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                            icon={<StarBorderIcon fontSize="inherit" color='black'/>}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                        <Typography variant="subtitle1" mt={4} mb={4}>
                            Artists:
                        </Typography>
                        <Grid container spacing={2}>
                            {
                                movieDetails.artists.length > 0 ? 
                                movieDetails.artists.map((artist) =>(
                                    <Grid item xs={6}>
                                        <ImageListItem className='artist-profile-pic' key={artist.id}>
                                            <img src={artist.profile_url} alt={artist.first_name}/>
                                            <ImageListItemBar title={`${artist.first_name} ${artist.last_name}`}/>
                                        </ImageListItem>
                                    </Grid>
                                ))
                                :''
                            }
                        </Grid>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Details;