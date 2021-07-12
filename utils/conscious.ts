export const switchSlider = (index) => {
  let description = "";

  switch (index) {
    case "-1":
      description = "";
      break;

    case "0":
      description = "意識清明";
      break;

    case "1":
      description = "だいたい意識清明だが、今ひとつはっきりしない";
      break;

    case "2":
      description = "時、場所または人物がわからない";
      break;

    case "3":
      description = "名前または生年月日がわからない";
      break;

    case "4":
      description = "普通の呼びかけで容易に開限する";
      break;

    case "5":
      description = "大きな声または体をゆさぶることにより開眼する";
      break;

    case "6":
      description = "痛み刺激と呼びかけを繰り返すとかろうじて開眼する";
      break;

    case "7":
      description = "痛み刺激に対し、はらいのけのような動作をする";
      break;

    case "8":
      description = "痛み刺激に対し手足を動かしたり、顔をしかめる";
      break;

    case "9":
      description = "痛み刺激に反応しない";
      break;

    default:
      break;
  }

  return description;
};

export const switchId = (index: string) => {
  let id = 0;

  switch (index) {
    case "-1":
      id = -1;
      break;

    case "0":
      id = 0;
      break;
    case "1":
      id = 1;
      break;
    case "2":
      id = 2;
      break;
    case "3":
      id = 3;
      break;
    case "4":
      id = 10;
      break;
    case "5":
      id = 20;
      break;
    case "6":
      id = 30;
      break;
    case "7":
      id = 100;
      break;
    case "8":
      id = 200;
      break;
    case "9":
      id = 300;
      break;

    default:
      break;
  }

  return id;
};

export const reverseId = (index) => {
  let scale = "";

  switch (index) {
    case 0:
      scale = "0";
      break;
    case 1:
      scale = "1";
      break;
    case 2:
      scale = "2";
      break;
    case 3:
      scale = "3";
      break;
    case 10:
      scale = "4";
      break;
    case 20:
      scale = "5";
      break;
    case 30:
      scale = "6";
      break;
    case 100:
      scale = "7";
      break;
    case 200:
      scale = "8";
      break;
    case 300:
      scale = "9";
      break;
    default:
      scale = "-1";
      break;
  }

  return scale;
};

export const reverseAdd: (
  str: string | undefined
) => { R: boolean; I: boolean; A: boolean } = (str) => {
  const add = { R: false, I: false, A: false };

  if (str) {
    if (str.indexOf("R") !== -1) add.R = true;
    if (str.indexOf("I") !== -1) add.I = true;
    if (str.indexOf("A") !== -1) add.A = true;
  }

  return add;
};
