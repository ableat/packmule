"use strict";

const AWS = require('aws-sdk');
var efs;

function PackMule(options) {
    if (typeof options !== 'object') {
        throw new Error("PackMule expects type: object for \"options\".");
    }

    AWS.config.update(options);
    efs = new AWS.EFS();
};

PackMule.prototype.createFS = function(token) {
    if (typeof token !== 'string') {
        throw new Error("create method expects type: string for \"token\".");
    }

    var params = {
        CreationToken: token,
        Encrypted: true,
        PerformanceMode: 'generalPurpose'
    };
    efs.createFileSystem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return;
        }
    });
};

PackMule.prototype.destroyFS = function(token) {
    var self = this;

    if (typeof token !== 'string') {
        throw new Error("create method expects type: string for \"token\".");
    }

    var params = {
        CreationToken: token
    };

    efs.describeFileSystems(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return;
        } else /* successful response! */  {
            var fileSystems = data.FileSystems;

            if (fileSystems.length > 1) {
                throw new Error('describeFileSystems method returned an array greater than one.')
            }

            this.fileSystemId = fileSystems[0].FileSystemId;

            params = {
                FileSystemId: this.fileSystemId
            };
            efs.deleteFileSystem(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    return;
                }
            });
        }
    });
};

module.exports = PackMule;
