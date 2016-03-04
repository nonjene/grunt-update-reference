# grunt-update-reference

Grunt task for updating the newer changed resources's reference, to achieve cache bust.

## Feature

It can also instantly update reference of one file which its content not changed by us, but changed by this task(updating reference).

It can identify the newer file(first run will consider all match file is newer), it will configure other two task to achieve it (newer check is achieved by [grunt-newer](https://github.com/tschaub/grunt-newer),
it will load automatically if it haven't installed in your project).

Task will print colored change log in console, for checking what modify the task has done.

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
            //The files contain some reference.
            searchFileType: [ "*.html", "*.js", "*.css" ],
            //If has some file/path to ignore, path is base on "options.searchPathBase". Default is [".*/**/*",".*"]
            ignore:"",
            //True to enble newer check. Default is true. Set false to prevent checking newer file.
            newer:true
        },
        dist: {
            options: {
                //The base path.
                searchPathBase: "./path"
            },
            //The reference's file.
            src: [ "path/**/*.{css,js,jpg,png,gif}" ]
        }
    }
  });
```

Run the `grunt reference` task:

```bash
$ grunt reference
Running "reference:dist" (reference) task
Preparing TO Check New Files...

Running "newer:reference_core:dist__path" (newer) task

Running "reference_core:dist__path" (reference_core) task
File Changed: foo.jpg
scan files in ./path
check 'foo.jpg' in bar.css
in file bar.css replace:
    background:url("./foo.jpg");
--->
    background:url("./foo.jpg?t=1456071676251");
File bar.css instantly changed, rescan path.
+       scan files in ./path
+       check 'bar.css' in index.html
+       in file index.html replace:
+       <link href="./bar.css?v=2" rel="stylesheet" type="text/css" />
+       --->
+       <link href="./bar.css?t=1456071676251&v=2" rel="stylesheet" type="text/css" />

Done, without errors.
```