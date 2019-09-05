$(document).ready(function () {
  var dropdown = false;

  $('#gallery .dropdown .header').click(function () {
    var $dropdown = $(this).parent();
    $dropdown.children('.scroll').slideToggle(500);
    
    if (dropdown) {
      $dropdown.animate({ 
        height: '2rem',
      }, 500 );
    } else {
      $dropdown.animate({ 
        height: '300px',
      }, 500 );
    }

    var $chevron = $('#gallery .dropdown .chevron');
    setTimeout(function () {
      if (dropdown) {
        $chevron.html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
      } else {
        $chevron.html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
      }
      
      dropdown = !dropdown;
    }, 500);
  });
});