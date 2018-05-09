/**
 * Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
    writeFiles
};

function writeFiles() {
    return {
        generateWWW() {
            this.template('bin/www.ejs', 'bin/www');
        },
        generateAppJS() {
            this.template('app.js.ejs', 'app.js');
        },
        generateServerConfig() {
            this.template('config/index.js.ejs', 'config/index.js');
            this.template('config/database.js.ejs', 'config/database.js');
            this.template('config/passport.js.ejs', 'config/passport.js');
        },
        generateServerModels() {
            this.template('models/User.js.ejs', 'models/User.js');
        },
        generateServerRoutes() {
            this.template('routes/index.js.ejs', 'routes/index.js');
            this.template('routes/auth.js.ejs', 'routes/auth.js');
            this.template('routes/api/index.js.ejs', 'routes/api/index.js');
            this.template('routes/api/users.js.ejs', 'routes/api/users.js');
        },
    };
}
