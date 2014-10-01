module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-html-snapshot');

  grunt.initConfig({
    htmlSnapshot: {
      all: {
        options: {
          snapshotPath: 'snapshots/',
          sitePath: 'http://localhost/assigncalc/angular', 
          urls: ['/','#?start=1412158185569&end=1414577385585'],
          replaceStrings:[
              {'ng-repeat="section in task.sections"': ''}
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['htmlSnapshot']);
};