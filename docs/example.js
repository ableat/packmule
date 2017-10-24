const PackMule = require('../src/index');

const options = {
    region: "us-east-1"
};

var packmule = new PackMule(options);

var tags = [
    {
        Key: "AAT_Service",
        Value: "Continuous_Integration"
    }
];

packmule.createFS('abcdefghijklmnopqrstuvwxyz', tags, function() {
    console.log("I'm Pickle Riiiiick");
});
