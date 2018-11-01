/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('HeaderCtrl', function ($scope, $rootScope, $location, $http, $window) {
    // Log out user
    $scope.logOut = function(){
      console.log("logging out..");
      if($window.confirm("Do you want to log out? Click OK if you really want to log out.")) {
          $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=REVWX1RFQU1fMDM=';
          $rootScope.loggedIn = false;
      };
    };
});


app.controller('NewsListCtrl', function ($scope, $location, $window, NewsListService) {
    // callback for ng-click 'editArticle':
    $scope.editArticle = function (articleId) {

		console.log("NewsListCtrl.editArticle: " + articleId);
        $location.path('/news-show/' + articleId);
    };

    // callback for ng-click 'deleteArticle':
    $scope.deleteArticle = function (articleDel) {
		console.log("NewsListCtrl.deleteArticle: " + articleDel);
        if (confirm('The article: "' + articleDel.title + '" is going to be removed. Are you sure?')) {
            NewsListService.delete(articleDel.id);
            $window.alert("Article deleted succesfully");
        }
    };

    // callback for ng-click 'createNews':
    $scope.createNewArticle = function () {
    	console.log("NewsListCtrl.newArticle");
    	$location.path('/news-creation');
    };

    $scope.news = NewsListService.query();
    //console.log($scope.news);
});


app.controller('ArticleCreationCtrl', function ($scope, $location, $window, NewsListService) {

	// callback for ng-click 'createNewArticle':
    $scope.createNewArticle = function () {
            NewsListService.create($scope.article);
            $window.alert("Article created succesfully");
            $location.path('/article-list');
        }
});


app.controller('LoginCtrl', function($scope, $rootScope, $location, $http, $window, LoginService){
    $scope.send = function() {
      LoginService.login({passwd: $scope.password, username: $scope.user}, function(data) {
        $http.defaults.headers.common['Authorization'] = data.Authorization + ' apikey=' + data.apikey

        $rootScope.loggedIn = true;
        $rootScope.idUser = data.user;
        $location.path("/");
      },
      function (error){
        if (error.data.status == 401){
          $window.alert("username or password seems to be incorrect");
        } else {
          $window.alert(error.data.status + "\n" + error.data.details);  
        }
      });
    };
});