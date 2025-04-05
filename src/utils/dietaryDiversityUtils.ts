import { getIngredientsForDish, getFoodGroup, processFoodText } from './foodNameMapper';

// Enhanced Hindi food dictionary for direct matching
const additionalHindiFoods: Record<string, number> = {
  // Dairy products (13)
  "दही": 13, "छाछ": 13, "दूध": 13, "पनीर": 13, "मट्ठा": 13, "मक्खन": 13, "घी": 13, 
  "लस्सी": 13, "श्रीखंड": 13, "रबड़ी": 13, "खोआ": 13, "चकका": 13, "छेना": 13, "कुल्फी": 13,
  
  // Cereals/Grains (1)
  "चावल": 1, "गेहूं": 1, "रोटी": 1, "आटा": 1, "पराठा": 1, "नान": 1, "चपाती": 1,
  "बाजरा": 1, "ज्वार": 1, "मक्का": 1, "सूजी": 1, "पोहा": 1, "दलिया": 1, "सत्तू": 1, 
  "इडली": 1, "डोसा": 1, "उत्तपम": 1, "चिवड़ा": 1, "मुरमुरा": 1,
  
  // Legumes/Pulses (12)
  "दाल": 12, "चना": 12, "राजमा": 12, "मूंग": 12, "मसूर": 12, "उड़द": 12, "अरहर": 12, 
  "लोबिया": 12, "काला चना": 12, "मटर": 12, "मूंगफली": 12, "तूर": 12, "काबुली चना": 12,
  
  // Vegetables (3, 4, 5)
  "आलू": 5, "प्याज": 5, "टमाटर": 5, "गोभी": 5, "फूलगोभी": 5, "भिंडी": 5, "बैंगन": 5,
  "करेला": 5, "लौकी": 5, "तोरई": 5, "पत्तागोभी": 5, "मूली": 5, "खीरा": 5, "शिमलामिर्च": 5,
  "अदरक": 16, "लहसुन": 16, "हरीमिर्च": 5, "कद्दू": 3, "शकरकंद": 3, "गाजर": 3,
  
  // Green leafy vegetables (4)
  "पालक": 4, "मेथी": 4, "सरसों का साग": 4, "बथुआ": 4, "चौलाई": 4, "पोई": 4, "हरी पत्तेदार सब्जियां": 4,
  
  // Fruits (6, 7)
  "केला": 7, "सेब": 7, "संतरा": 7, "अंगूर": 7, "नींबू": 7, "अनार": 7, "अमरूद": 7,
  "आम": 6, "पपीता": 6, "खरबूजा": 7, "तरबूज": 7, "जामुन": 7, "लीची": 7, "शरीफा": 7,
  "अनानास": 7, "नाशपाती": 7, "चीकू": 7, "अंजीर": 7, "खजूर": 7, "बेर": 7, "कटहल": 7,
  
  // Meat and fish (9, 11)
  "मछली": 11, "मुर्गी": 9, "चिकन": 9, "गोश्त": 9, "मटन": 9, "अंडा": 10, "झींगा": 11,
  "केकड़ा": 11, "सूअर का मांस": 9, "बकरी का मांस": 9, "मांस": 9, 
  
  // Nuts and seeds (12)
  "बादाम": 12, "काजू": 12, "अखरोट": 12, "पिस्ता": 12, "तिल": 12, "मखाना": 12, "चिया": 12,
  "सूरजमुखी के बीज": 12, "कद्दू के बीज": 12, "खसखस": 12, "सरसों": 12,
  
  // Oils and fats (14)
  "तेल": 14, "सरसों का तेल": 14, "जैतून का तेल": 14, "नारियल तेल": 14, "वनस्पति तेल": 14,
  
  // Spices and condiments (16)
  "हल्दी": 16, "धनिया": 16, "जीरा": 16, "गरम मसाला": 16, "लाल मिर्च": 16, "काली मिर्च": 16,
  "इलायची": 16, "दालचीनी": 16, "लौंग": 16, "सौंफ": 16, "अजवाइन": 16, "मेथी दाना": 16,
  "अचार": 16, "चटनी": 16, "नमक": 16,
  
  // Sweets (15)
  "मिठाई": 15, "गुलाब जामुन": 15, "रसगुल्ला": 15, "जलेबी": 15, "लड्डू": 15, "बर्फी": 15,
  "हलवा": 15, "पेड़ा": 15, "रसमलाई": 15, "खीर": 15, "सेवई": 15, "गजक": 15, "चीनी": 15, "शहद": 15,
  
  // Beverages (16)
  "चाय": 16, "कॉफी": 16, "पानी": 16, "नारियल पानी": 16, "फलों का रस": 16, "शरबत": 16,
  
  // Additional foods - Expanded Hindi food dictionary
  // More dairy products
  "चाँच": 13, "चाच": 13, "मलाई": 13, "क्रीम": 13, "दही बड़ा": 13, "छैना": 13, "धैकुटी": 13,
  "मिश्टी दोई": 13, "बासुंदी": 13, "पेडा": 13, "क्षीर": 13, "पयस": 13, "पायासम": 13,
  
  // More grains and cereals
  "कुट्टू": 1, "रागी": 1, "कंगनी": 1, "चीना": 1, "कोदो": 1, "अमरंथ": 1, "रावा": 1,
  "उपमा": 1, "मिसी रोटी": 1, "खाखरा": 1, "ढोकला": 1, "हांडवो": 1, "थेपला": 1, "भाकरी": 1,
  "अप्पम": 1, "पुत्तू": 1, "पोंगल": 1, "अक्की रोटी": 1, "जोलाडा रोटी": 1, "तंदूरी रोटी": 1,
  
  // More pulses and legumes
  "छोले": 12, "मोठ": 12, "वाल": 12, "गवार": 12, "कुल्थी": 12, "खेसारी": 12, "मटकी": 12, 
  "रावलां": 12, "मटरकी दाल": 12, "सफेद वटाणा": 12, "हरी मूंग": 12, "सूखी मूंग": 12, "चवली": 12,
  
  // More vegetables
  "परवल": 5, "टिंडा": 5, "सहजन": 5, "ड्रमस्टिक": 5, "अरबी": 5, "गिलकी": 5,
  "कचरी": 5, "कुंदरू": 5, "चुकंदर": 5, "सलगम": 5, "ककड़ी": 5, "नेनुआ": 5,
  "सेम": 5, "बरबटी": 5, "सुरन": 5, "जिमीकंद": 5, "ओल": 5, "कचालू": 5, "कमलककड़ी": 5,
  
  // More leafy vegetables
  "लाल साग": 4, "हरा साग": 4, "चौलाई साग": 4, "पोई साग": 4, "मूली के पत्ते": 4, "चने के पत्ते": 4,
  "मूली का साग": 4, "सरसों साग": 4, "कुलफा साग": 4, "तोरई के पत्ते": 4, "करेले के पत्ते": 4,
  
  // More fruits
  "फालसा": 7, "करौंदा": 7, "सीताफल": 7, "खरबूज": 7, "तरबूज2": 7, "पपीता2": 6, "आम2": 6, "करौंदा2": 7, 
  "जामुन2": 7, "बेल": 7, "शरीफा2": 7, "लौकाट": 7, "सेब2": 7, "अंगूर2": 7, "बेर2": 7, "कमरख": 7,
  
  // Popular Indian dishes (composite)
  "दाल चावल": 12, "छोले भटूरे": 12, "राजमा चावल": 12, "कढ़ी पकौड़ा": 13, "पाव भाजी": 5,
  "भेल पूरी": 1, "पानी पूरी": 1, "दही पूरी": 13, "आलू परांठा": 5, "गोभी परांठा": 5,
  "मटर पनीर": 12, "पालक पनीर": 4, "आलू गोभी": 5, "आलू मटर": 5, "छोले2": 12,
  "दाल मखनी": 12, "पनीर बटर मसाला": 13, "मटन करी": 9, "चिकन करी": 9, "बिरयानी": 1,
  "पुलाव": 1, "खिचड़ी": 1, "ढोकला2": 1, "इडली सांभर": 12, "डोसा2": 1, "उपमा2": 1,
  "पोहा2": 1, "मिसाल पाव": 12, "वड़ा पाव": 1, "रसम": 16, "सांभर": 12, "थाली": 1,
  
  // More sweets and desserts
  "गाजर का हलवा": 15, "मोहन भोग": 15, "संदेश": 15, "चमचम": 15, "पेड़ा2": 15, "कलाकंद": 15,
  "मालपुआ": 15, "इमरती": 15, "बालूशाही": 15, "पंजीरी": 15, "सोहन हलवा": 15, "गुजिया": 15,
  "नमकीन": 16, "चिवड़ा2": 1, "मठरी": 1, "पापड़": 16
};

