$("#loading-form").submit(function(event){
    event.preventDefault();
    LoadArt($("#loading-name").val());
});

function LoadArt(name){
    var artToLoad = name.toLowerCase();

    var storageRef = firebase.storage().ref(`art/${artToLoad}.txt`)

    storageRef.getDownloadURL().then(function(URL){
        $.ajax({
            url: URL,
            type: "GET",
            success: function(result){
                $("#size-tester").show();
                $("#size-tester pre").text(result);
                $("#art").css("font-size", $("#art").width() / $("#size-tester").width());
                $("#art pre").text(result);
                $("#size-tester").hide();
                $("#loading-error").hide();
            },
        });
    }).catch(function(error){
        console.log(error.code);
        if(error.code == "storage/object-not-found"){
            ShowLoadingError("Art does not exist");
        }
        else{
            ShowLoadingError(error.message_);
        }
    });
}

function ShowLoadingError(message){
    console.log("ErrorA");
    console.log(message);
    $("#loading-error").html(`Error: ${message}`);
    $("#loading-error").show();
    console.log("ErrorB");
}

function GetParameter(name){
    var params = window.location.search.substring(1);
    params = params.split("&");

    for(var i = 0; i < params.length; i++){
        param = params[i].split("=");
        if(param[0] === name){
            return param[1];
        }
    }

    return undefined;
}