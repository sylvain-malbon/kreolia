export const FAMILIES = {
  kilti: {
    name:"Kilti", nameClass:"", base:"FR-based",
    eyebrow:"Lang péyi nou", title:"Aprann Kréyòl", sub:"Guadeloupe · Martinique · Réunion · Maurice · Louisiane · Haïti",
    btnP:"Kòmansé dèpi zéro", btnS:"Mwen ja ka konpwann",
    baseline:"Aprann kréyòl — Learn Creole",
    desc:"French-based creoles are spoken by over 12 million people. Born from French with African, Amerindian and Malagasy substrata.",
    speakers:"12M+", audioLbl:"Tann fraz-la", footer:"Kréyòl sé lang nou.",
    langSectionTitle:"Language lessons", cuisineSectionTitle:"Creole cuisine", vieSectionTitle:"Daily expressions", musiqueSectionTitle:"Musiques créoles",
    creoles:[{iso:"gcf",name:"Gwadloupéyen",full:"Kréyòl Gwadloup"},{iso:"gcf",name:"Matiniké",full:"Kréyòl Matnik"},{iso:"hat",name:"Haïtien",full:"Kreyòl ayisyen"},{iso:"rcf",name:"Réyoné",full:"Kréol réinioné"},{iso:"mfe",name:"Morisyen",full:"Kreol Morisyen"},{iso:"lou",name:"Lwizyannais",full:"Kréyòl Lwizyàn"}],
    langue:[
      {tag:"Salitasyon",phrase:"Bonjou, kijan ou yé ?",fr:"Bonjour, comment vas-tu ?",iso:"gcf",q:"Que signifie « kijan ou yé ? »",opts:["Comment tu t'appelles ?","Comment vas-tu ?","Où vas-tu ?"],ans:1},
      {tag:"Manjé",phrase:"An vlé on bokit.",fr:"Je veux un bokit.",iso:"gcf",q:"Le bokit est :",opts:["Une boisson","Un sandwich frit","Un dessert"],ans:1},
      {tag:"Tan",phrase:"I ka fè chò.",fr:"Il fait chaud.",iso:"gcf",q:"« chò » =",opts:["Froid","Chaud","Pluie"],ans:1},
    ],
    cuisine:[{name:"Bokit",origin:"Guadeloupe · gcf",desc:"Pain frit garnis, street-food n°1.",tag:"Snack",diff:"Facile"},{name:"Colombo",origin:"Martinique · gcf",desc:"Cari aux épices indiennes, poulet ou cabri.",tag:"Plat",diff:"Moyen"}],
    vie:[{sit:"Marché",phrase:"Sa ka kouté ?",fr:"Combien ça coûte ?",note:"Marchandage amical."}],
    musique:[
      {name:"Zouk",origin:"Guadeloupe/Martinique",desc:"Né avec Kassav' (1980s). Fusion cadence, funk, compas.",tag:"Danse",diff:"Iconique"},
      {name:"Gwo Ka",origin:"Guadeloupe",desc:"7 rythmes, tambour ka, chant répondè. UNESCO.",tag:"Patrimoine",diff:"Racines"},
      {name:"Bèlè",origin:"Martinique",desc:"Tambour et ti-bwa, danse de lutte.",tag:"Tradition",diff:"Rituel"},
      {name:"Sega",origin:"Maurice/Réunion",desc:"Ravanne, triangle, chant créole océan Indien.",tag:"Océan Indien",diff:"Populaire"},
      {name:"Compas",origin:"Haïti",desc:"Créé par Nemours Jean-Baptiste, base du konpa moderne.",tag:"Haïti",diff:"Incontournable"},
    ]
  },
  kalcha: {
    name:"Kalcha", base:"EN-based", eyebrow:"Island tongue", title:"Learn Creole English", sub:"Jamaica · Trinidad · Belize · Nigeria",
    btnP:"Start from scratch", btnS:"I already understand", baseline:"Kalcha — English-based Creoles", desc:"English-based creoles across Caribbean, Africa and Pacific.", speakers:"8M+", audioLbl:"Listen phrase", footer:"Kalcha is our voice.",
    langSectionTitle:"Language lessons", cuisineSectionTitle:"Creole cuisine", vieSectionTitle:"Daily expressions", musiqueSectionTitle:"Creole Music",
    creoles:[{iso:"jam",name:"Jamaican",full:"Patois"},{iso:"trf",name:"Trinidadian",full:"Trini Creole"},{iso:"pcm",name:"Nigerian",full:"Naija Pidgin"}],
    langue:[{tag:"Greeting",phrase:"Wah gwaan?",fr:"What's up?",iso:"jam",q:"Meaning?",opts:["Goodbye","What's up?","Thanks"],ans:1}],
    cuisine:[{name:"Jerk Chicken",origin:"Jamaica",desc:"Piment, pimento, fumé lent.",tag:"Grill",diff:"Hard"}],
    vie:[{sit:"Market",phrase:"How much fi dis?",fr:"Combien ?",note:"Universel."}],
    musique:[
      {name:"Reggae",origin:"Jamaica",desc:"Basse lourde, message social. Bob Marley.",tag:"World",diff:"Légende"},
      {name:"Dancehall",origin:"Jamaica",desc:"Sound systems, riddims digitaux.",tag:"Urban",diff:"Énergique"},
      {name:"Calypso",origin:"Trinidad",desc:"Satire carnaval, steelpan.",tag:"Carnaval",diff:"Racines"},
      {name:"Soca",origin:"Trinidad",desc:"Soul+Calypso, roi du carnaval.",tag:"Fête",diff:"Populaire"},
      {name:"Afrobeats Pidgin",origin:"Nigeria",desc:"Naija pidgin sur beats afro.",tag:"Africa",diff:"Moderne"},
    ]
  },
  'kultura-pt': {
    name:"Kultura", nameClass:"", base:"PT-based", eyebrow:"Língua do povo", title:"Aprende o Crioulo", sub:"Cabo Verde · Guiné-Bissau · Malacca",
    btnP:"Kumesa di zero", btnS:"N dja papia", baseline:"Kultura PT — Portuguese-based Creoles", desc:"Portuguese-based creoles across Atlantic and Indian Ocean routes.", speakers:"2M+", audioLbl:"Uvi frazi", footer:"Kultura PT é nha raiz.",
    langSectionTitle:"Language lessons", cuisineSectionTitle:"Creole cuisine", vieSectionTitle:"Daily expressions", musiqueSectionTitle:"Músicas crioulas",
    creoles:[{iso:"kea",name:"Kabuverdianu",full:"Cabo Verde"},{iso:"pov",name:"Guinéense",full:"Guinea-Bissau"},{iso:"mcm",name:"Kristang",full:"Malacca"}],
    langue:[
      {tag:"Saudação",phrase:"Modi bu sta?",fr:"Comment vas-tu?",iso:"kea",q:"Modi =",opts:["Où","Comment","Quand"],ans:1},
      {tag:"Mercado",phrase:"I sta dretu.",fr:"Je vais bien.",iso:"pov",q:"« dretu » veut dire:",opts:["bien","vite","loin"],ans:0},
      {tag:"Casa",phrase:"Bos teng fome?",fr:"Tu as faim?",iso:"mcm",q:"« fome » =",opts:["soif","faim","sommeil"],ans:1}
    ],
    cuisine:[{name:"Kachupa",origin:"Cabo Verde",desc:"Ragoût maïs/haricots, plat national.",tag:"Plat",diff:"Moyen"}],
    vie:[{sit:"Mercado",phrase:"Kantu ki e?",fr:"Combien?",note:"Cap-Vert."}],
    musique:[
      {name:"Morna",origin:"Cabo Verde",desc:"Cesária Évora. Saudade créole.",tag:"UNESCO",diff:"Âme"},
      {name:"Funaná",origin:"Cabo Verde",desc:"Accordéon, ferrinho. Rythme paysan.",tag:"Danse",diff:"Rapide"},
      {name:"Jingkli Nona",origin:"Malacca",desc:"Chant kristang d'origine luso-asiatique.",tag:"Patrimoine",diff:"Rare"}
    ]
  },
  'kultura-es': {
    name:"Kultura", nameClass:"", base:"ES-based", eyebrow:"Lengua del pueblo", title:"Aprende el Criollo", sub:"Caribe hispano · Chabacano · Papiamentu",
    btnP:"Empieza desde cero", btnS:"Ya entiendo", baseline:"Kultura ES — Spanish-based Creoles", desc:"Spanish-based creoles and Iberian-contact varieties.", speakers:"1M+", audioLbl:"Escucha frase", footer:"Kultura ES es nuestra voz.",
    langSectionTitle:"Language lessons", cuisineSectionTitle:"Creole cuisine", vieSectionTitle:"Daily expressions", musiqueSectionTitle:"Música criolla",
    creoles:[{iso:"ckz",name:"Chabacano",full:"Zamboanga"},{iso:"pap",name:"Papiamentu",full:"ABC Islands"}],
    langue:[
      {tag:"Saludo",phrase:"Kosa ta pasa?",fr:"Que se passe-t-il ?",iso:"pap",q:"« Kosa ta pasa » =",opts:["Comment ça va","D'où viens-tu","À bientôt"],ans:0},
      {tag:"Calle",phrase:"Onde tu anda?",fr:"Où vas-tu ?",iso:"ckz",q:"« onde » signifie:",opts:["où","pourquoi","quand"],ans:0}
    ],
    cuisine:[{name:"Sancocho criollo",origin:"Caribe hispano",desc:"Ragoût rustique, légumes et viande.",tag:"Plat",diff:"Moyen"}],
    vie:[{sit:"Barrio",phrase:"Kuanto ese?",fr:"Combien ça coûte ?",note:"Usage courant."}],
    musique:[
      {name:"Tumba",origin:"Curaçao",desc:"Rythme de carnaval en papiamentu.",tag:"Carnaval",diff:"Festif"},
      {name:"Chabacano Pop",origin:"Zamboanga",desc:"Pop locale avec refrains créoles hispaniques.",tag:"Urbain",diff:"Moderne"}
    ]
  },
  'kultura-nl': {
    name:"Kultura", nameClass:"", base:"NL-based", eyebrow:"Taal van het volk", title:"Leer Creools", sub:"Dutch-contact · Caribbean · Guyana",
    btnP:"Begin vanaf nul", btnS:"Ik begrijp al", baseline:"Kultura NL — Dutch-based Creoles", desc:"Dutch-based and Dutch-contact creoles from Atlantic history.", speakers:"0.5M+", audioLbl:"Luister zin", footer:"Kultura NL leeft voort.",
    langSectionTitle:"Language lessons", cuisineSectionTitle:"Creole cuisine", vieSectionTitle:"Daily expressions", musiqueSectionTitle:"Creoolse muziek",
    creoles:[{iso:"skw",name:"Skepi",full:"Guyana"},{iso:"brc",name:"Berbice",full:"Guyana"}],
    langue:[
      {tag:"Groet",phrase:"Fa yu de?",fr:"Comment vas-tu ?",iso:"skw",q:"« Fa » signifie:",opts:["comment","demain","encore"],ans:0},
      {tag:"Markt",phrase:"Mi wani bai na winkel.",fr:"Je veux aller au magasin.",iso:"brc",q:"« wani » =",opts:["vouloir","devoir","savoir"],ans:0}
    ],
    cuisine:[{name:"Pastechi creool",origin:"Dutch Caribbean",desc:"Petits chaussons frits, version locale.",tag:"Snack",diff:"Facile"}],
    vie:[{sit:"Straat",phrase:"Fa yu de tide?",fr:"Comment vas-tu aujourd'hui ?",note:"Formule amicale."}],
    musique:[
      {name:"Tambú",origin:"Curaçao",desc:"Percussions profondes et chant responsorial.",tag:"Racines",diff:"Intense"},
      {name:"Kaseko",origin:"Suriname",desc:"Fanfare créole, groove dansant.",tag:"Danse",diff:"Classique"}
    ]
  },
  takafa: {
    name:"تكافا", nameClass:"logo-ar", base:"AR-based", eyebrow:"لغة الشعب", title:"تعلم العربية الكريولية", titleClass:"title-ar", sub:"Juba · Nubi · Soudan",
    btnP:"ابدأ من الصفر", btnS:"أنا أفهم", baseline:"تكافا — Creoles arabes", desc:"Arabic-based pidgins of East Africa.", speakers:"2M+", audioLbl:"استمع للجملة", footer:".تكافا هي جذورنا",
    langSectionTitle:"دروس اللغة", cuisineSectionTitle:"المطبخ الكريولي", vieSectionTitle:"تعبيرات يومية", musiqueSectionTitle:"موسيقى كريولية",
    creoles:[{iso:"pga",name:"Juba",full:"Juba Arabic"},{iso:"nub",name:"Nubi",full:"Kenya/Uganda"}],
    langue:[{tag:"تحية",phrase:"Keif halak?",fr:"Comment vas-tu?",iso:"pga",q:"معنى",opts:["مرحبا","كيف حالك","شكرا"],ans:1}],
    cuisine:[{name:"Aseeda",origin:"Soudan",desc:"Bouillie sorgho, sauce.",tag:"Base",diff:"Facile"}],
    vie:[{sit:"سوق",phrase:"Bi kam?",fr:"Combien?",note:"Juba."}],
    musique:[
      {name:"Agnwani",origin:"Sud Soudan",desc:"Chants Juba Arabic, percussions.",tag:"Tradition",diff:"Racines"},
      {name:"Nubi Tarab",origin:"Kenya",desc:"Fusion arabe-swahili, luth.",tag:"Fusion",diff:"Populaire"},
    ]
  },
  lema: {
    name:"Lema", base:"Malay-based", eyebrow:"Bahasa kita", title:"Belajar Kreol Melayu", sub:"Jakarta · Ambon · Malacca",
    btnP:"Mulai dari awal", btnS:"Saya mengerti", baseline:"Lema — Malay-based Creoles", desc:"Malay trade creoles of SE Asia.", speakers:"3M+", audioLbl:"Dengar kalimat", footer:"Lema adalah bahasa kita.",
    langSectionTitle:"Language lessons", cuisineSectionTitle:"Creole cuisine", vieSectionTitle:"Daily expressions", musiqueSectionTitle:"Musik Kreol",
    creoles:[{iso:"bew",name:"Betawi",full:"Jakarta"},{iso:"abs",name:"Ambon",full:"Maluku"},{iso:"mcm",name:"Kristang",full:"Malacca"}],
    langue:[{tag:"Salam",phrase:"Apa kabar lu?",fr:"Ça va?",iso:"bew",q:"Apa =",opts:["Qui","Quoi/Comment","Où"],ans:1}],
    cuisine:[{name:"Nasi Uduk",origin:"Betawi",desc:"Riz coco, échalotes.",tag:"Street",diff:"Facile"}],
    vie:[{sit:"Pasar",phrase:"Berapa?",fr:"Combien?",note:"Jakarta."}],
    musique:[
      {name:"Keroncong",origin:"Betawi",desc:"Héritage portugais, ukulélé.",tag:"Jakarta",diff:"Classique"},
      {name:"Dangdut",origin:"Indonesia",desc:"Malais + indien + arabe.",tag:"Pop",diff:"Dansant"},
      {name:"Jingkli Nona",origin:"Kristang",desc:"Chant créole portugais malais.",tag:"Malacca",diff:"Patrimoine"},
    ]
  }
};

