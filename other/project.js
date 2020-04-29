$(document).ready(function(){
    $(".right").hover(function(){
        $(".Small_cir").show();
        $('.Small_cir').css('border-color','#b9b9b9');
    },function(){
        $(".Small_cir").hide();
    });
});

$(document).ready(function(){
    $(".next").click(function(){
        $(".text").html('<p>Due to the natural conditions for shrimp farming, there are many things That needs to pay attention to, including water temperature, salinity, pH value, watercolor, dissolved oxygen content, and water quality conditions. In addition, most of the shrimp fry ponds are indoors. The advantage of indoor aquaculture is that it is more relatively to control the situation and can keep away the interference from external environmental factors. For example, when it rains, the water temperature, salinity, and pH value in the water will decrease. If the water temperature is lower than 18 ° C, the shrimp fry. Will stop eating and die at 9 ° C.</p>');
    });
    $(".next").click(function(){
        $(".text").text();
    });
});

$(document).ready(function(){
    $(".left").hover(function(){
        $(".Small_cir").show();
        $('.Small_cir').css('border-color','#b9b9b9');
    },function(){
        $(".Small_cir").hide();
    });
});