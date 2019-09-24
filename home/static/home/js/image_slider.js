$(document).ready(() => {
  var width = $(window).width();
  var slideLeft = true;

  var $year = $('#imageSlider .year');
  var $page = $('#imageSlider input[name="page"]');

  function getImages(context = {
    'year': $year.text(),
    'page': $page.val(),
    'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
  }) {
    var isWidth = $('#imageSlider').width();

    $.ajax('/image_slider/', {
      data: {
        'year': $year.text(),
        'page': $page.val(),
        'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
      },
      statusCode: {
        204: () => {
          $('#imageSlider .images').effect('shake');
          var page = $page.val();
          $page.val(page - 1 > 0 ? --page : 1);
        }
      },
      success: (data) => {
        let $images = $('#imageSlider .images');

        if (slideLeft) {
          $images.append(data);

          let $first = $images.children('.is-row:not(:last-child)');
          let $last = $images.children('.is-row:not(:first-child)');

          $first.animate({
            'left': `-${isWidth}px`,
          }, 1000);
          $last.css('left', `${isWidth}px`).animate({
            'left': `0px`,
          }, 1000);

          setTimeout(() => {
            $first.remove();
          }, 1000);
        } else {
          $images.prepend(data);

          let $first = $images.children('.is-row:not(:last-child)');
          let $last = $images.children('.is-row:not(:first-child)');

          $first.css('left', `-${isWidth}px`).animate({
            'left': `0px`,
          }, 1000);
          $last.animate({
            'left': `${isWidth}px`,
          }, 1000);

          setTimeout(() => {
            $last.remove();
          }, 1000);
        }
      }
    });
  }

  getImages();

  function getViewportSize() {
    width = $(window).width();

    if (width >= 992) {
      return 'lg-xl';
    } else if (width >= 768) {
      return 'md';
    } else {
      return 'xs-sm';
    }
  }

  var oldViewportSize = getViewportSize();
  var animationComplete = true;

  function refreshSlider() {
    var viewportSize = getViewportSize();

    if (oldViewportSize !== viewportSize && animationComplete) {
      animationComplete = false;
      slideLeft = true;

      $page.val(1);
      getImages();

      setTimeout(() => {
        animationComplete = true;
        oldViewportSize = viewportSize;
        viewportSize = getViewportSize();
      }, 1000);
    }

    oldViewportSize = viewportSize;
  }

  $(window).on('resize orientationchange', refreshSlider);

  var page = 1;
  $('#imageSlider .nav-left').click(() => {
    if (animationComplete) {
      animationComplete = false;

      setTimeout(() => {
        animationComplete = true;
      }, 1000);

      slideLeft = false;
      page = Number($page.val());

      if (page === 1) {
        $('#imageSlider .images').effect('shake');
        return;
      }

      $page.val(page - 1 > 0 ? --page : 1);

      getImages({
        'year': $year.text(),
        'page': page,
        'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
      });
    }
  });

  $('#imageSlider .nav-right').click(() => {
    if (animationComplete) {
      animationComplete = false;

      setTimeout(() => {
        animationComplete = true;
      }, 1000);

      slideLeft = true;
      page = $page.val();
      $page.val(++page);

      getImages({
        'year': $year.text(),
        'page': page,
        'per_page': width < 768 ? 1 : width >= 768 && width < 992 ? 2 : 3,
      });
    }
  });

  var dropdownExpanded = false;
  var $dropdown = $('#imageSlider .dropdown');
  var $scroll = $dropdown.children('.scroll');

  function toggleDropdown() {
    if (dropdownExpanded) {
      $dropdown.animate({
        'height': '2rem',
      }, 500);
    } else {
      $scroll.show();
      $dropdown.animate({
        'height': '15.75rem',
      }, 500);
    }

    var $chevron = $('#imageSlider .dropdown .chevron');
    setTimeout(() => {
      if (dropdownExpanded) {
        $chevron.html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        $scroll.hide();
      } else {
        $chevron.html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
      }

      dropdownExpanded = !dropdownExpanded;
    }, 500);
  }

  $dropdown.children('.header').click(toggleDropdown);

  $scroll.children('li').click(function (event) {
    event.stopPropagation();

    let year = $(this).text();
    $('#imageSlider .dropdown .year').html(year);

    slideLeft = true;
    $page.val(1);

    toggleDropdown();
    getImages();
  });
});
