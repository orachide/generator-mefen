
const CommonBaseGenerator = require('../generator-base-common');
const prompts = require('./prompts');

module.exports = class extends CommonBaseGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.configOptions = this.options.configOptions || {};
    }

    get initializing() {
        return {

            // Read from config (.yo-rc.json) otherwise default value
            setupconsts() {
                this.frontendType = this.config.get('frontendType');
                if (!this.frontendType) {
                    this.frontendType = 'angular';
                }
            }
        };
    }

    get prompting() {
        return {
            askForFrontendType: prompts.askForFrontendType
        };
    }

    get configuring() {
        return {
        };
    }

    get default() {
        return {
            saveConfig() {
                this.config.set('frontendType', this.frontendType);
            }
        };
    }

    get writing() {
        return {
        };
    }

    install() {
    }
};
