import Parse from 'parse'
import flatten from '../helpers/flatten'
import store from '../store/configureStore'

export function restoreOnLoacl(index) {
	return {
		type: 'restore',
		index
	}
}

export function restoreOnParse(object, index) {
	return dispatch => {
		var parseClass = Parse.Object.extend(object.id.className);
		var query = new Parse.Query(parseClass);
		return query.get(object.id.objectId).then(function(targetObj) {
			targetObj.set("status", 1);
			targetObj.save();
			dispatch(restoreOnLoacl(index));
		})		
	}
}

export function addDeletedCopys(copys) {
	return {
		type: "addDeletedCopys",
		deletedCopys: copys
	}
}

export function fetchInitialDeletedCopys() {
	// fetch initial 25 notes
	return dispatch => {
		var query = (new Parse.Query('ParseNote')).equalTo('status', -7).descending("updatedAt").limit(25);
		return query.find(function(results) {
			dispatch(addDeletedCopys(results.map(flatten)))
		});
	}
}

export function loadMoreDeletedCopysFromParse() {
	return dispatch => {
		// fetch more copys based on the updated time of last local copy
		var currentLocalCopys = store.getState().deletedCopys
		var lastLocalCopy = currentLocalCopys[currentLocalCopys.length - 1]
		var query = (new Parse.Query('ParseNote')).equalTo('status', -7).descending("updatedAt").lessThan("updatedAt", lastLocalCopy.updatedAt).limit(25);
		return query.find(function(results) {
			if (results.length > 0) {
				dispatch(addDeletedCopys(results.map(flatten)));
				dispatch(endFetchingCopysFromParse());
			} else {
				dispatch(noMoreCopysFromParse())
			}
		})	
	}
}