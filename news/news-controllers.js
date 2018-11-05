/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('LogoutCtrl', function ($scope, $rootScope, $location, $http, $window) {
    $scope.logOut = function(){
      console.log("logging out..");
      if($window.confirm("Do you want to log out? Click OK if you really want to log out.")) {
          $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=REVWX1RFQU1fMDM=';
          $rootScope.loggedIn = false;
      };
    };
    // callback for ng-click 'createNews':
    $scope.createNewArticle = function () {
      console.log("NewsListCtrl.newArticle");
      $location.path('/news-creation');
    };

});


app.controller('NewsListCtrl', function ($scope, $rootScope, $route, $location, $window, NewsListService, NewsDetailsService) {
    $rootScope.newsList = true;

    $scope.$on('$locationChangeSuccess', function(event) {
      $rootScope.newsList = !$rootScope.newsList;
    });

    // callback for ng-click 'editArticle':
    $scope.editArticle = function (articleId) {
        $rootScope.id = articleId;
		console.log("NewsListCtrl.editArticle: " + articleId);
        $location.path('/news-edition/' + articleId);
    };


       // callback for ng-click 'articleDetails':
       $scope.articleDetails = function (articleId) {
        $rootScope.id = articleId;
		console.log("NewsListCtrl.articleDetails: " + articleId);
        $location.path('/news-show/' + articleId);
    };

    // callback for ng-click 'deleteArticle':
    $scope.deleteArticle = function (articleId) {
		console.log("NewsDetailsService.deleteArticle: " + articleId);
        if (confirm('The article: "' + articleId.title + '" is going to be removed. Are you sure?')) {
            NewsDetailsService.delete({id: articleId.id}, function(data) {
                console.log(data)
                $window.alert("Article deleted succesfully");
                $route.reload();
            },
            function(error){
                $window.alert('We were not able to delete this article because of' + error);
                console.log(error);
            });
        };
    };

    // Get news from server
    NewsListService.query({}, function(news) {
      $scope.news = news;
    }, 
    function(error){
      console.log(error);
    });
});

app.controller('ArticleDetailCtrl', function ($scope, $rootScope, $routeParams, $window, $location, NewsDetailsService) {

        // callback for ng-click 'updateArticle':
        $scope.updateArticle = function () {
            NewsDetailsService.save({id: $rootScope.id, abstract: $scope.abstract, subtitle: $scope.subtitle, category: $scope.category, title: $scope.title, image_data: $scope.image_data, body: $scope.body} , function(data) {
                
                console.log(data)
                //TODO: 500 error
                $window.alert("Article updated succesfully");
                $location.path('/news-list');
            },
            function(error){
                $window.alert("Article could not be updated");
                console.log(error);
            });
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/news-list');
        };

        // When loading the form we take the article info
        $scope.news = NewsDetailsService.get({id: $rootScope.id}, function(data) {
            console.log(data) 
            console.log('ArticleDetailCtrl')
            $scope.article = data
        });
});

app.controller('ArticleCreationCtrl', function ($scope, $rootScope, $window, $location, $http, NewsDetailsService) {

    console.log('LOOOOG' + $rootScope.idUser, $scope.abstract, $scope.subtitle, $scope.update_date, $scope.category, $scope.title, $scope.image_data, $scope.body);

    $scope.createNewArticle = function () {
            NewsDetailsService.save({abstract: $scope.abstract, subtitle: $scope.subtitle, category: $scope.category, title: $scope.title, image_data: $scope.image_data, body: $scope.body} , function(data) {
                
                console.log(data)
                //TODO: 500 error
                $window.alert("Article created succesfully");
                $location.path('/news-list');
            },
            function(error){
                $window.alert("Article could not be created");
                console.log(error);
            });
        };
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path("/");
        };
});

// add rootscope variable?
app.controller('LoginCtrl', function($scope, $rootScope, $location, $http, LoginService){
    $scope.send = function() {
      LoginService.login({passwd: $scope.password, username: $scope.user}, function(data) {
        $http.defaults.headers.common['Authorization'] = data.Authorization + ' apikey=' + data.apikey

        $rootScope.loggedIn = true;
        $rootScope.idUser = data.user;

        $location.path("/");
      },
      function (error){
        console.log(error);
        // CHANGE TO READABLE ERROR
        $window.alert(error);
      });
    };
});