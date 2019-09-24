

$(document).ready(() => {
  var $gallery = $('#gallery');
  var $dialog = $('#gallery .dialog');
  var $year = $('#imageSlider .year');
  var $modalBody = $('#gallery .modal-body');
  var $grid = $('#gallery .modal-body .grid');

  var width;
  var height;

  function verticalScrollbar() {
    return $(document).height() > $(window).height();
  }

  function getScrollbarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
  
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
  
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
  
    document.body.removeChild(outer);
  
    return (w1 - w2);
  };

  var scrollbarWidth = getScrollbarWidth();

  function adjustGallery() {
    width = verticalScrollbar() ? $(window).width() + scrollbarWidth : $(window).width();
    height = $(window).height();

    if (width < 576) {
      $modalBody.css('height', `${height - 224 + 4 * 16}px`);

      $dialog.css('left', '0px');
      $dialog.css('right', '0px');
    } else {
      $modalBody.css('height', `${height - 224}px`);
      
      let margin = (width - $dialog.width()) / 2;
      $dialog.css('left', `${margin < 0 ? 0 : margin}px`);
      $dialog.css('right', `${margin < 0 ? 0 : margin}px`);
    }
  }

  adjustGallery();

  $('#galleryIcon').click((event) => {
    event.preventDefault();

    var year = $year.text();

    $.get('/gallery/', {'year': year}, (data) => {
      $grid.html(data);
      $('#gallery .modal-header .h3').text(year);
      $('#gallery [data-fancybox="gallery"]').fancybox({
        'max-width': '300px',
        'max-height': '250px',
      });
      $gallery.fadeIn();
    });
  });

  $('#gallery .bg, #gallery .close, #closeGallery').click(() => {
    $gallery.fadeOut();
  });

  $(window).on('resize orientationchange', () => {
    adjustGallery();
  });

  // $('#gallery').on('show.bs.modal', () => {
  //   $(this).find('.modal-body').css({
  //     'width': '964px',
  //     'max-height': '100%',
  //   });
  // });
});
