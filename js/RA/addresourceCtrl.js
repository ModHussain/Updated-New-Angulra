resourceApp.controller('resourcelistCtrl',["$scope","$state","$stateParams","RAService",function($scope, $state, $stateParams, RAService){
	$scope.$on('$viewContentLoaded', function () {
		$scope.getresourcelist(1);
		$scope.companyId = [];
		
		$scope.resource = {};
	})
	
	$scope.Selectors =["skills","totalExperience","availability"];
    $scope.SelectedCriteria = ""; 
    $scope.filterValue = "";
    
    $scope.maxSize = 1;     // Limit number for pagination display number.  
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->  
    $scope.pageSizeSelected = 1; // Maximum number of items per page.
	$scope.getresourcelist = function(){
		RAService.addresourcelist($scope.pageIndex).then(function(data){
			$scope.resourcelist =data;
			console.log($scope.resourcelist);
			 $scope.totalCount = data.count;
           
             $scope.pageChanged = function() {
                 $scope.getresourcelist()
                     console.log('Page changed to: ' + $scope.pageIndex);
             };
     },function (err) {  
         var error = err;  
     });
 }
	$scope.getresourcelistFilter = function(){
        var filter = {
        	totalExperience: $scope.SelectedCriteria,
        	consultant: $scope.filterValue
       };
        RAService.datafilter(filter).then(function(data){
           $scope.resourcelist= data.data;
           console.log($scope.resourcelist);
       },function(err){
       if(err){
           $scope.errorMessage = err;
       }
   })
},
	$scope.statusResource = function(resource){
		debugger;
		if(resource.status == "Active"){
			resource.status = "InActive";
		RAService.resourceStatus(resource).then(function(data){
			$scope.Resource = data;
			console.log($scope.Resource);
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		})
		} else {
			resource.status = "Active";
			RAService.resourceStatus(resource).then(function(data) {
				$scope.Resource = data;
				console.log($scope.Resource);
			}, function(err) {
				if (err) {
					$scope.errorMessage = err;
				}
			})
		}
}



$scope.softlockResource = function(resource){
debugger;
if(resource.softLock == "YES"){
	resource.softLock = "NO";
RAService.PostresourceSoft(resource).then(function(data){
$scope.Presource = data;
	console.log($scope.Presource);
},function(err){
	if(err){
		$scope.errorMessage = err;
	}
})
} else {
	resource.softLock = "YES";
	RAService.PostresourceSoft(resource).then(function(data) {
		$scope.Presource = data;
		console.log($scope.Presource);
	}, function(err) {
		if (err) {
			$scope.errorMessage = err;
		}
	})
}
}


$scope.hardlockResource = function(resource){
	debugger;
	if(resource.hardLock == "YES"){
		resource.hardLock = "NO";
	RAService.PostresourceHard(resource).then(function(data){
	$scope.Presource = data;
		console.log($scope.Presource);
	},function(err){
		if(err){
			$scope.errorMessage = err;
		}
	})
	} else {
		resource.hardLock = "YES";
		RAService.PostresourceHard(resource).then(function(data) {
			$scope.Presource = data;
			console.log($scope.Presource);
		}, function(err) {
			if (err) {
				$scope.errorMessage = err;
			}
		})
	}
	}

$scope.send_id=function(res_id){
	$scope.r_id=res_id;
	}


$scope.uploadFile = function(resource_id,myFile){
   	debugger;
       var uploadFile = myFile;      						           
       debugger;						        
       var uploadUrl = "http://localhost:8081/ResourceAdda/rest/resource/uploadFile/"+resource_id;
       RAService.uploadResumeToUrl(uploadFile,uploadUrl).then(function(data){
       		$scope.f=data;
       		console.log($scope.f);
       		console.log("success");
       		alert('Uploaded Successfully')
       },function(err){
       if(err){
           $scope.errorMessage = err;
      	 }console.log("fail");
       })
};



$scope.filedownload=function(resource){
	debugger;
	//$scope.registrationId=$scope.registrationId;
	RAService.Getfile(resource).then(function(data) {
		
		$scope.filedownload = data;
		debugger;
		console.log($scope.filedownload);
		alert('Downloaded Successfully')
		
	}, function(err) {
		if (err) {
			$scope.errorMessage = err;
		}
	})
}




} ]);

