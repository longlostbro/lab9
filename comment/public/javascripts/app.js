angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
  	$scope.comments = [];
    $scope.image_chosen = 0;
    $scope.list = [
      {
        url: "http://vignette4.wikia.nocookie.net/robber-penguin-agency/images/6/6e/Small-mario.png",
        id: 0,
        value: "Mario"
      },
      {
        url: "http://vignette2.wikia.nocookie.net/thecreatures/images/4/48/Yoshi.png",
        id: 1,
        value: "Yoshi"
      },
      {
        url: "http://vignette4.wikia.nocookie.net/fantendo/images/5/52/Mushroom2.png",
        id: 2,
        value: "Mushroom"
      },
      {
        url: "http://vignette2.wikia.nocookie.net/fantendo/images/f/fa/Luigi_MP9.png",
        id: 3,
        value: "Luigi"
      },
      {
        url: "http://vignette1.wikia.nocookie.net/loveinterest/images/7/71/Princess_Peach_Artwork_-_Super_Mario_3D_Land.png",
        id: 4,
        value: "Peach"
      },
      {
        url: "http://vignette2.wikia.nocookie.net/fantendo/images/8/81/Wario.png",
        id: 5,
        value: "Wario"
      },
      {
        url: "http://vignette1.wikia.nocookie.net/projectcrusade/images/b/b5/NSMBW_Toad.png",
        id: 6,
        value: "Toad"
      },
      {
        url: "http://vignette1.wikia.nocookie.net/fantendo/images/7/75/Bowser_HUGE.png",
        id: 7,
        value: "Bowser"
      }
    ]
    $scope.toggle = function (list) {
        console.log($scope.image_chosen);
    };
    $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
	};
    $scope.addComment = function() {
      if($scope.formContent === '') { return; }
      $scope.create({
        title: $scope.formContent,
        img: $scope.list[$scope.image_chosen].url,
        upvotes: 0
      });
      $scope.formContent = '';
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          comment.upvotes += 1;
        });
    };
    $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

    $scope.getAll = function() {
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
  	};

    $scope.clearComments = function() {
    	return $http.post('/comments/clear').success(function(data){
      		$scope.getAll();
    	});
    };
    $scope.getAll();
}
]);