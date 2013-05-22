function CellarCtrl($scope) {
	function arrayRemove(arr, elem){
		var index = arr.indexOf(elem);
		if (index !== -1) arr.splice(index, 1);
		return index !== -1;
	}
	var winesInEditMode = [];
	
	$scope.newWine = {};
	$scope.wines = [
		{name: "Henri Goutorbe Special Club", vintage: 2002, grapes: ["chardonnay", "pinot meunier", "pinot noir"]},
		{name: "Krug Grand Cuvée", vintage: null, grapes: []},
		{name: "Recaredo Gran Reserva Brut Nature", vintage: 2006, grapes: ["macabeo", "parellada", "xarel·lo"]},
		{name: "Françoise Bedel Entre Ciel et Terre", vintage: null, grapes: ["pinot meunier"]},
	 ];
	 $scope.add = function addWine(){
		$scope.newWine.vintage = parseInt($scope.newWine.vintage, 10) || null;
		$scope.newWine.grapes = $scope.newWine.grapes.replace(/\s+/, " ").toLowerCase().split(/\s*,\s*/);
		$scope.newWine.grapes.sort();
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
		function cmpArray(elementCmp){
			return function cmpArrayImpl(a, b) {
				var i;
				for (i = 0; i < a.length && i < b.length; i++) {
					var cmp = elementCmp(a[i], b[i]);
					if (cmp != 0) return cmp;
				}
				// All elements equal for the length of a. If the arrays are of the same length, they're equal, else 
				// the shorter is considered smaller.
				return cmpNum(a.length, b.length); 
			};
		}
		var cmpTable = { "name": cmpString, "vintage": cmpNum, "grapes": cmpArray(cmpString) };
		var direction = sortDirections[sortField] || 1;
		sortDirections[sortField] = -direction;
		$scope.wines.sort(function(a, b){
			return direction * cmpTable[sortField](a[sortField], b[sortField]);
		});
	 };
	 $scope.toggleEdit = function toggleEdit(wine) {
		if (!arrayRemove(winesInEditMode, wine)) winesInEditMode.push(wine);
	 }; 
	 $scope.editable = function isEditable(wine) {
		 return winesInEditMode.indexOf(wine) != -1;
	 };
	 $scope.savable = function isSavable(wine) {
		return wine.name.length > 0 && (wine.vintage === null || typeof wine.vintage === "number");
	 }
	 $scope.readonly = function isReadonly(wine){ return !$scope.editable(wine) }
	 $scope.remove = function removeWine(wine) {
		arrayRemove($scope.wines, wine);
		arrayRemove(winesInEditMode, wine);
	 }
 }