const fs = require('fs');

let dict = {};
let decryptDict = {};
let data = fs.readFileSync('src/character_set.txt', { encoding: 'utf8', flag: 'r' });
let lines = data.split('\n');
for (let i = 0; i < lines.length; i++) {
    let keyValue = lines[i].split(/\s,\s/);
    dict[keyValue[0]] = keyValue[1];
    decryptDict[keyValue[1]] = keyValue[0];
}

class LetterNumber {
    static encrypt(plaintext, key) {
        let ciphertext = "";
        for (let i = 0; i < plaintext.length; i++) {
            if (plaintext[i] in dict) {
                if (parseInt(dict[plaintext[i]]) + key > 99)
                    //parsing the string values to int so I can do the math I needed and then converting the result to string so I can add correctly to the ciphertext string
                    if (parseInt(dict[plaintext[i]]) + key - Math.floor((parseInt(dict[plaintext[i]]) + key) / 100) * 100 < 10) {
                        ciphertext += '0' + (parseInt(dict[plaintext[i]]) + key - Math.floor((parseInt(dict[plaintext[i]]) + key) / 100) * 100).toString();
                    }
                    else {
                        ciphertext += (parseInt(dict[plaintext[i]]) + key - Math.floor((parseInt(dict[plaintext[i]]) + key) / 100) * 100).toString();
                    }

                else if (parseInt(dict[plaintext[i]]) + key < 10) {
                    ciphertext += '0' + (parseInt(dict[plaintext[i]]) + key).toString();
                }
                else {
                    ciphertext += (parseInt(dict[plaintext[i]]) + key).toString();
                }
            }
            else {
                throw "Error: Character not found in dict";
            }
        }

        return ciphertext;
    }

    static decrypt(ciphertext, key) {
        let plaintext = "";
        for (let i = 0; i < ciphertext.length; i += 2) {
            let cipherChar = parseInt(ciphertext.substring(i, i + 2));
            if (ciphertext[i] === '0') {
                cipherChar = parseInt(ciphertext[i + 1]);
            }

            if (cipherChar - (key - Math.floor(key / 100) * 100) < 0) {
                plaintext += decryptDict[cipherChar - (key - Math.floor(key / 100) * 100) + 100];
            }
            else {
                plaintext += decryptDict[cipherChar - (key - Math.floor(key / 100) * 100)];
            }
        }

        return plaintext;
    }


}

let dict2 = {};
let decryptDict2 = {};
let data2 = fs.readFileSync('src/character_set2.txt', { encoding: 'utf8', flag: 'r' });
let lines2 = data2.split('\n');
for (let i = 0; i < lines2.length; i++) {
    let keyValue = lines2[i].split(/\s,\s/);
    dict2[keyValue[0]] = keyValue[1];
    decryptDict2[keyValue[1]] = keyValue[0];
}
class LetterLetter {
    static encrypt(plaintext, key) {
        let ciphertext = "";
        for (let i = 0; i < plaintext.length; i++) {
            if (plaintext[i] in dict2) {
                ciphertext += dict2[plaintext[i]];
            }
            else {
                throw "Error: Character not found in dict";
            }
        }

        return ciphertext;
    }

    static decrypt(ciphertext, key) {
        let plaintext = "";
        for (let i = 0; i < ciphertext.length; i++) {
            plaintext += decryptDict2[ciphertext[i]]
        }
        return plaintext;
    }

}

