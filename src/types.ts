import { Plugin } from "vue";

export type BaniResponse = {
	reference: string;
	type: "fiat" | "crypto";
	status: string;
};

export interface BaniPayload {
	amount: string | number; //The amount user wants to pay
	phoneNumber: string; //In international format
	email: string; //The email of the customer
	firstName: string; //The first name of the customer
	lastName: string; //The last name of the customer
	merchantKey: string; //The merchant Bani public key
	metadata?: { [key: string]: any }; //Custom JSON object passed by the merchant. This is optional
	merchantRef?: string; //Custom unique  payment reference passed by the merchant. This is optional
	onClose?: (response?: BaniResponse) => void;
	callback?: (response: BaniResponse) => void;
}

export type BaniPopup = (payload: BaniPayload) => void;

export declare function useBani(): BaniPopup;

declare const plugin: Plugin;
export default plugin;

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$bani: BaniPopup;
	}
}

declare global {
	interface Window {
		BaniPopup?: BaniPopup;
	}
}