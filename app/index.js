'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');
var chalk = require('chalk');

/**
*  Generator for constructing a simple node module.
*/
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  /**
  *  Asks for details about the module.
  */
  prompting: function () {
    // See: https://github.com/SBoudrias/Inquirer.js
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Service Name',
      }, {
        type: 'input',
        name: 'displayName',
        message: 'Service display name (if different)',
      },{
        type: 'input',
        name: 'description',
        message: 'Description',
      }, {
        type: 'input',
        name: 'port',
        message: 'Service Port',
        default: 8080,
      },
      {
       type: 'input',
       name: 'dockerHandle',
       message: 'Docker Handle',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author Name',
      },{
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email',
      },{
        type: 'input',
        name: 'authorUrl',
        message: 'Author Url',
      }, {
        type: 'input',
        name: 'githubUrl',
        message: 'Github Url',
      },{
        name: 'keywords',
        message: 'Key your keywords (comma to split)',
        filter: _.words,
        default: 'service',
      }
    ])
    .then(function (answers) {
        // Store values.
        answers.name = answers.name || 'unnamed';
        answers.displayName = answers.displayName || answers.name;
        answers.authorName = answers.authorName || 'Someone';
        answers.baseUrl = '';
        if (answers.githubUrl !== '') {
          answers.baseUrl = answers.githubUrl.split('.git')[0]
        }
        this.strings = answers;
    }.bind(this));
  },

  /**
  *  Copy over the file templates.
  */
  writing: function () {
    var copy = function (file, copyTo, args) {
                  args = args || this.strings;
                  this.fs.copyTpl(
                    this.templatePath(file),
                    this.destinationPath(file),
                    this.strings
                  );
                }.bind(this);
    copy('rs/service.yml');
    copy('service/integration-test/.babelrc');
    copy('service/integration-test/docker-compose.yml');
    copy('service/integration-test/Dockerfile');
    copy('service/integration-test/index.js');
    copy('service/integration-test/package.json');
    copy('service/integration-test/README.md');
    copy('service/integration-test/test.sh');
    copy('service/src/healthRouter.js');
    copy('service/src/index.js');
    copy('service/src/logging.js');
    copy('service/src/Router.js');
    copy('service/src/symbols.js');
    copy('service/test/Router.test.js');
    copy('service/test/healthRouter.test.js');
    copy('service/.babelrc');
    copy('service/.eslintrc');
    copy('service/package.json');
    copy('service/README.md');
    copy('.gitignore');
    copy('.travis.yml');
    copy('docker-compose.yml');
    copy('docker-compose-dev.yml');
    copy('Dockerfile');
    copy('local_deploy.sh');
    copy('README.md');
  },

  default: function() {
    this.composeWith('license', {
      options: {
        name: this.strings.authorName,
        email: this.strings.authorEmail,
        website: this.strings.authorUrl
      }
    }, {
      local: require.resolve('generator-license/app')
    });
  }
});