export const UI_LABELS = {
  fr:{langue:"Langue",cuisine:"Cuisine",vie:"Vie quotidienne",musique:"Musique",chipLabel:"Famille créole à base de",bases:{"FR-based":"français","EN-based":"anglais","PT-based":"portugais","ES-based":"espagnol","NL-based":"néerlandais","AR-based":"arabe","Malay-based":"malais"}},
  en:{langue:"Language",cuisine:"Cuisine",vie:"Daily life",musique:"Music",chipLabel:"Creole family based on",bases:{"FR-based":"French","EN-based":"English","PT-based":"Portuguese","ES-based":"Spanish","NL-based":"Dutch","AR-based":"Arabic","Malay-based":"Malay"}},
  es:{langue:"Idioma",cuisine:"Cocina",vie:"Vida cotidiana",musique:"Música",chipLabel:"Familia criolla basada en",bases:{"FR-based":"francés","EN-based":"inglés","PT-based":"portugués","ES-based":"español","NL-based":"neerlandés","AR-based":"árabe","Malay-based":"malayo"}},
  pt:{langue:"Língua",cuisine:"Cozinha",vie:"Vida quotidiana",musique:"Música",chipLabel:"Família crioula baseada em",bases:{"FR-based":"francês","EN-based":"inglês","PT-based":"português","ES-based":"espanhol","NL-based":"neerlandês","AR-based":"árabe","Malay-based":"malaio"}},
  nl:{langue:"Taal",cuisine:"Keuken",vie:"Dagelijks leven",musique:"Muziek",chipLabel:"Creoolse taalfamilie op basis van",bases:{"FR-based":"Frans","EN-based":"Engels","PT-based":"Portugees","ES-based":"Spaans","NL-based":"Nederlands","AR-based":"Arabisch","Malay-based":"Maleis"}},
  ar:{langue:"اللغة",cuisine:"المطبخ",vie:"الحياة اليومية",musique:"الموسيقى",chipLabel:"عائلة الكريول المبنية على",bases:{"FR-based":"الفرنسية","EN-based":"الإنجليزية","PT-based":"البرتغالية","ES-based":"الإسبانية","NL-based":"الهولندية","AR-based":"العربية","Malay-based":"الماليزية"}},
  ms:{langue:"Bahasa",cuisine:"Masakan",vie:"Kehidupan harian",musique:"Muzik",chipLabel:"Keluarga kreol berasaskan",bases:{"FR-based":"Perancis","EN-based":"Inggeris","PT-based":"Portugis","ES-based":"Sepanyol","NL-based":"Belanda","AR-based":"Arab","Malay-based":"Melayu"}}
};