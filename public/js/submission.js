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

    var storageRef = firebase.storage().ref(`art/${data.name}.txt`);

    var fileToPut;
    if(data.submissionType == "paste"){
        fileToPut = new Blob([data.submissionText], {type: "text/plain"});
    }
    else {
        fileToPut = data.submissionFile;
    }

    if(fileToPut.type != "text/plain"){
        ShowSubmissionError("File is not a plain text file");
        return;
    }

    if(fileToPut.size > 100 * 1024){
        ShowSubmissionError(`File too large (${Math.round((fileToPut.size / 1024) * 10) / 10}kb)`);
        return;
    }

    storageRef.getDownloadURL().then(function resolve(){
        ShowSubmissionError("Art with this name already exists");
    }, function reject(){
        var task = storageRef.put(fileToPut)

        task.on("state_changed", 
            function progress(snapshot){},
            function error(err){
                ShowSubmissionError(err.message_);
            },
            
            function complete(){
                window.location.href = `?load=${data.name}`;
            }
    );
    });
});

function ShowSubmissionError(message){
    $("#submission-error").html(`Error: ${message}`);
    $("#submission-error").show();
}