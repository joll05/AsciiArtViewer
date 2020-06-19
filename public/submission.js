let form = $("#submission-form");

$(form).change(function(){
    let submissionTypeValue = $(form).children("input[name='submission-type']:checked").val();
    let isPasting = (submissionTypeValue == "paste");
    
    $(".paste-area *").prop("required", isPasting);
    $(".paste-area").toggle(isPasting);

    $(".upload-area textarea").prop("required", !isPasting);
    $(".upload-area").toggle(!isPasting);
})

$(form).submit(function(event){
    event.preventDefault();

    let data = {
        submissionType : $("input[name='submission-type']:checked").val(),
        submissionText : $("textarea[name='submission-text']").val(),
        submissionFile : $("input[name='submission-file']").val(),
        name : $("input[name='submission-name']").val()
    };

    console.log(data);
});