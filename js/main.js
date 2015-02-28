window.onload = function (e) {
    var download = document.getElementById('download_encoded');

    var encode_text = document.getElementById("encode_text");
    var decode_text = document.getElementById("decode_text");
    var encode_handler = function (imageData, canvas, ctx) {
        var text = encode_text.value;
        imageData.data = applyMessage(text, imageData.data);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
    };

    var decode_handler = function (imageData, canvas, ctx) {
        var text = parseImage(imageData.data);
        decode_text.value = text;
    };

    var menu = document.getElementById("main");
    var encode_link = document.getElementById("encode_link");
    var decode_link = document.getElementById("decode_link");

    var encode = new Context("encode", "encode_error", "encode_image", "encode_file",
        "encode_submit", encode_handler, "download_encoded");

    var decode = new Context("decode", "decode_error", "decode_image", "decode_file",
        "decode_submit", decode_handler);

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

function Context (id, error_id, canvas_id, file_id, submit_id, submit_callback, download_id) {
    var container = document.getElementById(id);
    var errorContainer = document.getElementById(error_id);
    var extensions = ['jpg', 'jpeg', 'png', 'gif'];
    var canvas = document.getElementById(canvas_id);
    var file = document.getElementById(file_id);
    var submit = document.getElementById(submit_id);
    var ctx = canvas.getContext('2d');

    if (download_id) {
        var download = document.getElementById(download_id);
        download.addEventListener('mouseover', function (e) {
            var dataURL = canvas.toDataURL('image/png');
            this.href = dataURL;
        });
    }

    file.addEventListener("change", function(event) {
        var file = this.files[0];
        checkFileValid(file);
        handleImage(event);
    }, false);

    submit.addEventListener("click", function (event) {
        submit_callback(getImageData(), canvas, ctx);
    }, false);

    this.show = function () {
        container.style.display = "inline";
    }

    this.hide = function () {
        container.style.display = "none";
    }

    var getImageData = function () {
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    var handleImage = function (e) {
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    var checkFileValid = function (file) {
        var name = file.name;
        var size = file.size;
        var type =  file.type;

        var error = "Invalid file type " + type + "! ";
        var i = 0;
        while (error != "" && i < extensions.length) {
            var ext = 'image/' + extensions[i];
            if (ext == type) {
                error = "";
            }
            i++;
        }
        showError(error);
    }

    var showError = function (error) {
        errorContainer.innerHTML = error;
    }
}
