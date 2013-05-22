function CellarCtrl($scope) {
	var winesInEditMode = [];
	$scope.newWine = {};
	$scope.wines = [
		{name: "Henri Goutorbe Special Club", vintage: 2002},
		{name: "Krug Grand Cuvée", vintage: null},
		{name: "Recaredo Gran Reserva Brut Nature", vintage: 2006},
		{name: "Françoise Bedel Entre Ciel et Terre", vintage: null},
	 ];
	 $scope.add = function addWine(){
		$scope.newWine.vintage = parseInt($scope.newWine.vintage, 10) || null;
		$scope.wines.unshift($scope.newWine);
		$scope.newWine = {};
	 };
	var sortDirections = {};
	$scope.sort = function sortWines(sortField){
		function coerceAndDefault(coerce, defaultValue) { return function(v){ return coerce(v || defaultValue) } }
		var str = coerceAndDefault(String, ""), num = coerceAndDefault(Number, 0);
		function cmpString(a, b){ return str(a).localeCompare(str(b)); }
		function cmpNum(a, b){
			var na = num(a), nb = num(b);
			return na == nb ? 0 : na < nb ? -1 : 1;
		}
		var cmpTable = { "name": cmpString, "vintage": cmpNum };
		var direction = sortDirections[sortField] || 1;
		sortDirections[sortField] = -direction;
		$scope.wines.sort(function(a, b){
			return direction * cmpTable[sortField](a[sortField], b[sortField]);
		});
	 };
	 $scope.toggleEdit = function toggleEdit(wine) {
		var index = winesInEditMode.indexOf(wine);
		if (index == -1) winesInEditMode.push(wine);
		else winesInEditMode.splice(index, 1);
	 }; 
	 $scope.editable = function isEditable(wine) {
		 return winesInEditMode.indexOf(wine) != -1;
	 };
	 $scope.savable = function isSavable(wine) {
		return wine.name.length > 0 && (wine.vintage === null || typeof wine.vintage === "number");
	 }
	 $scope.readonly = function isReadonly(wine){ return !$scope.editable(wine) }
 }