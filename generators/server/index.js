
const CommonBaseGenerator = require('../generator-base-common');
const prompts = require('./prompts');
const writeFiles = require('./files').writeFiles;

module.exports = class extends CommonBaseGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
    }

    get initializing() {
        return {

            // Read from config (.yo-rc.json) otherwise default value
            setupconsts() {
                this.databaseType = this.config.get('databaseType');
                if (!this.databaseType) {
                    this.databaseType = 'angular';
                }
            }
        };
    }

    get prompting() {
        return {
            askForDatabaseType: prompts.askForDatabaseType
        };
    }

    get configuring() {
        return {
        };
    }

    get default() {
        return {
            saveConfig() {
                this.config.set('databaseType', this.databaseType);
            }
        };
    }

    get writing() {
        return writeFiles();
    }

    install() {
    }
};
