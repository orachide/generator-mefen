module.exports = {
    app: {
        default: true,
        desc: 'Create a new Mefen application based on the selected options'
    },
    'ci-cd': {
        desc: 'Create pipeline scripts for popular Continuous Integration/Continuous Deployment tools'
    },
    client: {
        desc: 'Create a new Mefen client-side application based on the selected options'
    },
    'docker-compose': {
        desc: 'Create all required Docker deployment configuration for the selected applications'
    },
    entity: {
        argument: ['name'],
        desc: 'Create a new Mefen entity: JPA entity, Spring server-side components and Angular client-side components'
    },
    heroku: {
        desc: 'Deploy the current application to Heroku'
    },
    info: {
        desc: 'Display information about your current project and system'
    },
    kubernetes: {
        desc: 'Deploy the current application to Kubernetes'
    },
    languages: {
        argument: ['languages...'],
        desc: 'Select languages from a list of available languages. The i18n files will be copied to the /webapp/i18n folder'
    },
    openshift: {
        desc: 'Deploy the current application to OpenShift'
    },
    server: {
        desc: 'Create a new Mefen server-side application'
    },
    upgrade: {
        desc: 'Upgrade the Mefen version, and upgrade the generated application'
    }
};
