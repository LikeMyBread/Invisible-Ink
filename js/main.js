window.onload = function (e) {
    var menu = document.getElementById("main");
    var encode_link = document.getElementById("encode_link");
    var decode_link = document.getElementById("decode_link");

    var encode = new EncodeContext();

    var decode = new DecodeContext();

    var select_encode = function (event) {
        menu.className = "side";
        encode.show();
        decode.hide();
        encode_link.className = "button selected";
        decode_link.className = "button";
    };

    var select_decode = function (event) {
        menu.className = "side";
        decode.show();
        encode.hide();
        decode_link.className = "button selected";
        encode_link.className = "button";
    };

    if(window.location.hash == "#encode") {
        select_encode();
    } else if (window.location.hash == "#decode") {
        select_decode();
    }

    encode_link.addEventListener("click", select_encode, false);

    decode_link.addEventListener("click", select_decode, false);
    
};