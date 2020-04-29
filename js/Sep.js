function updateState(place, month, page) {
    $.getJSON("json/notebook.json", function(result) {
        let i = 0;
        $('.text').each(function(){
            $(this).html(result[place].text[page - 1][i++]);
        });
        $(".main__pic").attr("src", result[place].img.main[page - 1] ? result[place].img.main[page - 1] : "");
        if (result[place].img.aside)
        {
            $(".main__aside").attr("src", result[place].img.aside);
            $(".container").css("justify-content", "start");
        }
        else
        {
            $(".container").css("justify-content", "center");
        }
        
        $(".button_back").css("visibility", "visible");
        $(".button_next").css("visibility", "visible");

        if (page == 1)
        {
            let months = result[place].months;
            if (months[months.indexOf(place) - 1])
                $(".button_back").attr("href", months[months.indexOf(month) - 1] + ".html");
            else
                $(".button_back").css("visibility", "hidden");
        }
        else if (result[place].text.length == page)
        {
            let months = result[place].months;
            if (months[months.indexOf(place) + 1])
                $(".button_next").attr("href", months[months.indexOf(month) + 1] + ".html");
            else
                $(".button_next").css("visibility", "hidden");
        }
    });
}

function listen(place, month) {
    let url = new URL(location.href);
    let page = 1;
    
    if (url.searchParams.has("page"))
    {
        page = parseInt(url.searchParams.get("page"));
    }

    updateState(place, month, page);
    
    $(".button_back").on("click", function(){
        page--;
        updateState(place, month, page);
    });

    $(".button_next").on("click", function(){
        page++;
        updateState(place, month, page);
    });

    console.log("ready");
}