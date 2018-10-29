/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('NewsListCtrl', function ($scope, $location, $window, NewsListService) {
    // callback for ng-click 'createUser':
    $scope.createNewArticle = function () {
    	console.log("NewsListCtrl.newArticle");
    	$location.path('/news-creation');
    };

    $scope.news = NewsListService.query();
    console.log($scope.news);
});