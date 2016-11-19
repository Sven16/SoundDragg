$(function() {
  
  $( document ).ready(function() {
  $( "#title" ).effect( "slide", 3000 );
  });

  var $dragg = $(".dragg"),
      $dropp = $(".dropp")

  var counts = [0];
  var resizeOpts = {
    handles: "all",
    autohide: true
  };  
    // Let the dragg items be draggable
  $(".dragImg", $dragg).draggable({
    opacity: 0.35, //setting opacity on drag
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document", //contained within DOM
    helper: "clone", //cloning what user drags in
    cursor: "move", //cursor indicates moving
  });

    // Let the dropp be droppable, accepting the dragg items
  $dropp.droppable({
    accept: "*", 
    classes: {
        "ui-droppable-active": "ui-state-highlight"
        },
    drop: function(event, ui) {
      if(ui.draggable.hasClass("dragImg")) {
        var clone = $(ui.helper).clone();
        var uiOffset = ui.helper.offset();
        var offset = $(this).offset();
        var helperMarginTop = ui.helper.css("margin-top");
        clone.css({
          top: uiOffset.top - offset.top, 
          left: uiOffset.left - offset.left
        });
        $(this).append(clone);
        // points to dragImg and adds new class
        $(".dropp .dragImg").addClass("item-" + counts[0]);
        $(".dropp .img").addClass("imgSize-" + counts[0]);
        $(".dropp .item-" + counts[0]).removeClass("dragImg ui-draggable ui-draggable-dragging"); 
        $(".item-" + counts[0]).dblclick(function() {
          $(this).remove();
        });     
        make_draggable($(".item-" + counts[0]), 'parent'); 
        $(".imgSize-" + counts[0]).resizable(resizeOpts);     
      }
    }
  });
  //set to position absolute
  var zIndex = 0;
  function make_draggable(elements, containment){ 
    elements.draggable({
      containment: containment || 'document',
      start:function(event, ui){ ui.helper.css('z-index', ++zIndex); },
      stop:function(event, ui){}
    });
  }

});