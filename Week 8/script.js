$(document).ready(function() {
  
  // Task 19: FAQ with slideToggle
  $('.faq-question').click(function() {
    $(this).next('.faq-answer').slideToggle(400);
    $(this).toggleClass('active');
  });

  // Task 20: Dynamic styling with .css()
  let styleToggle = true;
  $('#styleBtn').click(function() {
    const $box = $('#styleBox');
    
    if (styleToggle) {
      $box.css({
        'background-color': '#ff6b6b',
        'border-radius': '50%',
        'transform': 'rotate(10deg) scale(1.1)',
        'box-shadow': '0 10px 25px rgba(255, 107, 107, 0.4)'
      });
    } else {
      $box.css({
        'background-color': '#007bff',
        'border-radius': '10px',
        'transform': 'none',
        'box-shadow': 'none'
      });
    }
    
    styleToggle = !styleToggle;
  });

  // Task 21: Login form with fade effects
  $('#loginForm').submit(function(e) {
    e.preventDefault();
    
    const email = $('.form-input[type="email"]').val();
    const password = $('.form-input[type="password"]').val();
    const $message = $('#loginMessage');
    
    if (email && password) {
      $('.form-container').fadeOut(400, function() {
        $message.text('Login successful! 🎉').addClass('success').fadeIn(600);
      });
    } else {
      $message.text('Please fill all fields!').addClass('error').fadeIn(400).delay(2000).fadeOut(400);
    }
  });

  // Reset login form on page load
  $('.form-container').hide().fadeIn(800);
});
