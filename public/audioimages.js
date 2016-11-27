var $element;
var recal = $('<div id="recal">');
recal.html('Enter Data');
recal.prependTo('body');

function retrieveImages(e) {
    if (e.which == 13) {
        e.preventDefault();
        var images = $(this).find("input").val().trim();
        recal.html('Recallibration - Return "Enter"');
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
                    var randSize = Math.floor(Math.random() * 40) + 15;  
                    function excludeOffset() {
                        var oneOrTwo = Math.floor(Math.random() * 2) + 1;
                        var randOffset = Math.floor(Math.random() * 450) + 50;
                        console.log(oneOrTwo);
                        if (oneOrTwo == 1) {
                            return randOffset;
                        }
                        else { 
                            return randOffset + 850;
                        }
                    }
                     
                    // console.log(waveNum);
                    $element = $(element);
                    var imageUrl = results[index].display_sizes[0].uri;
                    // console.log(imageUrl);
                    $element.css({
                        backgroundImage: "url(" + imageUrl + ")"
                    });
                    $element.attr('id', "image" + index);
                    console.log(randSize);
                    $('#image' + index).css({'width': randSize, 'height': randSize});
                    $('#image' + index).offset({left:excludeOffset()});
                    // console.log(excludeOffset());
                    $element.data('url', imageUrl);
                    $element.data('randomWave', waveNum);
                    // console.log($element.data('url'));

                })

            });
        // return false;
    }
}

$(document).on('keypress', retrieveImages);

// $(document).on('keypress', function(e) {
//     if (e.which == 13) {
//         e.preventDefault();
//         $(".dragg .thumbnail").each(function(index, element) {
//             function excludeOffset() {
//                 var oneOrTwo = Math.floor(Math.random() * 2) + 1;
//                 var randOffset = Math.floor(Math.random() * 450) + 50;
//                 console.log(oneOrTwo);
//                 if (oneOrTwo == 1) {
//                     return randOffset;
//                 }
//                 else { 
//                     return randOffset + 850;
//                 }
//             }
//             $('#image' + index).offset({left:excludeOffset()});
//             console.log(excludeOffset());
//         }
//     return false;
//     }
// });