// Common English variants and phonetic spellings
const hindiFoodPhoneticVariants: Record<string, number> = {
  // Dairy variants
  "dahi": 13, "chaas": 13, "chaach": 13, "chhanch": 13, "matha": 13, "mattha": 13, "paneer": 13, "ghee": 13,
  "dudh": 13, "doodh": 13, "makhan": 13, "lassi": 13, "shrikhand": 13, "rabri": 13, "khoa": 13,
  "kulfi": 13, "chhena": 13, "chakka": 13, "buttermilk": 13, "curd": 13, "yogurt": 13, "yoghurt": 13,
  "malai": 13, "cream": 13, "dahi bada": 13, "misti doi": 13, "basundi": 13, "kheer": 13, "payasam": 13,
  
  // Cereal variants
  "chawal": 1, "atta": 1, "gehun": 1, "roti": 1, "paratha": 1, "parantha": 1, "naan": 1, 
  "chapati": 1, "chapatti": 1, "phulka": 1, "bajra": 1, "jowar": 1, "jwar": 1, "makka": 1, 
  "sooji": 1, "poha": 1, "dalia": 1, "sattu": 1, "idli": 1, "dosa": 1, "uttapam": 1, "chiwda": 1,
  "ragi": 1, "kuttu": 1, "buckwheat": 1, "chinni": 1, "kodo": 1, "amaranth": 1, "rava": 1, 
  "upma": 1, "missi roti": 1, "khakhra": 1, "dhokla": 1, "handvo": 1, "thepla": 1, "bhakri": 1,
  "appam": 1, "puttu": 1, "pongal": 1, "akki roti": 1, "jolada roti": 1, "tandoori roti": 1,
  "rice": 1, "wheat": 1, "barley": 1, "corn": 1, "maize": 1, "semolina": 1, "millet": 1,
  
  // Pulse variants
  "dal": 12, "daal": 12, "chana": 12, "rajma": 12, "moong": 12, "masoor": 12, "urad": 12, 
  "arhar": 12, "toor": 12, "lobia": 12, "kala chana": 12, "matar": 12, "mungfali": 12, 
  "kabuli chana": 12, "chhole": 12, "chole": 12, "lentil": 12, "beans": 12, "moth": 12,
  "val": 12, "gavar": 12, "kulthi": 12, "khesari": 12, "matki": 12, "white peas": 12,
  "green moong": 12, "dried moong": 12, "cowpea": 12, "peas": 12, "chickpeas": 12,
  
  // Vegetable variants
  "aloo": 5, "pyaaz": 5, "pyaz": 5, "tamatar": 5, "gobhi": 5, "gobi": 5, "phool gobhi": 5, 
  "bhindi": 5, "baingan": 5, "karela": 5, "lauki": 5, "torai": 5, "patta gobhi": 5, "mooli": 5,
  "kheera": 5, "shimla mirch": 5, "adrak": 16, "lehsun": 16, "lahsun": 16, "hari mirch": 5,
  "kaddu": 3, "shakarkand": 3, "gajar": 3, "potato": 5, "onion": 5, "tomato": 5, "okra": 5,
  "eggplant": 5, "cauliflower": 5, "cabbage": 5, "carrot": 3, "cucumber": 5, "ginger": 16, "garlic": 16,
  "parval": 5, "tinda": 5, "sahjan": 5, "drumstick": 5, "arbi": 5, "gilki": 5, "kachri": 5,
  "kundru": 5, "chukander": 5, "beetroot": 5, "turnip": 5, "kachalu": 5, "kakdi": 5, "kakri": 5,
  "sem": 5, "barbati": 5, "suran": 5, "jimikand": 5, "yam": 5, "elephant foot yam": 5,
  
  // Green leafy vegetable variants
  "palak": 4, "methi": 4, "sarson ka saag": 4, "bathua": 4, "cholai": 4, "chaulai": 4, "poi": 4, 
  "spinach": 4, "fenugreek leaves": 4, "greens": 4, "leafy vegetables": 4, "saag": 4,
  "lal saag": 4, "hara saag": 4, "chaulai saag": 4, "poi saag": 4, "radish leaves": 4,
  "mullangi soppu": 4, "mustard greens": 4, "kulfa saag": 4, "purslane": 4, "chenopodium": 4,
  
  // Fruit variants
  "kela": 7, "seb": 7, "santra": 7, "angoor": 7, "nimbu": 7, "anar": 7, "amrood": 7, "guava": 7,
  "aam": 6, "papita": 6, "papaya": 6, "mango": 6, "kharbuja": 7, "tarbuj": 7, "jamun": 7,
  "lichi": 7, "litchi": 7, "sitaphal": 7, "sharifa": 7, "ananas": 7, "nashpati": 7, "chiku": 7,
  "anjeer": 7, "khajoor": 7, "ber": 7, "kathal": 7, "banana": 7, "apple": 7, "orange": 7, "grapes": 7,
  "falsa": 7, "karonda": 7, "pear": 7, "sapota": 7, "custard apple": 7, "pineapple": 7, 
  "melon": 7, "watermelon": 7, "papaya2": 6, "jamun2": 7, "bael": 7, "wood apple": 7, "loquat": 7,
  
  // Meat and fish variants
  "machli": 11, "fish": 11, "murgi": 9, "chicken": 9, "gosht": 9, "mutton": 9, "meat": 9, "anda": 10,
  "egg": 10, "jhinga": 11, "kekda": 11, "crab": 11, "prawns": 11, "bakra": 9, "pork": 9, "goat": 9,
  "pomfret": 11, "surmai": 11, "rohu": 11, "katla": 11, "prawn": 11, "lobster": 11, "oyster": 11,
  "bangda": 11, "bombil": 11, "bombay duck": 11, "hilsa": 11, "rawas": 11, "kingfish": 11,
  
  // Nuts and seeds variants
  "badam": 12, "kaju": 12, "akhrot": 12, "pista": 12, "til": 12, "makhana": 12, "chiya": 12,
  "surajmukhi ke beej": 12, "kaddu ke beej": 12, "khas khas": 12, "sarson": 12, "almond": 12,
  "cashew": 12, "walnut": 12, "pistachio": 12, "sesame": 12, "sunflower seeds": 12, "pumpkin seeds": 12,
  "flaxseed": 12, "alsi": 12, "chia seeds": 12, "poppy seeds": 12, "watermelon seeds": 12,
  "charmagaz": 12, "melon seeds": 12, "pine nuts": 12, "chilgoza": 12, "groundnuts": 12, "peanuts": 12,
  
  // Oil variants
  "tel": 14, "sarson ka tel": 14, "mustard oil": 14, "olive oil": 14, "nariyal tel": 14, "coconut oil": 14,
  "vanaspati tel": 14, "vegetable oil": 14, "oil": 14, "groundnut oil": 14, "peanut oil": 14,
  "sunflower oil": 14, "sesame oil": 14, "til ka tel": 14, "rice bran oil": 14, "palm oil": 14,
  "ghee2": 14, "makhan2": 14, "butter": 14, "dalda": 14, "hydrogenated oil": 14, "refined oil": 14,
  
  // Spice variants
  "haldi": 16, "turmeric": 16, "dhaniya": 16, "coriander": 16, "jeera": 16, "cumin": 16, 
  "garam masala": 16, "lal mirch": 16, "red chili": 16, "kali mirch": 16, "black pepper": 16,
  "elaichi": 16, "cardamom": 16, "dalchini": 16, "cinnamon": 16, "laung": 16, "clove": 16,
  "saunf": 16, "fennel": 16, "ajwain": 16, "carom": 16, "methi dana": 16, "achar": 16, "pickle": 16,
  "chutney": 16, "namak": 16, "salt": 16, "mirch": 16, "masala": 16, "spice": 16, "kesar": 16,
  "saffron": 16, "javitri": 16, "mace": 16, "jaiphal": 16, "nutmeg": 16, "kalonji": 16,
  "nigella": 16, "rai": 16, "mustard seeds": 16, "hing": 16, "asafoetida": 16, "amchur": 16,
  "dry mango powder": 16, "imli": 16, "tamarind": 16, "khada masala": 16, "whole spices": 16,
  "pisa masala": 16, "ground spices": 16, "kasuri methi": 16, "dried fenugreek": 16,
  
  // Sweet variants
  "mithai": 15, "gulab jamun": 15, "rasgulla": 15, "jalebi": 15, "laddu": 15, "ladoo": 15, 
  "barfi": 15, "halwa": 15, "halva": 15, "peda": 15, "rasmalai": 15, "kheer2": 15, "payasam2": 15,
  "sevai": 15, "vermicelli": 15, "gajak": 15, "cheeni": 15, "sugar": 15, "shahad": 15, "honey": 15,
  "sweet": 15, "dessert": 15, "gajar ka halwa": 15, "carrot halwa": 15, "mohan bhog": 15,
  "sandesh": 15, "chamcham": 15, "kalakand": 15, "malpua": 15, "imarti": 15, "balushahi": 15,
  "panjiri": 15, "sohan halwa": 15, "sohan papdi": 15, "gujiya": 15, "modak": 15, "puran poli": 15,
  "shrikhand2": 15, "basundi2": 15, "rabri2": 15, "misti doi2": 15, "mysore pak": 15, "jaggery": 15,
  "gur": 15, "molasses": 15, "mishri": 15, "chini": 15, "boondi": 15, "rasgulla2": 15,
  
  // Beverage variants
  "chai": 16, "tea": 16, "coffee": 16, "pani": 16, "water": 16, "nariyal pani": 16, "coconut water": 16,
  "juice": 16, "rus": 16, "sharbat": 16, "cold drink": 16, "soda": 16, "thandai": 16, "lassi2": 16,
  "chaach2": 16, "buttermilk2": 16, "aam panna": 16, "mango drink": 16, "nimbu pani": 16, "lemonade": 16,
  "sugarcane juice": 16, "ganne ka ras": 16, "jal jeera": 16, "kokum juice": 16, "sol kadhi": 16,
  
  // Indian dishes (composite)
  "dal chawal": 12, "chole bhature": 12, "rajma chawal": 12, "kadhi pakora": 13, "pav bhaji": 5,
  "bhel puri": 1, "pani puri": 1, "dahi puri": 13, "aloo paratha": 5, "gobi paratha": 5,
  "matar paneer": 12, "palak paneer": 4, "aloo gobi": 5, "aloo matar": 5, "chole3": 12,
  "dal makhani": 12, "paneer butter masala": 13, "mutton curry": 9, "chicken curry": 9, "biryani": 1,
  "pulao": 1, "khichdi": 1, "dhokla3": 1, "idli sambar": 12, "dosa3": 1, "upma3": 1, "poha3": 1,
  "misal pav": 12, "vada pav": 1, "rasam": 16, "sambar": 12, "thali": 1, "saag2": 4, "puran poli2": 15,
  "undhiyu": 5, "dal baati": 12, "bisi bele bath": 1, "pongal2": 1, "appam2": 1, "puttu2": 1,
  "avial": 5, "korma": 9, "litti chokha": 1, "sattu paratha": 1, "makki di roti": 1, "sarson da saag": 4
};

