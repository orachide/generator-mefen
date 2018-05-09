const chalk = require('chalk');

module.exports = {
    askForFrontendType
};

function askForFrontendType(meta) {
    if (!meta && this.frontendType) return;

    const DEFAULT_FRONTEND_TYPE = 'angular';
    const PROMPT = {
        type: 'list',
        name: 'frontendType',
        message: `${chalk.yellow('[FrontEnd]:')}Which ${chalk.yellow('*frontend type*')} of application would you like to create?`,
        choices: [
            {
                value: DEFAULT_FRONTEND_TYPE,
                name: 'Angular based application (recommended)'
            },
            {
                value: 'react',
                name: 'React based application (Not available yet)',
                validate: input => 'react is Not yet supported'
            },
            {
                value: 'vue.js',
                name: 'VueJs based application (Not available yet)',
                validate: input => 'Vue.js is Not yet supported'
            }

        ],
        store: true,
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
