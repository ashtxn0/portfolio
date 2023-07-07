$("a").on("mouseover", function(e) {
  $(e.target).css("color", "white");
});

$("a").on("mouseout", function(e) {
  $(e.target).css("color", "#64E9ED");
});

$("a").on("mouseover", function(e) {
  $(e.target).css("fill", "white");
});

$("a").on("mouseout", function(e) {
  $(e.target).css("fill", "#64E9ED");
});

var limits = 15.0;

var width = window.innerWidth;
if (width < 601) {
  $(".taskbar-container").toggle("slide");
}




if (width > 850) {
  $(".expandable").mouseenter(function (e) {
    var $img = $(this);
    $(e.target.parentElement).addClass("expand active");
    $(".hideable").addClass("hide");
    $img.addClass("hover-img");
    // $card.addClass("active");
      $(".portfolio-card.active").mouseleave(function (event) {
      $(e.target).parent().removeClass("expand active");
      $(".hideable").removeClass("hide");
      $img.removeClass("hover-img")
      })
    })
  $(".portfolio-card").mousemove(function(e) {
    var $card = $(this);
    var $target = $(e.target);


    // Check if the event target is the card or one of its children
    if ($target.is($card) || $target.closest($card).length > 0) {
      var rect = $card[0].getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var offsetX = x / rect.width;
      var offsetY = y / rect.height;

      var rotateY = offsetX * (limits * 2) - limits;
      var rotateX = offsetY * (limits * 2) - limits;

      $card.css({
        transform: "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)",
        "background-color": "#081020"
      });

    }
  });

  $(".portfolio-card").mouseleave(function(e) {
    var $card = $(this);
    $card.css({
      transform: "scale(1.0)",
      "background-color": "#0a152b"
    });

  });
}

// if (width > 850) {
//   $(".portfolio-card").mousemove(function(e) {
//     var rect = e.target.getBoundingClientRect();
//     var x = e.clientX - rect.left;
//     var y = e.clientY - rect.top;
//     var offsetX = x / rect.width;
//     var offsetY = y / rect.height;

//     var rotateY = offsetX * (limits * 2) - limits;
//     var rotateX = offsetY * (limits * 2) - limits;

//     var $card = $(this);

//     $card.css({
//       transform: "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)",
//       "background-color": "#081020"
//     });
//     $('.portfolio-card').not(this).addClass("hide");
//     $(".portfolio-card img").mousemove(function (e) {
//       $card.addClass("active");
//       })
//       $(".portfolio-card img").mouseleave(function (e) {
//         $card.removeClass("active");
//         })
//   });

//   $(".portfolio-card").mouseleave(function(e) {
//     var $card = $(this);
//     $card.css({
//       transform: "scale(1.0)",
//       "background-color": "#0a152b"
//     });
//     $('.portfolio-card').removeClass("hide");
//   });
// }

$(".hamburger-menu").click(function(){
  $(".taskbar-container").css("visibility", "visible");
  $(".taskbar-container").toggle("slide");
  
})



