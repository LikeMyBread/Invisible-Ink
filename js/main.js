window.onload = function (e) {
    // Checking for allowed file upload scenarios
    var file = document.getElementById('file');
    var canvas = document.getElementById('image');
    var upload = document.getElementById('upload');
    var ctx = canvas.getContext('2d');

    var invertColors = function (e) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var numPixels = imageData.width * imageData.height;
        for (var i = 0; i < numPixels; i++) {
            pixels[i*4] = 255 - pixels[i*4]; // Red
            pixels[i*4+1] = 255 - pixels[i*4+1]; // Green
            pixels[i*4+2] = 255 - pixels[i*4+2]; // Blue
        };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
    }

    upload.addEventListener("click", invertColors, false);

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

    file.addEventListener("change", function(event) {
        var file = this.files[0];
        checkFileValid(file);
        handleImage(event);
    }, false);

    var uploader = document.getElementById("uploader");
    uploader.addEventListener("submit", function(event) {
        var formData = new FormData(uploader);
    }, false);
};

var allowedExts = ['jpg', 'jpeg', 'png', 'gif'];

var checkFileValid = function (file) {
    var name = file.name;
    var size = file.size;
    var type =  file.type;

    var error = "Invalid file type " + type + "! ";
    var i = 0;
    while (error != "" && i < allowedExts.length) {
        var ext = 'image/' + allowedExts[i];
        if (ext == type) {
            error = "";
        }
        i++;
    }
    showError(error);
}

var showError = function (error) {
    document.getElementById('upload_error').innerHTML = error;
}