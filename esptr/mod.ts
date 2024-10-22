// import { random } from "@ihasq/random";

interface ESPointer {
	$: any;
	watch(callbackFn: Function): this;
	into(transformerFn: Function): this;
	fork(): ESPointer;
	// to(destination: number, duration?: number): ESPointer;
};

const PTR_IDENTIFIER = Symbol("ESPTR");

// Object.defineProperty(window, PTR_IDENTIFIER, {
// 	value: true,
// 	configurable: false
// });

const $ = (

	value: any,
	setterFn: Function = (x: any) => x

): ESPointer => {

	const
		BASE_SYMBOL = Symbol(),
		WATCHER_CALLBACKS: Function[] = [],
		// GETTER_FN = {
		// 	get() {
		// 		return value;
		// 	},
		// 	configurable: false,
		// 	enumerable: false,
		// },
		// WINDOW_PROPERTY = {
		// 	enumerable: false,
		// 	configurable: false,
		// 	value: (symbol: symbol) => (symbol == BASE_SYMBOL || PUBLISHED_SYMBOL.includes(symbol))
		// 		? value
		// 		: undefined
		// 	,
		// },
		PUBLISHED_SYMBOL: symbol[] = []
	;

	// Object.defineProperty($, BASE_SYMBOL, {
	// 	set(newValue) {
	// 		if(value === (value = setterFn(newValue))) return;
	// 		WATCHER_CALLBACKS.forEach((x: Function) => x ? x(value) : undefined);
	// 		return true;
	// 	},
	// 	...GETTER_FN,
	// });

	return {
		set $(newValue) {
			if(value === (value = setterFn(newValue))) return;
			WATCHER_CALLBACKS.forEach((x: Function) => x ? x(value) : undefined);
		},
		get $() {
			return value;
		},
		watch(callbackFn?: Function): ESPointer {
			if(!callbackFn) return this;
			callbackFn(value);
			WATCHER_CALLBACKS.push(callbackFn);
			return this;
		},
		into(transformerFn: Function): ESPointer {
			const ptr = $(undefined);
			this.watch($ => ptr.$ = transformerFn($));
			return ptr;
		},
		
		// into(
		// 	transformerFn: Function
		// ): ESPointer {
		// 	return this.fork()
		// },
		// to(
		// 	destination: number,
		// 	duration?: number = 1000,
		// 	type: string
		// ): ESPointer {

		// 	const
		// 		TIMESTAMP = performance.now(),
		// 		transformerFn = () => {
		// 			CURRENT_TIMESTAMP = performance.now();
		// 		}
		// 	;

		// 	let CURRENT_TIMESTAMP;

		// 	switch(true) {
		// 		case "requestAnimationFrame" in window: {
		// 			requestAnimationFrame(transformerFn(requestAnimationFrame));
		// 		};
		// 	}
		// },
		fork(): ESPointer {
			return $(value);
		}
	}
};

export { $ }