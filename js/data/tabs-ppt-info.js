let tabsOptions = [
	{
		id: "next",
		name: "Prezi Next",
		isVisible: true,
		isActive: true
	},
	{
		id: "classic",
		name: "Prezi Classic",
		isVisible: true,
		isActive: false
	},
	{
		id: "ppt",
		name: "PowerPoint",
		isVisible: true,
		isActive: false
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
		isActive: true
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
		isActive: false
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
		isActive: false
	}
];