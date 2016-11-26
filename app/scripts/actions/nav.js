import * as types from "../constants/Nav"

export default function navTo(tab) {
	return {
		type: types.NAV,
		navState: tab
	}
}