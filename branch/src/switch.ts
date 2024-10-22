const
	fromTarget = [0],
	calledSecond = {},
	createDiffer = (...targets: any[]) => {
		Function(`(target,${targets.map((_, i) => `L${i}`).join(",")}) => ` + targets.map((_, i) => `target === L${i}`).join(" || "))
	},
	differFnBase = (target) => {},
	operationRegistry = {},
	execSwitch = function(value: any) {

	},
	createSwitch = (cases: { [key: symbol]: any }): Function => {
		// const differFn = differFnBase.apply(null)
		return execSwitch.bind({})
	},
	Switch = Object.assign(createSwitch, {
		do(value: any, cases: ({ [key: symbol]: any } | Function)) {

		}
	}),
	Case = (...targets: any[]): any => {
		return {
			[Symbol.toPrimitive]() {
				return Symbol("symbol")
			},
			to: Symbol("fn")
		}
	}

export { Switch, Case }