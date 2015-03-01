function DecodeContext () {
    var that = new Context("decode", "decode_error", "decode_image", "decode_file",
        "decode_submit", "decode_text");

    var submit = that.getSubmit();
    var textarea = that.getTextarea();

    var decode_handler = function () {
        var imageData = that.getImageData();
        var text = parseImage(imageData.data);
        textarea.style.display = 'block';
        textarea.value = text;
        textarea.innerHTML = text;
    };

    submit.addEventListener("click", decode_handler, false);

    return that;
}

function EncodeContext () {
    var that = new Context("encode", "encode_error", "encode_image", "encode_file",
        "encode_submit", "encode_text");

    var submit = that.getSubmit();
    var textarea = that.getTextarea();
    var canvas = that.getCanvas();
    var ctx = that.getCtx();

    var download = document.getElementById('download_encoded');

    // Makes the download image link work. 
    download.addEventListener('mouseover', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        this.href = dataURL;
    });

    var encode_handler = function () {
        var imageData = that.getImageData();
        var text = textarea.value;
        if (!text) {
            text = textarea.innerHTML;
        }

        imageData.data = applyMessage(text, imageData.data);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
        download.style.display = 'block';
    };

    submit.addEventListener("click", encode_handler, false);

    return that;
}

function Context (id, error_id, canvas_id, file_id, submit_id, text_id) {
    var container = document.getElementById(id);
    var errorContainer = document.getElementById(error_id);
    var extensions = ['jpg', 'jpeg', 'png', 'gif'];
    var canvas = document.getElementById(canvas_id);
    var file = document.getElementById(file_id);
    var submit = document.getElementById(submit_id);
    var ctx = canvas.getContext('2d');
    var textarea = document.getElementById(text_id);

    this.getContainer = function () {
        return container;
    }

    this.getCanvas = function () {
        return canvas;
    }

    this.getCtx = function () {
        return ctx;
    }

    this.getTextarea = function () {
        return textarea;
    }

    this.getSubmit = function () {
        return submit;
    }

    // Draws the image onto a canvas when it's picked
    file.addEventListener("change", function(event) {
        var file = this.files[0];
        checkFileValid(file);
        handleImage(event);
    }, false);

    this.show = function () {
        container.style.display = "inline";
    }

    this.hide = function () {
        container.style.display = "none";
    }

    this.getImageData = function () {
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    // Reads an image from a file upload
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
