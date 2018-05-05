import shelljs from 'shelljs';
import fs from 'fs';

export default function setupGradle(projectname) {
  shelljs.mkdir(projectname);
  shelljs.cd(projectname);
  shelljs.rm('-rf', '*');
  shelljs.exec('gradle init');
  shelljs.rm('build.gradle');
  fs.writeFileSync('build.gradle', gradletext(projectname));
  shelljs.mkdir('-p', `src/main/java/${projectname}`);
  shelljs.mkdir('-p', `src/test/java/${projectname}`);
  fs.writeFileSync(`src/main/java/${projectname}/App.java`, appText(projectname));
  shelljs.exec('gradle task');
}

function gradletext(projectname) {
  return `
plugins {
    id 'java'
    id 'application'
}

mainClassName = '${projectname}.App'

dependencies {
    compile 'com.google.guava:guava:23.0'
    compile 'io.javalin:javalin:1.6.1'

    testCompile 'junit:junit:4.12'
}

repositories {
    mavenCentral()
}
`;
}

function appText(projectname) {
  return `package ${projectname};

import io.javalin.Javalin;

public class App {
    public static void main(String[] args) {
        Javalin app = Javalin.start(7000);
        app.get("/", ctx -> ctx.result("Hello world!"));
    }
}
`;
}



