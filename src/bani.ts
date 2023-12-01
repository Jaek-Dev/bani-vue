import { Plugin, App } from "vue";
import { BaniPayload, BaniPopup } from "./types";
import semver from 'semver';

const errorMessage = 'Bani initialization not found! Did you register the plugin?';

export function useBani(): BaniPopup {
	//@ts-ignore
	if (!window.BaniPopUp) {
		throw new Error(errorMessage);
	}
	//@ts-ignore
	return window.BaniPopUp;
}

export const BaniVue: Plugin = {
	install(app: App): any {
		/** This plugin only support vue 3.x.x */
		if(semver.lt(app.version, '3.x')) {
			throw new Error('Bani-vue currently support Vue v3.x.')
		}

		const scriptUrl =
			"https://bani-assets.s3.eu-west-2.amazonaws.com/static/widget/js/window.js";

		/** Load the bani script to the window */
		//@ts-ignore
		if (!window.BaniPopUp) {
			const script = document.createElement("script");
			script.id = 'bani-vue__bani-popup';
			script.src = scriptUrl;
			script.async = true;
			script.onerror = () => {
				throw new Error("Unable to initialize bani popup.");
			};
			document.body.appendChild(script);
		}

		/** Add a global helper for SPA template tag */
		app.config.globalProperties.$bani = (payload: BaniPayload): void => {
			/** Check if bani popup exists on window */
			//@ts-ignore
			if (!window.BaniPopUp) {
				if('console' in window) {
					console.error(errorMessage);
				}
				return;
			}
			//@ts-ignore
			return window.BaniPopUp(payload);
		};
	},
};