// List of popular Indian dishes with their primary ingredients for improved matching
const indianDishIngredients: Record<string, string[]> = {
  "butter chicken": ["chicken", "butter", "cream", "tomato", "onion", "spices"],
  "dal makhani": ["black lentil", "kidney beans", "butter", "cream", "spices"],
  "palak paneer": ["spinach", "cottage cheese", "onion", "tomato", "spices"],
  "chole bhature": ["chickpeas", "flour", "oil", "spices"],
  "rajma chawal": ["kidney beans", "rice", "onion", "tomato", "spices"],
  "aloo gobi": ["potato", "cauliflower", "onion", "tomato", "spices"],
  "matar paneer": ["green peas", "cottage cheese", "onion", "tomato", "spices"],
  "biryani": ["rice", "vegetables", "meat", "spices"],
  "samosa": ["potato", "peas", "flour", "spices"],
  "dosa": ["rice", "lentil", "potato", "spices"],
  "idli": ["rice", "lentil"],
  "vada": ["lentil", "spices"],
  "pav bhaji": ["potato", "vegetables", "bread", "butter", "spices"],
  "paratha": ["wheat flour", "oil", "vegetables"],
  "pulao": ["rice", "vegetables", "spices"],
  "khichdi": ["rice", "lentil", "spices"],
  "kadhi": ["yogurt", "gram flour", "spices"],
  "raita": ["yogurt", "vegetables", "spices"],
  "pakora": ["gram flour", "vegetables", "spices"],
  "jalebi": ["flour", "sugar", "oil"],
  "gulab jamun": ["milk solids", "sugar", "oil"],
  "kheer": ["rice", "milk", "sugar"],
  "halwa": ["flour", "sugar", "ghee"],
  "lassi": ["yogurt", "water", "sugar"],
  "chaat": ["potato", "chickpeas", "yogurt", "tamarind", "spices"],
  "upma": ["semolina", "vegetables", "spices"],
  "poha": ["flattened rice", "potato", "onion", "spices"],
  "dhokla": ["gram flour", "yogurt", "spices"],
  "undhiyu": ["mixed vegetables", "spices"],
  "thepla": ["flour", "spices"],
  "sambar": ["lentil", "vegetables", "tamarind", "spices"],
  "rasam": ["tamarind", "tomato", "spices"],
  "appam": ["rice", "coconut"],
  "avial": ["mixed vegetables", "coconut", "yogurt"],
  "puttu": ["rice flour", "coconut"],
  "pongal": ["rice", "lentil", "ghee", "spices"]
};

// International cuisine categorization by region for enhanced global food recognition
const internationalCuisines: Record<string, string[]> = {
  "mediterranean": ["hummus", "falafel", "tahini", "pita", "olive oil", "tzatziki", "baba ganoush", "dolma", "tabbouleh", "couscous"],
  "east_asian": ["sushi", "kimchi", "tofu", "miso", "soy sauce", "ramen", "dumplings", "bao", "pho", "pad thai", "teriyaki"],
  "latin_american": ["tortilla", "salsa", "guacamole", "enchilada", "taco", "burrito", "ceviche", "empanada", "churro", "mole", "arepa"],
  "african": ["jollof", "couscous", "injera", "tagine", "fufu", "bobotie", "egusi", "piri piri", "bunny chow", "chakalaka"],
  "european": ["pasta", "pizza", "risotto", "croissant", "baguette", "pierogi", "schnitzel", "stroganoff", "paella", "goulash"],
  "middle_eastern": ["kebab", "shawarma", "falafel", "hummus", "tabbouleh", "baklava", "halva", "pilaf", "kofte", "shakshuka"],
  "south_asian": ["curry", "biryani", "naan", "dosa", "samosa", "chutney", "tandoori", "idli", "pakora", "raita"],
  "southeast_asian": ["pad thai", "pho", "satay", "spring roll", "laksa", "rendang", "nasi goreng", "banh mi", "tom yum", "adobo"],
  "caribbean": ["jerk", "plantain", "rice and peas", "roti", "callaloo", "ackee", "saltfish", "rum cake", "pepperpot", "conch"],
  "oceanian": ["pavlova", "meat pie", "anzac biscuit", "lamington", "vegemite", "hangi", "fairy bread", "tim tam", "marmite", "hokey pokey"]
};

