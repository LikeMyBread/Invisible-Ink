//Takes in r, g, and b values and a character, returns new r, g, and b values.
function encode (r, g, b, character) {
    code = character.charCodeAt("0");
    mBlue = code % 8;
    mGreen = parseInt(code / 8) % 8;
    mRed = parseInt(code / 64) % 8;
    var b2 = b - (b % 8) + mBlue;
    var g2 = g - (g % 8) + mGreen;
    var r2 = r - (r % 8) + mRed;
    if (mBlue < 5 && b2 + 8 < 255) {
        b2 += 8;
    }
    if (mGreen < 5 && g2 + 8 < 255) {
        g2 += 8;
    }
    if (mRed < 5 && r2 + 8 < 255) {
        r2 += 8;
    }
    return ([r2, g2, b2]);
}

//Extracts a stored character from a single pixel
function decode (r, g, b, a) {
    if (r % 8 > 4 || a < 1) {
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
    var j = 0;
    for (var i = 0; i < image.length / 4; i++) {
        image[i * 4 + 3] = 255; //makes the image opaque :(
        if (j < message.length && image[i * 4 + 3] > 0) {
            newPixel = encode(image[i * 4], image[i * 4 + 1], image[i * 4 + 2], message[j]);
            image[i * 4] = newPixel[0];
            image[i * 4 + 1] = newPixel[1];
            image[i * 4 + 2] = newPixel[2];
            j++;
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
        message += decode(image[i * 4], image[i * 4 + 1], image[i * 4 + 2], image[i * 4 + 3]);
    }
    return message;
}