import { Grid, Typography } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react'
import Header from '../../common/header/Header';
import './Details.css'

const Details = (props) => {
    const movieId = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1)

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
                genres:response.genres,
                duration:response.duration.toString(),
                release_date:response.release_date,
                rating:response.rating,
                plot:response.storyline,
                trailerUrl:response.trailer_url,
                artists: response.artists,
                posterUrl: response.poster_url
            })
        })
    }, [])
    console.log(movieDetails)

    return (
        <Fragment style={{height:'100%'}}>
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

                </div>
                <div className='right-part-page'>

                </div>
            </div>
        </Fragment>
    );
}
export default Details;