/*resourceApp.controller('resourcelistCtrl',["$scope","$state","$stateParams","RAService",function($scope, $state, $stateParams, RAService){
	$scope.$on('$viewContentLoaded', function () {
		$scope.getresourcelist();
	})
	
	
	$scope.getresourcelist = function(){
		RAService.addresourcelist().then(function(data){
			$scope.resourcelist = data;
			console.log($scope.resourcelist);
		},function(err){    
			if(err){
				$scope.errorMessage = err;
			}
		})
	},
	
	$scope.statusResource = function(resource){
		debugger;
		if(resource.status == "Active"){
			resource.status = "InActive";
		RAService.resourceStatus(resource).then(function(data){
			$scope.Resource = data;
			console.log($scope.Resource);
		},function(err){
			if(err){
				$scope.errorMessage = err;*/

/*resourceApp.controller('resourcelistCtrl', [ "$scope", "$state","$stateParams", "RAService",
		function($scope, $state, $stateParams, RAService) {
			$scope.$on('$viewContentLoaded', function() {
				$scope.getresourcelist();
			})

			$scope.getresourcelist = function() {
				RAService.addresourcelist().then(function(data) {
					$scope.resourcelist = data;
					console.log($scope.resourcelist);
				}, function(err) {
					if (err) {
						$scope.errorMessage = err;
					}
				})
			},

			$scope.statusResource = function(resource) {
			
				if (resource.status == "Active") {
					resource.status = "InActive";
					RAService.resourceStatus(resource).then(function(data) {
						$scope.Resource = data;
						console.log($scope.Resource);
					}, function(err) {
						if (err) {
							$scope.errorMessage = err;
						}
					})
				} else {
					resource.status = "Active";
					RAService.resourceStatus(resource).then(function(data) {
						$scope.Resource = data;
						console.log($scope.Resource);
					}, function(err) {
						if (err) {
							$scope.errorMessage = err;
						}
					})
				}


			}

		} ]);*/

resourceApp.controller('addresourceCtrl',["$scope","$state","$stateParams","$filter","RAService",function($scope, $state, $stateParams, $filter,
								RAService) {
							$scope.$on('$viewContentLoaded', function() {
								$scope.companyNameList = [];
								$scope.companyId = [];
								$scope.companyid();
								$scope.resource = {};
							})
							$scope.companyid = function() {
								RAService.getCompanyList().then(function(data) {
									$scope.list = data;
									console.log($scope.list[0].companyName);
									for (var i = 0; i < $scope.list.length; i++) {
										$scope.companyNameList.push($scope.list[i].companyName);
										$scope.companyId.push($scope.list[i]._id);
									}
									$scope.companyid = function() {
										for (var j = 0; j < $scope.companyNameList.length; j++) {
											if ($scope.companyName1 == $scope.companyNameList[j]) {
													$scope.comId = $scope.companyId[j];
														console.log($scope.comId);

															}
														}
													}

												});
							}
							$scope.gender = [ "Male", "Female", "others" ];
							$scope.experience = [ "1-2 years", "2-4 years","4-6 years", "6-8 years", "8-10 years","10+ more..." ];
							$scope.currentLocation = [ "Bangalore","Chennai","Hyderabad","Pune","Itanagar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Punjab","Shimla","Srinagar","Ranchi",
    	"Thiruvananthapuram","Bhopal","Mumbai","Imphal","Shillong","Aizawl","Kohima","Bhubaneswar","Jaipur","Gangtok","Noida","Amaravathi","Agartala","Lucknow","Dehradun","Kolkata" ];
							
							$scope.preferredLocation = [ "Bangalore","Chennai","Hyderabad","Pune","Itanagar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Punjab","Shimla","Srinagar","Ranchi",
						   "Thiruvananthapuram","Bhopal","Mumbai","Imphal","Shillong","Aizawl","Kohima","Bhubaneswar","Jaipur","Gangtok","Noida","Amaravathi","Agartala","Lucknow","Dehradun","Kolkata" ];
	
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
							
							$scope.Rate=["Hourly","Per-Day","Per-Week","Per-Month"];
							
							
							$scope.avaliability = [ "10-20 days", "20-30 days","30-45 days", "45-60 days" ];
							$scope.addresource = function() {
								debugger;
								$scope.resource.registrationId = $scope.comId;
								 $scope.resource.preferredLocation=$scope.resource.preferredLocation.toString();
								$scope.resource.dateOfBirth = $filter('date')(
									$scope.resource.dateOfBirth,"MM/dd/yyyy");
								RAService.addresource($scope.resource).then(
										function(data) {
											$scope.resourceadd = data;
											console.log($scope.resourceadd);
											$state.go('RA.resourcelist');
										}, function(err) {
											if (err) {
												$scope.errorMessage = err;
											}
										})
							}

						} ]);
