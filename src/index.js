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

PackMule.prototype.createFS = function(token, customTags, callback) {
    var params;

    if (typeof token !== 'string') {
        throw new Error("create method expects type: string for \"token\".");
    }

    if (typeof customTags !== 'object') {
        throw new Error("create method expects type: array for \"customTags\".");
    }

    params = {
        CreationToken: token,
        Encrypted: true,
        PerformanceMode: 'generalPurpose'
    };
    efs.createFileSystem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return;
        }

        var defaultTags = [
            {
                Key: "Name",
                Value: "packmule"
            }
        ];

        if (typeof customTags[0] !== 'undefined') {
            defaultTags = defaultTags.concat(customTags);
        };

        params = {
            FileSystemId: data.FileSystemId,
            Tags: defaultTags
        };

        efs.createTags(params, function(ierr, idata) {
            if (typeof callback === "function") {
                if (err) ierr = err;
                callback(ierr, data);
            }
        });
    });
};

PackMule.prototype.destroyFS = function(token, callback) {
    var self = this;
    var params;

    if (typeof token !== 'string') {
        throw new Error("create method expects type: string for \"token\".");
    }

    params = {
        CreationToken: token
    };

    efs.describeFileSystems(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return;
        } else /* successful response! */  {
            var fileSystems = data.FileSystems;

            if (fileSystems.length > 1) {
                throw new Error('describeFileSystems method returned an array greater than one.');
            } else if (fileSystems.length === 0) {
                throw new Error('describeFileSystems method returned an array of length zero.');
            }

            this.fileSystemId = fileSystems[0].FileSystemId;

            params = {
                FileSystemId: this.fileSystemId
            };
            efs.deleteFileSystem(params, function(err, data) {
                if (typeof callback === "function") {
                    callback(err, data);
                }
            });
        }
    });
};

module.exports = PackMule;
