/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('NewsListCtrl', function ($scope, $location, $window, NewsListService) {
    // callback for ng-click 'editArticle':
    $scope.editArticle = function (articleId) {

		console.log("NewsListCtrl.editArticle: " + articleId);
        $location.path('/news-edition/' + articleId);
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

app.controller('ArticleDetailCtrl', function ($scope, $routeParams, $window, $location, NewsListService) {

        // callback for ng-click 'updateArticle':
        $scope.updateArticle = function () {
            NewsListService.update($scope.article);
            $window.alert("Article updated succesfully");
            $location.path('/news-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/news-list');
        };

        // When loading the form we take the article info
        $scope.news = NewsListService.show($routeParams.id);
});

app.controller('ArticleCreationCtrl', function ($scope, $location, $window, NewsListService) {

	// callback for ng-click 'createNewArticle':
    $scope.createNewArticle = function () {
            NewsListService.create($scope.article);
            $window.alert("Article created succesfully");
            $location.path('/article-list');
        }
});


app.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
});