'use strict';

document.addEventListener('DOMContentLoaded', () => {

    function sortMovie(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }

    const adv = document.querySelectorAll('.promo__adv img');

    for (let i = 0; i < adv.length; i++) {
        adv[i].remove();
    }


    document.querySelector('.promo__bg .promo__genre').textContent = 'ДРАММА';

    /** @type {HTMLElement} */
    let bg = document.querySelector('.promo__bg');
    bg.style.backgroundImage = 'url(img/bg.jpg)';



    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ],
    };

    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addMovie = addForm.querySelector('input.adding__input');
    const checkbox = addForm.querySelector('[type="checkbox"]');


    // movieDB.movies.sort(sortMovie);

    function createMovieList(arrFilms, parentTag) {

        movieDB.movies.sort(sortMovie);
        parentTag.innerHTML = '';

        arrFilms.forEach((el, i) => {
            parentTag.innerHTML += `
                <li class="promo__interactive-item">${i + 1} - ${el}
                    <div class="delete"></div>
                </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {

            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                arrFilms.splice(i, 1);

                createMovieList(arrFilms, parentTag);
                console.log(movieDB.movies);
            });

        });
    }

    createMovieList(movieDB.movies, movieList);


    addForm.addEventListener('submit', e => {
        e.preventDefault();

        let newFilm = addMovie.value;
        const favoriteFilm = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
                console.log(newFilm);
            }

            movieDB.movies.push(newFilm);
            movieDB.movies.sort(sortMovie);
            createMovieList(movieDB.movies, movieList);
            addMovie.value = '';
            console.log(movieDB.movies);

            if (favoriteFilm) {
                console.log('Сделать любимым');
            }
        }

        e.target.reset();

    });

});