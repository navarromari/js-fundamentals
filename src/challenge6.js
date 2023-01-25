const fs = require('fs');

let dict = {};
let data = fs.readFileSync('src/character_set.txt', { encoding: 'utf8', flag: 'r' });
let lines = data.split('\n');
for (let i = 0; i < lines.length; i++) {
    let keyValue = lines[i].split(/\s,\s/);
    dict[keyValue[0]] = keyValue[1];
}

function encryptString(string) {
    let encryptedString = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] in dict) {
            encryptedString += dict[string[i]];
        }
        else {
            throw "Error: Character not found in dict";
        }
    }

    return encryptedString;
}