// Global food database with nutritional categorizations
const globalFoods: Record<string, { group: string, ingredients?: string[] }> = {
  // Breads & Grains from around the world
  "baguette": { group: "starchy_staples", ingredients: ["wheat flour", "yeast", "salt"] },
  "naan": { group: "starchy_staples", ingredients: ["wheat flour", "yogurt", "yeast"] },
  "tortilla": { group: "starchy_staples", ingredients: ["corn flour", "lime", "salt"] },
  "injera": { group: "starchy_staples", ingredients: ["teff flour", "water"] },
  "pita": { group: "starchy_staples", ingredients: ["wheat flour", "yeast"] },
  "bagel": { group: "starchy_staples", ingredients: ["wheat flour", "yeast", "malt"] },
  "brioche": { group: "starchy_staples", ingredients: ["wheat flour", "butter", "eggs", "milk"] },
  "focaccia": { group: "starchy_staples", ingredients: ["wheat flour", "olive oil", "yeast"] },
  "sourdough": { group: "starchy_staples", ingredients: ["wheat flour", "sourdough starter"] },
  "ciabatta": { group: "starchy_staples", ingredients: ["wheat flour", "olive oil", "yeast"] },
  "challah": { group: "starchy_staples", ingredients: ["wheat flour", "eggs", "yeast"] },
  "roti": { group: "starchy_staples", ingredients: ["wheat flour"] },
  "croissant": { group: "starchy_staples", ingredients: ["wheat flour", "butter", "yeast"] },
  "pretzel": { group: "starchy_staples", ingredients: ["wheat flour", "yeast", "baking soda"] },
  
  // Vegetables from around the world
  "artichoke": { group: "other_vegetables" },
  "asparagus": { group: "other_vegetables" },
  "bok choy": { group: "dark_green_leafy_veg" },
  "brussels sprouts": { group: "other_vegetables" },
  "fennel": { group: "other_vegetables" },
  "leek": { group: "other_vegetables" },
  "radicchio": { group: "other_vegetables" },
  "endive": { group: "other_vegetables" },
  "kohlrabi": { group: "other_vegetables" },
  "jicama": { group: "other_vegetables" },
  "rutabaga": { group: "other_vegetables" },
  "daikon": { group: "other_vegetables" },
  "romanesco": { group: "other_vegetables" },
  "sunchoke": { group: "other_vegetables" },
  "celeriac": { group: "other_vegetables" },
  "tomatillo": { group: "other_vegetables" },
  "sorrel": { group: "dark_green_leafy_veg" },
  "watercress": { group: "dark_green_leafy_veg" },
  
  // Popular international dishes
  "pizza": { group: "mixed", ingredients: ["wheat flour", "tomato", "cheese", "olive oil"] },
  "sushi": { group: "mixed", ingredients: ["rice", "fish", "seaweed", "vinegar"] },
  "tacos": { group: "mixed", ingredients: ["corn tortilla", "meat", "vegetables", "cheese"] },
  "paella": { group: "mixed", ingredients: ["rice", "saffron", "seafood", "chicken", "vegetables"] },
  "pho": { group: "mixed", ingredients: ["rice noodles", "beef", "herbs", "broth"] },
  "moussaka": { group: "mixed", ingredients: ["eggplant", "meat", "béchamel sauce", "tomato"] },
  "falafel": { group: "legumes_nuts_seeds", ingredients: ["chickpeas", "herbs", "spices"] },
  "hummus": { group: "legumes_nuts_seeds", ingredients: ["chickpeas", "tahini", "olive oil", "lemon"] },
  "pad thai": { group: "mixed", ingredients: ["rice noodles", "tofu", "peanuts", "egg", "vegetables"] },
  "risotto": { group: "starchy_staples", ingredients: ["rice", "broth", "cheese", "butter"] },
  "ratatouille": { group: "other_vegetables", ingredients: ["eggplant", "zucchini", "tomato", "bell pepper", "onion"] },
  "kimchi": { group: "other_vegetables", ingredients: ["cabbage", "radish", "chili", "garlic", "ginger"] },
  "goulash": { group: "mixed", ingredients: ["beef", "paprika", "onion", "tomato"] },
  "coq au vin": { group: "mixed", ingredients: ["chicken", "wine", "mushrooms", "bacon"] },
  "ceviche": { group: "meat_fish", ingredients: ["fish", "lime", "onion", "cilantro"] },
  "beef wellington": { group: "mixed", ingredients: ["beef", "mushrooms", "puff pastry"] },
  "poutine": { group: "mixed", ingredients: ["potatoes", "cheese curds", "gravy"] },
  "jollof rice": { group: "mixed", ingredients: ["rice", "tomato", "onion", "peppers", "spices"] },
  "bibimbap": { group: "mixed", ingredients: ["rice", "vegetables", "egg", "meat", "gochujang"] },
  "miso soup": { group: "mixed", ingredients: ["miso", "tofu", "seaweed", "green onion"] },
  "gazpacho": { group: "other_vegetables", ingredients: ["tomato", "cucumber", "bell pepper", "olive oil"] },
  
  // Fruits from around the world
  "dragonfruit": { group: "other_fruits" },
  "lychee": { group: "other_fruits" },
  "persimmon": { group: "other_fruits" },
  "quince": { group: "other_fruits" },
  "rambutan": { group: "other_fruits" },
  "passionfruit": { group: "other_fruits" },
  "jackfruit": { group: "other_fruits" },
  "starfruit": { group: "other_fruits" },
  "kumquat": { group: "other_fruits" },
  "feijoa": { group: "other_fruits" },
  "durian": { group: "other_fruits" },
  "mangosteen": { group: "other_fruits" },
  "acai": { group: "other_fruits" },
  "longan": { group: "other_fruits" },
  "tamarind": { group: "other_fruits" },
  
  // Proteins and meats from around the world
  "tofu": { group: "legumes_nuts_seeds" },
  "tempeh": { group: "legumes_nuts_seeds" },
  "edamame": { group: "legumes_nuts_seeds" },
  "seitan": { group: "other" },
  "prosciutto": { group: "meat_fish" },
  "chorizo": { group: "meat_fish" },
  "salami": { group: "meat_fish" },
  "pancetta": { group: "meat_fish" },
  "bresaola": { group: "meat_fish" },
  "andouille": { group: "meat_fish" },
  "haggis": { group: "meat_fish" },
  "foie gras": { group: "organ_meat" },
  "escargot": { group: "meat_fish" },
  "caviar": { group: "meat_fish" },
  "surimi": { group: "meat_fish" },
  
  // Dairy products from around the world
  "feta": { group: "dairy" },
  "brie": { group: "dairy" },
  "gouda": { group: "dairy" },
  "camembert": { group: "dairy" },
  "gruyere": { group: "dairy" },
  "manchego": { group: "dairy" },
  "halloumi": { group: "dairy" },
  "mascarpone": { group: "dairy" },
  "ricotta": { group: "dairy" },
  "quark": { group: "dairy" },
  "kefir": { group: "dairy" },
  "skyr": { group: "dairy" },
  "labneh": { group: "dairy" },
  "crème fraîche": { group: "dairy" },
  
  // Sweets and desserts from around the world
  "tiramisu": { group: "sugars", ingredients: ["coffee", "mascarpone", "cocoa", "ladyfingers"] },
  "gelato": { group: "sugars", ingredients: ["milk", "sugar", "flavoring"] },
  "baklava": { group: "sugars", ingredients: ["phyllo dough", "nuts", "honey", "butter"] },
  "churros": { group: "sugars", ingredients: ["flour", "sugar", "oil"] },
  "crème brûlée": { group: "sugars", ingredients: ["cream", "egg yolks", "sugar", "vanilla"] },
  "pavlova": { group: "sugars", ingredients: ["egg whites", "sugar", "fruits", "cream"] },
  "cannoli": { group: "sugars", ingredients: ["pastry dough", "ricotta", "sugar"] },
  "mochi": { group: "sugars", ingredients: ["rice flour", "sugar"] },
  "tres leches": { group: "sugars", ingredients: ["cake", "milk", "cream", "sugar"] },
  "macaron": { group: "sugars", ingredients: ["almond flour", "egg whites", "sugar"] }
};

