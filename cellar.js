 function CellarCtrl($scope) {
	$scope.newWine = {};
	$scope.wines = [
		{name: "Henri Goutorbe Special Club", vintage: 2002},
		{name: "Krug Grand Cuvée", vintage: undefined},
		{name: "Recaredo Gran Reserva Brut Nature", vintage: 2006},
		{name: "Françoise Bedel Entre Ciel et Terre", vintage: undefined},
	 ];
	 $scope.add = function addWine(){
		$scope.newWine.vintage = parseInt($scope.newWine.vintage, 10) || undefined;
		$scope.wines.push($scope.newWine);
		$scope.newWine = {};
	 }
 }