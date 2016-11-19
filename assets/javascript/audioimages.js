function retrieveImages (){
	var images = $(this).find("input").val().trim();
    console.log(images); 
    var queryURL = "https://api.gettyimages.com/v3/search/images?page_size=10&phrase=" + images
	$.ajax({
        url: queryURL,
        method: 'GET',
        beforeSend: function(request)
        {
            request.setRequestHeader("Api-Key", "wtdg2qx9qf3b9fafjr5evcbg")
        }
    })
    .done(function(response) {
        var results = response.images;//storing response in a variable
        $(".dragg .thumbnail").each(function(index, element){
            var $element = $(element);
            var imageUrl = results[index].display_sizes[0].uri;
            console.log(imageUrl);
            $element.css({
                backgroundImage: "url(" + imageUrl + ")"
            });

        })
    });

    return false;
}

$('.search-bar').on('submit', retrieveImages);


