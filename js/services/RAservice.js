resourceApp.factory('RAService',['$http','$q','APIURL',function($http,$q,APIURL){
	return{
		RAReg: function(){
			var deferred = $q.defer();
			$http.get(APIURL + '/ResourceAdda/rest/registration/listRegistrations/1/10').success(function(response){
				deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		saveRegistration: function(registration){
			var deferred = $q.defer();
			$http.post(APIURL + '/ResourceAdda/rest/registration/createRegistration', registration).success(function(response){
				deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		buynow: function(){
			var deferred = $q.defer();
		    $http.get(APIURL + '/ResourceAdda/rest/plans/listPlans/1/10').success(function(response){
				deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		getRegistrationById: function(id){
			var deferred = $q.defer();
			$http.get( APIURL + '/ResourceAdda/rest/registration/findOneByPrimaryId/' + id).success(function(response){
					deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			});
			return deferred.promise;
   		},
		updateRegistration: function(registration){
			var deferred = $q.defer();
			$http.put(APIURL + '/ResourceAdda/rest/registration/saveRegistration/' + registration._id, registration).success(function(response){
				deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		registrationStatus: function(registration){
			var deferred = $q.defer();
			$http.put(APIURL + '/ResourceAdda/rest/registration/inactiveOrActive/' + registration._id, registration).success(function(response){
				deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		postareqList: function(){
			var deferred = $q.defer();
			 $http.get(APIURL + "/ResourceAdda/rest/requirement/listRequirements/1/10") .success(function(response){
				 deferred.resolve(response);
			 }).error(function(err){
				 deferred.reject(err);
			 })
			 return deferred.promise;
		},
		postReqfilter: function(filter, value){
	            if(filter.consultant == 0){
	                var deferred = $q.defer();  
	            $http.get(APIURL + "/ResourceAdda/rest/requirement/listRequirements/1/10").then(function(response){
	                deferred.resolve(response);
	            }),function(err){
	                deferred.reject(err);
	            }
	            return deferred.promise;
	            }else{
	                var deferred = $q.defer();
	            $http.get(APIURL + "/ResourceAdda/rest/requirement/findOneAllByCondition/"+filter.jobCategory+'/'+filter.consultant +'/1/10').then(function(response){
	                deferred.resolve(response);
	            }),function(err){
	                deferred.reject(err);
	            }
	            return deferred.promise;
	            }
	            
	        },
		getCompanyList:function(){
			var deferred = $q.defer();
			$http.get(APIURL + '/ResourceAdda/rest/registration/listRegistrations').success(function(response){
				deferred.resolve(response);
			}).error(function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		adddata: function(postrequirement){
	         var deferred = $q.defer();
	        $http.post(APIURL + "/ResourceAdda/rest/requirement/createRequirement",postrequirement).success(function(response){
	            console.log("success");
	            deferred.resolve(response);
	        }).error(function(err){
	            deferred.reject(err);
	        })
	        return deferred.promise;
	        },
	        postareqGetById: function(id){
	        	var deferred = $q.defer();
	        	$http.get(APIURL + "/ResourceAdda/rest/requirement/findOneByPrimaryId/" + id).success(function(response){
	        		deferred.resolve(response);
	        	}).error(function(err){
	        		deferred.reject(err);
	        	})
	        	return deferred.promise;
	        },

	        uploadFileToUrl : function(uploadFile,uploadUrl){
	            debugger;
	            var deferred = $q.defer();
	             var fd = new FormData();
	             fd.append('uploadFile', uploadFile);
	             $http.put(uploadUrl, fd, {
	                transformRequest: angular.identity,
	                headers: {'Content-Type': undefined}
	             }).success(function(response){
	             	deferred.resolve(response);
	             }).error(function(err){
	             	deferred.reject(err);
	             })
	             return deferred.promise;
	          },
			updatepostareq:function(postrequirement){
				debugger;
				var deferred = $q.defer();
				$http.put(APIURL + "/ResourceAdda/rest/requirement/saveRequirement/",postrequirement).success(function(response){
						deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			requirementStatus : function(postrequirement){
				var deferred = $q.defer();
				$http.put(APIURL + "/ResourceAdda/rest/requirement/inactiveOrActive/" + postrequirement._id, postrequirement).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			registergetcontact: function(){
				var deferred = $q.defer();
				$http.get(APIURL + '/ResourceAdda/rest/address/listAddresses/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			registeraddcontact: function(addcontact){
				var deferred = $q.defer();
				$http.post(APIURL + '/ResourceAdda/rest/address/createAddress', addcontact).success(function(response){
						deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			registergetbyid: function(id){
				var deferred = $q.defer();
				$http.get(APIURL + '/ResourceAdda/rest/address/findOneByPrimaryId/' + id).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			userlist : function(){
				var deferred = $q.defer();
				$http.get(APIURL + "/ResourceAdda/rest/user/listUsers/1/10").success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			allusergetroles: function(){
				var deferred= $q.defer();
				$http.get(APIURL + '/ResourceAdda/rest/user/getAllRoles/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			alluseradd: function(alluser){
				var deferred = $q.defer();
				$http.post(APIURL + '/ResourceAdda/rest/user/saveUser', alluser).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			allusergetbyid: function(id){
				var deferred = $q.defer();
				$http.get(APIURL + "/ResourceAdda/rest/user/getOneByPrimaryKey/" + id).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			alluserupdate: function(alluser){
				var deferred = $q.defer();
				$http.put(APIURL + '/ResourceAdda/rest/user/updateUser/' + alluser._id, alluser).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			addresourcelist: function(){
				var deferred = $q.defer();
				$http.get(APIURL + '/ResourceAdda/rest/resource/listResources/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			
			 uploadResumeToUrl : function(uploadFile,uploadUrl){
                 debugger;
                 var deferred = $q.defer();
                  var fd = new FormData();
                  fd.append('uploadFile', uploadFile);
                  $http.put(uploadUrl, fd, {
                     transformRequest: angular.identity,
                     headers: {'Content-Type': undefined}
                  }).success(function(response){
                  	deferred.resolve(response);
                  }).error(function(err){
                  	deferred.reject(err);
                  })
                  return deferred.promise;
               },
               
			datafilter: function(filter, value){
	            if(filter.consultant == 0){
	                var deferred = $q.defer();  
	            $http.get(APIURL +'/ResourceAdda/rest/resource/listResources/1/10').then(function(response){
	                deferred.resolve(response);
	            }),function(err){
	                deferred.reject(err);
	            }
	            return deferred.promise;
	            }else{
	                var deferred = $q.defer();
	            $http.get(APIURL +'/ResourceAdda/rest/resource/findOneAllByCondition/'+filter.totalExperience+'/'+filter.consultant +'/1/10').then(function(response){
	                deferred.resolve(response);
	            }),function(err){
	                deferred.reject(err);
	            }
	            return deferred.promise;
	            }
	            
	        },
			addresource: function(resource){
				var deferred = $q.defer();
				$http.post(APIURL + '/ResourceAdda/rest/resource/createResource', resource).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
				
			},
			resourcegetById: function(id){
				var deferred = $q.defer();
				$http.get(APIURL + '/ResourceAdda/rest/resource/findOneByPrimaryId/' + id).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			updateresource: function(resource){
				var deferred = $q.defer();
				$http.put(APIURL + "/ResourceAdda/rest/resource/saveResource/" + resource._id,resource).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			resourceStatus: function(resource){
				var deferred = $q.defer();
				$http.put(APIURL + '/ResourceAdda/rest/resource/inactiveOrActive/' + resource._id, resource).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			postresourceById: function(id){
				var deferred = $q.defer();
				$http.get(APIURL + "/ResourceAdda/rest/resource/findResourcesByRegistrationId/"+ id +"/1/10").success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			postresourceMapping: function(postresource){
				var deferred = $q.defer();
				$http.post(APIURL + "/ResourceAdda/rest/resourceMapping/createResourceMapping", postresource).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			mappingresource: function(filter){
				debugger;
				var deferred = $q.defer();
				$http.get('http://localhost:8081/ResourceAdda/rest/resource/findResourcesByTwoIds/'+ filter.selecttype +'/'+ filter.nameId +'/'+ filter.localId +'/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			
			PostresourceSoft: function(resource){
				var deferred = $q.defer();
				$http.put(APIURL + '/ResourceAdda/rest/resource/softLock/' + resource._id, resource).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			PostresourceHard: function(resource){
				var deferred = $q.defer();
				$http.put(APIURL + '/ResourceAdda/rest/resource/hardLock/' + resource._id, resource).success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
//			updatepostareq:function(postId,postrequirement){
//				debugger;
//				var deferred = $q.defer();
//				$http.put(APIURL + "/ResourceAdda/rest/requirement/saveRequirement/" +postId,postrequirement).success(function(response){
//						deferred.resolve(response);
//				}).error(function(err){
//					deferred.reject(err);
//				})
//				return deferred.promise;
//			},
			//vendor services
			postareqList: function(){
				var deferred = $q.defer();
				 $http.get(APIURL + "/ResourceAdda/rest/requirement/listRequirements/1/10") .success(function(response){
					 deferred.resolve(response);
				 }).error(function(err){
					 deferred.reject(err);
				 })
				 return deferred.promise;
			},
			vendoruserlist : function(local){
				var deferred = $q.defer();
				$http.get(APIURL+'/ResourceAdda/rest/user/findAllByRegistrationId/'+local+'/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			vendoraddresourcelist: function(local){
				var deferred = $q.defer();
				$http.get(APIURL + '/ResourceAdda/rest/resource/findResourcesByRegistrationId/'+local+'/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			vendorgetRegistrationById: function(id){
				var deferred = $q.defer();
				$http.get( APIURL + '/ResourceAdda/rest/registration/findOneByPrimaryId/' + id).success(function(response){
						deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
	   		},
	   	
	   			
	  
			//customer service
			customeruserlist : function(local){
				var deferred = $q.defer();
				$http.get(APIURL+'/ResourceAdda/rest/user/findAllByRegistrationId/'+local+'/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			},
			customeraddrequirment: function(local){
				var deferred = $q.defer();
				$http.get(APIURL+'/ResourceAdda/rest/requirement/findRequirementsByRegistrationId/'+local+'/1/10').success(function(response){
					deferred.resolve(response);
				}).error(function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			}
			
			
			
			
	}
}])
