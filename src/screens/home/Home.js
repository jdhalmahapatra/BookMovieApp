import React, {Fragment, useState, useEffect} from 'react'
import Header from '../../common/header/Header';
import './Home.css'

import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { FormGroup, ImageListItem, ImageListItemBar } from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

//data import
import movieData from '../../localdata/movie.json'
import releasedMovieData from '../../localdata/releasemovie.json'

import {Link} from 'react-router-dom'

export const theme = createTheme({
    palette: {
      primary: {
          main: '#90caf9',
          light:'#90caf9'
      }
    },
});
const movieGenre =['Thirller', 'Drama', 'Romance', 'Action', 'Horror','Comedy', 'Political', 
                    'Social', 'Fantasy', 'Suspense', 'Sci-Fi', 'Adventure', 'Historical']

let allArtists = []

const handleChange =(e) => {
    debugger;
    console.log(e.target.value)
}

const Home = () => {
    const baseUrl = "/api/v1/";
    const [artists, setArtists] = useState([])
    useEffect(() => {
        debugger;
        fetch(baseUrl + '/artists' +'?limit=100', {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        .then((response) => response.json())
        .then((response) => {
            response.artists.map((item) => {
                setArtists(...artists, `${item.first_name} ${item.last_name}`)
            })
            
        })
    },[])

    return(
        <Fragment>
            <Header />
            <div className='upcoming-movie'>
                <h5>Upcoming Movies</h5>   
            </div>
            <div className='container'>
                {
                    movieData.map((item) => (
                        <UpComingGrid key= {item.id} data={item}/>
                    ))
                }
            </div>
            <div className='released-movie-container'>
                <ReleasedMovie data={artists}/>
            </div>
        </Fragment>
    );
}

//Grid Component
function UpComingGrid(props){
    return(
        <Link to={`/movie/${props.data.id}`}>
            <Grid container spacing={2}>
                    <Paper className='paper-container'>
                        <ImageListItem key={props.data.id}>
                            <img className='content-img' src={props.data.poster_url} alt={props.data.title}/>
                            <ImageListItemBar 
                                title={props.data.title}
                            />
                        </ImageListItem>
                    </Paper>
            </Grid>
        </Link>
    );
}

function ReleasedMovie(props){
    return(
            <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <div class="row" style={{marginTop:'4px'}}>
                        {
                            releasedMovieData.map((item) => (
                                <Link to={`/movie/${item.id}`}>
                                    <div class="column">
                                        <div class="card">
                                        <ImageListItem key={item.id}>
                                            <img className='release-content-img' src={item.poster_url} alt={item.title}/>
                                            <ImageListItemBar 
                                                title={item.title}
                                                subtitle={item.release_date}
                                            />
                                        </ImageListItem>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <FilterComponent data={props}/>
                    </Grid>
            </Grid>
        
    );
}

function FilterComponent(props){ 
    return(
        <Box sx={{ minWidth: 240, margin:'15px' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color={theme.palette.primary.light}>
          FIND MOVIES BY:
        </Typography>
        <TextField id="standard-basic" label="Movie Name" variant="standard" fullWidth/>
        <FormControl fullWidth>
            <InputLabel id="genres-label">Genres</InputLabel>
            <Select
                labelId="genres-label"
                id="genres-label-select"
                value={[]}
                label="Genres"
                multiple={true}
            >
                    <FormGroup>
                        {
                            movieGenre.map((item, index) => (
                                <MenuItem>
                                    <FormControlLabel control={<Checkbox  onChange={handleChange}/>} key={index} label={item} value={item} name='genre'/>
                                </MenuItem>
                            ))
                        }
                    </FormGroup>
            </Select>
        </FormControl>
            {
                allArtists.lenght !== 0
                ?
                <FormControl fullWidth>
                    <InputLabel id="genres-label">Artists</InputLabel>
                    <Select
                        labelId="genres-label"
                        id="genres-label-select"
                        value={[]}
                        label="artist"
                        multiple={true}
                    >
                            <FormGroup>
                                {
                                    allArtists.map((item, index) => (
                                        <MenuItem>
                                            <FormControlLabel control={<Checkbox  onChange={handleChange}/>} key={index} label={item} value={item} name='artists'/>
                                        </MenuItem>
                                    ))
                                }
                            </FormGroup>
                    </Select>
                </FormControl> 
                :
                <Box></Box>
            }
        <Box sx={{minWidth: 240}}>
            <FormControl>
                <TextField name="release-date"
                    label="Release Start Date"
                    InputLabelProps={{ shrink: true}}
                    type="date"
                    // onChange={this.handleSomeDateChange}
                    // value={values.someDate} 
                    sx={{marginTop:40}}
                    fullWidth
                />
            </FormControl>
        </Box>
        <Box>
        <FormControl>
            <TextField name="release-date"
                label="Release End Date"
                InputLabelProps={{ shrink: true}}
                type="date"
                // onChange={this.handleSomeDateChange}
                // value={values.someDate} 
                sx={{marginTop:40}}
                // fullWidth
            />
        </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="medium" variant='contained' sx={{marginLeft:'auto', marginRight:'auto'}}>SUBMIT</Button>
      </CardActions>
    </React.Fragment>
);

export default Home;

/**
 * 
    const [artists, setArtists] = useState([])
    useEffect(() => {
        debugger;
        fetch(baseUrl + '/artists' +'?limit=100', {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        .then((response) => response.json())
        .then((response) => {
            response.artists.map((item) => {
                setArtists(...artists, `${item.first_name} ${item.last_name}`)
            })
        })
    }, [])
    console.log(artists)
 */