import { Switch, Case } from "./mod.ts"

const switchInstance = Switch({
	[Case(1, 2)](value) {
		console.log("the value is 1 or 2")
		Switch.do(value, {
			[Case(1)]() {
				console.log("ok")
			}
		});
		return;
	},

	[Case(3, 4)]: {
		[Case(3).to]: "value is 3",
		default: "nah"
	}
});

switchInstance(1)

const x: number = performance.now()

const legacySwitch = x => {
	switch(x) {
		case 1: case 2: {
			console.log("the value is 1 or 2")
			switch(x) {
				case 1: {
					console.log("ok")
				}
			}
			break;
		}

		case 3: case 4: switch(x) {
			case 3: return "value is 3";
			default: return "nah"
		}
	}
}