resourceApp.controller('updateresourceCtrl',["$scope","$state","$stateParams","$filter","RAService",function($scope, $state, $stateParams, $filter,RAService) {
							$scope.$on('$viewContentLoaded', function() {
								$scope.resource = {};
								$scope.companyNameList = [];
								$scope.companyId = [];
								$scope.companyid();
								$scope.getResourceById();
							})
							$scope.companyid = function() {
								RAService.getCompanyList().then(
									function(data) {
											$scope.list = data;
													console.log($scope.list[0].companyName);
													for (var i = 0; i < $scope.list.length; i++) {
														$scope.companyNameList.push($scope.list[i].companyName);
														$scope.companyId.push($scope.list[i]._id);
													}
													$scope.companyid = function() {
														for (var j = 0; j < $scope.companyNameList.length; j++) {
															if ($scope.resource.companyName == $scope.companyNameList[j]) {
																$scope.comId = $scope.companyId[j];
																console.log($scope.comId);
															}
														}
													}

												});
							}

							$scope.gender = [ "Male", "Female", "others" ];
							$scope.experience = [ "1-2 years", "2-4 years","4-6 years", "6-8 years", "8-10 years","10+ more..." ];
							$scope.currentLocation = [ "Bangalore","Chennai","Hyderabad","Pune","Itanagar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Punjab","Shimla","Srinagar","Ranchi",
						    	"Thiruvananthapuram","Bhopal","Mumbai","Imphal","Shillong","Aizawl","Kohima","Bhubaneswar","Jaipur","Gangtok","Noida","Amaravathi","Agartala","Lucknow","Dehradun","Kolkata" ];
													
													$scope.preferredLocation = [ "Bangalore","Chennai","Hyderabad","Pune","Itanagar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Punjab","Shimla","Srinagar","Ranchi",
												   "Thiruvananthapuram","Bhopal","Mumbai","Imphal","Shillong","Aizawl","Kohima","Bhubaneswar","Jaipur","Gangtok","Noida","Amaravathi","Agartala","Lucknow","Dehradun","Kolkata" ];
							
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
													
													$scope.Rate=["Hourly","Per-Day","Per-Week","Per-Month"];
							
							
							$scope.avaliability = [ "10-20 days", "20-30 days","30-45 days", "45-60 days" ];
							$scope.getResourceById = function() {
								$scope.resource.registrationId = $scope.comId;

								 //$scope.resource.preferredLocation=$scope.resource.preferredLocation.toString();
								
								RAService.resourcegetById($stateParams.resourceId).then(function(data) {
													$scope.resource = data;
													console.log($scope.resource);
													$scope.resource.dateOfBirth = new Date(
													$scope.resource.dateOfBirth);
													console.log($scope.resouce);
											},
												function(err) {
													if (err) {
														$scope.errorMessage = err;
													}
												})
							}

							$scope.updateResource = function() {
								debugger;

								 $scope.resource.preferredLocation=$scope.resource.preferredLocation.toString();
								$scope.resource.dateOfBirth = $filter('date')($scope.resource.dateOfBirth,"MM/dd/yyyy");
								RAService.updateresource($scope.resource).then(function(data) {
											$scope.updateresource = data;
											console.log($scope.updateresource);
											$state.go('RA.resourcelist');
										}, function(err) {
											if (err) {
												$scope.errorMessage = err;
											}
										})
							}

						} ]);