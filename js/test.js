$(document).ready(function(){
    let url = new URL(location.href);
    let page = 1;
    
    if (url.searchParams.has("page"))
    {
        page = parseInt(url.searchParams.get("page"));
    }

    $.getJSON("json/notebook.json", function(result) {
        $(".text").html(result[0].text[page - 1]);
        $(".button_back").css("visibility", page != 1 ? "visible" : "hidden");
        $(".button_next").css("visibility", result[0].text.length != page ? "visible" : "hidden");
    });

    $(".button_back").on("click", function(){
        page--;
        $.getJSON("json/notebook.json", function(result) {
            $(".text").html(result[0].text[page - 1]);
            $(".button_back").css("visibility", page != 1 ? "visible" : "hidden");
            $(".button_next").css("visibility", result[0].text.length != page ? "visible" : "hidden");
        });
    });

    $(".button_next").on("click", function(){
        page++;
        $.getJSON("json/notebook.json", function(result) {
            $(".text").html(result[0].text[page - 1]);
            $(".button_back").css("visibility", page != 1 ? "visible" : "hidden");
            $(".button_next").css("visibility", result[0].text.length != page ? "visible" : "hidden");
        });
    });

    console.log("ready");
});