// Food groups based on standard nutritional categories
const foodGroupClusters = {
  grains: ["rice", "wheat", "barley", "oats", "corn", "millet", "buckwheat", "ragi", "jowar", "bajra", 
          "flour", "atta", "bread", "roti", "paratha", "naan", "chapati", "pasta", "cereal", "dosa", "idli", 
          "semolina", "sooji", "rava", "poha", "upma", "vermicelli"],
  
  vegetables: ["potato", "tomato", "onion", "carrot", "spinach", "peas", "broccoli", "cauliflower", 
              "cabbage", "eggplant", "cucumber", "peppers", "lettuce", "kale", "garlic", "beans", 
              "beetroot", "pumpkin", "squash", "zucchini", "gourd", "drumstick", "okra", "radish"],
  
  fruits: ["apple", "banana", "orange", "grapes", "mango", "papaya", "melon", "watermelon", "pineapple", 
          "strawberry", "blueberry", "cherry", "plum", "pear", "kiwi", "peach", "guava", "pomegranate",
          "fig", "date", "coconut", "avocado", "jackfruit", "lychee", "berries", "citrus"],
  
  protein: ["chicken", "egg", "meat", "fish", "mutton", "beef", "pork", "seafood", "lentil", "dal", 
           "beans", "peas", "tofu", "soy", "nuts", "seeds", "legumes", "tempeh", "seitan"],
  
  dairy: ["milk", "cheese", "yogurt", "curd", "butter", "ghee", "cream", "buttermilk", "paneer", 
         "ice cream", "whey", "cottage cheese", "khoa", "ricotta", "mascarpone"],
  
  spices: ["turmeric", "cumin", "coriander", "pepper", "chili", "ginger", "garlic", "cardamom", 
          "cinnamon", "clove", "nutmeg", "saffron", "fennel", "mint", "basil", "oregano", "thyme",
          "rosemary", "masala", "curry", "powder"],
  
  oils: ["oil", "ghee", "butter", "margarine", "fat", "lard", "tallow", "shortening"],
  
  sweets: ["sugar", "jaggery", "honey", "syrup", "chocolate", "candy", "dessert", "pastry", "cake", 
          "cookie", "ice cream", "pudding", "sweet", "halwa", "ladoo", "jalebi", "mithai"],
          
  // Adding more international food categories
  international_grains: [
    "quinoa", "bulgur", "farro", "couscous", "polenta", "millet", "amaranth", "spelt", 
    "kamut", "teff", "freekeh", "sorghum", "barley", "wild rice", "black rice", "arborio", 
    "basmati", "jasmine", "sticky rice", "glutinous rice"
  ],
  
  international_proteins: [
    "tempeh", "seitan", "edamame", "natto", "quorn", "beyond meat", "impossible meat", 
    "jackfruit", "textured vegetable protein", "lupini beans", "fava beans", "black beans",
    "adzuki beans", "navy beans", "cannellini beans", "lima beans", "pinto beans"
  ],
  
  international_vegetables: [
    "bok choy", "chinese cabbage", "napa cabbage", "gai lan", "chayote", "daikon", "lotus root",
    "bamboo shoots", "water chestnuts", "chinese eggplant", "bitter melon", "kabocha", "taro",
    "burdock", "kohlrabi", "romanesco", "celeriac", "salsify", "fiddlehead ferns", "samphire"
  ],
  
  international_fruits: [
    "dragon fruit", "lychee", "longan", "rambutan", "mangosteen", "jackfruit", "durian",
    "persimmon", "kumquat", "starfruit", "passion fruit", "guava", "feijoa", "cherimoya", 
    "quince", "tamarillo", "sapote", "salak", "langsat", "santol", "soursop"
  ],
  
  international_dairy: [
    "halloumi", "paneer", "quark", "labneh", "skyr", "kefir", "clotted cream", "crème fraîche",
    "mascarpone", "burrata", "feta", "halloumi", "manchego", "pecorino", "roquefort", 
    "gorgonzola", "camembert", "brie", "gouda", "emmental", "gruyère", "tulum"
  ],
  
  international_spices: [
    "za'atar", "sumac", "harissa", "berbere", "ras el hanout", "garam masala", "five spice",
    "seven spice", "dukkah", "shichimi togarashi", "furikake", "achiote", "annatto", "epazote",
    "aleppo pepper", "urfa biber", "grains of paradise", "mahlab", "asafoetida", "amchoor"
  ]
};

// Function to get all food groups for a given dish
export const getFoodGroupsForDish = (dish: string): string[] => {
  // First check if this is a known Indian dish
  const lowerDish = dish.toLowerCase().trim();
  
  for (const [dishName, ingredients] of Object.entries(indianDishIngredients)) {
    if (lowerDish.includes(dishName) || dishName.includes(lowerDish)) {
      // Map ingredients to food groups
      const groups = new Set<string>();
      
      ingredients.forEach(ingredient => {
        const group = getFoodGroup(ingredient);
        if (group !== "unknown") {
          groups.add(group);
        }
      });
      
      if (groups.size > 0) {
        return Array.from(groups);
      }
    }
  }
  
  // If not a known dish, use original ingredients approach
  const ingredients = getIngredientsForDish(dish);
  const foodGroups = ingredients.map(ingredient => getFoodGroup(ingredient))
    .filter(group => group !== "unknown");
  
  // Return unique food groups
  return [...new Set(foodGroups)];
};

// Convert WHO food group names to readable format
export const formatFoodGroupName = (groupId: number): string => {
  switch(groupId) {
    case 1: return "Starchy Staples";
    case 2: return "White Roots and Tubers";
    case 3: return "Vitamin A Rich Vegetables";
    case 4: return "Dark Green Leafy Vegetables";
    case 5: return "Other Vegetables";
    case 6: return "Vitamin A Rich Fruits";
    case 7: return "Other Fruits";
    case 8: return "Organ Meat";
    case 9: return "Flesh Meats";
    case 10: return "Eggs";
    case 11: return "Fish and Seafood";
    case 12: return "Legumes, Nuts and Seeds";
    case 13: return "Milk and Milk Products";
    case 14: return "Oils and Fats";
    case 15: return "Sweets";
    case 16: return "Spices, Condiments, Beverages";
    default: return "Unknown";
  }
};

