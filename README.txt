This is code for hosting AnyCopy Web App on domain http://app.anycopy.io/,
which is pointing to the parse server that has been set up on digitalocean.

# You need to change your github page settings to under master/docs.



# Start dev version

```
1， git clone https://github.com/TonyTangAndroid/WebAppAnyCopyProd.git
2， cd WebAppAnyCopyProd
3， bower install 	# this is to install bower component
4， npm install 	# this is to install common js libs

5， Solved bug https://github.com/ParsePlatform/ParseReact/issues/161 by this patch
https://github.com/MonirAbuHilal/ParseReact/commit/541c46e5c974aa3832654f5540f6beb8ee789c6f
in ../anycopy-frontend/node_modules/parse-react/lib/browser/ParsePatches.js

Summary :

replace the following code in file /node_modules/parse-react/lib/browser/ParsePatches.js

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


6，replace parse server from https://api.parse.com/1 to https://parse.anycopy.io/prod under folder /node_modules.
7, gulp build 			# change some stuff and make sure it works, then run
8, remove
  <script type=text/javascript src=http://localhost:8080/docs/bundle.js charset=utf-8></script>
  from `docs/index.html` after build (DON'T TOUCH `app/index.html`)

9, push code to github.


