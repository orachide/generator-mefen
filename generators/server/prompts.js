const chalk = require('chalk');

module.exports = {
    askForDatabaseType
};

function askForDatabaseType(meta) {
    if (!meta && this.databaseType) return;

    const DEFAULT_DATABASE_TYPE = 'MongoDB';
    const PROMPT = {
        type: 'list',
        name: 'databaseType',
        message: `${chalk.yellow('[Backend]:')} Select a database to use:`,
        choices: [
            'None',
            'MongoDB',
            'MySQL',
            'PostgreSQL',
            'RethinkDB',
            'SQLite',
        ],
        store: true,
        default: DEFAULT_DATABASE_TYPE
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then((prompt) => {
        this.databaseType = this.configOptions.databaseType = prompt.databaseType;
        done();
    });
}
