$(document).ready(function($) {




// scroll functions
$(window).scroll(function(e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $('.navbar').addClass("sticky");
    } else {
        $('.navbar').removeClass("sticky");
    }

});



$(".cart-nav").click(function(){
  $(".cart-info").toggleClass("visible");
});

$(".s_toggle").click(function(){
	event.preventDefault()
  $(".search_toggle").toggleClass("visible");
});


var btn = $('#backtotop');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


	
});

// Type Effect Starts

jQuery(document).ready(function($) {
  //set animation timing
  var animationDelay = 2500,
    //loading bar effect
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect 
    revealDuration = 600,
    revealAnimationDelay = 1500;

  initHeadline();


  function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($('.cd-headline.letters').find('b'));
    //initialise headline animation
    animateHeadline($('.cd-headline'));
  }

  function singleLetters($words) {
    $words.each(function() {
      var word = $(this),
        letters = word.text().split(''),
        selected = word.hasClass('is-visible');
      for (i in letters) {
        if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
      }
      var newLetters = letters.join('');
      word.html(newLetters).css('opacity', 1);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function() {
      var headline = $(this);

      if (headline.hasClass('loading-bar')) {
        duration = barAnimationDelay;
        setTimeout(function() {
          headline.find('.cd-words-wrapper').addClass('is-loading')
        }, barWaiting);
      } else if (headline.hasClass('clip')) {
        var spanWrapper = headline.find('.cd-words-wrapper'),
          newWidth = spanWrapper.width() + 10
        spanWrapper.css('width', newWidth);
      } else if (!headline.hasClass('type')) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find('.cd-words-wrapper b'),
          width = 0;
        words.each(function() {
          var wordWidth = $(this).width();
          if (wordWidth > width) width = wordWidth;
        });
        headline.find('.cd-words-wrapper').css('width', width);
      };

      //trigger animation
      setTimeout(function() {
        hideWord(headline.find('.is-visible').eq(0))
      }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if ($word.parents('.cd-headline').hasClass('type')) {
      var parentSpan = $word.parent('.cd-words-wrapper');
      parentSpan.addClass('selected').removeClass('waiting');
      setTimeout(function() {
        parentSpan.removeClass('selected');
        $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
      }, selectionDuration);
      setTimeout(function() {
        showWord(nextWord, typeLettersDelay)
      }, typeAnimationDelay);

    } else if ($word.parents('.cd-headline').hasClass('letters')) {
      var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
      hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({
        width: '2px'
      }, revealDuration, function() {
        switchWord($word, nextWord);
        showWord(nextWord);
      });

    } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
      $word.parents('.cd-words-wrapper').removeClass('is-loading');
      switchWord($word, nextWord);
      setTimeout(function() {
        hideWord(nextWord)
      }, barAnimationDelay);
      setTimeout(function() {
        $word.parents('.cd-words-wrapper').addClass('is-loading')
      }, barWaiting);

    } else {
      switchWord($word, nextWord);
      setTimeout(function() {
        hideWord(nextWord)
      }, animationDelay);
    }
  }

  function showWord($word, $duration) {
    if ($word.parents('.cd-headline').hasClass('type')) {
      showLetter($word.find('i').eq(0), $word, false, $duration);
      $word.addClass('is-visible').removeClass('is-hidden');

    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({
        'width': $word.width() + 10
      }, revealDuration, function() {
        setTimeout(function() {
          hideWord($word)
        }, revealAnimationDelay);
      });
    }
  }

  function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass('in').addClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function() {
        hideLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else if ($bool) {
      setTimeout(function() {
        hideWord(takeNext($word))
      }, animationDelay);
    }

    if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  }

  function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass('in').removeClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function() {
        showLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else {
      if ($word.parents('.cd-headline').hasClass('type')) {
        setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('waiting');
        }, 200);
      }
      if (!$bool) {
        setTimeout(function() {
          hideWord($word)
        }, animationDelay)
      }
    }
  }

  function takeNext($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  }

  function takePrev($word) {
    return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
  }
});

// Type Effect Ends


// Isotope Gallery Starts

$(function() {
  /* Isotope Gallery */

  // init isotope
  var $gallery = $(".tm-gallery").isotope({
    itemSelector: ".tm-gallery-item",
    layoutMode: "fitRows"
  });
  // layout Isotope after each image loads
  $gallery.imagesLoaded().progress(function() {
    $gallery.isotope("layout");
  });

  $(".filters-button-group").on("click", "a", function() {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
    console.log("Filter value: " + filterValue);
  });

  /* Tabs */
  $(".tabgroup > div").hide();
  $(".tabgroup > div:first-of-type").show();
  $(".tabs a").click(function(e) {
    e.preventDefault();
    var $this = $(this),
      tabgroup = "#" + $this.parents(".tabs").data("tabgroup"),
      others = $this
        .closest("li")
        .siblings()
        .children("a"),
      target = $this.attr("href");
    others.removeClass("active");
    $this.addClass("active");

    // Scroll to tab content (for mobile)
    if ($(window).width() < 992) {
      $("html, body").animate(
        {
          scrollTop: $("#tmGallery").offset().top
        },
        200
      );
    }
  });
  
  // Magnific Pop up
  $('.tm-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true }
    });
});

// Isotope Gallery Ends



// Scroll Starts

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100 //Add this
    }, 300);
});

// Scroll Ends

$(function(){
    $(".nav-link").click(function(){
      $(".navbar-collapse").removeClass('show');
      $(".navbar-toggler").addClass("x collapsed");
    });
  });


// Image Change Banner
var interval;

$(function () {
  changeSlide = function () {
    $img = $(".banner__changer img.active");

    $img.removeClass("active");

    if ($img.is(":last-child")) {
      $next = $($img.siblings(":first"));
    } else {
      $next = $($img.next());
    }

    $next.addClass("active");
  };

  interval = setInterval(changeSlide, 5000);
});


// Banner Form JS Starts

if($('.banner_form input').val() != ''){

}



$(document).ready(function() {
    $("input").change(function(){
        if($(this).val() != '')
            {
                $(this).addClass('add_focus');
            }
        if($(this).val() == '')
            {
                $(this).removeClass('add_focus');
            }  
        });
});
// Banner Form JS Ends