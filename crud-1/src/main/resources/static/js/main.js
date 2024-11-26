$("#save-user-btn").click(function() {
    let userName = $("#username").val();
    let type = $("#type").val();
    let displayname_en = $("#displayname_en").val();
    let email = $("#email").val();
    let faculty = $("#faculty").val();

    $.ajax({
        url: "http://localhost:8080/api/users",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: userName,
            type: type,
            displayname_en : displayname_en,
            email: email,
            faculty: faculty
        }),
        success: function(response) {
            alert("User saved successfully: " + response);
        },
        error: function(error) {
            console.error("Error saving user", error);
            alert("Error saving user: " + error.responseText);
        }
    });
});
