/* ============================================================
   DATA — familles créoles + labels UI
   ============================================================ */

export const FAMILIES = {

  /* -------------------------------------------------------- */
  /*  KILTI — base française                                  */
  /* -------------------------------------------------------- */
  kilti: {
    name:"Kilti", nameClass:"", base:"FR-based",
    eyebrow:"Lang péyi nou", title:"Aprann Kréyòl", titleClass:"",
    sub:"Guadeloupe · Martinique · Réunion · Maurice · Louisiane · Haïti",
    btnP:"Kòmansé dèpi zéro", btnS:"Mwen ja ka konpwann",
    baseline:"Aprann kréyòl — Learn Creole",
    desc:"French-based creoles are spoken by over 12 million people across the Caribbean, the Indian Ocean and North America. Born from the meeting of French with African, Amerindian and Malagasy substrata, they form a living and diverse family.",
    speakers:"12M+",
    audioLbl:"Tann fraz-la", footer:"Kréyòl sé lang nou.",
    langSectionTitle:"Language lessons",
    cuisineSectionTitle:"Creole cuisine",
    vieSectionTitle:"Daily expressions",
    creoles:[
      {iso:"hat", name:"Haïtien",      full:"Kreyòl ayisyen"},
      {iso:"gcf", name:"Gwadloupéyen", full:"Kréyòl Gwadloup"},
      {iso:"gcf", name:"Matiniké",     full:"Kréyòl Matnik · Martinique"},
      {iso:"rcf", name:"Réyoné",       full:"Kréol réinioné"},
      {iso:"mfe", name:"Morisyen",     full:"Kreol Morisyen"},
      {iso:"crs", name:"Seselwa",      full:"Kreol Seselwa"},
      {iso:"acf", name:"Sent Lisyen",  full:"Kwéyòl Sent Lisi"},
      {iso:"dcs", name:"Dominikèn",    full:"Patwa Dominik"},
      {iso:"gcr", name:"Guyannais",    full:"Kréyòl Guyanné"},
      {iso:"lou", name:"Lwizyannais",  full:"Kréyòl Lwizyàn"}
    ],
    langue:[
      {tag:"Salitasyon", phrase:"Bonjou, kijan ou yé ?", fr:"Bonjour, comment vas-tu ?", iso:"gcf",
       q:"Kisa « kijan ou yé ? » ka vré di ?",
       opts:["Comment tu t'appelles ?","Comment vas-tu ?","Où vas-tu ?"], ans:1},
      {tag:"Remèsiman", phrase:"Mèsi anpil, ou bon !", fr:"Merci beaucoup, tu es gentil !", iso:"hat",
       q:"Kisa « mèsi » vle di ?",
       opts:["Bonjour","Merci","Au revoir"], ans:1},
      {tag:"Fanmi", phrase:"Mama-mwen ka vini.", fr:"Ma mère vient.", iso:"gcf",
       q:"Kisa « mama-mwen » yé ?",
       opts:["Mon père","Ma sœur","Ma mère"], ans:2},
      {tag:"Tan", phrase:"I ka fè chè jòdi a.", fr:"Il fait chaud aujourd'hui.", iso:"gcf",
       q:"Kisa « chè » vle di ?",
       opts:["Froid","Chaud","Pluie"], ans:1},
      {tag:"Manjé", phrase:"An vlé on koulibwi.", fr:"Je veux un court-bouillon.", iso:"gcf",
       q:"Kisa « koulibwi » yé ?",
       opts:["Un dessert","Un court-bouillon","Une boisson"], ans:1},
      {tag:"Nimewo", phrase:"An ni twa zanfan.", fr:"J'ai trois enfants.", iso:"rcf",
       q:"Kisa « twa » vle di ?",
       opts:["Deux","Quatre","Trois"], ans:2}
    ],
    cuisine:[
      {name:"Koulibwi",        origin:"Antilles FR · gcf",   desc:"Poisson cuisiné dans un bouillon aromatique aux herbes antillaises, citron vert et piment.",                         tag:"Plat principal",   diff:"Moyen"},
      {name:"Féroce d'Avocat", origin:"Martinique · gcf",    desc:"Morue effilochée mélangée à de la farine de manioc et d'avocat écrasé. Entrée emblématique.",                        tag:"Entrée",           diff:"Facile"},
      {name:"Accras",          origin:"Antilles · gcf/rcf",  desc:"Beignets soufflés de morue ou de légumes, frits et dorés. Incontournables à l'apéro.",                              tag:"Apéritif",         diff:"Facile"},
      {name:"Rougail Saucisse",origin:"Réunion · rcf",       desc:"Saucisses mijotées dans une sauce tomate aux épices créoles, servi avec riz et grains.",                            tag:"Plat principal",   diff:"Facile"},
      {name:"Carry Poule",     origin:"Réunion/Maurice · rcf/mfe", desc:"Cari de poulet au curcuma, gingembre et piment, parfumé aux feuilles de combava.",                           tag:"Plat principal",   diff:"Moyen"},
      {name:"Diri ak Djon Djon",origin:"Haïti · hat",        desc:"Riz noir cuit avec des champignons séchés djon djon, spécialité du nord d'Haïti.",                                  tag:"Accompagnement",   diff:"Difficile"}
    ],
    vie:[
      {sit:"Marché",          phrase:"Sa ka koûté ?",          fr:"Combien ça coûte ?",           note:"Utilisé dans tous les marchés antillais, souvent suivi d'un marchandage amical."},
      {sit:"Salutation matin",phrase:"Bon matin, ou la ?",     fr:"Bonjour, t'es là ?",           note:"Expression typique pour saluer un voisin depuis la rue, sans entrer."},
      {sit:"Étonnement",      phrase:"Awa ! Sa pa vré !",      fr:"Oh là là ! C'est pas vrai !",  note:"« Awa » est une exclamation universelle d'étonnement dans toutes les Antilles FR."},
      {sit:"Invitation",      phrase:"Vini manjé épi nou !",   fr:"Viens manger avec nous !",     note:"L'hospitalité créole passe toujours par le partage du repas."},
      {sit:"Accord",          phrase:"Dakò, pa pwoblèm.",      fr:"D'accord, pas de problème.",   note:"« Dakò » vient du français « d'accord », adopté dans tous les créoles FR."},
      {sit:"Départ",          phrase:"Aw, an kay !",           fr:"Bon, je rentre !",             note:"Expression de départ familière, très usitée en fin de soirée."}
    ]
  },

  /* -------------------------------------------------------- */
  /*  KALCHA — base anglaise                                  */
  /* -------------------------------------------------------- */
  kalcha: {
    name:"Kalcha", nameClass:"", base:"EN-based",
    eyebrow:"Island tongue", title:"Learn Creole English", titleClass:"",
    sub:"Jamaica · Barbados · Trinidad · Belize · Hawaii · Gullah",
    btnP:"Start from scratch", btnS:"I already understand some",
    baseline:"Kalcha — English-based Creoles",
    desc:"English-based creoles are spoken by millions across the Caribbean, West Africa, the Pacific and North America. They emerged from the transatlantic slave trade and British colonial expansion, blending English with African, Amerindian and local substrata.",
    speakers:"8M+",
    audioLbl:"Listen to phrase", footer:"Kalcha is our voice.",
    langSectionTitle:"Language lessons",
    cuisineSectionTitle:"Creole cuisine",
    vieSectionTitle:"Daily expressions",
    creoles:[
      {iso:"jam", name:"Jamaican",    full:"Jamaican Patois"},
      {iso:"bzj", name:"Belizean",    full:"Belizean Kriol"},
      {iso:"trf", name:"Trinidadian", full:"Trinidad Creole English"},
      {iso:"srm", name:"Sranan",      full:"Sranan Tongo · Suriname"},
      {iso:"gul", name:"Gullah",      full:"Gullah · South Carolina"},
      {iso:"pcm", name:"Nigerian",    full:"Nigerian Pidgin"},
      {iso:"kri", name:"Krio",        full:"Krio · Sierra Leone"},
      {iso:"tpi", name:"Tok Pisin",   full:"Tok Pisin · Papua New Guinea"}
    ],
    langue:[
      {tag:"Greeting",  phrase:"Wah gwaan, bredda?",        fr:"What's up, brother?",          iso:"jam",
       q:"What does 'wah gwaan' mean?",
       opts:["Goodbye","What's up?","Thank you"], ans:1},
      {tag:"Thanks",    phrase:"Mi deh yah, tanks.",         fr:"I'm here, thanks.",             iso:"jam",
       q:"What does 'tanks' mean?",
       opts:["Sorry","Please","Thanks"], ans:2},
      {tag:"Food",      phrase:"Mek wi nyam some food.",     fr:"Let's eat some food.",          iso:"jam",
       q:"What does 'nyam' mean?",
       opts:["Cook","Eat","Buy"], ans:1},
      {tag:"Family",    phrase:"Mi madda deh a yard.",       fr:"My mother is at home.",         iso:"jam",
       q:"What does 'yard' mean?",
       opts:["Garden","Home","Market"], ans:1},
      {tag:"Weather",   phrase:"Di sun hot bad today.",      fr:"The sun is very hot today.",    iso:"trf",
       q:"What does 'bad' mean here?",
       opts:["Terrible","Very","A little"], ans:1},
      {tag:"Agreement", phrase:"Irie, no problem man.",      fr:"All good, no problem.",         iso:"jam",
       q:"What does 'irie' mean?",
       opts:["Angry","All good","Tired"], ans:1}
    ],
    cuisine:[
      {name:"Ackee & Saltfish",  origin:"Jamaica · jam",  desc:"Jamaica's national dish: ackee fruit sautéed with salted codfish, scotch bonnet pepper and onions.", tag:"Main dish",  diff:"Medium"},
      {name:"Roti",              origin:"Trinidad · trf", desc:"Flatbread stuffed with curried chickpeas or meat, a staple of Indo-Trinidadian Creole cuisine.",      tag:"Main dish",  diff:"Medium"},
      {name:"Jerk Chicken",      origin:"Jamaica · jam",  desc:"Chicken marinated in scotch bonnet, allspice and thyme, slow-cooked over pimento wood.",             tag:"Grill",      diff:"Hard"},
      {name:"Conkies",           origin:"Barbados",       desc:"Cornmeal, coconut and pumpkin steamed in banana leaves. Traditional for Independence Day.",           tag:"Dessert",    diff:"Medium"},
      {name:"Fufu & Egusi Soup", origin:"Nigeria · pcm",  desc:"Pounded yam served with a rich soup of ground melon seeds, leafy greens and smoked fish.",           tag:"Main dish",  diff:"Hard"},
      {name:"Cassava Pone",      origin:"Belize · bzj",   desc:"Dense, sweet cassava cake flavoured with coconut and spices. A beloved street food.",                tag:"Snack",      diff:"Easy"}
    ],
    vie:[
      {sit:"Market",    phrase:"How much fi dis?",           fr:"How much is this?",             note:"Universal market phrase across all English creoles."},
      {sit:"Morning",   phrase:"Mornin', everyting cool?",   fr:"Good morning, everything ok?",  note:"Casual morning greeting between friends or neighbours."},
      {sit:"Surprise",  phrase:"Lawd have mercy!",           fr:"Good heavens!",                 note:"Common exclamation of surprise or shock in Caribbean English creoles."},
      {sit:"Invite",    phrase:"Come nyam wid wi!",          fr:"Come eat with us!",             note:"Food sharing is central to Creole hospitality."},
      {sit:"Agreement", phrase:"Yes man, wi good.",          fr:"Yes, we're good.",              note:"Relaxed confirmation, used across Jamaica and Trinidad."},
      {sit:"Leaving",   phrase:"Likkle more, seen?",         fr:"See you later, understood?",   note:"Farewell phrase, 'seen' signals mutual understanding."}
    ]
  },

  /* -------------------------------------------------------- */
  /*  KULTURA — base portugaise / espagnole / néerlandaise    */
  /* -------------------------------------------------------- */
  kultura: {
    name:"Kultura", nameClass:"logo-serif", base:"PT/ES/NL-based",
    eyebrow:"Língua do povo", title:"Aprende o Crioulo", titleClass:"",
    sub:"Cabo Verde · Guinea-Bissau · São Tomé · Papiamentu · Palenquero · Suriname",
    btnP:"Kumesa di zero", btnS:"N dja papia un poku",
    baseline:"Kultura — PT / ES / NL Creoles",
    desc:"Portuguese, Spanish and Dutch colonial expansion gave birth to a rich set of creoles spanning West Africa, the Atlantic islands and the Caribbean. These languages carry centuries of trade, resistance and cultural fusion.",
    speakers:"4M+",
    audioLbl:"Uvi frazi", footer:"Kultura é nha raiz.",
    langSectionTitle:"Language lessons",
    cuisineSectionTitle:"Creole cuisine",
    vieSectionTitle:"Daily expressions",
    creoles:[
      {iso:"kea", name:"Kabuverdianu", full:"Língua caboverdiana"},
      {iso:"pov", name:"Guinéense",    full:"Kriol da Guiné-Bissau"},
      {iso:"cst", name:"Santomense",   full:"Forro · São Tomé"},
      {iso:"pap", name:"Papiamentu",   full:"Papiamentu · Aruba/Curaçao"},
      {iso:"pln", name:"Palenquero",   full:"Palenquero · Colombia"},
      {iso:"srn", name:"Saramaccan",   full:"Saramaccan · Suriname"},
      {iso:"djk", name:"Aukan",        full:"Aukan / Ndyuka · Suriname"}
    ],
    langue:[
      {tag:"Saudação",   phrase:"Modi bu sta?",              fr:"Comment vas-tu ?",             iso:"kea",
       q:"What does 'modi' mean?",
       opts:["Where","How","When"], ans:1},
      {tag:"Obrigado",   phrase:"Mersi boku, bo e bon.",     fr:"Merci beaucoup, tu es gentil.", iso:"pap",
       q:"'Mersi boku' means…?",
       opts:["Good morning","Thank you very much","See you later"], ans:1},
      {tag:"Família",    phrase:"Nha mai ta ben.",           fr:"Ma mère vient.",               iso:"kea",
       q:"What is 'nha mai'?",
       opts:["My father","My sister","My mother"], ans:2},
      {tag:"Tempo",      phrase:"Ta fasi kalu oji.",         fr:"Il fait chaud aujourd'hui.",   iso:"pov",
       q:"What does 'kalu' mean?",
       opts:["Cold","Hot","Rain"], ans:1},
      {tag:"Kumida",     phrase:"Mi ke un kachupa.",         fr:"Je veux une cachupa.",         iso:"kea",
       q:"Kachupa is…?",
       opts:["A dessert","A stew","A drink"], ans:1},
      {tag:"Número",     phrase:"N ten tres fidju.",         fr:"J'ai trois enfants.",          iso:"kea",
       q:"What does 'tres' mean?",
       opts:["Two","Four","Three"], ans:2}
    ],
    cuisine:[
      {name:"Kachupa",         origin:"Cabo Verde · kea", desc:"Ragoût de maïs, haricots, légumes et viande fumée. Plat national du Cap-Vert, symbole de résistance.",    tag:"Plat principal", diff:"Moyen"},
      {name:"Caldo de Mancarra",origin:"Guinée · pov",   desc:"Soupe crémeuse aux cacahuètes avec poulet ou poisson, servie sur riz. Incontournable en Guinée-Bissau.",   tag:"Plat principal", diff:"Moyen"},
      {name:"Calulu",          origin:"São Tomé · cst",  desc:"Poisson ou viande séché(e) avec légumes verts et huile de palme. Héritage africain intact.",               tag:"Plat principal", diff:"Difficile"},
      {name:"Sopi di Pampuna", origin:"Curaçao · pap",   desc:"Soupe de potiron épicée, typique des dimanches en famille à Curaçao.",                                    tag:"Entrée",         diff:"Facile"},
      {name:"Funchi",          origin:"Aruba/Curaçao · pap", desc:"Polenta ferme à la semoule de maïs, accompagnement universel des plats créoles néerlandais.",          tag:"Accompagnement", diff:"Facile"},
      {name:"Saus Hole",       origin:"Suriname · srn",  desc:"Sauce pimentée à base de piments Madame Jeanette, indispensable sur tout plat surinamais.",                tag:"Condiment",      diff:"Facile"}
    ],
    vie:[
      {sit:"Marché",        phrase:"Kantu ki e?",             fr:"Combien ça coûte ?",           note:"Phrase universelle dans tous les marchés créoles lusophones."},
      {sit:"Matin",         phrase:"Bon dia, modi?",          fr:"Bonjour, comment ça va ?",     note:"Salutation matinale standard au Cap-Vert et en Guinée."},
      {sit:"Surprise",      phrase:"Ai, e verdadi?",          fr:"Oh, c'est vrai ?",             note:"Expression d'étonnement très fréquente en Kabuverdianu."},
      {sit:"Invitation",    phrase:"Ben kume konnoshu!",      fr:"Viens manger avec nous !",     note:"L'hospitalité est centrale dans la culture créole lusophone."},
      {sit:"Accord",        phrase:"Sta bon, nau ten problem.",fr:"C'est bon, pas de problème.", note:"Confirmation positive, utilisée au Cap-Vert et en Guinée."},
      {sit:"Départ",        phrase:"Te logu, kuida!",         fr:"À plus tard, prends soin de toi !", note:"Au revoir typique, chaleureux et bienveillant."}
    ]
  },

  /* -------------------------------------------------------- */
  /*  TAKAFA — base arabe                                     */
  /* -------------------------------------------------------- */
  takafa: {
    name:"تكافا", nameClass:"logo-ar", base:"AR-based",
    eyebrow:"لغة الشعب", title:"تعلم العربية الكريولية", titleClass:"title-ar",
    sub:"Juba · Nubi · Sango · Kinubi · Bahasa Melayu",
    btnP:"ابدأ من الصفر", btnS:"أنا أفهم بعض الكلمات",
    baseline:"تكافا — Creoles arabes",
    desc:"Arabic-based creoles and pidgins emerged along ancient trade routes across East Africa, the Nile Valley and the Great Lakes region. Juba Arabic, Nubi and Kinubi are the most documented, carrying traces of Sudanese Arabic, Nilo-Saharan and Bantu languages.",
    speakers:"2M+",
    audioLbl:"استمع للجملة", footer:".تكافا هي جذورنا",
    langSectionTitle:"دروس اللغة",
    cuisineSectionTitle:"المطبخ الكريولي",
    vieSectionTitle:"تعبيرات يومية",
    creoles:[
      {iso:"pga", name:"جوبا عربي",  full:"Juba Arabic · South Sudan"},
      {iso:"nub", name:"نوبي",        full:"Nubi · Kenya / Uganda"},
      {iso:"knc", name:"كينوبي",      full:"Kinubi · East Africa"},
      {iso:"shu", name:"عربي تشادي",  full:"Chadian Arabic · Chad/CAR"},
      {iso:"apc", name:"عربي شمال",   full:"North Levantine Arabic pidgin"}
    ],
    langue:[
      {tag:"تحية",   phrase:"سلام، كيف حالك؟",             fr:"Bonjour, comment vas-tu ?",    iso:"pga",
       q:"ماذا تعني 'سلام'؟",
       opts:["وداع","مرحباً","شكراً"], ans:1},
      {tag:"شكر",    phrase:"شكراً كتير، أنت كويس.",        fr:"Merci beaucoup, tu es gentil.", iso:"pga",
       q:"ماذا تعني 'شكراً'؟",
       opts:["صباح الخير","شكراً","إلى اللقاء"], ans:1},
      {tag:"عائلة",  phrase:"أمي جاية.",                   fr:"Ma mère vient.",               iso:"pga",
       q:"ماذا تعني 'أمي'؟",
       opts:["أبي","أختي","أمي"], ans:2},
      {tag:"طقس",    phrase:"النهارده حر أوي.",             fr:"Il fait très chaud aujourd'hui.", iso:"shu",
       q:"ماذا تعني 'حر'؟",
       opts:["بارد","حار","مطر"], ans:1},
      {tag:"أكل",    phrase:"أنا عايز عصيدة.",              fr:"Je veux de la bouillie.",       iso:"pga",
       q:"'عصيدة' هي…؟",
       opts:["حلوى","عصيدة","مشروب"], ans:1},
      {tag:"رقم",    phrase:"عندي تلاتة أولاد.",            fr:"J'ai trois enfants.",           iso:"pga",
       q:"ماذا تعني 'تلاتة'؟",
       opts:["اثنان","أربعة","ثلاثة"], ans:2}
    ],
    cuisine:[
      {name:"عصيدة",      origin:"جنوب السودان · pga", desc:"عجينة دقيق الذرة المطبوخة، تُقدَّم مع مرق اللحم أو الخضار. أساس الوجبة اليومية.",              tag:"طبق رئيسي", diff:"سهل"},
      {name:"كسرة",       origin:"السودان · shu",       desc:"خبز رقيق مخمر من دقيق الذرة الرفيعة، يُؤكل مع الويكة أو المرق.",                              tag:"خبز",       diff:"متوسط"},
      {name:"ملاح ويكة",  origin:"تشاد/السودان · shu",  desc:"مرق البامية المجففة والمطحونة مع اللحم والتوابل، قوام لزج ونكهة عميقة.",                      tag:"مرق",       diff:"متوسط"},
      {name:"فول مدمس",   origin:"شمال أفريقيا · apc", desc:"فول مطبوخ ببطء مع زيت الزيتون والكمون والليمون. وجبة إفطار أيقونية.",                          tag:"إفطار",     diff:"سهل"},
      {name:"شاي كرداي",  origin:"أفريقيا جنوب الصحراء", desc:"مشروب أحمر من الكركديه المغلي مع السكر، منعش ساخناً أو بارداً.",                             tag:"مشروب",     diff:"سهل"},
      {name:"لحم بالبصل", origin:"جوبا · pga",          desc:"قطع اللحم المقلية مع البصل والثوم والتوابل، تُقدَّم على الأرز أو العصيدة.",                   tag:"طبق رئيسي", diff:"متوسط"}
    ],
    vie:[
      {sit:"السوق",       phrase:"بكم ده؟",                 fr:"Combien ça coûte ?",           note:"السؤال الأساسي في كل أسواق أفريقيا الشرقية الناطقة بالعربية."},
      {sit:"صباح",        phrase:"صباح الخير، كيف النوم؟",  fr:"Bonjour, bien dormi ?",        note:"تحية الصباح الشائعة في جوبا والخرطوم."},
      {sit:"دهشة",        phrase:"يا سلام! ما صحيح؟",       fr:"Mon Dieu ! C'est pas vrai ?",  note:"تعبير الدهشة الأكثر شيوعاً في العربية الكريولية."},
      {sit:"دعوة",        phrase:"تعال كُل معانا!",          fr:"Viens manger avec nous !",     note:"الكرم وتقاسم الطعام قيمة محورية في الثقافة الكريولية العربية."},
      {sit:"موافقة",      phrase:"تمام، ما فيه مشكلة.",     fr:"D'accord, pas de problème.",   note:"'تمام' تُستخدم في كل العربيات الكريولية للتأكيد الإيجابي."},
      {sit:"وداع",        phrase:"مع السلامة، روح بخير.",    fr:"Au revoir, pars en paix.",     note:"صيغة الوداع الأكثر دفئاً وشيوعاً."}
    ]
  },

  /* -------------------------------------------------------- */
  /*  LEMA — base malaise                                     */
  /* -------------------------------------------------------- */
  lema: {
    name:"Lema", nameClass:"", base:"Malay-based",
    eyebrow:"Bahasa kita", title:"Belajar Kreol Melayu", titleClass:"",
    sub:"Betawi · Manado · Ambon · Baba Malay · Kristang · Chavacano",
    btnP:"Mulai dari awal", btnS:"Saya sudah mengerti sedikit",
    baseline:"Lema — Malay-based Creoles",
    desc:"Malay-based creoles spread across maritime Southeast Asia through centuries of trade, colonisation and migration. From Betawi in Jakarta to Kristang in Malaysia, these languages blend Malay with Portuguese, Dutch, Chinese and local Austronesian languages.",
    speakers:"3M+",
    audioLbl:"Dengar kalimat", footer:"Lema adalah bahasa kita.",
    langSectionTitle:"Language lessons",
    cuisineSectionTitle:"Creole cuisine",
    vieSectionTitle:"Daily expressions",
    creoles:[
      {iso:"bew", name:"Betawi",    full:"Betawi · Jakarta"},
      {iso:"xmm", name:"Manado",    full:"Manado Malay · North Sulawesi"},
      {iso:"abs", name:"Ambon",     full:"Ambonese Malay · Maluku"},
      {iso:"mbf", name:"Baba",      full:"Baba Malay · Malaysia/Singapore"},
      {iso:"mcm", name:"Kristang",  full:"Kristang · Malaysia"},
      {iso:"cbk", name:"Chavacano", full:"Chavacano · Philippines"}
    ],
    langue:[
      {tag:"Salam",    phrase:"Halo, lo gimana?",           fr:"Bonjour, comment vas-tu ?",    iso:"bew",
       q:"What does 'gimana' mean?",
       opts:["Where are you?","How are you?","What's your name?"], ans:1},
      {tag:"Makasih",  phrase:"Makasih banyak, lu baik.",   fr:"Merci beaucoup, tu es gentil.", iso:"bew",
       q:"'Makasih' means…?",
       opts:["Good morning","Thank you","Goodbye"], ans:1},
      {tag:"Keluarga", phrase:"Nyokap gue lagi dateng.",    fr:"Ma mère arrive.",              iso:"bew",
       q:"What is 'nyokap'?",
       opts:["My father","My sister","My mother"], ans:2},
      {tag:"Cuaca",    phrase:"Panas bener hari ini.",      fr:"Il fait vraiment chaud aujourd'hui.", iso:"bew",
       q:"What does 'panas' mean?",
       opts:["Cold","Hot","Rainy"], ans:1},
      {tag:"Makan",    phrase:"Gue mau nasi goreng.",       fr:"Je veux du nasi goreng.",      iso:"bew",
       q:"Nasi goreng is…?",
       opts:["A soup","Fried rice","A dessert"], ans:1},
      {tag:"Nomor",    phrase:"Gue punya tiga anak.",       fr:"J'ai trois enfants.",          iso:"bew",
       q:"What does 'tiga' mean?",
       opts:["Two","Four","Three"], ans:2}
    ],
    cuisine:[
      {name:"Nasi Goreng Betawi", origin:"Jakarta · bew",    desc:"Riz frit aux épices betawi, œuf, kecap manis et crackers. Version urbaine et métissée du classique indonésien.",  tag:"Plat principal",   diff:"Facile"},
      {name:"Papeda",             origin:"Ambon/Maluku · abs",desc:"Bouillie de sagou gélatineuse servie avec poisson à la sauce jaune au curcuma. Emblème des Moluques.",           tag:"Plat principal",   diff:"Moyen"},
      {name:"Tinutuan",           origin:"Manado · xmm",     desc:"Porridge de riz aux légumes verts, maïs et patate douce. Appelé 'bubur Manado', riche et sain.",                  tag:"Petit-déjeuner",   diff:"Facile"},
      {name:"Babi Pongteh",       origin:"Baba Malay · mbf", desc:"Porc braisé à la pâte de soja fermentée et aux pommes de terre, recette péranakan classique.",                    tag:"Plat principal",   diff:"Difficile"},
      {name:"Debal Curry",        origin:"Kristang · mcm",   desc:"Curry aigre-doux au vinaigre, piment et restes de viande. Plat de fête kristang par excellence.",                 tag:"Plat principal",   diff:"Moyen"},
      {name:"Caldo",              origin:"Chavacano · cbk",  desc:"Bouillon clair de poulet ou poisson aux légumes, héritier direct du caldo espagnol créolisé aux Philippines.",     tag:"Soupe",            diff:"Facile"}
    ],
    vie:[
      {sit:"Pasar",       phrase:"Berapa harganya?",          fr:"Combien ça coûte ?",           note:"Question universelle dans tous les marchés d'Asie du Sud-Est créolophone."},
      {sit:"Pagi",        phrase:"Pagi! Udah makan belum?",   fr:"Bonjour ! Tu as déjà mangé ?", note:"Salutation matinale betawi typique, la nourriture est toujours centrale."},
      {sit:"Kaget",       phrase:"Aduh! Masa sih?",           fr:"Aïe ! C'est vrai ?",           note:"Exclamation de surprise universelle en malais créole."},
      {sit:"Undangan",    phrase:"Ayo makan bareng!",         fr:"Allez, mangeons ensemble !",   note:"Invitation conviviale, reflet de la culture du makan bersama."},
      {sit:"Setuju",      phrase:"Oke sip, gak masalah.",     fr:"OK, pas de problème.",         note:"Accord décontracté, mêlant l'anglais 'OK' au malais courant."},
      {sit:"Pamit",       phrase:"Duluan ya, dadah!",         fr:"Je pars le premier, salut !",  note:"Au revoir informel betawi, 'dadah' vient du portugais 'adeus'."}
    ]
  }

};


