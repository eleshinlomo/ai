import { Menu } from "../types/menu";

const MYAFROS_HOME = process.env.NEXT_PUBLIC_MYAFROS_HOME

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },

  {
    id: 3,
    title: "Camsecure",
    path: "/about",
    newTab: false,
  },
 
  {
    id: 6,
    title: "Image",
    newTab: false,
    submenu: [

      {
        id: 1,
        title: "Text to Image",
        path: "/genai/image/texttoimgpage",
        newTab: false,
      },
      {
        id: 2,
        title: "Image to Text",
        path: "/genai/image/imgtotextpage",
        newTab: false,
      },

    ]
  },
 
  {
    id: 6,
    title: "Voice",
    newTab: false,
    submenu: [

      {
        id: 1,
        title: "Voice Recorder",
        path: "/voicerecorder",
        newTab: false,
      },
      {
        id: 2,
        title: "Voice to Text",
        path: "/genai/aitranscriber",
        newTab: false,
      },
      {
        id: 3,
        title: "Text to Voice",
        path: "/textreaderpage",
        newTab: false,
      },
    
    ],
  },
  {
    id: 5,
    title: "MyAfros",
    path: `${MYAFROS_HOME}`,
    newTab: false,
  },
];

