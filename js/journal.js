$(document).ready(function(){
    $(".tri").hover(function(){
        $(".Small_cir").show();
        $('.Small_cir').css('border-color','#b9b9b9');
    },function(){
        $(".Small_cir").hide();
    });
});
