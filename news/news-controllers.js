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

app.controller('ArticleCreationCtrl', function ($scope, $rootScope, $location, $window, NewsDetailsService) {

    console.log($rootScope.idUser, $scope.abstract, $scope.subtitle, $scope.update_date, $scope.category, $scope.title, $scope.image_data, $scope.body);

    $scope.createNewArticle = function (title, subtitle, category, abstract, body, img) {
            
            NewsDetailsService.save({id_user: $rootScope.idUser, abstract: $scope.abstract, subtitle: $scope.subtitle, $scope.update_date: new Date(), category: $scope.category, title: $scope.title, image_data: $scope.image_data, body: $scope.body} , function(data) {
            
            console.log(data)
            //TODO: show if it was successful or not
            $window.alert("Article created succesfully");
            $location.path('/article-list');
            },
            function(error){

            });
        };
});

// add rootScope variable?
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