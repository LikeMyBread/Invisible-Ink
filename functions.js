//Takes in r, g, and b values and a character, returns new r, g, and b values.
function encode (r, g, b, character) {
    code = character.charCodeAt("0");
    mBlue = code % 8;
    mGreen = parseInt(code / 8) % 8;
    mRed = parseInt(code / 64) % 8;
    b = b - (b % 8) + mBlue;
    g = g - (g % 8) + mGreen;
    r = r - (r % 8) + mRed;
    return ([r, g, b]);
}

//Extracts a stored character from a single pixel
function decode (r, g, b) {
    if (r % 8 > 4) {
        return "";
    };
    mBlue = b % 8;
    mGreen = g % 8;
    mRed = r % 8;
    return (String.fromCharCode(mBlue + 8 * mGreen + 64 * mRed));
}

//Sets the highest value of R above the maximum for ascii so it will be skipped
function nullOutR (r) {
    r = r - (r % 8) + 5;
    return(r);
}

//Apply a message to an image, changes the image in place and returns the image
function applyMessage (message, image) {
    for (var i = 0; i < image.length / 4; i++) {
        if (i < message.length) {
            newPixel = encode(image[i * 4], image[i * 4 + 1], image[i * 4 + 2], message[i]);
            image[i * 4] = newPixel[0];
            image[i * 4 + 1] = newPixel[1];
            image[i * 4 + 2] = newPixel[2];
        } else {
            image[i * 4] = nullOutR(image[i * 4]);
        }
    }
    return image;
}

//Parses an image and extracts a message within.
function parseImage (image) {
    message = "";
    for (var i = 0; i < image.length / 4; i++) {
        message += decode(image[i * 4], image[i * 4 + 1], image[i * 4 + 2]);
    }
    return message;
}










