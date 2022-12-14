import axios from "axios";

const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const API_KEY = '2f44dbe234f7609a16da7327d83f3eb3'

export default class FilmApiTrendFetch {
    constructor() {
        this.page = 1;
        this.currentLang = '';
        this.genres;
        this.films;
    }

    async fetchFilmsGenres() {
        return await fetch(`${GENRES_URL}?api_key=${API_KEY}&language=${this.currentLang}`)
            .then(res => res.json())
            .then(data => {
                this.genres = data.genres
                // return data.genres
            })
            .catch(err => console.log(err));
    }

    async fetchFilmsTrend() {
        return await fetch(
            `${TRENDING_URL}?api_key=${API_KEY}&${this.page}&language=${this.currentLang}`
        )
            .then(
                res => res.json()
            )
                .then(
                    data => {
                this.films = data.results
                console.log(data.results)
                //    return data.results
            })
            .catch(err => console.log(err));
    }

    async filmsAndGenres() {
        try {

            await this.fetchFilmsGenres();
            await this.fetchFilmsTrend();
            const films = this.films;
            const genres = this.genres;

            for (let film of films) {
                let ids = searchGenres(film.genre_ids)
                film.genre_ids = ids;
                // форматуємо рейтинг
                film.vote_average = film.vote_average.toFixed(1);
                // форматуємо дату виходу фільму
                film.release_date = film.release_date.slice(0, 4);

            }

            function searchGenres(ids) {
                let genresNamesArr = [];
                let searchId = ids;
                let genreName;

                for (let i = 0; i < ids.length; i += 1) {
                    genreName = genres.find(list => list.id === searchId[i]).name;
                    genresNamesArr.push(genreName);
                }
                return genresNamesArr
            }
            return films;
        } catch (error) {
            console.log(error);
        }
    }



    get lang() {
        return this.currentLang
    }
    set lang(value) {
        this.currentLang = value;
    }

    get currentPage() {
        return this.page
    }
    set currentPage(value) {
        this.page = value
    }
}