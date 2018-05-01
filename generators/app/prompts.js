const chalk = require('chalk');

module.exports = {
    askForFrontendType,
    askForModuleName
};

function askForFrontendType(meta) {
    if (!meta && this.existingProject) return;

    const DEFAULT_FRONTEND_TYPE = 'angular';
    const PROMPT = {
        type: 'list',
        name: 'frontendType',
        message: `Which ${chalk.yellow('*frontend type*')} of application would you like to create?`,
        choices: [
            {
                value: DEFAULT_FRONTEND_TYPE,
                name: 'Angular based application (recommended)'
            },
            {
                value: 'react',
                name: 'React based application (Not available yet)',
                validate: (input) => {
                    return 'react is Not yet supported'
                }
            },
            {
                value: 'vue.js',
                name: 'React based application (Not available yet)',
                validate: (input) => {
                    return 'Vue.js is Not yet supported'
                }
            }
            
        ],
        default: DEFAULT_FRONTEND_TYPE
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then((prompt) => {
        this.frontendType = this.configOptions.frontendType = prompt.frontendType;
        done();
    });
}

function askForModuleName() {
    if (this.existingProject) return;

    this.askModuleName(this);
}