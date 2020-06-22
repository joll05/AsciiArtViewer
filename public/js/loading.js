var artToLoad = GetParameter("load");

if(artToLoad){
    $(".selection").hide();
    $(".content").show();

    var storageRef = firebase.storage().ref(`art/${artToLoad}.txt`)

    storageRef.getDownloadURL().then(function(URL){
        $.ajax({
            url: URL,
            type: "GET",
            success: function(result){
                $(".loading-text").hide()
                $(".art pre").text(result);
            },
        });
    }).catch(function(error){
        ShowError(error.message_);
    });
}

function ShowError(message){
    $("#loading-error .message").html(`Error: ${message}`);
    $("#loading-error").show();
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