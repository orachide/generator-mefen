'use strict';
const CommonBaseGenerator = require('../generator-base-common');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const _ = require('lodash');
const prompts = require('./prompts');
const packagejs = require('../../package.json');

module.exports = class extends CommonBaseGenerator {
  
  constructor(args, opts) {
    super(args, opts);

    this.configOptions = {};
  }

  get initializing() {
    return {
      displayLogo() {
        this.printMefenLogo();
      },
      
      validateYarn() {
        this.checkYarn();
      },
      // Read from config (.yo-rc.json) otherwise default value
      setupconsts() {
        this.frontendType = this.config.get('frontendType');
        if (!this.frontendType) {
          this.frontendType = 'angular';
        }
        this.baseName = this.config.get('baseName');
        this.mefenVersion = packagejs.version;
        this.clientPackageManager = this.config.get('clientPackageManager');
        this.testFrameworks = this.config.get('testFrameworks');
        const configFound = this.baseName !== undefined && this.frontendType !== undefined;
        if (configFound) {
            this.existingProject = true;
        }
        if (!this.clientPackageManager) {
            if (this.useYarn) {
                this.clientPackageManager = 'yarn';
            } else {
                this.clientPackageManager = 'npm';
            }
        }
      }
    }
  }
  
  get prompting() {
    return {
      askForApplicationType: prompts.askForFrontendType,
      askForModuleName: prompts.askForModuleName
    };
  }

  get configuring() {
    return {
      composeServer() {
        if (this.skipServer) return;

        this.composeWith(require.resolve('../server'), {
            'client-hook': !this.skipClient,
            configOptions: this.configOptions,
            force: this.options.force,
            debug: this.isDebugEnabled
        });
      },

      composeClient() {
          if (this.skipClient) return;

          this.composeWith(require.resolve('../client'), {
              'skip-install': this.options['skip-install'],
              'skip-commit-hook': this.options['skip-commit-hook'],
              configOptions: this.configOptions,
              force: this.options.force,
              debug: this.isDebugEnabled
          });
      },
    }
  }

  get default() {
    return {
      saveConfig() {
        this.config.set('mefenVersion', packagejs.version);
        this.config.set('frontendType', this.frontendType);
        this.config.set('baseName', this.baseName);
        this.config.set('testFrameworks', this.testFrameworks);
        this.config.set('clientPackageManager', this.clientPackageManager);
      }
    }
  }

  get writing() {
    
    return {
      generatePackageJSON(){
        this.dasherizedBaseName = _.kebabCase(this.baseName);
        this.template('_package.json.ejs', 'package.json');
      },
      generateWWW(){
        this.template('bin/www.ejs', 'bin/www');
      },
      generateAppJS(){
        this.template('app.js.ejs', 'app.js');
      },
      sourceCommonFiles(){
        this.template('editorconfig.ejs', '.editorconfig');
        this.template('gitattributes.ejs', '.gitattributes');
        this.template('gitignore.ejs', '.gitignore');
        this.template('README.md.ejs', 'README.md');
      }
    }
  }

  install() {
    const logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;
    const installConfig = {
      bower: false,
      npm: this.clientPackageManager !== 'yarn',
      yarn: this.clientPackageManager === 'yarn'
    };
    if (this.options['skip-install']) {
      this.log(logMsg);
    } else {
      this.installDependencies(installConfig);
    }
  }
};
