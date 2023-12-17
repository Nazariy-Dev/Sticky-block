$(document).ready(function(){
    let touchToMove = $(".sticky-block__drag-to-move")
    let blockToMove = $(".sticky-block")

    touchToMove.mousedown(function(){
        $(document).mousemove(onMouseMove);
        console.log("mousedown")
    });
    $(document).mouseup(function(){
        $(document).off("mousemove", onMouseMove)
        console.log("mouseup")
    });

    function onMouseMove(event) {
        // console.log(event.clientY)
        blockToMove.offset({top: event.pageY - 8})
    }
})