resourceApp.controller('RACtrl',['$scope','$state','BlogPostService','RAService',function($scope,$state,BlogPostService,RAService){
		var user = localStorage.getItem('use');
		var admin =localStorage.getItem('admi');
	   $scope.vvv = localStorage.getItem('registrationType');
		$scope.register =  $scope.vvv.split(',');
		console.log($scope.register);
		$scope.model = "RA";
		$scope.dataregister = function(){
			
			if($scope.registerData == "RA"){
				
				$state.go('RA.dashboard');
			}
			if($scope.registerData == "vendor"){
				$scope.model = "vendor";
				$state.go('vendor.dashboard');
			}
			if($scope.registerData == "customer"){
				$scope.model = "customer";
				$state.go('customer.dashboard');
			}
			
		}
		if(admin== "true"){	
			$scope.all_users_type=true;
		}else if(user == "true" && admin == "true"){
			$scope.all_users_type=true;
		}
		else if(user == "true"){
			
			$scope.all_users_type=false;
		}
		else{

		}
		
	
}])