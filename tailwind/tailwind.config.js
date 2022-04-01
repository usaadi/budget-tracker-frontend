module.exports = {
  prefix: "tw-",
  content: ["../public/index.html", "../src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "arial-rounded": ["ArialRounded", "sans-serif"],
        arial: ["Artimo", "Arial", "Helvetica", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      fontSize: {
        "9px": "9px",
        "10px": "10px",
        "10.2px": "10.2px",
        "12px": "12px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "17.2px": "17.2px",
        "18px": "18px",
        "20px": "20px",
        "24px": "24px",
        "27.5px": "27.5px",
        "28px": "28px",
        "38px": "38px",
      },
      colors: {
        "wf-royal-blue": "#0068f2",
        "wf-silver": "#c6c6c6",
        "wf-royal-blue-2": "#004ff7",
        "wf-grey": "#7e7e7e",
        "wf-white-bg": "#fafafc",
        "wf-alice-blue": "#d2e8ff",
        "wf-white-smoke": "#e9e9e9",
        "wf-silver-2": "#b6b6b6",
        "wf-light-grey": "#cfcfcf",
        "wf-dodger-blue": "#0087f8",
        "wf-royal-blue-3": "#0062f2",
        "wf-slate-blue": "#0047ff",
        "wf-red": "#f80000",
        "wf-crimson": "#cf182b",
        "wf-crimson-2": "#e12832",
        "wf-crimson-3": "#e4001e",
        "wf-gainsboro": "#e1e1e1",
        "wf-dim-grey": "#717171",
        "wf-white-smoke-2": "#f9f9f9",
        "wf-midnight-blue": "#001431",
        "wf-midnight-blue-2": "#011e37",
        "wf-black-2": "rgba(0,0,0,0.27)",
        "wf-royal-blue-4": "#0069f3",
        "wf-grey-3": "#757575",
        "wf-crimson-4": "#c43436",
        "wf-royal-blue-4": "#006ff4",
        "wf-dark-grey": "#969595",
        "wf-light-slate-grey": "rgba(125,134,169,0.5)",
        "wf-black-2": "#202020",
        "wf-light-slate-grey-2": "#7d86a9",
        "wf-white-smoke-3": "#ededed",
        "wf-bright-blue": "rgba(0, 104, 242, 0.1)",
        "wf-warning-bg": "#f8d7da",
        "wf-warning-text": "#9b534a",
        "wf-grey-bg": "#ececec",
        "wf-light-grey-2": "#bcbcbc",
        "db-blue-1": "#1a89f0",
        "db-blue-2": "#1065e8",
        "db-blue-3": "#0d5ae5",
        "db-blue-4": "#006df4",
        "db-blue-5": "#4a71e1",
        "db-blue-6": "#0047ff",
        "db-blue-7": "#0087f8",
        "db-blue-8": "#0062f2",
        "db-blue-9": "#0960f1",
        "db-blue-10": "#0d5ae5",
        "db-blue-11": "#0078f6",
        "db-blue-12": "#007af6",
        "db-blue-13": "#004ff7",
        "db-blue-14": "#126ce9",
        "db-blue-15": "#5eabff",
        "db-blue-16": "#007cf6",
        "db-blue-17": "#0068f2",
        "db-blue-18": "#006ff4",
        "db-light-blue-1": "#cde7fb",
        "db-blue-gray-1": "#7d86a9",
        "db-gray-1": "#91919c",
        "db-gray-2": "#e9e9e9",
        "db-gray-3": "#7e7e7e",
        "db-gray-4": "#e1e1e1",
        "db-gray-5": "#666666",
        "db-gray-6": "#b6b6b6",
        "db-gray-7": "#cfcfcf",
        "db-gray-8": "#eeeeee",
        "db-gray-9": "#8c8888",
        "db-gray-10": "#ededed",
        "db-gray-11": "#636363",
        "db-gray-12": "#5d5d5d",
        "db-gray-13": "#acabab",
        "db-gray-14": "#91919d",
        "db-gray-15": "#cdcdcd",
        "db-gray-16": "#212145",
        "db-gray-17": "#e0e0e0",
        "db-gray-18": "#9e9e9e",
        "db-gray-19": "#d8d8d8",
        "db-gray-20": "#dedede",
        "db-gray-21": "#f6f6f6",
        "db-gray-22": "#979797",
        "db-gray-23": "#ebebeb",
        "db-gray-24": "#eaeaea",
        "db-gray-25": "#c3c3c3",
        "db-gray-26": "#989898",
        "db-gray-27": "#7d86a9",
        "db-gray-28": "#c5c5c5",
        "db-gray-29": "#bdbdbd",
        "db-gray-30": "#7b7b7b",
        "db-gray-31": "#868686",
        "db-gray-32": "#969595",
        "db-gray-33": "#b2b2b2",
        "db-dark-gray-1": "#4b4b4b",
        "db-gray-bg": "#ececec",
        "db-gray-bg-2": "#f7f7f7",
        "db-medium-gray": "#9191af",
        "db-black-1": "#212145",
        "db-black-2": "#202020",
        "db-black-3": "#0c0c0c",
        "db-positive-1": "#0fb269",
        "db-neutral-1": "#9191af",
        "db-negative-1": "#eb5353",
        "db-red-1": "#d8202e",
        "db-red-2": "#f80000",
        "db-red-3": "#d8525e",
        "db-red-4": "#c43436",
        "db-green-1": "#0fb269",
        "db-orange-1": "#ffc506",
        "bt-white-1": "#eaedde",
        "bt-white-2": "#eaede0",
        "bt-beige-1": "#e0e4ce",
        "bt-dark-beige": "#B3B6A5",
      },
      backgroundImage: {
        "wf-search-lens":
          "url('/src/components/shared/images/24-px-search.png')",
        "wf-search-lens-dark":
          "url('/src/components/shared/images/24-px-search-dark.svg')",
        "wf-input-close-x": "url('/src/components/shared/images/close-3.svg')",
        "wf-calendar-icon":
          "url('/src/components/shared/images/24-px-calendar-2.svg')",
        "standard-btn-gradient-blue":
          "linear-gradient(to bottom, #0087f8, #0062f2)",
        "standard-btn-gradient-green":
          "linear-gradient(to bottom, #0fb269, #0fb269)",
        "standard-btn-gradient-green-2":
          "linear-gradient(to bottom, #8d9660, #8da660)",
        "standard-btn-gradient-red":
          "linear-gradient(to bottom, #d8202e, #d8202e)",
        "blue-label-gradient": "linear-gradient(to bottom, #1a89f0, #1065e8)",
        "menu-item-gradient-1":
          "linear-gradient(to right, rgba(13,90,229,0.2), rgba(13,90,229,0.02))",
        "horizontal-gradient-blue":
          "linear-gradient(to right, #0087f8 2%, #0062f2 102%)",
      },
      gridTemplateRows: {
        "8-2": "8fr 2fr",
      },
      gridTemplateColumns: {
        "17-10": "17fr 10fr",
        "7-5": "7fr 5fr",
        "3-7": "3fr 7fr",
        "2-1": "2fr 1fr",
        "1-2": "1fr 2fr",
        "1-340px": "1fr 340px",
        "max-2": "max-content max-content",
        "auto-fit-200px": "repeat(auto-fit, minmax(250px, 1fr))",
      },
      boxShadow: {
        1: "2px 2px 10px 2px rgba(0, 0, 0, 0.15)",
        2: "2px 2px 11px 2px rgba(0, 0, 0, 0.15)",
        3: "0 10px 60px -5px rgba(0, 0, 0, 0.05)",
        4: "0 2px 14px 0 rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        minus1px: "-1px",
        minus2px: "-2px",
        minus6px: "-6px",
        minus38px: "-38px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        "7px": "7px",
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "18px": "18px",
        "20px": "20px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "24px": "24px",
        "25px": "25px",
        "26px": "26px",
        "27px": "27px",
        "28px": "28px",
        "30px": "30px",
        "32px": "32px",
        "33px": "33px",
        "34px": "34px",
        "35px": "35px",
        "36px": "36px",
        "38px": "38px",
        "39px": "39px",
        "40px": "40px",
        "42px": "42px",
        "44px": "44px",
        "48px": "48px",
        "50px": "50px",
        "53px": "53px",
        "55px": "55px",
        "56px": "56px",
        "60px": "60px",
        "64px": "64px",
        "70px": "70px",
        "100px": "100px",
        "102px": "102px",
        "110px": "110px",
        "122px": "122px",
        "135px": "135px",
        "147px": "147px",
        "150px": "150px",
        "152px": "152px",
        "155px": "155px",
        "158px": "158px",
        "173px": "173px",
        "200px": "200px",
        "208px": "208px",
        "220px": "220px",
        "231px": "231px",
        "240px": "240px",
        "250px": "250px",
        "260px": "260px",
        "290px": "290px",
        "320px": "320px",
        "350px": "350px",
        "360px": "360px",
        "408px": "408px",
        "500px": "500px",
        "560px": "560px",
        "600px": "600px",
        "620px": "620px",
        "668px": "668px",
        "720px": "720px",
        "800px": "800px",
        "1006px": "1006px",
        "10pct": "10%",
        "20pct": "20%",
        "30pct": "30%",
        "31pct": "31%",
        "33pct": "33%",
        "35pct": "35%",
        "40pct": "40%",
        "50pct": "50%",
        "60pct": "60%",
        "70pct": "70%",
        "80pct": "80%",
        "90pct": "90%",
        "100pct": "100%",
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        "7px": "7px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "20px": "20px",
        "25px": "25px",
        "30px": "30px",
      },
      // width: {
      //   "20px": "20px",
      // },
      // height: {
      //   "15px": "15px",
      //   "20px": "20px",
      // },
      minWidth: {
        small: "67px",
        "large-1": "185px",
        "150px": "150px",
      },
      minHeight: {
        "20px": "20px",
        "35px": "35px",
        "60px": "60px",
        "173px": "173px",
        "303px": "303px",
        "50pct": "50%",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "grow-down": "grow-down 200ms ease-in-out",
      },
      transitionProperty: {
        height: "height",
        "max-height": "max-height",
        dropdown: "max-height, padding, margin",
      },
      keyframes: {
        "grow-down": {
          "0%": { transform: "scaleY(0)" },
          // "80%": { transform: "scaleY(1.025)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      zIndex: {
        1000000: "1000000",
        1000: "1000",
      },
      screens: {
        "sm-max": { max: "767px" },
      },
      // padding: {
      //   "10px": "10px",
      //   "15px": "15px",
      // },
      // gap: {
      //   "9px": "9px",
      //   "12px": "12px",
      // },
    },
  },
  plugins: [],
};
