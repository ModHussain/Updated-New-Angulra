var resourceApp = angular.module('exampleApp', ['ui.router', 'ngCookies', 'ngResource','checklist-model', 'ngSanitize', 'ui.bootstrap']);
	

    
    resourceApp.run(function ($rootScope, $location, $cookieStore, UserService) {

    /* Reset error when a new view is loaded */
    $rootScope.$on('$viewContentLoaded', function () {
        delete $rootScope.error;
    });

    $rootScope.hasRole = function (role) {

        if ($rootScope.user === undefined) {
            return false;
        }

        if ($rootScope.user.roles[role] === undefined) {
            return false;
        }

        return $rootScope.user.roles[role];
    };

//    $rootScope.logout = function () {
//        delete $rootScope.user;
//        delete $rootScope.accessToken;
//        $cookieStore.remove('accessToken');
//        $location.path("/login");
//    };

    /* Try getting valid user from cookie or go to login page */
    var originalPath = $location.path();
   //$location.path("/login");
    var accessToken = $cookieStore.get('accessToken');
    if (accessToken !== undefined) {
        $rootScope.accessToken = accessToken;
        UserService.get(function (user) {
            $rootScope.user = user;
            $location.path(originalPath);
        });
    }

    $rootScope.initialized = true;
});


resourceApp.controller('LoginController',['$scope', '$rootScope', '$state', '$cookieStore', 'UserService', 'BlogPostService','RAService',function($scope, $rootScope, $state, $cookieStore, UserService, BlogPostService,RAService){
    $scope.rememberMe = false;
    $scope.$on('$viewContentLoaded', function () {
    	$scope.getplans();
    	$scope.registration = {};
    })

    $scope.login = function () {
        if(!$scope.username){
            alert('Please Enter Email Id');
        }else if(!$scope.password){
            alert('please Enter password');
        }
        else{
              UserService.authenticate($.param({
                    username: $scope.username,
                    password: $scope.password
                }), function (authenticationResult) {
                    var accessToken = authenticationResult.token;
                    $scope.userName = authenticationResult.userName;
                    console.log($scope.username);
                    $rootScope.accessToken = accessToken;
                    if ($scope.rememberMe) {
                        $cookieStore.put('accessToken', accessToken);
                    }
                    
                    BlogPostService.user($scope.userName).then(function(response){
                        $scope.user = response.data;
                        console.log($scope.user);
                        $scope.user.registrationType  = $scope.user.registrationType.split(',');
                        console.log($scope.user.registrationType);
                        localStorage.setItem('registrationType', $scope.user.registrationType);
                        localStorage.setItem('registrationId', $scope.user.registrationId);
                        localStorage.setItem('use', $scope.user.roles.USER);
                        localStorage.setItem('admi',$scope.user.roles.ADMIN);
                      
                    // localStorage.getItem('registrationType');
                   
                          if($scope.user.registrationType.length > 1 && $scope.user.registrationType[0] == "RA"){
                            console.log("RA Module");
                             $state.go('RA.dashboard');
                          }
                          if($scope.user.registrationType.length > 1 && $scope.user.registrationType[0] == "customer"){
                             console.log("customer Module")
                             $state.go('customer.dashboard');
                          }
                         if($scope.user.registrationType.length > 1 && $scope.user.registrationType[0] == "vendor"){
                              console.log("customer Module")
                              $state.go('customer.dashboard');
                          }
                        if($scope.user.registrationType.length == 1){
                            if($scope.user.registrationType[0] == "RA"){
                            console.log("RA Module");
                            $state.go('RA.dashboard');
                        }
                        }
                        if($scope.user.registrationType.length == 1){
                            if($scope.user.registrationType[0] == "vendor"){
                            $state.go('vendor.dashboard');
                        }
                        }
                        
                        if($scope.user.registrationType.length == 1){
                            if($scope.user.registrationType[0] == "customer"){
                            console.log("customer Module")
                            $state.go('customer.dashboard');
                        }
                        } 
                        
                        
                    })
                });
        }
      
    };
    
    $scope.showMe = false;
    $scope.showus=true;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
        $scope.showus=!$scope.showus;
    };
    
    $scope.showMe = true;
    $scope.showus=false;
    $scope.myFunct = function() {
        $scope.showMe = !$scope.showMe;
        $scope.showus=!$scope.showus;
    };
    
    
    
	$scope.getplans = function(){
		RAService.buynow().then(function(data){
			debugger;
			$scope.UserDetails = data;
			
			console.log($scope.UserDetails);
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		});
	}
	
	//planid
	$scope.plan=function(bid)
	{
		debugger;
		localStorage.setItem('planid',bid);
		console.log("stored");
	}
	
	//registaion
	$scope.companytype = ["Public Limited Company","Private Limited Company","Partnership","Proprietary"];
	$scope.quality = ["ISO 9001","ISO 9002","ISO I400","NONE"];
	$scope.registrationtype = ["customer","vendor"];
	$scope.Licences = ['1','2','3','4','5'];
	$scope.Period = ['1','2','3','4','5'];
	$scope.addData = function(){
		debugger;
		$scope.registration.registrationType = $scope.registration.registrationType.toString();
		$scope.registration.planId = localStorage.getItem('planid');
		RAService.saveRegistration($scope.registration).then(function(data){
			$scope.dddd = data;
			console.log($scope.dddd);
			$state.go('success');
		},function(err){    
			
			   
			if(err){
				$scope.errorMessage = err;
			}else{
				$scope.errorMessage = err;
			}
		});
	}
	
	
	
    
}])

