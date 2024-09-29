
const
	fromTarget = [0],
	calledSecond = {},
	createDiffer = (...targets: any[]) => {
		Function(`(target,${targets.map((_, i) => `L${i}`).join(",")}) => ` + targets.map((_, i) => `target === L${i}`).join(" || "))
	},
	differFnBase = (target) => {},
	casor = Object.freeze(Object.assign(
		(...targets: any[]): symbol => {
			const differFn = differFnBase.apply(null, targets)
			return Symbol("ok")
		},
		{
			new(swicher: { [key: symbol]: ((validated?: any) => (object | undefined)) | object }): Function {
				return this.run.bind(calledSecond)
			},
			run(...targets: any[]): Function {
				const TARGET_LEN = (targets ||= [true]).length;
				if(this === calledSecond) {
					if(TARGET_LEN != 1) throw { name: 'Error', message: "cannot assign it" }
				}
				return this.new.bind(targets)
			}
		}
	))
