$(document).ready(function() {
  const $form = $("#login");
  const $url = $form.attr("action");
  const $logout = $("#logout-btn");
  $logout.hide();

  $logout.click(function(event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/logout",
      success: function() {
        // console.log();
        $form.show();
        $logout.hide();
      }
    });
  });

  $form.submit(function(event) {
    event.preventDefault();
    // console.log(req.body.email);
    // console.log(req.body.password);
    const formData = $(this).serialize();
    //conditions to pass the inputs: email&password
    if (!$("#input_email").val() || !$("#input_password").val()) {
      alert("please fill the required field");
    } else {
      $.ajax({
        method: "POST",
        url: $url,
        data: $(this).serialize(),
        success: function(data) {
          $form.hide();
          $("#logout-btn").show();
          //   userState();
        }
      });
    }
  });

  //   function userState() {
  //     if ($("#login:visible")) {
  //       $("#logout-btn").hide();
  //     } else {
  //       $("#logout-btn").show();
  //       //   $("#login").hide();
  //     }
  //   }
});

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(users => {
//     for (user of users) {
//       $("<div>")
//         .text(user.name)
//         .appendTo($("body"));
//     }
//   });
// });