resourceApp.controller('LoginCtrl',["$scope","$rootScope","$location",function($scope,$rootScope,$location){
        $scope.logout = function(){
            localStorage.clear();
            $location.path('/');
        }
}])

resourceApp.factory('UserService', function ($resource) {

    return $resource('rest/user/:action', {},
        {
            authenticate: {
                method: 'POST',
                params: {'action': 'authenticate'},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        }
    
    );
});

resourceApp.factory('BlogPostService', function ($resource,$http) {

//    return $resource('rest/blogposts/:id', {id: '@id'});
    var obj = {};
    obj.user = function(userName){
        return $http.get('rest/user/userDetails/' +userName);
    }
    return obj;
});

//plans

resourceApp.controller('buynowCtrl',['$scope','RAService',function($scope,RAService){
	$scope.$on('$viewContentLoaded', function () {
		$scope.getplans();
	})
	
	$scope.getplans = function(){
		RAService.buynow().then(function(data){
			debugger;
			$scope.UserDetails = data;
			console.log($scope.UserDetails);
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		});
	}
	}])



//registation

resourceApp.controller('RegCtrl',['$scope','$state','RAService',function($scope,$state,RAService){
	$scope.$on('$viewContentLoaded', function () {
		$scope.registration = {};
	})
	$scope.companytype = ["Public Limited Company","Private Limited Company","Partnership","Proprietary"];
	$scope.quality = ["ISO 9001","ISO 9002","ISO I400","NONE"];
	$scope.registrationtype = ["RA","customer","vendor"];
	$scope.Licences = ['1','2','3','4','5'];
	$scope.Period = ['1','2','3','4','5'];
	$scope.States=["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
		"Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
		"Orissa","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttaranchal","Uttar Pradesh","West Bengal"];
	
	$scope.Countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", 
		"Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil",
		"British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", 
		"Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", 
		"Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
		"East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
		"Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia",
		"Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", 
		"Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia",
		"Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", 
		"Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
		"Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
		"Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", 
		"St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga",
		"Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine",
		"United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
		"Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]

	$scope.addData = function(){
		debugger;
		$scope.registration.registrationType = $scope.registration.registrationType.toString();
		RAService.saveRegistration($scope.registration).then(function(data){
			$scope.dddd = data;
			console.log($scope.dddd);
			$state.go('RA.RAlist');
		},function(err){    
			
			   
			if(err){
				$scope.errorMessage = err;
			}else{
				$scope.errorMessage = err;
			}
		});
	}
}]);



