$(document).ready(() => {
  console.log('This site brought to you by McCarthy Web Design.');
  console.log('https://mccarthy-web-design.000webhostapp.com/');

  // external link icon
  $('a.external-link')
    .append(' <i class="fas fa-external-link-alt" title="External Link"></i>');

  // navbar menu
  $('#navbarCollapseButton').click(function () {
    $('#navbarCollapse').slideToggle();
  });
  $(window).on('resize orientationchange', function () {
    if ($(this).width() >= breakpointMd) {
      $('#navbarCollapse').css('display', 'inline');
    } else {
      $('#navbarCollapse').hide();
    }
  });
});
