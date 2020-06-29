function updateState(month, page) {
    $.getJSON("json/notebook.json", function(result) {
        $('.container').html(result[month].text[page - 1]);
        $(".main__pic").attr("src", result[month].img.main[page - 1] ? result[month].img.main[page - 1] : "");
        if (result[month].img.aside != undefined)
        {
            $(".main__aside").attr("src", result[month].img.aside);
            $(".container").css("justify-content", "start");
        }
        else
        {
            $(".container").css("justify-content", "center");
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
        else if (result[month].text.length == page)
        {
            let months = result.months;
            if (months[months.indexOf(month) + 1] != undefined)
                $(".button_next").attr("href", months[months.indexOf(month) + 1] + ".html");
            else
                $(".button_next").css("visibility", "hidden");
        }
    });
}

function listen(month) {
    let url = new URL(location.href);
    let page = 1;
    
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

$(document).ready(function(){
    if (screen.height > screen.width) {
        $('body').append('<div style="" id="rotationReminder"><div class="reminder">Please Rotate your smartphone in order to have better experience.</div></div>');
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
});