/* ============================================================
   UI LABELS — version dynamique
   ============================================================ */

export const UI_LABELS = {
  fr: {
    langue:"Langue", cuisine:"Cuisine", vie:"Vie quotidienne", iso:"Codes ISO",
    chipLabel:"Famille créole à base de",
    bases:{
      "FR-based":      "français",
      "EN-based":      "anglais",
      "PT/ES/NL-based":"portugais / espagnol / néerlandais",
      "AR-based":      "arabe",
      "Malay-based":   "malais"
    }
  },
  en: {
    langue:"Language", cuisine:"Cuisine", vie:"Daily life", iso:"ISO codes",
    chipLabel:"Creole family based on",
    bases:{
      "FR-based":      "French",
      "EN-based":      "English",
      "PT/ES/NL-based":"Portuguese / Spanish / Dutch",
      "AR-based":      "Arabic",
      "Malay-based":   "Malay"
    }
  },
  es: {
    langue:"Idioma", cuisine:"Cocina", vie:"Vida cotidiana", iso:"Códigos ISO",
    chipLabel:"Familia criolla basada en",
    bases:{
      "FR-based":      "francés",
      "EN-based":      "inglés",
      "PT/ES/NL-based":"portugués / español / neerlandés",
      "AR-based":      "árabe",
      "Malay-based":   "malayo"
    }
  },
  pt: {
    langue:"Língua", cuisine:"Cozinha", vie:"Vida quotidiana", iso:"Códigos ISO",
    chipLabel:"Família crioula baseada em",
    bases:{
      "FR-based":      "francês",
      "EN-based":      "inglês",
      "PT/ES/NL-based":"português / espanhol / neerlandês",
      "AR-based":      "árabe",
      "Malay-based":   "malaio"
    }
  },
  nl: {
    langue:"Taal", cuisine:"Keuken", vie:"Dagelijks leven", iso:"ISO-codes",
    chipLabel:"Creoolse taalfamilie op basis van",
    bases:{
      "FR-based":      "Frans",
      "EN-based":      "Engels",
      "PT/ES/NL-based":"Portugees / Spaans / Nederlands",
      "AR-based":      "Arabisch",
      "Malay-based":   "Maleis"
    }
  },
  ar: {
    langue:"اللغة", cuisine:"المطبخ", vie:"الحياة اليومية", iso:"رموز ISO",
    chipLabel:"عائلة الكريول المبنية على",
    bases:{
      "FR-based":      "الفرنسية",
      "EN-based":      "الإنجليزية",
      "PT/ES/NL-based":"البرتغالية / الإسبانية / الهولندية",
      "AR-based":      "العربية",
      "Malay-based":   "الماليزية"
    }
  }
};