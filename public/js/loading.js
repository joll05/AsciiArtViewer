var artToLoad = GetParameter("load");
console.log("Wow!a");

if(artToLoad){
    $(".selection").hide();
    $(".content").show();
    console.log("Wow!");
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