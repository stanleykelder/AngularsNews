/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('NewsListCtrl', function ($scope, $location, $window, NewsListService) {
    $scope.news = NewsListService.query();
    console.log($scope.news);
});