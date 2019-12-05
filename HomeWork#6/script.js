//  1) Создать файл на 10 000 записей
// 2) Прочитать его по крупицам в потоке
// 3) Создать поток, который будет дописывать файл
// 4) Трансформ потока, один на апперкейз вводимых данных, второй на удаление цифр,
// третий на апдейт текста, то есть ловеркейз, но первая буква должна быть как у нормального предложения.
// 5) Создайте поток внутри второго трансформа в котором вы будете записывать
// удаленные цифры в отдельный файл также потоком и дополнительно новые данные, дату внесения, имя, фамилию и звание.


const readline = require('readline');
const fs = require('fs');


const fsWriteStream = fs.createWriteStream('./files/file');
const linesCount = 1e4;
// const linesCount = 10;

let fsReadStream;

let currentDate = new Date();
currentDate = `${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()} `;

let text = 'Lorem ipsum we3234 dolor 32 sit amet asdasds qwry1254 qwqwe5s 78554fdsa wo003l klkdsdls. lorem ipsum dolor sit amet\n';
let sign = '<< Marina Todorishina, web developer >>' + currentDate;


function writeFile() {
    for (let i = 0; i < linesCount; i++) {
        addToFile(text);
    }
    return true;
}

function readFile() {
    fsReadStream = fs.readFileSync('./files/file', 'UTF-8');

    const lines = fsReadStream.split(/\n/);

    lines.forEach((line, index) => {
        readFileByLine(line, index, lines.length);

    })

}

function readFileByLine(line, index, fileLength) {

    // output lines with timer


    // (function () {
    //
    //     setTimeout(() => {
    //         console.log('Line', index, ': ', line);
    //         transform(line);
    //
    //         if (index === fileLength - 1) {
    //             waitForInput();
    //         }
    //     }, 1500 + 300 * index);
    //
    // })(index)


    // output lines without timer
    console.log('Line', index, ': ', line);
    transform(line);

    if (index === fileLength - 1) {
        waitForInput();
    }

}

function waitForInput() {

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.on('line', (line) => {
        console.log(line);
        addToFile(line + '\n');
        transform(line);
    })

}


function transform(line) {

    this.toUppercase = () => {
        console.log('line ', line.toUpperCase())
    }

    this.replaceNubers = () => {
        let newString = line.replace(new RegExp("[0-9]", "g"), '');
        let digits = line.replace(new RegExp("[^0-9]", "g"), '');

        console.log('line ', newString);
        addToFile(digits + '\n');
    }

    this.toUppercase();
    this.replaceNubers();
}


function addToFile(data) {
    fsWriteStream.write(data)
}


Promise.all([
    fs.mkdir('./files', function()  {
        return 'Dir created!';
    }),
    writeFile()])
    .then((response) => {

        console.log(response);

        if (response) {
            setTimeout(() => {
                readFile();
            }, 1500)
        }

    });