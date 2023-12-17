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

        let blockOffsetTop = blockToMove.offset().top;
        let blockHeigh = parseInt(blockToMove.css("height"))
        let windowHeight = $(window).height();
        let windowSctollTop = $(window).scrollTop()
        let blockOffsetTopToWindow = blockOffsetTop-blockHeigh;

        blockToMove.offset({top: (event.clientY - 10) + windowSctollTop})


        // console.clear()
        console.log(event)
        console.log(`clientY: ${event}\n  blockOffsetTop: ${blockOffsetTop}\n blockHeight: ${blockHeigh}\n windowHeight: ${windowHeight}\n windowSctollTop: ${windowSctollTop}\n blockOffsetTopToWindow: ${blockOffsetTopToWindow}`)


        if(event.clientY + blockHeigh < windowHeight){
            blockToMove.offset({top: (windowHeight - blockHeigh) + windowSctollTop})
        }
    }
})