let tabsOptions = [
	{
		id: "next",
		name: "Prezi Next",
		isVisible: true,
		isActive: true,
		order: 1
	},
	{
		id: "classic",
		name: "Prezi Classic",
		isVisible: false,
		isActive: false,
		order: 2
	},
	{
		id: "ppt",
		name: "PowerPoint",
		isVisible: true,
		isActive: false,
		order: 3
	}
];
let panesOptions =[
	{
		id: "next",
		mainTitle: "",
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "pptNext",
						subTitle: `<img src="img/icons/prezi.svg" alt="prezi" class="preziIcon" /> Prezi Next`
					}
				]
			}
		],
		techsInvolvedId: "",
		isActive: true,
		order: 1
	},
	{
		id: "classic",
		mainTitle: "",
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "pptClassic",
						subTitle: `<img src="img/icons/prezi.svg" class="preziIcon" /> Prezi Classic`
					}
				]
			}
		],
		techsInvolvedId: "",
		isActive: false,
		order: 2
	},
	{
		id: "ppt",
		mainTitle: "",
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "pptPowerPoint",
						subTitle: `<i class="fab fa-microsoft"></i> PowerPoint`
					}
				]
			}
		],
		techsInvolvedId: "",
		isActive: false,
		order: 3
	}
];