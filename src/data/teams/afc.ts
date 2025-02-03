import { Team } from '../../types/game';

const generateAbilities = (position: 'GK' | 'DEF' | 'MID' | 'FWD', rating: number) => {
  const baseValue = Math.floor(rating * 0.7);
  
  switch (position) {
    case 'GK':
      return {
        pace: baseValue - 20,
        shooting: baseValue - 30,
        passing: baseValue - 10,
        dribbling: baseValue - 25,
        defending: baseValue + 25,
        physical: baseValue + 5
      };
    case 'DEF':
      return {
        pace: baseValue,
        shooting: baseValue - 15,
        passing: baseValue - 5,
        dribbling: baseValue - 10,
        defending: baseValue + 15,
        physical: baseValue + 10
      };
    case 'MID':
      return {
        pace: baseValue - 5,
        shooting: baseValue,
        passing: baseValue + 10,
        dribbling: baseValue + 5,
        defending: baseValue,
        physical: baseValue - 5
      };
    case 'FWD':
      return {
        pace: baseValue + 10,
        shooting: baseValue + 15,
        passing: baseValue - 5,
        dribbling: baseValue + 10,
        defending: baseValue - 20,
        physical: baseValue
      };
  }
};

export const afcTeams: Team[] = [
  {
    id: "jpn",
    name: "Japan",
    flag: "/flags/jpn.svg",
    players: [
      {
        id: "jpn_1",
        name: "Zion Suzuki",
        position: "GK",
        rating: 78,
        isSubstitute: false,
        abilities: generateAbilities("GK", 78)
      },
      {
        id: "jpn_2",
        name: "Takehiro Tomiyasu",
        position: "DEF",
        rating: 82,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 82)
      },
      {
        id: "jpn_3",
        name: "Ko Itakura",
        position: "DEF",
        rating: 79,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 79)
      },
      {
        id: "jpn_4",
        name: "Yuta Nakayama",
        position: "DEF",
        rating: 77,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 77)
      },
      {
        id: "jpn_5",
        name: "Yukinari Sugawara",
        position: "DEF",
        rating: 76,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 76)
      },
      {
        id: "jpn_6",
        name: "Wataru Endo",
        position: "MID",
        rating: 83,
        isSubstitute: false,
        abilities: generateAbilities("MID", 83)
      },
      {
        id: "jpn_7",
        name: "Junya Ito",
        position: "MID",
        rating: 81,
        isSubstitute: false,
        abilities: generateAbilities("MID", 81)
      },
      {
        id: "jpn_8",
        name: "Takefusa Kubo",
        position: "MID",
        rating: 84,
        isSubstitute: false,
        abilities: generateAbilities("MID", 84)
      },
      {
        id: "jpn_9",
        name: "Kaoru Mitoma",
        position: "MID",
        rating: 85,
        isSubstitute: false,
        abilities: generateAbilities("MID", 85)
      },
      {
        id: "jpn_10",
        name: "Ayase Ueda",
        position: "FWD",
        rating: 79,
        isSubstitute: false,
        abilities: generateAbilities("FWD", 79)
      },
      {
        id: "jpn_11",
        name: "Kyogo Furuhashi",
        position: "FWD",
        rating: 80,
        isSubstitute: false,
        abilities: generateAbilities("FWD", 80)
      },
      {
        id: "jpn_12",
        name: "Daizen Maeda",
        position: "FWD",
        rating: 78,
        isSubstitute: true,
        abilities: generateAbilities("FWD", 78)
      },
      {
        id: "jpn_13",
        name: "Ritsu Doan",
        position: "MID",
        rating: 80,
        isSubstitute: true,
        abilities: generateAbilities("MID", 80)
      },
      {
        id: "jpn_14",
        name: "Hidemasa Morita",
        position: "MID",
        rating: 78,
        isSubstitute: true,
        abilities: generateAbilities("MID", 78)
      },
      {
        id: "jpn_15",
        name: "Ao Tanaka",
        position: "MID",
        rating: 77,
        isSubstitute: true,
        abilities: generateAbilities("MID", 77)
      },
      {
        id: "jpn_16",
        name: "Shogo Taniguchi",
        position: "DEF",
        rating: 76,
        isSubstitute: true,
        abilities: generateAbilities("DEF", 76)
      }
    ],
    coach: {
      id: "c_jpn",
      name: "Hajime Moriyasu",
      nationality: "Japanese"
    },
    formation: "4-2-3-1",
    rating: 78
  },
  {
    id: "kor",
    name: "South Korea",
    flag: "/flags/kor.svg",
    players: [
      {
        id: "kor_1",
        name: "Kim Seung-gyu",
        position: "GK",
        rating: 77,
        isSubstitute: false,
        abilities: generateAbilities("GK", 77)
      },
      {
        id: "kor_2",
        name: "Kim Min-jae",
        position: "DEF",
        rating: 86,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 86)
      },
      {
        id: "kor_3",
        name: "Kim Jin-su",
        position: "DEF",
        rating: 77,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 77)
      },
      {
        id: "kor_4",
        name: "Kim Young-gwon",
        position: "DEF",
        rating: 75,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 75)
      },
      {
        id: "kor_5",
        name: "Lee Ki-je",
        position: "DEF",
        rating: 74,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 74)
      },
      {
        id: "kor_6",
        name: "Hwang In-beom",
        position: "MID",
        rating: 77,
        isSubstitute: false,
        abilities: generateAbilities("MID", 77)
      },
      {
        id: "kor_7",
        name: "Son Heung-min",
        position: "MID",
        rating: 87,
        isSubstitute: false,
        abilities: generateAbilities("MID", 87)
      },
      {
        id: "kor_8",
        name: "Lee Jae-sung",
        position: "MID",
        rating: 75,
        isSubstitute: false,
        abilities: generateAbilities("MID", 75)
      },
      {
        id: "kor_9",
        name: "Hwang Hee-chan",
        position: "MID",
        rating: 80,
        isSubstitute: false,
        abilities: generateAbilities("MID", 80)
      },
      {
        id: "kor_10",
        name: "Cho Gue-sung",
        position: "FWD",
        rating: 75,
        isSubstitute: false,
        abilities: generateAbilities("FWD", 75)
      },
      {
        id: "kor_11",
        name: "Lee Kang-in",
        position: "FWD",
        rating: 81,
        isSubstitute: false,
        abilities: generateAbilities("FWD", 81)
      },
      {
        id: "kor_12",
        name: "Jo Hyeon-woo",
        position: "GK",
        rating: 76,
        isSubstitute: true,
        abilities: generateAbilities("GK", 76)
      },
      {
        id: "kor_13",
        name: "Jung Seung-hyun",
        position: "DEF",
        rating: 73,
        isSubstitute: true,
        abilities: generateAbilities("DEF", 73)
      },
      {
        id: "kor_14",
        name: "Park Yong-woo",
        position: "MID",
        rating: 74,
        isSubstitute: true,
        abilities: generateAbilities("MID", 74)
      },
      {
        id: "kor_15",
        name: "Oh Hyeon-gyu",
        position: "FWD",
        rating: 73,
        isSubstitute: true,
        abilities: generateAbilities("FWD", 73)
      }
    ],
    coach: {
      id: "c_kor",
      name: "Jürgen Klinsmann",
      nationality: "German"
    },
    formation: "4-3-3",
    rating: 77
  },
  {
    id: "aus",
    name: "Australia",
    flag: "/flags/aus.svg",
    players: [
      {
        id: "aus_1",
        name: "Mathew Ryan",
        position: "GK",
        rating: 78,
        isSubstitute: false,
        abilities: generateAbilities("GK", 78)
      },
      {
        id: "aus_2",
        name: "Harry Souttar",
        position: "DEF",
        rating: 76,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 76)
      },
      {
        id: "aus_3",
        name: "Aziz Behich",
        position: "DEF",
        rating: 74,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 74)
      },
      {
        id: "aus_4",
        name: "Kye Rowles",
        position: "DEF",
        rating: 73,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 73)
      },
      {
        id: "aus_5",
        name: "Nathaniel Atkinson",
        position: "DEF",
        rating: 72,
        isSubstitute: false,
        abilities: generateAbilities("DEF", 72)
      },
      {
        id: "aus_6",
        name: "Aaron Mooy",
        position: "MID",
        rating: 75,
        isSubstitute: false,
        abilities: generateAbilities("MID", 75)
      },
      {
        id: "aus_7",
        name: "Ajdin Hrustic",
        position: "MID",
        rating: 74,
        isSubstitute: false,
        abilities: generateAbilities("MID", 74)
      },
      {
        id: "aus_8",
        name: "Jackson Irvine",
        position: "MID",
        rating: 73,
        isSubstitute: false,
        abilities: generateAbilities("MID", 73)
      },
      {
        id: "aus_9",
        name: "Mathew Leckie",
        position: "MID",
        rating: 74,
        isSubstitute: false,
        abilities: generateAbilities("MID", 74)
      },
      {
        id: "aus_10",
        name: "Mitchell Duke",
        position: "FWD",
        rating: 73,
        isSubstitute: false,
        abilities: generateAbilities("FWD", 73)
      },
      {
        id: "aus_11",
        name: "Craig Goodwin",
        position: "FWD",
        rating: 74,
        isSubstitute: false,
        abilities: generateAbilities("FWD", 74)
      },
      {
        id: "aus_12",
        name: "Andrew Redmayne",
        position: "GK",
        rating: 72,
        isSubstitute: true,
        abilities: generateAbilities("GK", 72)
      },
      {
        id: "aus_13",
        name: "Bailey Wright",
        position: "DEF",
        rating: 71,
        isSubstitute: true,
        abilities: generateAbilities("DEF", 71)
      },
      {
        id: "aus_14",
        name: "Riley McGree",
        position: "MID",
        rating: 73,
        isSubstitute: true,
        abilities: generateAbilities("MID", 73)
      },
      {
        id: "aus_15",
        name: "Jamie Maclaren",
        position: "FWD",
        rating: 74,
        isSubstitute: true,
        abilities: generateAbilities("FWD", 74)
      }
    ],
    coach: {
      id: "c_aus",
      name: "Graham Arnold",
      nationality: "Australian"
    },
    formation: "4-2-3-1",
    rating: 76
  },
  {
    id: "irn",
    name: "Iran",
    flag: "/flags/irn.svg",
    players: [],
    coach: {
      id: "c_irn",
      name: "Amir Ghalenoei",
      nationality: "Iranian"
    },
    formation: "4-3-3",
    rating: 75
  },
  {
    id: "sau",
    name: "Saudi Arabia",
    flag: "/flags/sau.svg",
    players: [],
    coach: {
      id: "c_sau",
      name: "Roberto Mancini",
      nationality: "Italian"
    },
    formation: "4-3-3",
    rating: 74
  },
  {
    id: "qat",
    name: "Qatar",
    flag: "/flags/qat.svg",
    players: [],
    coach: {
      id: "c_qat",
      name: "Tintin Marquez",
      nationality: "Spanish"
    },
    formation: "5-3-2",
    rating: 73
  },
  {
    id: "uzb",
    name: "Uzbekistan",
    flag: "/flags/uzb.svg",
    players: [],
    coach: {
      id: "c_uzb",
      name: "Srecko Katanec",
      nationality: "Slovenian"
    },
    formation: "4-4-2",
    rating: 72
  },
  {
    id: "irq",
    name: "Iraq",
    flag: "/flags/irq.svg",
    players: [],
    coach: {
      id: "c_irq",
      name: "Jesus Casas",
      nationality: "Spanish"
    },
    formation: "4-2-3-1",
    rating: 71
  },
  {
    id: "chn",
    name: "China PR",
    flag: "/flags/chn.svg",
    players: [],
    coach: {
      id: "c_chn",
      name: "Branko Ivankovic",
      nationality: "Croatian"
    },
    formation: "4-4-2",
    rating: 70
  },
  {
    id: "omn",
    name: "Oman",
    flag: "/flags/omn.svg",
    players: [],
    coach: {
      id: "c_omn",
      name: "Branko Ivankovic",
      nationality: "Croatian"
    },
    formation: "4-3-3",
    rating: 69
  },
  {
    id: "vnm",
    name: "Vietnam",
    flag: "/flags/vnm.svg",
    players: [],
    coach: {
      id: "c_vnm",
      name: "Philippe Troussier",
      nationality: "French"
    },
    formation: "3-4-3",
    rating: 68
  },
  {
    id: "kgz",
    name: "Kyrgyz Republic",
    flag: "/flags/kgz.svg",
    players: [],
    coach: {
      id: "c_kgz",
      name: "Stefan Tarkovic",
      nationality: "Slovak"
    },
    formation: "4-4-2",
    rating: 67
  },
  {
    id: "lbn",
    name: "Lebanon",
    flag: "/flags/lbn.svg",
    players: [],
    coach: {
      id: "c_lbn",
      name: "Miodrag Radulovic",
      nationality: "Montenegrin"
    },
    formation: "4-2-3-1",
    rating: 66
  },
  {
    id: "tjk",
    name: "Tajikistan",
    flag: "/flags/tjk.svg",
    players: [],
    coach: {
      id: "c_tjk",
      name: "Petar Segrt",
      nationality: "Croatian"
    },
    formation: "4-4-2",
    rating: 65
  },
  {
    id: "tha",
    name: "Thailand",
    flag: "/flags/tha.svg",
    players: [],
    coach: {
      id: "c_tha",
      name: "Masatada Ishii",
      nationality: "Japanese"
    },
    formation: "4-2-3-1",
    rating: 64
  },
  {
    id: "mys",
    name: "Malaysia",
    flag: "/flags/mys.svg",
    players: [],
    coach: {
      id: "c_mys",
      name: "Kim Pan-gon",
      nationality: "South Korean"
    },
    formation: "4-3-3",
    rating: 63
  },
  {
    id: "idn",
    name: "Indonesia",
    flag: "/flags/idn.svg",
    players: [],
    coach: {
      id: "c_idn",
      name: "Shin Tae-yong",
      nationality: "South Korean"
    },
    formation: "4-3-3",
    rating: 62
  },
  {
    id: "phl",
    name: "Philippines",
    flag: "/flags/phl.svg",
    players: [],
    coach: {
      id: "c_phl",
      name: "Michael Weiss",
      nationality: "German"
    },
    formation: "4-4-2",
    rating: 61
  },
  {
    id: "mmr",
    name: "Myanmar",
    flag: "/flags/mmr.svg",
    players: [],
    coach: {
      id: "c_mmr",
      name: "Michael Feichtenbeiner",
      nationality: "German"
    },
    formation: "4-2-3-1",
    rating: 60
  },
  {
    id: "sgp",
    name: "Singapore",
    flag: "/flags/sgp.svg",
    players: [],
    coach: {
      id: "c_sgp",
      name: "Takayuki Nishigaya",
      nationality: "Japanese"
    },
    formation: "4-3-3",
    rating: 59
  },
  {
    id: "hkg",
    name: "Hong Kong",
    flag: "/flags/hkg.svg",
    players: [],
    coach: {
      id: "c_hkg",
      name: "Jorn Andersen",
      nationality: "Norwegian"
    },
    formation: "4-4-2",
    rating: 58
  },
  {
    id: "prk",
    name: "North Korea",
    flag: "/flags/prk.svg",
    players: [],
    coach: {
      id: "c_prk",
      name: "Sin Yong-nam",
      nationality: "North Korean"
    },
    formation: "4-4-2",
    rating: 57
  },
  {
    id: "yem",
    name: "Yemen",
    flag: "/flags/yem.svg",
    players: [],
    coach: {
      id: "c_yem",
      name: "Miroslav Soukup",
      nationality: "Czech"
    },
    formation: "4-5-1",
    rating: 56
  },
  {
    id: "twn",
    name: "Chinese Taipei",
    flag: "/flags/twn.svg",
    players: [],
    coach: {
      id: "c_twn",
      name: "Vom Ca-nhum",
      nationality: "Taiwanese"
    },
    formation: "4-4-2",
    rating: 55
  },
  {
    id: "khm",
    name: "Cambodia",
    flag: "/flags/khm.svg",
    players: [],
    coach: {
      id: "c_khm",
      name: "Ryu Hirose",
      nationality: "Japanese"
    },
    formation: "4-3-3",
    rating: 54
  },
  {
    id: "mac",
    name: "Macau",
    flag: "/flags/mac.svg",
    players: [],
    coach: {
      id: "c_mac",
      name: "Lázaro Oliveira",
      nationality: "Portuguese"
    },
    formation: "4-4-2",
    rating: 53
  },
  {
    id: "lao",
    name: "Laos",
    flag: "/flags/lao.svg",
    players: [],
    coach: {
      id: "c_lao",
      name: "Michael Weiss",
      nationality: "German"
    },
    formation: "4-4-2",
    rating: 52
  },
  {
    id: "brn",
    name: "Brunei",
    flag: "/flags/brn.svg",
    players: [],
    coach: {
      id: "c_brn",
      name: "Mario Rivera",
      nationality: "Spanish"
    },
    formation: "4-4-2",
    rating: 51
  },
  {
    id: "tls",
    name: "Timor-Leste",
    flag: "/flags/tls.svg",
    players: [],
    coach: {
      id: "c_tls",
      name: "Fabio Maciel",
      nationality: "Brazilian"
    },
    formation: "4-4-2",
    rating: 50
  },
  {
    id: "mng",
    name: "Mongolia",
    flag: "/flags/mng.svg",
    players: [],
    coach: {
      id: "c_mng",
      name: "Ichiro Otsuka",
      nationality: "Japanese"
    },
    formation: "4-4-2",
    rating: 49
  },
  {
    id: "jor",
    name: "Jordan",
    flag: "/flags/jor.svg",
    players: [],
    coach: {
      id: "c_jor",
      name: "Hussein Ammouta",
      nationality: "Moroccan"
    },
    formation: "4-3-3",
    rating: 75
  },
  {
    id: "pse",
    name: "Palestine",
    flag: "/flags/pse.svg",
    players: [],
    coach: {
      id: "c_pse",
      name: "Makram Daboub",
      nationality: "Tunisian"
    },
    formation: "4-4-2",
    rating: 73
  },
  {
    id: "kwt",
    name: "Kuwait",
    flag: "/flags/kwt.svg",
    players: [],
    coach: {
      id: "c_kwt",
      name: "Rui Bento",
      nationality: "Portuguese"
    },
    formation: "4-2-3-1",
    rating: 72
  },
  {
    id: "bhr",
    name: "Bahrain",
    flag: "/flags/bhr.svg",
    players: [],
    coach: {
      id: "c_bhr",
      name: "Juan Antonio Pizzi",
      nationality: "Spanish"
    },
    formation: "4-3-3",
    rating: 71
  }
];
