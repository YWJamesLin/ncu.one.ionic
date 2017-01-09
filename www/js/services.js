angular.module('app.services', ['app.controllers'])

.service ('NCUOne', ['$http', function ($http) {
	this.lastLink = "";
	this.lastShortLink = "";
	this.shortLink = function (link, callback) {
		if (this.lastLink == link) {
			callback(this.lastShortLink);
		} else {
      this.lastLink = link;
      $http({
         method: 'POST',
         url: 'https://ncu.one/_/api/',
         data: 'type=short_it&url=' + link
      }).then (function (response) {
        callback(this.lastShortLink = response.data.url);
      }, function (response) {
        console.log (response);
      });
		}
	}
}])

.service ('Share', function () {
	this.doShare = function (link) {
		var options = {
			message: null,
			subject: null,
			files: null,
			url: link,
			chooserTitle: '選擇要分享的APP'
		};
		window.plugins.socialsharing.shareWithOptions (options, function (result) {
			console.log (result);
		}, function (msg) {
			console.log(msg);
		});
	}
})

.factory('intent', ['$rootScope', function($rootScope){
	var intent = {data:null};

	intent.setData = function(data){
		intent.data = data;
		console.log (data);
		$rootScope.$broadcast('intent');
	};

	intent.getData = function(){
		return intent.data;
	};

	return intent;
}]);
