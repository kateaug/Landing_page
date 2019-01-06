$('.form').on('submit', (e) => {

    const api = 'https://recruitment-api.pyt1.stg.jmr.pl/login';
    const email = $('#form_email').val();
    const password = $('#form_password').val();
    const correctLogin = 'correct_login@example.com';
    const correctPass = 'C0rr3Ct_P@55w0rd';
    const data = {
      'login': email,
      'password': password
    };
  
    //post request
    function onPostData(api, data) {
        return fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json());
    };


    //validation
    if (onValidateEmail(email)) {
    onPostData(api, data)
      .then(
        (data) => {
          console.log(JSON.stringify(data));
          if (email === correctLogin && password === correctPass) {
            $('.form__success').text(data.message);
            onClearMessage('form__success');
          }
          else {
            $('.form__fail').text(data.message);
            onClearMessage('form__fail');
          }
        }
      )
      .catch((err) => {
        console.error(err);
      });
    }
    else {
      alert('Invalid email address!');
    };
  
    onPostData(api, data)
    .then(
      data => console.log(JSON.stringify(data))
    )
    .catch(err => console.error(err));
  
    e.preventDefault();
});


// removing login message content
const onClearMessage = (val) => {
   setTimeout(() => {
        $(`.${val}`).text('');
   }, 3000);
};

// email validation check
function onValidateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};


// sticky navigation
  $('.js__section-hero').waypoint(function(direction) {
    if(direction === 'down') {
    	$('nav').addClass('sticky')
    } else {
    	$('nav').removeClass('sticky')
    }
  }, {
  	offset: '60px'
  });


// mobile nav 
 $('.js__nav-icon').click(function() {
  const nav = $('.js__main-nav');
  const icon = $('.js__nav-icon i');

  nav.slideToggle(200);
  if(icon.hasClass('ion-navicon-round')) {
      icon.addClass('ion-close-round');
      icon.removeClass('ion-navicon-round');
  } else {
      icon.addClass('ion-navicon-round');
      icon.removeClass('ion-close-round');
  }
});

