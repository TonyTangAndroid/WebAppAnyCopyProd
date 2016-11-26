import { combineReducers } from 'redux';
import * as navTypes from "../constants/Nav"

var defaultS = {
	navState: navTypes.COPYS,
	searchText: "",
	copys: [],
	deletedCopys: [],
	searchResults: [],
	enterAddCopyMode: false,
	isFetchingMoreCopysFromParse: false,
	noMoreCopysFromParse: false
}

export default function App(state = {}, action) {
	switch (action.type) {
		case navTypes.NAV:
			return Object.assign({}, state, {
			      navState: action.navState
			    }); 
		case "copy":
			return Object.assign({}, state, {
			      object: action.object,
			      index: action.index,
			      enterAddCopyMode: false
			    });
		case "enterAddCopyMode":
			return Object.assign({}, state, {
			      enterAddCopyMode: true
			    });	
		case "addCopys":
			return Object.assign({}, state, {
				copys: [...state.copys, ...action.copys]
			});
		case "addNewSearchResults":
			return Object.assign({}, state, {
				searchResults: [...action.results],
				noMoreCopysFromParse: false
			});
		case "addMoreSearchResults":
			return Object.assign({}, state, {
				searchResults: [...state.searchResults, ...action.results]
			});
		case "addDeletedCopys":
			return Object.assign({}, state, {
				deletedCopys: [...state.deletedCopys, ...action.deletedCopys]
			});
		case "addNewCopy":
			return Object.assign({}, state, {
				copys: [ action.copy, ...state.copys],
				enterAddCopyMode: false,
				object: action.copy,
				index: 0
			});
		case "updateLocalCopy": 
			return Object.assign({}, state, {
				copys: [
					...state.copys.slice(0, action.index),
					Object.assign({}, state.copys[action.index], {
						title: action.title,
						content: action.content,
						updatedAt: new Date()
			      	}),
				    ...state.copys.slice(action.index + 1)
				]
			});
		case "deleteLocalCopy": 
			var newObj = Object.assign({}, state.copys[action.index], {
				status: -7,
				updatedAt: new Date()
			})
			return Object.assign({}, state, {
				copys: [
					...state.copys.slice(0, action.index),
				    ...state.copys.slice(action.index + 1)
				],
				deletedCopys: [newObj, ...state.deletedCopys],
				object: state.copys[action.index+1],
				index: action.index
			});
		case "startFetchingCopys": 
			return Object.assign({}, state, {
			      isFetchingMoreCopysFromParse: true
			    });
		case "endFetchingCopys": 
			return Object.assign({}, state, {
			      isFetchingMoreCopysFromParse: false
			    });	
		case "noMoreCopysFromParse": 
			return Object.assign({}, state, {
					isFetchingMoreCopysFromParse: false,
			    	noMoreCopysFromParse: true
			    });
		case "restore": 
			var newObj = Object.assign({}, state.deletedCopys[action.index], {
				status: 1,
				updatedAt: new Date()
			})
			console.log(newObj);
			return Object.assign({}, state, {
				deletedCopys: [
					...state.deletedCopys.slice(0, action.index),
				    ...state.deletedCopys.slice(action.index + 1)
				],
				copys: [newObj, ...state.copys]
			});
		default:
			return defaultS;
	}
}