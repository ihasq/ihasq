import { random } from "@ihasq/random";

interface ESPointer {
	toString(): symbol;
	watch(callbackFn: Function): ESPointer;
	fork(): ESPointer;
	publishSymbol(): symbol;
	PTR_IDENTIFIER: symbol;
	// to(destination: number, duration?: number): ESPointer;
};

const PTR_IDENTIFIER = Symbol("ESPTR");

Object.defineProperty(window, PTR_IDENTIFIER, {
	value: true,
	configurable: false
});

const $ = (

	value: any,
	setterFn: Function = (x: any) => x

): ESPointer => {

	let BASE_TOKEN = random(32);

	while(BASE_TOKEN in window) {
		BASE_TOKEN = random(32);
	};

	const
		BASE_SYMBOL = Symbol(BASE_TOKEN),
		WATCHER_CALLBACKS: Function[] = [],
		GETTER_FN = {
			get() {
				return value;
			},
			configurable: false,
			enumerable: false,
		},
		WINDOW_PROPERTY = {
			enumerable: false,
			configurable: false,
			value: (symbol: symbol) => (symbol == BASE_SYMBOL || PUBLISHED_SYMBOL.includes(symbol))
				? value
				: undefined
			,
		},
		PUBLISHED_SYMBOL: symbol[] = []
	;

	Object.defineProperty($, BASE_SYMBOL, {
		set(newValue) {
			WATCHER_CALLBACKS.forEach((x: Function) => x ? x(newValue) : undefined);
			value = setterFn(newValue);
			return true;
		},
		...GETTER_FN,
	});

	Object.defineProperty(window, BASE_TOKEN, WINDOW_PROPERTY);

	return {
		toString(): symbol {
			return BASE_SYMBOL;
		},
		watch(callbackFn?: Function): ESPointer {
			if(callbackFn) {
				callbackFn(value);
				WATCHER_CALLBACKS.push(callbackFn);
			}
			return this;
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
		},
		publishSymbol(): symbol {
			const NEW_SYMBOL = Symbol(BASE_TOKEN);
			PUBLISHED_SYMBOL.push(NEW_SYMBOL);
			return NEW_SYMBOL;
		},
		
		PTR_IDENTIFIER
	}
};

export { $ }