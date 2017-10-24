const PackMule = require('../src/index');

const options = {
    region: "us-east-1"
}

var packmule = new PackMule(options);

packmule.createFS('abcdefghijklmnopqrstuvwxyz');
