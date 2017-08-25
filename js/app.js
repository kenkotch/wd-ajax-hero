(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };


  $('button').click(function() {
    event.preventDefault()
    movies = []
    let search = $('#search').val()
    if (search == '') {
      renderMovies()
      alert('Guy, your input was empty. Enter a good movie. One example is "The Big Lebowski." Now get searching!')
    } else {
      //split ' ', join %20  // do i need this?
      var $xhr = $.getJSON('https://omdb-api.now.sh/?s=' + search)
      $xhr.done(function(response) {
        let giantArray = response.Search
        for (let things of giantArray) {

          let movie = {
            title: things.Title,
            poster: things.Poster,
            year: things.Year,
            imdbID: things.imdbID
          }
          movies.push(movie)
        }
        renderMovies()
      })
    }
  })
})();
