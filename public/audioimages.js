var $element;

function retrieveImages(e) {
    if (e.which == 13) {
        e.preventDefault();
        var images = $(this).find("input").val().trim();
        // console.log(images);
        var queryURL = "https://api.gettyimages.com/v3/search/images?page_size=10&phrase=" + images
        $.ajax({
                url: queryURL,
                method: 'GET',
                beforeSend: function(request) {
                    request.setRequestHeader("Api-Key", "wtdg2qx9qf3b9fafjr5evcbg")
                }
            })
            .done(function(response) {
                var results = response.images; //storing response in a variable
                $(".dragg .thumbnail").each(function(index, element) {
                    var waveNum = Math.floor(Math.random() * 151) + 50;  
                    // console.log(waveNum);
                    $element = $(element);
                    var imageUrl = results[index].display_sizes[0].uri;
                    // console.log(imageUrl);
                    $element.css({
                        backgroundImage: "url(" + imageUrl + ")"
                    });
                    $element.attr('id', "image" + index);
                    $element.data('url', imageUrl);
                    $element.data('randomWave', waveNum);
                    // console.log($element.data('url'));

                })
            });
        // return false;
    }
}

$('#form1').on('keypress', retrieveImages);
