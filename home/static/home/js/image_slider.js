$(document).ready(() => {
  var width = $(window).width();

  function getImages(context={
    'year': $('#imageSlider .year').text(),
    'page': $('#imageSlider input[name="page"]').val(),
    'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
  }) {
    $.ajax('/image_slider/', {
      data: {
        'year': $('#imageSlider .year').text(),
        'page': $('#imageSlider input[name="page"]').val(),
        'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
      },
      statusCode: {
        500: () => {
          var page = $('#imageSlider input[name="page"]').val();
          $('#imageSlider input[name="page"]').val(page - 1 > 0 ? --page : 1);
        }
      },
      success: (data) => {
        $('#imageSlider .images').html(data);
      }
    });
  }

  getImages();

  $(window).on('resize orientationchange', () => {
    width = $(window).width();
    getImages();
  });

  $('#imageSlider .nav-left').click(() => {
    var page = $('#imageSlider input[name="page"]').val();
    $('#imageSlider input[name="page"]').val(page - 1 > 0 ? --page : 1);

    getImages({
      'year': $('#imageSlider .year').text(),
      'page': page,
      'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
    });
  });

  $('#imageSlider .nav-right').click(() => {
    var page = $('#imageSlider input[name="page"]').val();
    $('#imageSlider input[name="page"]').val(++page);

    getImages({
      'year': $('#imageSlider .year').text(),
      'page': page,
      'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
    });
  });

  var dropdown = false;
  var $dropdown = $('#imageSlider .dropdown');
  var $scroll = $dropdown.children('.scroll');

  $dropdown.children('.header').click(() => {
    if (dropdown) {
      $dropdown.animate({
        'height': '2rem',
      }, 500);
    } else {
      $scroll.show();
      $dropdown.animate({
        'height': '330px',
      }, 500).css('background-color', '#666666');
    }

    var $chevron = $('#imageSlider .dropdown .chevron');
    setTimeout(() => {
      if (dropdown) {
        $chevron.html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        $dropdown.css('background-color', '#6666667f');
        $scroll.hide();
      } else {
        $chevron.html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
      }

      dropdown = !dropdown;
    }, 500);
  });
});