Install
-------

0. [Download it](https://github.com/jmas/frontend-skeleton/archive/master.zip)
1. Use command `npm i` to install dependencies
2. Make symlink to sources directory `ln -s ../frontend-src ./src`

Usage
-----

0. Run command `gulp`
1. [Install LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) to Google Chrome plugin
2. Open [http://localhost:1337/](http://localhost:1337/) (note: you'll get `src/index.jade`)
3. Make changes in `src/*.jade` files and look on page opened in Google Chrome

Directories
-----------

* `src/*.jade` - jade page templates
* `src/layouts/*.jade` - jade layouts templates (used by `extends` in pages)
* `src/partials/*jade` - jade partial templates (used by `include` in pages or layouts)
* `src/stylesheets/all.scss` - scss base includes (do not contain any real CSS selector, only `import` or `include`)
* `src/stylesheets/partials/*.scss` - styles for partials (like components)
* `src/scripts/*.js` - scripts
* `dist/` - compiled html and assets
* other directories are service