// Enhanced function for identifying global foods and ingredients
export const identifyGlobalFood = (foodText: string): string[] => {
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  console.log("Analyzing global food item:", foodText);
  
  // Normalize the food text
  const normalizedText = foodText.toLowerCase().trim();
  
  // First check our global foods database for direct matches
  if (globalFoods[normalizedText]) {
    const foodInfo = globalFoods[normalizedText];
    console.log(`Found direct match in global foods database: ${normalizedText} → ${foodInfo.group}`);
    return [foodInfo.group];
  }
  
  // Check for partial matches in global foods
  const globalFoodMatches = Object.keys(globalFoods).filter(food => 
    normalizedText.includes(food) || food.includes(normalizedText)
  );
  
  if (globalFoodMatches.length > 0) {
    console.log(`Found partial matches in global foods: ${globalFoodMatches.join(', ')}`);
    return globalFoodMatches.map(match => globalFoods[match].group);
  }
  
  // Check international cuisine categories
  for (const [region, foods] of Object.entries(internationalCuisines)) {
    for (const food of foods) {
      if (normalizedText.includes(food) || food.includes(normalizedText)) {
        console.log(`Matched international cuisine: ${food} from ${region}`);
        // Map region to appropriate food groups
        return mapRegionToFoodGroups(region);
      }
    }
  }
  
  // Try natural language category matching
  for (const [category, keywords] of Object.entries(foodGroupClusters)) {
    if (Array.isArray(keywords)) {
      for (const keyword of keywords) {
        if (
          normalizedText.includes(keyword) || 
          keyword.includes(normalizedText) ||
          levenshteinSimilarity(normalizedText, keyword) > 0.7
        ) {
          console.log(`Natural language match: ${normalizedText} similar to ${keyword} in ${category}`);
          return [mapClusterToGroupName(category)];
        }
      }
    }
  }
  
  // Use existing Hindi food identification as a fallback
  const hindiGroups = identifyHindiFood(normalizedText);
  if (hindiGroups.length > 0) {
    console.log(`Fallback to Hindi food identification: ${normalizedText} → ${hindiGroups.join(', ')}`);
    return hindiGroups;
  }
  
  // Use general food text processor as final fallback
  const processedGroups = processFoodText(normalizedText);
  if (processedGroups.length > 0) {
    console.log(`Fallback to general processor: ${normalizedText} → ${processedGroups.join(', ')}`);
    return processedGroups.map(id => mapGroupIdToName(id));
  }
  
  // Try to make an educated guess based on common food patterns
  const guessedGroups = guessGroupsFromText(normalizedText);
  if (guessedGroups.length > 0) {
    console.log(`Made educated guess: ${normalizedText} → ${guessedGroups.join(', ')}`);
    return guessedGroups;
  }
  
  console.log(`Unable to identify food group for: ${normalizedText}`);
  return [];
};

// Enhanced function for fuzzy matching food text to groups using ML-inspired techniques
export const identifyHindiFood = (foodText: string): string[] => {
  if (!foodText || foodText.trim() === '') {
    return [];
  }
  
  console.log("Raw food text for analysis:", foodText);
  
  // Process input text - improved splitter to handle various separators and formats
  // This captures food items separated by commas, semicolons, newlines, and spaces
  // It also handles items with spaces within them (like "sarson ka saag")
  const normalizedText = foodText.toLowerCase()
    .replace(/[,;।\-_]/g, ' ')  // Replace common separators with spaces
    .replace(/\s+/g, ' ')       // Normalize spaces
    .trim();
    
  // First try to identify multi-word foods (better handling of compound terms)
  const multiWordFoodItems = findMultiWordFoods(normalizedText);
  const singleWordItems = extractSingleWordFoods(normalizedText, multiWordFoodItems);
  
  // Combine both sets of identified food items
  const foodItems = [...multiWordFoodItems, ...singleWordItems];
  console.log("Identified food items:", foodItems);
  
  // Initialize tracking for detected groups and recognized foods
  const detectedGroups = new Set<number>();
  const recognizedFoods: string[] = [];
  
  // APPROACH 1: Direct dictionary matching with expanded food dictionaries
  matchFoodsAgainstDictionaries(foodItems, detectedGroups, recognizedFoods);
  
  // APPROACH 2: Use ingredient-based detection for dishes
  detectFoodGroupsFromIngredients(foodItems, detectedGroups, recognizedFoods);
  
  // APPROACH 3: Use natural language category matching (similar to word embedding)
  performNaturalLanguageMatching(foodItems, detectedGroups, recognizedFoods);
  
  // APPROACH 4: Use the original processor as a fallback
  const processedGroups = processFoodText(foodText);
  console.log("Groups from food processor:", processedGroups);
  processedGroups.forEach(groupId => detectedGroups.add(groupId));
  
  // Map the group IDs back to string names
  const allGroupNames = Array.from(detectedGroups).map(id => formatFoodGroupName(id).toLowerCase());
  
  console.log("Final recognized food groups:", allGroupNames);
  console.log("Recognized foods:", recognizedFoods);
  
  return allGroupNames.length > 0 ? allGroupNames : recognizedFoods.length > 0 ? recognizedFoods : [];
};

// Improved function to map Hindi food names to food groups
export const getHindiFoodGroup = (hindiFood: string): string => {
  // Normalize input
  const normalizedFood = hindiFood.toLowerCase().trim();
  console.log(`Checking food group for: "${normalizedFood}"`);
  
  // Check direct matches in enhanced Hindi dictionary
  if (additionalHindiFoods[normalizedFood] !== undefined) {
    const groupId = additionalHindiFoods[normalizedFood];
    const groupName = mapGroupIdToName(groupId);
    console.log(`Direct match in Hindi dictionary: ${normalizedFood} → ${groupName}`);
    return groupName;
  }
  
  // Check phonetic variants and English translations
  if (hindiFoodPhoneticVariants[normalizedFood] !== undefined) {
    const groupId = hindiFoodPhoneticVariants[normalizedFood];
    const groupName = mapGroupIdToName(groupId);
    console.log(`Match in phonetic variants: ${normalizedFood} → ${groupName}`);
    return groupName;
  }
  
  // Try partial matches for multi-word phrases
  for (const [key, groupId] of Object.entries(additionalHindiFoods)) {
    if (normalizedFood.includes(key) || key.includes(normalizedFood)) {
      const groupName = mapGroupIdToName(groupId);
      console.log(`Partial match in Hindi dictionary: ${normalizedFood} contains/is contained in ${key} → ${groupName}`);
      return groupName;
    }
  }
  
  for (const [key, groupId] of Object.entries(hindiFoodPhoneticVariants)) {
    if (normalizedFood.includes(key) || key.includes(normalizedFood)) {
      const groupName = mapGroupIdToName(groupId);
      console.log(`Partial match in phonetic variants: ${normalizedFood} contains/is contained in ${key} → ${groupName}`);
      return groupName;
    }
  }
  
  // Try natural language similarity matching (simulates word embeddings)
  for (const [category, keywords] of Object.entries(foodGroupClusters)) {
    for (const keyword of keywords) {
      if (
        normalizedFood.includes(keyword) || 
        keyword.includes(normalizedFood) ||
        levenshteinSimilarity(normalizedFood, keyword) > 0.7
      ) {
        const groupName = mapClusterToGroupName(category);
        console.log(`Natural language match: ${normalizedFood} similar to ${keyword} in ${category} → ${groupName}`);
        return groupName;
      }
    }
  }
  
  // Let the general mapper handle other cases
  const foodGroups = getFoodGroupsForDish(normalizedFood);
  if (foodGroups.length > 0) {
    console.log(`Found food group via dish mapper: ${normalizedFood} → ${foodGroups[0]}`);
    return foodGroups[0];
  }
  
  console.log(`No food group found for: ${normalizedFood}`);
  return "unknown";
};

