var artToLoad = GetParameter("load").toLowerCase();

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
        switch(error.code){
            case 'storage/object-not-found':
                ShowLoadingError("Art does not exist");
                break;

            default:
                ShowLoadingError(error._message);
                break;
        }
    });
}

function ShowLoadingError(message){
    $("#loading-error .message").html(`Error: ${message}`);
    $("#loading-error").show();
    $(".loading-text").hide();
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