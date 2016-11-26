This is code for hosting http://app.anycopy.io/

Now it is pointing to the parse server that I setup manually on digital ocean.


# Start dev version

```
1， git clone git@github.com:bobintornado/anycopy-ui-demo.git
2， cd anycopy-ui-demo
3， bower install 	# this is to install bower component
4， npm install 	# this is to install common js libs


5， Solved bug

https://github.com/ParsePlatform/ParseReact/issues/161

by this patch

https://github.com/MonirAbuHilal/ParseReact/commit/541c46e5c974aa3832654f5540f6beb8ee789c6f

in ../anycopy-frontend/node_modules/parse-react/lib/browser/ParsePatches.js

replace

  logOut: function logOut() {
    var promise = oldLogOut();
    LocalSubscriptions.currentUser.update();
    return promise;
  }


to


  logOut: function logOut() {
     return oldLogOut().then(function() {
     LocalSubscriptions.currentUser.update();
     });
  }



6，replace parse server from https://api.parse.com/1 to https://parse.anycopy.io/prod in bundle.js



7, gulp 			# default task is to serve development copy
```

# Basic Info

A Redux + React front-end app.

Back-end on Parse.

# Automation

Gulp + Webpack

# Build/Deploy Script

change some stuff and make sure it works, then run

```
gulp build
```

After build commit changes to master branch

```
git add -A
git commit -m "update"
git push
```

Lastly push docs folder to gh-pages branch to link up production

```
git subtree push --prefix docs origin gh-pages
```

# Optional Deploy Optimization

This is optional and will not affect production functionality

remove

```
<script type=text/javascript src=http://localhost:8080/docs/bundle.js charset=utf-8></script>
```

from `docs/index.html` after build (DON'T TOUCH `app/index.html`)


# Issue with git subtree

when rejected, use

```
git push origin `git subtree split --prefix docs master`:gh-pages --force
```

to force update, due to git is not using fast forward on subtree command by default
