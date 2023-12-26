const fs = require('fs');


// READ FILE

async function readFile(__path) {
    var map = {};
    var lastEl = '';
    var stream = fs.createReadStream(__path);

    stream.on('data', (data) => {
        var chunk = data.toString();
        var ips = chunk.split('\n');
        ips[0] = lastEl + ips[0];
        
        lastEl = ips.pop();

        for (ip of ips) {
            map[ip] ||= 0;
            map[ip]++;
        }
    });

    stream.on('end', () => console.log(map));
}

readFile('ip-list.txt');


// WRITE FILE

var LOOPS_AMOUNT = 100;

async function writeFile(__path, ips) {
    var stream = fs.createWriteStream(__path);
    var AMOUNT_PER_WRITE = 100000;

    var chunk = '';
    var LOOP = 0;

    for (; LOOP < LOOPS_AMOUNT; LOOP++) {
        for (let j = 0; j < AMOUNT_PER_WRITE; j++) {
            ipNum = Math.floor(Math.random() * ips.length);
            chunk += ips[ipNum] + '\n';
        }

        stream.write(chunk);
        chunk = '';
    }

    console.log('Written successfully!')

    stream.end();
}

var ips = [
    '192.168.0.1',
    '10.0.0.2',
    '172.16.0.3',
    '203.0.113.4',
    '198.51.100.5',
    '172.217.20.6',
    '8.8.8.8',
    '185.199.108.9',
    '91.198.174.10',
    '27.118.80.11'
];

// writeFile('ip-list.txt', ips);