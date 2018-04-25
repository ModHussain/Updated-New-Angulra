resourceApp.controller('customerresourcelistCtrl',["$scope","$state","$stateParams","RAService",function($scope, $state, $stateParams, RAService){
	$scope.$on('$viewContentLoaded', function () {
		$scope.getresourcelist(1);
		$scope.companyId = [];
		
		$scope.resource = {};
	})
	
	$scope.States=["Hyderabad","Vijayawada","Vizag","Bangalore","Chennai","Madurai","Kolkata","Pune","Mumbai","Noida","Delhi","Jaipur","Darjeeling","Kerala"];

	
	
	$scope.Jobc=["Application Developer", "Applications Engineer","Database Administrator","Front End Developer","Java Developer","Junior Software Engineer","Network Engineer",
		
		"Senior Database Administrator","Senior Programmer","Senior Security Specialist","Senior Web Developer","Software Architect","Systems Designer","Software Developer",
		"Web Administrator","Web Developer"];
		$scope.skills=["java","jsp","servlets","Spring","Html","Css","Bootstrap","Angularjs","Nodejs","Php","Phyton","MySQL","MongoDB","Oracle","Sql Server"];
		$scope.experience=["0-1 years","1-2 years","2-3 years","3-4 years","4-5 years","5-6 years","more"];
		$scope.company=["TCS","Tech M","Oracle","IBM","Ojas","HCL","Wipro","Info-tech","CapGemini","Persistant","Virtusa","Infosys"]
	
	
	
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