// New function to guess food groups based on common patterns in food names
function guessGroupsFromText(foodText: string): string[] {
  const groups: string[] = [];
  const text = foodText.toLowerCase();
  
  // Check for common ingredient patterns
  if (/rice|grain|wheat|corn|oat|barley|cereal|flour|bread|pasta|noodle/.test(text)) {
    groups.push("starchy_staples");
  }
  
  if (/vegetable|veg|salad|greens|garden|plant-based/.test(text)) {
    groups.push("other_vegetables");
  }
  
  if (/spinach|kale|collard|lettuce|arugula|chard|leafy/.test(text)) {
    groups.push("dark_green_leafy_veg");
  }
  
  if (/carrot|sweet potato|pumpkin|squash|orange|yellow vegetable/.test(text)) {
    groups.push("vitamin_a_fruits_vegetables");
  }
  
  if (/fruit|berry|apple|orange|banana|grape|melon/.test(text)) {
    groups.push("other_fruits");
  }
  
  if (/milk|cheese|yogurt|dairy|cream|butter|ghee|curd/.test(text)) {
    groups.push("dairy");
  }
  
  if (/meat|chicken|beef|pork|lamb|mutton|goat|poultry/.test(text)) {
    groups.push("meat_fish");
  }
  
  if (/fish|seafood|shrimp|prawn|crab|lobster|mussel|oyster|clam/.test(text)) {
    groups.push("meat_fish");
  }
  
  if (/liver|kidney|heart|brain|organ|offal|sweetbread/.test(text)) {
    groups.push("organ_meat");
  }
  
  if (/egg|omelette|frittata|quiche/.test(text)) {
    groups.push("eggs");
  }
  
  if (/bean|lentil|pea|chickpea|legume|pulse|soy|tofu|tempeh/.test(text)) {
    groups.push("legumes_nuts_seeds");
  }
  
  if (/nut|seed|almond|walnut|cashew|pistachio|peanut|sesame/.test(text)) {
    groups.push("legumes_nuts_seeds");
  }
  
  if (/oil|fat|butter|ghee|lard|tallow|margarine|shortening/.test(text)) {
    groups.push("oils_fats");
  }
  
  if (/sugar|sweet|dessert|candy|chocolate|pastry|cake|cookie|biscuit/.test(text)) {
    groups.push("sugars");
  }
  
  if (/spice|herb|seasoning|condiment|sauce|dressing|marinade/.test(text)) {
    groups.push("spices_condiments");
  }
  
  if (/tea|coffee|beverage|drink|water|juice|soda|alcohol|wine|beer/.test(text)) {
    groups.push("spices_condiments");
  }
  
  return groups;
}

// Map region of cuisine to appropriate food groups
function mapRegionToFoodGroups(region: string): string[] {
  switch(region) {
    case "mediterranean":
      return ["other_vegetables", "oils_fats", "legumes_nuts_seeds"];
    case "east_asian":
      return ["starchy_staples", "other_vegetables", "meat_fish"];
    case "latin_american":
      return ["starchy_staples", "other_vegetables", "meat_fish"];
    case "african":
      return ["starchy_staples", "other_vegetables", "legumes_nuts_seeds"];
    case "european":
      return ["starchy_staples", "dairy", "meat_fish"];
    case "middle_eastern":
      return ["starchy_staples", "legumes_nuts_seeds", "meat_fish"];
    case "south_asian":
      return ["starchy_staples", "legumes_nuts_seeds", "other_vegetables"];
    case "southeast_asian":
      return ["starchy_staples", "other_vegetables", "meat_fish"];
    case "caribbean":
      return ["starchy_staples", "other_fruits", "meat_fish"];
    case "oceanian":
      return ["starchy_staples", "dairy", "meat_fish"];
    default:
      return [];
  }
}

// Helper function to map group IDs to standard names used in the app
function mapGroupIdToName(groupId: number): string {
  switch(groupId) {
    case 1: return "starchy_staples";
    case 2: return "starchy_staples"; // White roots also go into starchy staples category
    case 3: return "vitamin_a_fruits_vegetables";
    case 4: return "dark_green_leafy_veg";
    case 5: return "other_vegetables";
    case 6: return "vitamin_a_fruits_vegetables";
    case 7: return "other_fruits";
    case 8: return "organ_meat";
    case 9: return "meat_fish";
    case 10: return "eggs";
    case 11: return "meat_fish"; // Fish also goes into meat category
    case 12: return "legumes_nuts_seeds";
    case 13: return "dairy";
    case 14: return "oils_fats";
    case 15: return "sugars";
    case 16: return "spices_condiments";
    default: return "unknown";
  }
}

// Helper to map food group clusters to standard group names
function mapClusterToGroupName(cluster: string): string {
  switch(cluster) {
    case "grains": return "starchy_staples";
    case "vegetables": return "other_vegetables";
    case "fruits": return "other_fruits"; 
    case "protein": return "meat_fish";
    case "dairy": return "dairy";
    case "spices": return "spices_condiments";
    case "oils": return "oils_fats";
    case "sweets": return "sugars";
    case "international_grains": return "starchy_staples";
    case "international_proteins": return "legumes_nuts_seeds";
    case "international_vegetables": return "other_vegetables";
    case "international_fruits": return "other_fruits";
    case "international_dairy": return "dairy";
    case "international_spices": return "spices_condiments";
    default: return cluster.includes("starch") ? "starchy_staples" :
             cluster.includes("veget") ? "other_vegetables" :
             cluster.includes("fruit") ? "other_fruits" :
             cluster.includes("meat") || cluster.includes("fish") ? "meat_fish" :
             cluster.includes("dairy") || cluster.includes("milk") ? "dairy" :
             cluster.includes("legume") || cluster.includes("nut") || cluster.includes("seed") ? "legumes_nuts_seeds" :
             cluster.includes("oil") || cluster.includes("fat") ? "oils_fats" :
             cluster.includes("sweet") || cluster.includes("sugar") ? "sugars" :
             cluster.includes("spice") || cluster.includes("herb") ? "spices_condiments" :
             "unknown";
  }
}

// Helper to find multi-word food items in text
function findMultiWordFoods(text: string): string[] {
  const possibleMultiWords = [
    "sarson ka saag", "palak paneer", "aloo gobhi", "aloo matar", 
    "dal makhani", "chana masala", "matar paneer", "kali mirch", 
    "garam masala", "lal mirch", "phool gobhi", "patta gobhi",
    "kaddu ke beej", "nariyal pani", "kala chana", "kabuli chana",
    "surajmukhi ke beej", "coconut water", "olive oil", "mustard oil",
    "milk and milk products", "vitamin a rich", "dark green leafy",
    "starchy staples", "roots and tubers", "flesh meats", "organ meat",
    "fish and seafood", "legumes, nuts", "nuts and seeds",
    "oils and fats", "spices, condiments"
  ];
  
  // Also add all dish names from the indianDishIngredients dictionary
  const allMultiwordTerms = [...possibleMultiWords, ...Object.keys(indianDishIngredients)];
  
  const foundMultiwords: string[] = [];
  
  for (const multiWord of allMultiwordTerms) {
    if (text.includes(multiWord)) {
      foundMultiwords.push(multiWord);
    }
  }
  
  return foundMultiwords;
}

// Extract single word food items, avoiding those already within multi-word items
function extractSingleWordFoods(text: string, multiWordItems: string[]): string[] {
  // First mask out the multi-word items from the text
  let maskedText = text;
  multiWordItems.forEach(item => {
    maskedText = maskedText.replace(item, " ".repeat(item.length));
  });
  
  // Then extract the remaining words
  return maskedText.split(/\s+/).filter(word => word.trim() !== '');
}

// Match food items against our dictionaries
function matchFoodsAgainstDictionaries(
  foodItems: string[], 
  detectedGroups: Set<number>, 
  recognizedFoods: string[]
): void {
  foodItems.forEach(item => {
    // Try exact matches in additional Hindi foods dictionary
    if (additionalHindiFoods[item] !== undefined) {
      detectedGroups.add(additionalHindiFoods[item]);
      recognizedFoods.push(`${item} → ${formatFoodGroupName(additionalHindiFoods[item]).toLowerCase()}`);
      console.log(`Match in additional Hindi foods: ${item} → Group ${additionalHindiFoods[item]}`);
      return;
    }
    
    // Try phonetic variants and English translations
    if (hindiFoodPhoneticVariants[item] !== undefined) {
      detectedGroups.add(hindiFoodPhoneticVariants[item]);
      recognizedFoods.push(`${item} → ${formatFoodGroupName(hindiFoodPhoneticVariants[item]).toLowerCase()}`);
      console.log(`Match in phonetic variants: ${item} → Group ${hindiFoodPhoneticVariants[item]}`);
      return;
    }
    
    // Try partial matches for food terms
    detectPartialMatches(item, detectedGroups, recognizedFoods);
  });
}

