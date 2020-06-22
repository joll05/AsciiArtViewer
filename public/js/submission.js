let form = $("#submission-form");

$(form).change(function(){
    let submissionTypeValue = $("input[name='submission-type']:checked").val();
    let isPasting = (submissionTypeValue == "paste");
    
    $(".paste-area").toggle(isPasting);
    $(".upload-area").toggle(!isPasting);
})

$(form).submit(function(event){
    event.preventDefault();

    var data = {
        submissionType : $("input[name='submission-type']:checked").val(),
        submissionText : $("#submission-text").val(),
        submissionFile : $("#submission-file")[0].files[0],
        name : $("#submission-name").val().toLowerCase()
    };

    console.log(data);

    var storageRef = firebase.storage().ref(`art/${data.name}.txt`);

    var fileToPut;
    if(data.submissionType == "paste"){
        fileToPut = new Blob([data.submissionText], {type: "text/plain"});
    }
    else {
        fileToPut = data.submissionFile;
    }

    var task = storageRef.put(fileToPut)

    task.on("state_changed", 
        function progress(snapshot){},
        function error(err){
            ShowError(err.message_);
            console.log(err);
        },
        
        function complete(){
            window.location.href = `?load=${data.name}`;
        }
    );
});

function ShowError(message){
    $("#submission-error").html(`Error: ${message}`);
    $("#submission-error").show();
}