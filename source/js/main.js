$(document).ready(function () {
    let touchToMove = $(".sticky-block__drag-to-move")
    let blockToMove = $(".sticky-block")


    touchToMove.mousedown(function () {
        blockToMove.css({
            "transition": "top 0s, border-radius .3s"

        })

        $(document).mousemove(onMouseMove);
        console.log("mousedown")
    });

    $(document).mouseup(function (event) {
        $(document).off("mousemove", onMouseMove)

        let blockOffsetTop = blockToMove.offset().top;
        let blockHeigh = parseInt(blockToMove.css("height"))
        let windowHeight = $(window).height();
        let windowSctollTop = $(window).scrollTop()
        let blockOffsetTopToWindow = blockOffsetTop - windowSctollTop;

        if (blockOffsetTopToWindow + blockHeigh > windowHeight) {

            blockToMove.css({
                "top": "75%",
                "transition": "top .3s, border-radius .3s",
            })
        }
    });

    function onMouseMove(event) {

        let blockOffsetTop = blockToMove.offset().top;
        let blockHeigh = parseInt(blockToMove.css("height"))
        let windowHeight = $(window).height();
        let windowSctollTop = $(window).scrollTop()
        let blockOffsetTopToWindow = event.clientY;

        blockToMove.offset({ top: (event.clientY - 10) + windowSctollTop })

        console.log(`clientY: ${event}\n  blockOffsetTop: ${blockOffsetTop}\n blockHeight: ${blockHeigh}\n windowHeight: ${windowHeight}\n windowSctollTop: ${windowSctollTop}\n blockOffsetTopToWindow: ${blockOffsetTopToWindow}`)

        if (blockOffsetTopToWindow + blockHeigh < windowHeight) {
            blockToMove.offset({ top: (windowHeight - blockHeigh) + windowSctollTop })
            blockToMove.css({
                "border-radius": "0"
            })
        } else {
            blockToMove.css({
                "border-radius": "20px 20px 0 0"
            })
        }
    }
})