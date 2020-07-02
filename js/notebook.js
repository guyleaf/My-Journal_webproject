var xDown = null;                                                        
var yDown = null;
var xDiff = null;
var yDiff = null;

function updateState(month, page) {
    $.getJSON("json/notebook.json", function(result) {
        $('.main-text').html(result[month].text[page - 1]);
        $(".main__pic").attr("src", result[month].img.main[page - 1] ? result[month].img.main[page - 1] : "");
        if (result[month].img.aside != undefined)
        {
            $(".main__aside").attr("src", result[month].img.aside);
            $(".main-text").css("justify-content", "start");
        }
        else
        {
            $(".main-text").css("justify-content", "center");
        }
        
        $(".button_back").css("visibility", "visible");
        $(".button_next").css("visibility", "visible");
        $(".button_back").removeAttr("href");
        $(".button_next").removeAttr("href");

        if (page == 1)
        {
            let months = result.months;
            if (months[months.indexOf(month) - 1] != undefined)
                $(".button_back").attr("href", months[months.indexOf(month) - 1] + ".html");
            else
                $(".button_back").css("visibility", "hidden");
        }
        
        if (result[month].text.length == page)
        {
            let months = result.months;
            if (months[months.indexOf(month) + 1] != undefined)
                $(".button_next").attr("href", months[months.indexOf(month) + 1] + ".html");
            else
                $(".button_next").css("visibility", "hidden");
        }

        $(".current").html("Home > " + month + " > " + page);
    });
}

function listen(month) {
    monthq = month;
    let url = new URL(location.href);
    page = 1;

    if (url.searchParams.has("page"))
    {
        page = parseInt(url.searchParams.get("page"));
    }

    updateState(month, page);
    
    $(".button_back").on("click", function(){
        page--;
        updateState(month, page);
    });

    $(".button_next").on("click", function(){
        page++;
        updateState(month, page);
    });

    console.log("ready");
}

function getTouches(evt) {
    return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;
    xDiff = null;
    yDiff = null;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
  
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
  
  
    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
}

function handleTouchEnd() {

    if (Math.abs(xDiff) > 5 || Math.abs(yDiff) > 5 || $('#rotationReminder').length != 0)
        return;

    let direction = null;
    if (window.innerWidth - xDown < 150) {
        direction = true;
    }
    else if (xDown < 150) {
        direction = false;
    }

    $.getJSON("json/notebook.json", function(result) {
        let months = result.months;
        if (direction == false) {
            if (page == 1 && months[months.indexOf(monthq) - 1] != undefined)
                window.location.href = months[months.indexOf(monthq) - 1] + ".html";
            else if (page > 1) {
                page--;
                updateState(monthq, page);
            }
        } else if (direction == true) {
            if (page == result[monthq].text.length && months[months.indexOf(monthq) + 1] != undefined)
                window.location.href = months[months.indexOf(monthq) + 1] + ".html";
            else if (page < result[monthq].text.length) {
                page++;
                updateState(monthq, page);
            }
        }
    });
}

$(document).ready(function(){
    var md = new MobileDetect(window.navigator.userAgent);

    if (md.mobile() != null && md.mobile() != "Nexus") {
        if (window.innerHeight > window.innerWidth) {
            $('body').append('<div style="" id="rotationReminder"><div class="reminder">Please Rotate your smartphone in order to have better experience.</div></div>');
        }

        $(".title").remove();
        $(".button1").remove();
        $(".button2").remove();
        $(".row>div").removeClass("col-10");
        $(".row>div").addClass("col-12");
    }
    

    window.addEventListener("orientationchange", function() {
        // 橫向 (僅限於行動裝置)
        if (window.matchMedia("(orientation: portrait)").matches) {
            $('#rotationReminder').remove();
        }
        // 直向 (僅限於行動裝置)，後者避免開發者切換成行動裝置時誤判
        else if (window.matchMedia("(orientation: landscape)").matches && screen.height > screen.width) {
            if ($('#rotationReminder').length == 0)
                $('body').append('<div style="" id="rotationReminder"><div class="reminder">Please Rotate your smartphone in order to have better experience.</div></div>');
        }
    }, false);

    var monthq = null;
    var page = null;

    if (md.mobile() != null && md.mobile() != "Nexus")
    {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);
    }
});