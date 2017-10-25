<h1 align="center">
  pack mule
  <br>
</h1>

<h4 align="center">Simple wrapper for creating <a href="https://aws.amazon.com/efs/">elastic file-systems</a> on AWS.</h4>

<br>

We created this project since one of our ci build processes requires +80GB of storage. Popular docker-based CI tools (i.e. travis, shippable) have limited space, hence we had to get creative. Packmule creates a file storage on AWS that can then be mounted remotely on the CI instance via NFS.


## How to use

Install
```
npm install aws-packmule --save
```

<br>

Initialize
```js
const PackMule = require('aws-packmule');

//aws configuration
const options = {
    region: "us-east-1"
};

var packmule = new PackMule(options);
```

<br>

To create a file-system
```js
var tags = [
    {
        Key: "Corporation",
        Value: "Black Mesa"
    }
];

//the first parameter should be a unique identifier
packmule.createFS('abcdefghijklmnopqrstuvwxyz', tags, function(err, data) {
    if (err) {
        console.log(err, err.stack);
        return;
    }

    console.log(data);
});
```
**if you don't want any custom tags, pass in `[]` **

<br>

To delete a file-system
```js
packmule.destroyFS('abcdefghijklmnopqrstuvwxyz', function(err, data) {
    if (err) {
        console.log(err, err.stack);
        return;
    }

    console.log("I'm Pickle Riiiiick");
});
```
