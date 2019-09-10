$(document).ready(() => {
  var width = $(window).width();

  function getImages(context={
    'year': $('#gallery .year').text(),
    'page': $('#gallery input[name="page"]').val(),
    'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
  }) {
    $.ajax('/gallery/', {
      data: {
        'year': $('#gallery .year').text(),
        'page': $('#gallery input[name="page"]').val(),
        'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
      },
      statusCode: {
        500: () => {
          var page = $('#gallery input[name="page"]').val();
          $('#gallery input[name="page"]').val(page - 1 > 0 ? --page : 1);
        }
      },
      success: (data) => {
        $('#gallery .images').html(data);
      }
    });
  }

  getImages();

  $(window).on('resize orientationchange', () => {
    width = $(window).width();
    getImages();
  });

  $('#gallery .nav-left').click(() => {
    var page = $('#gallery input[name="page"]').val();
    $('#gallery input[name="page"]').val(page - 1 > 0 ? --page : 1);
    
    getImages({
      'year': $('#gallery .year').text(),
      'page': page,
      'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
    });
  });

  $('#gallery .nav-right').click(() => {
    var page = $('#gallery input[name="page"]').val();
    $('#gallery input[name="page"]').val(++page);

    getImages({
      'year': $('#gallery .year').text(),
      'page': page,
      'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
    });
  });

  var dropdown = false;
  var $dropdown = $('#gallery .dropdown');
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

    var $chevron = $('#gallery .dropdown .chevron');
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