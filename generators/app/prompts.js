const chalk = require('chalk');

module.exports = {
    askForModuleName,
    askForApplicationType
};

function askForApplicationType(meta) {
    if (!meta && this.existingProject) return;

    const DEFAULT_APPTYPE = 'full-stack';
    const PROMPT = {
        type: 'list',
        name: 'applicationType',
        message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
        choices: [
            {
                value: DEFAULT_APPTYPE,
                name: 'Generate Frontend & Backend (recommended for most users)'
            },
            {
                value: 'frontend-only',
                name: 'Generate Frontend only project'
            },
            {
                value: 'Electron',
                name: 'Generate Electron App'
            }
        ],
        store: true,
        default: DEFAULT_APPTYPE
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.skipServer
        ? Promise.resolve({ applicationType: DEFAULT_APPTYPE })
        : this.prompt(PROMPT);
    promise.then((prompt) => {
        this.applicationType = this.configOptions.applicationType = prompt.applicationType;
        done();
    });
}

function askForModuleName() {
    if (this.existingProject) return;
    this.askModuleName(this);
}
