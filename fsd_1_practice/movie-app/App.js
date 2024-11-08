import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Detail from "./components/Detail";
import "./App.css";

function App() {
    const [state, setState] = useState({
        s: "sherlock", // Default search query
        results: [],   // Store search results
        selected: {},  // Store selected movie for details
        loading: false, // Loading state
        error: "",     // Error message
    });

    const apiurl = "https://www.omdbapi.com/?apikey=a2526df0";

    // Function to handle input changes in the search bar
    const searchInput = (e) => {
        let s = e.target.value;
        setState((prevState) => ({
            ...prevState,
            s: s,
            results: [],  // Clear results while typing new search term
            error: "",    // Reset error when starting a new search
        }));
    };

    // Function to handle search when Enter is pressed
    const search = (e) => {
        if (e.key === "Enter") {
            setState((prevState) => ({
                ...prevState,
                loading: true, // Start loading when search begins
                error: "",     // Clear previous errors
            }));

            // API request to search for movies
            axios(apiurl + "&s=" + state.s).then(({ data }) => {
                if (data.Response === "True") {
                    setState((prevState) => ({
                        ...prevState,
                        results: data.Search,
                        loading: false,
                    }));
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        loading: false,
                        error: "No movies found. Please try a different search term.",
                    }));
                }
            }).catch((err) => {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    error: "Failed to fetch movies. Please try again later.",
                }));
                console.error("API request error: ", err); // Log error for debugging
            });
        }
    };

    // Fetch additional movie details when a movie is selected
    const openDetail = (id) => {
        setState((prevState) => ({
            ...prevState,
            loading: true, // Set loading while fetching movie details
        }));

        // API request to get movie details
        axios(apiurl + "&i=" + id).then(({ data }) => {
            setState((prevState) => ({
                ...prevState,
                selected: data,
                loading: false,
            }));
        }).catch((err) => {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                error: "Failed to fetch movie details.",
            }));
            console.error("API request error: ", err);
        });
    };

    // Close the movie details view
    const closeDetail = () => {
        setState((prevState) => ({
            ...prevState,
            selected: {}, // Reset selected movie
        }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Mania</h1>
            </header>

            <main>
                {/* Search bar component */}
                <Search searchInput={searchInput} search={search} />

                {/* Display error message if any */}
                {state.error && <p className="error-message">{state.error}</p>}

                {/* Loading indicator */}
                {state.loading && <p>Loading...</p>}

                {/* Movie list */}
                {!state.loading && !state.selected.Title && (
                    <MovieList
                        results={state.results}
                        openDetail={openDetail}
                    />
                )}

                {/* Movie details view */}
                {state.selected.Title && (
                    <Detail
                        selected={state.selected}
                        closeDetail={closeDetail}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
