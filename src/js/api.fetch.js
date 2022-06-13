import renderCard from "../templates/card.hbs";
import { refs } from "./refs.js";


const LOCALSTORAGE_KEY = "current-film";

export default class FetchMovie {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.URL = 'https://api.themoviedb.org/3/';
        this.key = '0eaaf2516690b5ff52877c678f040000';
    };

    get pageNum() {
        return this.page;
    };

    set pageNum(newPage) {
        this.page = newPage;
    };

    // Получение фильмов
    async fetchFilms() {
        try {
            const searchFilms = await fetch(
                `${this.URL}search/movie?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`);
            return (await searchFilms.json());
        } catch (error) {
            error;
        }
    }

    // Получение жанров
    async fetchGenres() {
        try {
            const searchGenres = await fetch(`${this.URL}genre/movie/list?api_ley=${this.key}&language=en-US`);
            return (await searchGenres.json());
        } catch (error) {
            error;
        }
    }

    // Получение популярных фильмов

    async fetchPopularFilms() {
        try {
            const searchFilms = await fetch(`${this.URL}movie/popular?api_key=${this.key}&language=en-US&page=${this.page}`);
            return (await searchFilms.json());
        } catch (error) {
            error;
        }
    }

    renderMovieList() {
        const movieList = refs.buttonHeaderHome;
        const parsedStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).results;

        movieList.innerHTML = renderCard(parsedStorage);
    }
    saveLocaleStorage(films) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(films));
    }
    getLocaleStorage() {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    }

    incrementPage() {
        this.page += 1;
    };

    decrementPage() {
        this.page -= 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}