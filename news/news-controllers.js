/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('HeaderCtrl', function ($scope, $rootScope, $location, $http, $window) {
    $scope.logOut = function(){
      console.log("logging out..");
      if($window.confirm("Do you want to log out? Click OK if you really want to log out.")) {
          $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=REVWX1RFQU1fMDM=';
          $rootScope.loggedIn = false;
      };
    };


});


app.controller('NewsListCtrl', function ($scope, $location, $window, NewsListService, NewsDetailsService) {
    // callback for ng-click 'editArticle':
    $scope.editArticle = function (articleId) {

		console.log("NewsDetailsService.editArticle: " + articleId);
        $location.path('/news-edition/' + articleId);
    };

    // callback for ng-click 'deleteArticle':
    $scope.deleteArticle = function (articleId) {
		console.log("NewsDetailsService.deleteArticle: " + articleId);
        if (confirm('The article: "' + articleId.title + '" is going to be removed. Are you sure?')) {
            NewsDetailsService.delete({id: articleId.id}, function(data) {
                console.log(data)
                $window.alert("Article deleted succesfully");
            },
            function(error){
                console.log(error);
            });
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

app.controller('ArticleDetailCtrl', function ($scope, $routeParams, $window, $location, NewsDetailsService) {

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
        $scope.news = NewsDetailsService.save($routeParams.id);
});

app.controller('ArticleCreationCtrl', function ($scope, $rootScope, $http, NewsDetailsService) {

    console.log($rootScope.idUser, $scope.abstract, $scope.subtitle, $scope.update_date, $scope.category, $scope.title, $scope.image_data, $scope.body);

    $scope.createNewArticle = function () {
            NewsDetailsService.save({abstract: $scope.abstract, subtitle: $scope.subtitle, category: $scope.category, title: $scope.title, image_data: $scope.image_data, body: $scope.body} , function(data) {
                
                console.log(data)
                //TODO: 500 error
                $window.alert("Article created succesfully");
                $location.path('/news-list');
            },
            function(error){
                console.log(error);
            });
        };
});

// add rootscope variable?
app.controller('LoginCtrl', function($scope, $rootScope, $location, $http, LoginService){
    
    console.log($scope.user, $scope.password);

    $scope.send = function() {
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

        console.log($rootScope.loggedIn);
        $rootScope.loggedIn = true;
        $rootScope.idUser = data.user;
        console.log($rootScope.loggedIn);

        $location.path("/");

      },
      function (error){
        console.log(error);
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