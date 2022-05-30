import React, { Fragment, useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Home.css";

import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { FormGroup, ImageListItem, ImageListItemBar } from "@mui/material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import moviePlaceHolder from "../../assets/movie_place_holder.svg";

//data import
import movieData from "../../localdata/movie.json";
import releasedMovieData from "../../localdata/releasemovie.json";

import { Link } from "react-router-dom";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
      light: "#90caf9",
    },
  },
});
const movieGenre = [
  "Thirller",
  "Drama",
  "Romance",
  "Action",
  "Horror",
  "Comedy",
  "Political",
  "Social",
  "Fantasy",
  "Suspense",
  "Sci-Fi",
  "Adventure",
  "Historical",
];

let allArtists = null;

const handleChange = (e) => {
  debugger;
  console.log(e.target.value);
};

const Home = () => {
  let upcomingMovies = [];
  const baseUrl = "/api/v1/";
  const [getArtist, setArtists] = useState(null);
  const [getMovies, setAllMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //     fetch(baseUrl + '/artists' +'?limit=100', {
  //         method:'GET',
  //         headers: {
  //             "Content-Type": "application/json",
  //             "Cache-Control": "no-cache",
  //         }
  //     })
  //     .then((response) => response.json())
  //     .then((response) => {
  //         response.artists.map((item) => {
  //             setArtists(...artists, `${item.first_name} ${item.last_name}`)
  //         })

  //     })
  // },[])

  useEffect(() => {
    const getMoviesAndArtistsList = async () => {
      try {
        // const response = await fetch (baseUrl + 'movies/?page=1&limit=20',{
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Cache-Control':'no-cache'
        //     }
        // })

        // if(!response.ok){
        //     const message = `An error occured : ${response.status}`
        //     throw new Error(message)
        // }

        // let actualMovieData = await movieResponse.json()
        // console.log(actualData)
        // setAllMovies(actualMovieData)
        // setError(null)
        const [movieResponse, artistResponse] = await Promise.all([
          fetch(baseUrl + "movies/?page=1&limit=20", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          }),
          fetch(baseUrl + "/artists" + "?limit=100", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          }),
        ]);
        // debugger;
        // if(!movieResponse.ok){
        //     const message = `An error occured : ${movieResponse.status}`
        //     throw new Error(message)
        // }
        // if(!artistResponse.ok){
        //     const message = `An error occured : ${artistResponse.status}`
        //     throw new Error(message)
        // }
        let actualMovieData = await movieResponse.json();
        let actualArtistData = await artistResponse.json();
        setAllMovies(actualMovieData);
        setArtists(actualArtistData);
        setError(null);
      } catch (err) {
        debugger;
        setError(err.message);
        setAllMovies(null);
        setArtists(null);
      } finally {
        setLoading(false);
      }
    };
    getMoviesAndArtistsList();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="upcoming-movie">
        <h5>Upcoming Movies</h5>
      </div>
      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
      <div className="container">
        {getMovies !== null ? (
          getMovies.movies
            .filter((element) => element.status === "PUBLISHED")
            .map((item) => <UpComingGrid key={item.id} data={item} />)
        ) : (
          <div></div>
        )}
      </div>
      <div className="released-movie-container">
        {getMovies !== null && getArtist != null ? (
          <ReleasedMovie
            data={getArtist.artists}
            releasedMovies={getMovies.movies.filter(
              (element) => element.status === "RELEASED"
            )}
          />
        ) : (
          <div></div>
        )}
      </div>
    </Fragment>
  );
};

//Grid Component
function UpComingGrid(props) {
  const setDefaultSrc = (e) => {
    e.target.src = moviePlaceHolder;
  };
  return (
    <Link to={`/movie/${props.data.id}`}>
      <Grid container spacing={2}>
        <Paper className="paper-container">
          <ImageListItem key={props.data.id}>
            <img
              className="content-img"
              onError={setDefaultSrc}
              src={props.data.poster_url}
              alt={props.data.title}
            />
            <ImageListItemBar title={props.data.title} />
          </ImageListItem>
        </Paper>
      </Grid>
    </Link>
  );
}

function ReleasedMovie(props) {
  const setDefaultSrc = (e) => {
    e.target.src = moviePlaceHolder;
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <div class="row" style={{ marginTop: "4px" }}>
          {props.releasedMovies.map((item) => (
            <Link to={`/movie/${item.id}`}>
              <div class="column">
                <div class="card">
                  <ImageListItem key={item.id}>
                    <img
                      className="release-content-img"
                      onError={setDefaultSrc}
                      src={item.poster_url}
                      alt={item.title}
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.release_date}
                    />
                  </ImageListItem>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Grid>
      <Grid item xs={3}>
        <FilterComponent data={props.data} />
      </Grid>
    </Grid>
  );
}

function FilterComponent(props) {
  allArtists = props.data;
  return (
    <Box sx={{ minWidth: 240, margin: "15px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color={theme.palette.primary.light}>
            FIND MOVIES BY:
          </Typography>
          <TextField
            id="standard-basic"
            label="Movie Name"
            variant="standard"
            fullWidth
          />
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
                {movieGenre.map((item, index) => (
                  <MenuItem>
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} />}
                      key={index}
                      label={item}
                      value={item}
                      name="genre"
                    />
                  </MenuItem>
                ))}
              </FormGroup>
            </Select>
          </FormControl>
          
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
                  {allArtists.length != 0 ?  allArtists.map((item, index) => (
                    <MenuItem>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChange} />}
                        key={index}
                        label={item}
                        value={item}
                        name="artists"
                      />
                    </MenuItem>
                  )): <div></div>}
                </FormGroup>
              </Select>
            </FormControl>
          
          <Box sx={{ minWidth: 240 }}>
            <FormControl>
              <TextField
                name="release-date"
                label="Release Start Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                // onChange={this.handleSomeDateChange}
                // value={values.someDate}
                sx={{ marginTop: 40 }}
                fullWidth
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <TextField
                name="release-date"
                label="Release End Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                // onChange={this.handleSomeDateChange}
                // value={values.someDate}
                sx={{ marginTop: 40 }}
                // fullWidth
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
          >
            SUBMIT
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Home;

/**
 *
 */
