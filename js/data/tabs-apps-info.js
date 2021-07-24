let tabsOptions = [
	{
		id: "android",
		name: "Android",
		isVisible: true,
		isActive: true,
		order: 1
	},
	{
		id: "windows",
		name: "Windows 10",
		isVisible: true,
		isActive: false,
		order: 2
	},
	{
		id: "web",
		name: "Web",
		isVisible: true,
		isActive: false,
		order: 3
	},
	{
		id: "libraries",
		name: "Libraries",
		isVisible: true,
		isActive: false,
		order: 4
	},
	{
		id: "others",
		name: "Others",
		isVisible: true,
		isActive: false,
		order: 999
	}
];

let panesOptions =[
	{
		id: "android",
		mainTitle: "",
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "playStore",
						subTitle: `<i class="mdi mdi-google-play"></i> Play Store`
					},
					{
						id: "amazonStore",
						subTitle: `<i class="mdi mdi-amazon"></i> Amazon App Store`
					},
					{
						id: "huaweiStore",
						subTitle: `<i class="mdi mdi-shopping"></i> Huawei App Gallery`
					},
					{
						id: "samsungStore",
						subTitle: `<i class="mdi mdi-shopping"></i> Samsung Galaxy Store`
					}
				]
			}
		],
		techsInvolvedId: "techsPlayStore",
		isActive: true,
		order: 1
	},
	{
		id: "windows",
		mainTitle: "",
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "msStore",
						subTitle: `<i class="fab fa-microsoft"></i> Microsoft Store`
					}
				]
			}
		],
		techsInvolvedId: "techsMSStore",
		isActive: false,
		order: 2
	},
	{
		id: "web",
		mainTitle: "",
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "webStore",
						subTitle: `<i class="fas fa-globe"></i> Web`
					}
				]
			}
		],
		techsInvolvedId: "techsWebStore",
		isActive: false,
		order: 3
	},
	{
		id: "libraries",
		mainTitle: `<i class="mdi mdi-library-shelves"></i> Libraries`,
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "nugetsStore",
						subTitle: `<img class='icons' src="img/icons/nuget.svg" /> NuGet`
					},
					{
						id: "jsLibStore",
						subTitle: `<i class="fab fa-js-square"></i> JavaScript`
					},
					{
						id: "uwpLibStore",
						subTitle: `<i class="fab fa-windows"></i> Windows 10`
					}
				]
			}
		],
		techsInvolvedId: "techsLibsStore",
		isActive: false,
		order: 4
	},
	{
		id: "others",
		mainTitle: `<i class="mdi mdi-application"></i> Unsupported projects`,
		divs: [
			{
				divsTitle: '',
				stores: [
					{
						id: "unsupportedAndroid",
						subTitle: `<i class="mdi mdi-android-head"></i> Android`
					},
					{
						id: "unsupportedWindows10",
						subTitle: `<i class="fab fa-windows"></i> Windows 10`
					},
					{
						id: "unsupportedWindows8",
						subTitle: `<i class="fab fa-windows"></i> Windows 8+`
					},
					{
						id: "unsupportedWindowsPhone",
						subTitle: `<i class="fab fa-windows"></i> Windows Phone 7 &amp; 8+`
					},
					{
						id: "unsupportedWeb",
						subTitle: `<i class="fas fa-globe"></i> Web`
					},
					{
						id: "unsupportedVB",
						subTitle: `<i class="fab fa-windows"></i> Windows XP`
					}
				]
			},
			{
				divsTitle: `<i class="mdi mdi-library-shelves"></i> Unsupported libraries`,
				stores: [
					{
						id: "unsupportedNuget",
						subTitle: `<img class='icons' src="img/icons/nuget.svg" /> NuGet`
					}
				]
			}
		],
		techsInvolvedId: "techsOldStore",
		isActive: false,
		order: 999
	}
];