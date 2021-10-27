import React, { ChangeEvent, FormEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
// import { BrowserRouter, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MusicEl from "./typings/MusicEl";
import "./App.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

function App() {
  const [musicData, setMusicData] = useState<MusicEl[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMusic = async (query = "nirvana") => {
    console.log(query);
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      );
      if (resp.ok) {
        let { data } = await resp.json();
        let fetchedMusic: MusicEl[] = data;
        setMusicData(fetchedMusic);
        console.log(musicData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const triggerSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("working");
    fetchMusic(searchQuery);
  };

  // useEffect(() => {
  //   fetchMusic(searchQuery);
  // }, [searchQuery]);

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") triggerSearch(e);
            }}
          />
        </Search>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {musicData.map((musicEl, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>{musicEl.title}</Item>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* <SearchResults music={musicData}/> */}
        {/* <Route Path ='/details/:id' component={MusicDetails}> */}
      </header>
    </div>
  );
}

export default App;
