$(document).ready(() => {
  // console link to developer's site
  console.log(
    'This site brought to you by McCarthy Code.\n' +
      'https://mccarthycode.com/',
  );

  // external link icon
  $('a.external-link').append(
    ' <i class="fas fa-external-link-alt" title="External Link"></i>',
  );

  // navbar menu
  $('#navbarCollapseButton').click(() => {
    $('#navbarCollapse').slideToggle();
  });
});
