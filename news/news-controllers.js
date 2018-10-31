/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('NewsListCtrl', function ($scope, $location, $window, NewsListService) {
    // callback for ng-click 'editArticle':
    $scope.editArticle = function (articleId) {

		console.log("NewsListCtrl.editArticle: " + articleId);
        $location.path('/news-detail/' + articleId);
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

// add rootscope variable?
app.controller('LoginCtrl', function($scope, $rootScope, $http, LoginService){
    
    console.log($scope.user, $scope.password);

    $scope.send = function(user, password) {
      // var loginres = {};
      // console.log($scope.user, $scope.password);  
      // console.log(LoginService.login({passwd: $scope.password, username: $scope.user}, function(data) {
      //   var error = function (error) {
      //     console.log("error");
      //   };
      // }));
      LoginService.login({passwd: $scope.password, username: $scope.user}, function(data) {
        console.log(data);
        console.log(data.apikey)
        $http.defaults.headers.common['Authorization'] = data.Authorization + ' apikey=' + data.apikey


      },
      function (error){
      
      });
    };
});
   


   //  // ['$scope', '$rootScope', '$location', 'LoginService',
   //  function ($scope, $rootScope, $location, LoginService) {
   //      // reset login status
   //      AuthenticationService.ClearCredentials();
 
   //      console.log("helloow?");

   //      $scope.login = function () {
   //      	$log.log("test");
			// console.log("test");
   //          $scope.dataLoading = true;
   //          AuthenticationService.Login($scope.username, $scope.password, function(response) {
   //              if(response.success) {
   //                  AuthenticationService.SetCredentials($scope.username, $scope.password);
   //                  $location.path('/');
   //              } else {
   //                  $scope.error = response.message;
   //                  $scope.dataLoading = false;
   //              }
   //          });
   //      };
   //  });