window.onload = function (e) {
    var menu = document.getElementById("main");
    var encode_link = document.getElementById("encode_link");
    var decode_link = document.getElementById("decode_link");

    var encode = new EncodeContext();

    var decode = new DecodeContext();

    encode_link.addEventListener("click", function (event) {
        menu.className = "side";
        encode.show();
        decode.hide();
    }, false);

    decode_link.addEventListener("click", function (event) {
        menu.className = "side";
        decode.show();
        encode.hide();
    }, false);
    
};