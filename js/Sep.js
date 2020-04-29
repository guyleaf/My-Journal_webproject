function updateState(page) {
    $.getJSON("json/notebook.json", function(result) {
        $(".text").html(result[0].text[page - 1]);
        $(".main__pic").attr("src", result[0].img.main[page - 1] ? result[0].img.main[page - 1] : "");
        if (result[0].img.aside)
        {
            $(".main__aside").attr("src", result[0].img.aside);
            $(".container").css("justify-content", "start");
        }
        else
        {
            $(".container").css("justify-content", "center");
        }
        $(".button_back").css("visibility", page != 1 ? "visible" : "hidden");
        $(".button_next").css("visibility", result[0].text.length != page ? "visible" : "hidden");
    });
}

$(document).ready(function(){
    let url = new URL(location.href);
    let page = 1;
    
    if (url.searchParams.has("page"))
    {
        page = parseInt(url.searchParams.get("page"));
    }

    updateState(page);
    
    $(".button_back").on("click", function(){
        page--;
        updateState(page);
    });

    $(".button_next").on("click", function(){
        page++;
        updateState(page);
    });

    console.log("ready");
});