// Detect partial matches across dictionaries
function detectPartialMatches(
  item: string, 
  detectedGroups: Set<number>, 
  recognizedFoods: string[]
): void {
  const cleanItem = item.trim().toLowerCase();
  if (!cleanItem) return;
  
  // Try partial matches for longer phrases
  for (const [key, groupId] of Object.entries(additionalHindiFoods)) {
    if (cleanItem.includes(key) || key.includes(cleanItem)) {
      detectedGroups.add(groupId);
      recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(groupId).toLowerCase()}`);
      console.log(`Partial match in Hindi foods: ${cleanItem} contains/is contained in ${key} → Group ${groupId}`);
      return;
    }
  }
  
  for (const [key, groupId] of Object.entries(hindiFoodPhoneticVariants)) {
    if (cleanItem.includes(key) || key.includes(cleanItem)) {
      detectedGroups.add(groupId);
      recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(groupId).toLowerCase()}`);
      console.log(`Partial match in phonetic variants: ${cleanItem} contains/is contained in ${key} → Group ${groupId}`);
      return;
    }
  }
  
  // Use fuzzy matching for close matches
  const allHindiKeys = Object.keys(additionalHindiFoods);
  const allPhoneticKeys = Object.keys(hindiFoodPhoneticVariants);
  
  const hindiMatch = allHindiKeys.find(key => levenshteinSimilarity(key, cleanItem) > 0.8);
  if (hindiMatch) {
    const groupId = additionalHindiFoods[hindiMatch];
    detectedGroups.add(groupId);
    recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(groupId).toLowerCase()}`);
    console.log(`Fuzzy match in Hindi foods: ${cleanItem} similar to ${hindiMatch} → Group ${groupId}`);
    return;
  }
  
  const phoneticMatch = allPhoneticKeys.find(key => levenshteinSimilarity(key, cleanItem) > 0.8);
  if (phoneticMatch) {
    const groupId = hindiFoodPhoneticVariants[phoneticMatch];
    detectedGroups.add(groupId);
    recognizedFoods.push(`${cleanItem} → ${formatFoodGroupName(groupId).toLowerCase()}`);
    console.log(`Fuzzy match in phonetic variants: ${cleanItem} similar to ${phoneticMatch} → Group ${groupId}`);
    return;
  }
}

// Detect food groups from ingredients within dishes
function detectFoodGroupsFromIngredients(
  foodItems: string[], 
  detectedGroups: Set<number>, 
  recognizedFoods: string[]
): void {
  foodItems.forEach(item => {
    // Check if this is a known dish
    for (const [dishName, ingredients] of Object.entries(indianDishIngredients)) {
      if (item.includes(dishName) || dishName.includes(item)) {
        const dishGroups = new Set<number>();
        
        // Process each ingredient to find its group
        ingredients.forEach(ingredient => {
          for (const [category, foods] of Object.entries(foodGroupClusters)) {
            if (foods.some(food => ingredient.includes(food) || food.includes(ingredient))) {
              const groupName = mapClusterToGroupName(category);
              
              // Map group name to group ID
              if (groupName === "starchy_staples") dishGroups.add(1);
              else if (groupName === "vitamin_a_fruits_vegetables") {
                dishGroups.add(3);
                dishGroups.add(6);
              }
              else if (groupName === "dark_green_leafy_veg") dishGroups.add(4);
              else if (groupName === "other_vegetables") dishGroups.add(5);
              else if (groupName === "other_fruits") dishGroups.add(7);
              else if (groupName === "meat_fish") {
                dishGroups.add(9);
                if (ingredient.includes("fish") || ingredient.includes("seafood")) dishGroups.add(11);
              }
              else if (groupName === "legumes_nuts_seeds") dishGroups.add(12);
              else if (groupName === "dairy") dishGroups.add(13);
              else if (groupName === "oils_fats") dishGroups.add(14);
              else if (groupName === "sugars") dishGroups.add(15);
              else if (groupName === "spices_condiments") dishGroups.add(16);
              
              break;
            }
          }
        });
        
        // Add all groups from this dish
        dishGroups.forEach(groupId => {
          detectedGroups.add(groupId);
          console.log(`From dish ${dishName}, added group ${formatFoodGroupName(groupId)}`);
        });
        
        recognizedFoods.push(`${item} (${dishName}) → various food groups`);
      }
    }
  });
}

// Perform natural language category matching
function performNaturalLanguageMatching(
  foodItems: string[], 
  detectedGroups: Set<number>, 
  recognizedFoods: string[]
): void {
  foodItems.forEach(item => {
    for (const [category, keywords] of Object.entries(foodGroupClusters)) {
      for (const keyword of keywords) {
        if (
          item.includes(keyword) || 
          keyword.includes(item) ||
          levenshteinSimilarity(item, keyword) > 0.7
        ) {
          const groupName = mapClusterToGroupName(category);
          
          // Map group name to group ID
          if (groupName === "starchy_staples") detectedGroups.add(1);
          else if (groupName === "vitamin_a_fruits_vegetables") {
            detectedGroups.add(3);
            detectedGroups.add(6);
          }
          else if (groupName === "dark_green_leafy_veg") detectedGroups.add(4);
          else if (groupName === "other_vegetables") detectedGroups.add(5);
          else if (groupName === "other_fruits") detectedGroups.add(7);
          else if (groupName === "meat_fish") {
            detectedGroups.add(9);
            if (item.includes("fish") || item.includes("seafood")) detectedGroups.add(11);
          }
          else if (groupName === "legumes_nuts_seeds") detectedGroups.add(12);
          else if (groupName === "dairy") detectedGroups.add(13);
          else if (groupName === "oils_fats") detectedGroups.add(14);
          else if (groupName === "sugars") detectedGroups.add(15);
          else if (groupName === "spices_condiments") detectedGroups.add(16);
          
          recognizedFoods.push(`${item} → ${formatFoodGroupName(getGroupIdFromName(groupName)).toLowerCase()}`);
          console.log(`Natural language match: ${item} similar to ${keyword} in ${category}`);
          
          return; // Stop after first match
        }
      }
    }
  });
}

// Get numerical group ID from name
function getGroupIdFromName(groupName: string): number {
  switch(groupName) {
    case "starchy_staples": return 1;
    case "vitamin_a_fruits_vegetables": return 3;
    case "dark_green_leafy_veg": return 4;
    case "other_vegetables": return 5;
    case "other_fruits": return 7;
    case "organ_meat": return 8;
    case "meat_fish": return 9;
    case "eggs": return 10;
    case "legumes_nuts_seeds": return 12;
    case "dairy": return 13;
    case "oils_fats": return 14;
    case "sugars": return 15;
    case "spices_condiments": return 16;
    default: return 0;
  }
}

// Calculate Levenshtein distance between two strings (simulates word embedding similarity)
function levenshteinSimilarity(a: string, b: string): number {
  if (a.length === 0) return 0;
  if (b.length === 0) return 0;
  
  // Simple handling for very different length strings
  if (Math.abs(a.length - b.length) > Math.min(a.length, b.length)) {
    return 0;
  }
  
  // For short strings, exact substring is a better heuristic
  if (a.length < 4 || b.length < 4) {
    return a.includes(b) || b.includes(a) ? 1 : 0;
  }
  
  // Basic implementation of Levenshtein distance
  const matrix: number[][] = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,       // deletion
        matrix[i][j - 1] + 1,       // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  const distance = matrix[b.length][a.length];
  const maxLength = Math.max(a.length, b.length);
  
  // Return similarity score (1 is identical, 0 is completely different)
  return 1 - distance / maxLength;
}
