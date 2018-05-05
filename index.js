#! /usr/bin/env babel-node

import shelljs from 'shelljs';
import program from 'commander';
import setupGradle from './setup/setup-gradle';

program
  .usage('[command] [option] ...')
  .version('0.1.0', '-v --version');

program
  .command('new [option] [project]')
  .description('create javalin project')
  .option('--java', 'create java project')
  .option('--kotlin', 'create kotlin project')
  .action((projectname, options) => {
    if (!projectname) {
      console.log('javalin new [project]');
      return;
    }
    setupGradle(projectname);
  });

program.parse(process.argv);
