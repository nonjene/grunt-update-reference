# grunt-update-reference

Grunt task for updating the changed resources's reference, to get cache bust.

## Feature

It can also instantly update reference of one file which its content not changed by us, but changed by this task.

Task will print colored change log in console, for checking what modify the task has done.

It will only match the file name.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [`gruntfile.js`](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-update-reference --save-dev
```

Once the plugin has been installed, it may be enabled inside your `gruntfile.js` with this line:

```js
grunt.loadNpmTasks('grunt-update-reference');
```
Then, add and configure it to your Gruntfile.js:

```js
grunt.initConfig({
    reference: {
        options:{
            //Define what files contain some reference.
            searchFileType: [ "*.html", "*.js", "*.css" ],
            //If has some file or path to ignore, path is base on "options.searchPathBase".
            searchIgnore:[ "ignore_me.html","ignore_me/**/*" ],
            //Task's log, "simple", "all" or "none"
            log:"simple"
        },
        dist: {
            options: {
                //The base path.
                searchPathBase: "./path_to",
                //Prevent watch instantly changes, which changed by this task.
                referenceIgnore:["*.html"]
            },
            //What kind of files that may needed to be update references.(path is not base on "options.searchPathBase")
            src: [ "path_to/**/*.{css,js,jpg,png,gif}" ]
        }
    }
  });
```



Run the `grunt reference` task:

If set `log` to "simple", the log will be like this: 

```bash
$ grunt reference

Running "reference:dist" (reference) task
Running "newer:reference_core:dist__path_to" (newer) task
Running "reference_core:dist__path_to" (reference_core) task

Assets: foo.jpg
refresh foo.jpg's reference in bar.css
refresh bar.css's reference in index.html

Done, without errors.
```

If set `log` to "all": 

```bash
$ grunt reference

Running "reference:dist" (reference) task
Running "newer:reference_core:dist__path_to" (newer) task
Running "reference_core:dist__path_to" (reference_core) task

Assets: foo.jpg
Scan changed files' reference in ./path_to
in file bar.css replace:
    background:url("./foo.jpg");
--->
    background:url("./foo.jpg?h=98e8485471");
File bar.css instantly changed, rescan path.
+       Scan changed files' reference in ./path_to
+       in file index.html replace:
+       <link href="./bar.css?v=2" rel="stylesheet" type="text/css" />
+       --->
+       <link href="./bar.css?h=98e8485471&v=2" rel="stylesheet" type="text/css" />

Done, without errors.
```


