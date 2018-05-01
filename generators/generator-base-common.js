const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const Generator = require('yeoman-generator');
const chalk = require('chalk');

const packagejs = require('../package.json');
const mefenUtils = require('./utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        // this.env.options.appPath = this.config.get('appPath') || CLIENT_MAIN_SRC_DIR;
        // expose lodash to templates
        this._ = _;
    }

    /**
     * Utility function to copy and process templates.
     *
     * @param {string} source - source
     * @param {string} destination - destination
     * @param {*} generator - reference to the generator
     * @param {*} options - options object
     * @param {*} context - context
     */
    template(source, destination, generator, options = {}, context) {
        const _this = generator || this;
        const _context = context || _this;
        mefenUtils.renderContent(source, _this, _context, options, (res) => {
            _this.fs.write(_this.destinationPath(destination), res);
        });
    }

    /**
     * Utility function to copy files.
     *
     * @param {string} source - Original file.
     * @param {string} destination - The resulting file.
     */
    copy(source, destination) {
        this.fs.copy(this.templatePath(source), this.destinationPath(destination));
    }

    /**
     * Print a debug message.
     *
     * @param {string} msg - message to print
     * @param {string[]} args - arguments to print
     */
    debug(msg, ...args) {
        if (this.isDebugEnabled || (this.options && this.options.debug)) {
            this.log(`${chalk.yellow.bold('DEBUG!')} ${msg}`);
            args.forEach(arg => this.log(arg));
        }
    }

    /**
     * ask a prompt for apps name.
     *
     * @param {object} generator - generator instance to use
     */
    askModuleName(generator) {
        const done = generator.async();
        const defaultAppBaseName = this.getDefaultAppName();
        generator.prompt({
            type: 'input',
            name: 'baseName',
            validate: (input) => {
                if (!(/^([a-zA-Z0-9_]*)$/.test(input))) {
                    return 'Your application name cannot contain special characters or a blank space';
                }
                return true;
            },
            message: 'What is the base name of your application?',
            default: defaultAppBaseName
        }).then((prompt) => {
            generator.baseName = prompt.baseName;
            done();
        });
    }

    getDefaultAppName() {
        return (/^[a-zA-Z0-9_]+$/.test(path.basename(process.cwd()))) ? path.basename(process.cwd()) : 'mefen';
    }

    /**
     * Print an error message.
     *
     * @param {string} msg - message to print
     */
    error(msg) {
        this.env.error(`${chalk.red.bold('ERROR!')} ${msg}`);
    }

    /**
     * Print a warning message.
     *
     * @param {string} msg - message to print
     */
    warning(msg) {
        this.log(`${chalk.yellow.bold('WARNING!')} ${msg}`);
    }

    /**
     * Print an info message.
     *
     * @param {string} msg - message to print
     */
    info(msg) {
        this.log.info(msg);
    }

    /**
     * Print a success message.
     *
     * @param {string} msg - message to print
     */
    success(msg) {
        this.log.ok(msg);
    }

    /**
     * Check if Yarn is installed
     */
    checkYarn() {
        if (this.skipChecks || !this.useYarn) return;
        const done = this.async();
        exec('yarn --version', (err) => {
            if (err) {
                this.warning(
                    'yarn is not found on your computer.\n',
                    ' Using npm instead'
                );
                this.useYarn = false;
            } else {
                this.useYarn = true;
            }
            done();
        });
    }

     /**
     * Prints a JHipster logo.
     */
    printMefenLogo() {
        this.log('\n');
        this.log(`${chalk.red(' .----------------.  .----------------.')}${chalk.green('   .----------------.  .----------------.')}${chalk.red('   .-----------------.')}`);
        this.log(`${chalk.red(' | .--------------. || .--------------.')}${chalk.green('  || .--------------. || .--------------.')}${chalk.red('  || .--------------. |')}`);
        this.log(`${chalk.red(' | | ____    ____ | || |  _________   |')}${chalk.green('  || |  _________   | || |  _________   |')}${chalk.red('  || | ____  _____  | |')}`);
        this.log(`${chalk.red(' | ||_   \  /   _|| || | |_   ___  |  |')}${chalk.green('  || | |_   ___  |  | || | |_   ___  |  |')}${chalk.red('  || ||_   \\|_   _| | |')}`);
        this.log(`${chalk.red(' | |  |   \/   |  | || |   | |_  \_|  |')}${chalk.green('  || |   | |_  \_|  | || |   | |_  \_|  |')}${chalk.red('  || |  |   \\ | |   | |')}`);
        this.log(`${chalk.red(' | |  | |\  /| |  | || |   |  _|  _   |')}${chalk.green('  || |   |  _|      | || |   |  _|  _   |')}${chalk.red('  || |  | |\\ \\| |   | |')}`);
        this.log(`${chalk.red(' | | _| |_\/_| |_ | || |  _| |___/ |  |')}${chalk.green('  || |  _| |_       | || |  _| |___/ |  |')}${chalk.red('  || | _| |_\\   |_  | |')}`);
        this.log(`${chalk.red(' | ||_____||_____|| || | |_________|  |')}${chalk.green('  || | |_____|      | || | |_________|  |')}${chalk.red('  || ||_____|\\____| | |')}`);
        this.log(`${chalk.red(' | |              | || |              |')}${chalk.green('  || |              | || |              |')}${chalk.red('  || |              | |')}`);
        this.log(`${chalk.red(' | \'--------------\' || \'--------------\'')}${chalk.green('  || \'--------------\' || \'--------------\'')}${chalk.red('  || \'--------------\' |')}`);
        this.log(`${chalk.red(' \'----------------\'  \'----------------\'')}${chalk.green('   \'----------------\'  \'----------------\'')}${chalk.red('   \'----------------\' ')}`);
        this.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
        this.log(chalk.white('Welcome to the Mefen Generator ') + chalk.yellow(`v${packagejs.version}`));
        this.log(chalk.green(' _______________________________________________________________________________________________________________\n'));
        this.log(chalk.white(`  If you find JHipster useful consider supporting our collective ${chalk.yellow('https://opencollective.com/generator-jhipster')}`));
        this.log(chalk.white(`  Documentation for creating an application: ${chalk.yellow('https://www.jhipster.tech/creating-an-app/')}`));
        this.log(chalk.green(' _______________________________________________________________________________________________________________\n'));
        this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
    }

    /**
     * write the given files using provided config.
     *
     * @param {object} files - files to write
     * @param {object} generator - the generator instance to use
     * @param {boolean} returnFiles - weather to return the generated file list or to write them
     * @param {string} prefix - pefix to add to path
     */
    writeFilesToDisk(files, generator, returnFiles, prefix) {
        const _this = generator || this;
        const filesOut = [];
        const startTime = new Date();
        // using the fastest method for iterations
        for (let i = 0, blocks = Object.keys(files); i < blocks.length; i++) {
            for (let j = 0, blockTemplates = files[blocks[i]]; j < blockTemplates.length; j++) {
                const blockTemplate = blockTemplates[j];
                if (!blockTemplate.condition || blockTemplate.condition(_this)) {
                    const path = blockTemplate.path || '';
                    blockTemplate.templates.forEach((templateObj) => {
                        let templatePath = path;
                        let method = 'template';
                        let useTemplate = false;
                        let options = {};
                        let templatePathTo;
                        if (typeof templateObj === 'string') {
                            templatePath += templateObj;
                        } else {
                            if (typeof templateObj.file === 'string') {
                                templatePath += templateObj.file;
                            } else if (typeof templateObj.file === 'function') {
                                templatePath += templateObj.file(_this);
                            }
                            method = templateObj.method ? templateObj.method : method;
                            useTemplate = templateObj.template ? templateObj.template : useTemplate;
                            options = templateObj.options ? templateObj.options : options;
                        }
                        if (templateObj && templateObj.renameTo) {
                            templatePathTo = path + templateObj.renameTo(_this);
                        } else {
                            templatePathTo = templatePath.replace(/([/])_|^_/, '$1');
                            templatePathTo = templatePath.replace('.ejs', '');
                        }
                        filesOut.push(templatePathTo);
                        if (!returnFiles) {
                            let templatePathFrom = prefix ? `${prefix}/${templatePath}` : templatePath;
                            if (
                                !templateObj.noEjs && !templatePathFrom.endsWith('.png')
                                && !templatePathFrom.endsWith('.jpg') && !templatePathFrom.endsWith('.gif')
                                && !templatePathFrom.endsWith('.svg') && !templatePathFrom.endsWith('.ico')
                            ) {
                                templatePathFrom = `${templatePathFrom}.ejs`;
                            }
                            // if (method === 'template')
                            _this[method](templatePathFrom, templatePathTo, _this, options, useTemplate);
                        }
                    });
                }
            }
        }
        this.debug(`Time taken to write files: ${new Date() - startTime}ms`);
        return filesOut;
    }
}