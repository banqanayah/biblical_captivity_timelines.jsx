
import { useState, useRef, useEffect } from "react";

const EMPIRES = [
  {
    id: "babylon",
    name: "Babylon",
    years: "626–539 BC",
    symbol: "🦁",
    symbolLabel: "Winged Lion",
    danielRef: "Dan 2:32,37–38; 7:4",
    descriptor: "Head of Gold",
    bg: "#1A0A00",
    primary: "#FFD700",
    secondary: "#FF8C00",
    accent: "#FFF8DC",
    textLight: "#FFF8DC",
    gradient: "linear-gradient(135deg, #1A0A00 0%, #3D1F00 50%, #1A0A00 100%)",
    headerGradient: "linear-gradient(90deg, #FFD700, #FF8C00, #FFD700)",
    rulers: [
      { name: "Nabopolassar", years: "626–605 BC", note: "Founded Neo-Babylonian Empire" },
      { name: "Nebuchadnezzar II", years: "605–562 BC", note: "Greatest king; took Jerusalem; saw visions" },
      { name: "Evil-Merodach", years: "562–560 BC", note: "Released Jehoiachin (2 Kgs 25:27–30)" },
      { name: "Neriglissar", years: "560–556 BC", note: "" },
      { name: "Nabonidus / Belshazzar", years: "556–539 BC", note: "Co-regency; Belshazzar saw the writing (Dan 5)" },
      { name: "Cyrus II (conqueror)", years: "539 BC", note: "Named in prophecy 150 yrs prior (Isa 44:28)" },
    ],
    events: [
      { year: "626 BC", label: "Empire Founded", detail: "Nabopolassar revolts from Assyria; founds Neo-Babylonian Empire", refs: "Nah 3; Jer 1:1" },
      { year: "605 BC", label: "1st Deportation", detail: "Nebuchadnezzar takes Daniel, Hananiah, Mishael, Azariah to Babylon", refs: "Dan 1:1–7; 2 Kgs 24:1" },
      { year: "603 BC", label: "The Statue Dream", detail: "Neb dreams of the four-empire colossus; Daniel interprets — 'You are the head of gold'", refs: "Dan 2" },
      { year: "597 BC", label: "2nd Deportation", detail: "Ezekiel taken to Babylon; Jehoiachin deported; temple treasures seized", refs: "2 Kgs 24:10–17; Ezek 1:1–3" },
      { year: "594 BC", label: "Fiery Furnace", detail: "Shadrach, Meshach, Abednego refuse the 90-cubit golden image; preserved by the Son of God", refs: "Dan 3" },
      { year: "586 BC", label: "Jerusalem Destroyed", detail: "Neb razes Solomon's Temple; walls broken; final deportation of Judah", refs: "2 Kgs 25; Jer 52; Lam 1–5; Ps 137" },
      { year: "569 BC", label: "Nebuchadnezzar's Madness", detail: "King driven to fields for 7 years; 'most High rules in the kingdom of men'", refs: "Dan 4; cf. Isa 14:4–20" },
      { year: "539 BC", label: "Belshazzar's Feast & Fall", detail: "Handwriting on the wall — MENE MENE TEKEL UPHARSIN; Darius takes Babylon overnight", refs: "Dan 5; Isa 13–14; 47; Jer 50–51" },
    ],
    prophecies: [
      { title: "Head of Gold (Dan 2:32,37–38)", body: "Babylon = supreme among the four; God gave Neb 'dominion over all.' Gold = highest brilliance but also temporal, replaceable." },
      { title: "Winged Lion (Dan 7:4)", body: "First beast: lion with eagle's wings — swiftness and majesty. Wings plucked, made to stand as a man = Neb's humiliation and restoration (Dan 4)." },
      { title: "Isaiah's 150-Year Prophecy", body: "Isaiah named Cyrus as deliverer ~150 years before his birth (Isa 44:28–45:6), the most precisely fulfilled prophetic naming in Scripture." },
    ],
    archaeology: [
      { title: "Nebuchadnezzar Chronicle (BM 21946)", body: "British Museum tablet confirms Neb's 605 BC campaign against Egypt and capture of Jerusalem — exact dating of Dan 1:1." },
      { title: "Weidner Tablets — Jehoiachin Rations", body: "Cuneiform tablets from Babylon's royal archive list oil rations for 'Jehoiachin king of Judah' — corroborates 2 Kgs 25:27–30." },
      { title: "Nabonidus Chronicle (BM 35382)", body: "Confirms the bloodless fall of Babylon in 539 BC to Cyrus and the co-regency of Belshazzar, directly affirming Dan 5." },
    ],
    prophets: [
      {
        name: "Jeremiah",
        title: "The Weeping Prophet",
        years: "c. 626–585 BC",
        icon: "😭",
        refs: "Jer 1–52; Lam 1–5",
        events: [
          { label: "Called as a Youth (626 BC)", detail: "God appointed Jeremiah 'before you were formed in the womb' to be prophet to the nations — his entire ministry ran parallel to Babylon's rise.", refs: "Jer 1:4–10" },
          { label: "Temple Sermon & Persecution (609 BC)", detail: "Preached in the Temple gate that the Temple itself would be destroyed like Shiloh; nearly lynched by priests and prophets for the message.", refs: "Jer 7; 26" },
          { label: "Letter to the Exiles (597 BC)", detail: "After the 2nd deportation, wrote to captives: 'Seek the peace of the city… pray for it.' Gave the landmark 70-year captivity prophecy.", refs: "Jer 29:1–14; 25:11–12" },
          { label: "Land Purchase (588 BC)", detail: "Bought his cousin's field in Anathoth while Jerusalem was under siege — a dramatic act of faith that God would restore the land.", refs: "Jer 32:1–15" },
          { label: "Jerusalem Falls & Lamentations (586 BC)", detail: "Eyewitness to the Temple's burning; wrote Lamentations in acrostic Hebrew — five poems of grief that also affirm 'His mercies are new every morning.'", refs: "Lam 1–5; 3:22–23" },
        ],
      },
      {
        name: "Daniel",
        title: "The Prophet of Visions",
        years: "c. 605–530 BC",
        icon: "🦁",
        refs: "Dan 1–12",
        events: [
          { label: "Taken Captive as a Youth (605 BC)", detail: "Among the first exiles; refused the king's food, emerging healthier than all — 'God gave Daniel knowledge and skill in all learning and wisdom.'", refs: "Dan 1:1–20" },
          { label: "Interprets the Statue Dream (603 BC)", detail: "God reveals Neb's dream to Daniel in a night vision; he alone interprets the four-empire colossus and is made ruler over Babylon's wise men.", refs: "Dan 2" },
          { label: "The Four Beasts Vision (553 BC)", detail: "First night vision: four great beasts from the sea representing four world empires; the Ancient of Days reigns; one like the Son of Man receives an eternal kingdom.", refs: "Dan 7" },
          { label: "The Ram & He-Goat Vision (551 BC)", detail: "Vision of Medo-Persia (ram) conquered by Greece (goat); Gabriel personally explains it, naming the empires — rare angelic interpretation of prophecy.", refs: "Dan 8; cf. 8:15–27" },
          { label: "The 70 Weeks Revelation (539 BC)", detail: "While praying over Jeremiah's 70-year prophecy, Gabriel comes 'in swift flight' and delivers the most precise Messianic timeline in all of Scripture.", refs: "Dan 9:20–27" },
        ],
      },
      {
        name: "Ezekiel",
        title: "The Prophet of God's Glory",
        years: "c. 593–571 BC",
        icon: "🔥",
        refs: "Ezek 1–48",
        events: [
          { label: "The Chariot-Throne Vision (593 BC)", detail: "By the river Chebar in Babylon, Ezekiel sees the overwhelming glory of God — four living creatures, spinning wheels, and the likeness of a throne. His entire ministry flows from this.", refs: "Ezek 1" },
          { label: "Glory Departs the Temple (592 BC)", detail: "Transported in vision to Jerusalem; witnesses the abominations causing God's glory to depart in stages eastward — a theological earthquake that explained the exile.", refs: "Ezek 8–11" },
          { label: "Prophecy Against Tyre (587 BC)", detail: "Predicted Tyre's complete destruction — stones, timber, and soil thrown into the sea — fulfilled 250 years later when Alexander built a causeway to the island fortress.", refs: "Ezek 26:3–14" },
          { label: "The Valley of Dry Bones (571 BC)", detail: "Vision of Israel's national resurrection from death and exile: breath enters the bones, they live — a prophecy being fulfilled in stages since 1948.", refs: "Ezek 37:1–14" },
          { label: "The Millennial Temple Vision (571 BC)", detail: "Elaborate blueprint of a future Temple larger than any yet built; the Glory of God returns from the east through the east gate — prophetic architecture yet to be fulfilled.", refs: "Ezek 40–48" },
        ],
      },
      {
        name: "Habakkuk",
        title: "The Prophet of Faith in Darkness",
        years: "c. 612–600 BC",
        icon: "🗼",
        refs: "Hab 1–3",
        events: [
          { label: "Wrestling with God over Babylon (612 BC)", detail: "Uniquely, Habakkuk argues with God: 'Why do you use the wicked Babylonians to punish Judah?' God answers: Babylon will itself be judged.", refs: "Hab 1:12–2:1" },
          { label: "'The Just Shall Live by Faith' (c. 606 BC)", detail: "God's reply to Habakkuk's tower becomes the seed of Pauline theology (Rom 1:17; Gal 3:11; Heb 10:38) — justification by faith planted in the heart of the exile.", refs: "Hab 2:4" },
          { label: "The Prayer-Psalm of Submission (c. 606 BC)", detail: "Chapter 3: a theophany hymn recalling God's past mighty acts; ends with the most radical statement of faith in the OT: 'Though the fig tree does not blossom… yet I will rejoice in the LORD.'", refs: "Hab 3:17–19" },
        ],
      },
    ],
  },
  {
    id: "medo-persia",
    name: "Medo-Persia",
    years: "539–331 BC",
    symbol: "🐏",
    symbolLabel: "Ram with Two Horns",
    danielRef: "Dan 2:32,39; 7:5; 8:3–4,20",
    descriptor: "Chest & Arms of Silver",
    bg: "#050D1A",
    primary: "#4A90D9",
    secondary: "#C0C0C0",
    accent: "#E8F4FD",
    textLight: "#E8F4FD",
    gradient: "linear-gradient(135deg, #050D1A 0%, #0D2440 50%, #050D1A 100%)",
    headerGradient: "linear-gradient(90deg, #1B3A6B, #4A90D9, #C0C0C0, #4A90D9, #1B3A6B)",
    rulers: [
      { name: "Cyrus II (the Great)", years: "559–530 BC", note: "Issued the decree for Jewish return (Ezra 1)" },
      { name: "Cambyses II", years: "530–522 BC", note: "Conquered Egypt" },
      { name: "Darius I (the Great)", years: "522–486 BC", note: "Authorized Temple rebuilding (Ezra 6); Daniel's lion den era" },
      { name: "Xerxes I (Ahasuerus)", years: "486–465 BC", note: "Married Esther; Haman's plot foiled" },
      { name: "Artaxerxes I (Longimanus)", years: "465–424 BC", note: "Decree 445 BC starts Daniel's 70 Weeks (Neh 2)" },
      { name: "Darius III (Codomannus)", years: "336–330 BC", note: "Defeated at Issus & Gaugamela by Alexander" },
    ],
    events: [
      { year: "539 BC", label: "Cyrus Decree", detail: "Cyrus issues proclamation freeing all captive peoples; 50,000 Jews return under Zerubbabel", refs: "Ezra 1; 2 Chr 36:22–23; Isa 44:28" },
      { year: "537 BC", label: "First Return", detail: "Zerubbabel leads returnees; altar rebuilt; foundation of 2nd Temple laid amid weeping and joy", refs: "Ezra 2–3; Hag 2:3; Zech 4:10" },
      { year: "522 BC", label: "Daniel in the Lions' Den", detail: "Darius I signs the 30-day prayer prohibition; Daniel delivered; Darius decrees fear of the God of Daniel", refs: "Dan 6" },
      { year: "520–516 BC", label: "Second Temple Completed", detail: "Temple finished under Zerubbabel, Haggai, and Zechariah; rededicated with joy on 3 Adar", refs: "Ezra 5–6; Hag 1–2; Zech 1–8" },
      { year: "483–479 BC", label: "Esther & Xerxes", detail: "Esther becomes queen; Haman's genocide plot foiled; Purim established 'for all generations'", refs: "Esth 1–10; cf. Dan 11:2" },
      { year: "458 BC", label: "Ezra Returns", detail: "Artaxerxes' 1st decree; Ezra brings 1,800 men + gold/silver; restores Torah observance", refs: "Ezra 7–10" },
      { year: "445 BC", label: "Nehemiah Rebuilds Walls", detail: "Artaxerxes' 2nd decree (Nisan 1): START of Daniel's 70 Weeks; walls rebuilt in 52 days despite opposition", refs: "Neh 2; Dan 9:25; cf. Sir Robert Anderson" },
      { year: "331 BC", label: "Fall to Alexander", detail: "Darius III defeated at Gaugamela; Ram (Persia) broken by the He-Goat (Greece) — Dan 8 fulfilled precisely", refs: "Dan 8:7; 11:3" },
    ],
    prophecies: [
      { title: "Chest & Arms of Silver (Dan 2:39)", body: "Two arms = Media + Persia (Dan 8:20). Silver = lesser glory than gold yet broader empire. 'Inferior' in Neb's view but vast geographically." },
      { title: "The Ram (Dan 8:3–4,20)", body: "Two horns (unequal) = Medo-Persia. The higher horn rose later = Persia's dominance over Media. 'He did according to his will and became great.'" },
      { title: "The 70 Weeks (Dan 9:24–27)", body: "Artaxerxes' decree 445 BC + 69 × 7 prophetic years (360-day) = 173,880 days = 14 Nisan AD 32 — Palm Sunday (Anderson, The Coming Prince). Messiah 'cut off' after week 69." },
    ],
    archaeology: [
      { title: "Cyrus Cylinder (BM EA 90920)", body: "Cyrus's own clay barrel proclaims his policy of repatriating displaced peoples and restoring their temples — directly corroborates Ezra 1." },
      { title: "Behistun Inscription", body: "Darius I's trilingual rock inscription establishes the historical reliability of Persian king lists and confirms the turmoil of 522–521 BC (cf. Ezra 4–5)." },
      { title: "Elephantine Papyri", body: "Jewish military colony in Egypt wrote to Persian governor requesting permission to rebuild their temple — confirms Jewish diaspora under Persian rule (5th c. BC)." },
    ],
    prophets: [
      {
        name: "Daniel",
        title: "The Prophet of Visions (continued)",
        years: "c. 539–530 BC",
        icon: "🦁",
        refs: "Dan 6; 9–12",
        events: [
          { label: "Lions' Den Under Darius (522 BC)", detail: "Jealous satraps manipulate Darius into a decree banning prayer; Daniel prays openly three times a day; God shuts the lions' mouths; Darius issues a worldwide decree.", refs: "Dan 6" },
          { label: "The 70 Weeks Prophecy (539 BC)", detail: "Reading Jeremiah's 70 years, Daniel prays in sackcloth; Gabriel flies swiftly and delivers history's most precise Messianic timetable — 483 years to the day of Christ's entry into Jerusalem.", refs: "Dan 9:20–27" },
          { label: "The Kings of North & South Vision (536 BC)", detail: "Beside the Tigris, Daniel sees a man clothed in linen; receives a 135-verse prophecy of Persia, Greece, Antiochus, and the end times — so detailed critics claimed it must be history, not prophecy.", refs: "Dan 10–11" },
          { label: "The Resurrection Promise (536 BC)", detail: "The final word to Daniel: 'Those who sleep in the dust of the earth shall awake — some to everlasting life.' First explicit OT promise of bodily resurrection.", refs: "Dan 12:2–3,13" },
        ],
      },
      {
        name: "Haggai",
        title: "The Prophet of the Rebuilt Temple",
        years: "520 BC (2 months active)",
        icon: "🏛",
        refs: "Hag 1–2",
        events: [
          { label: "First Message: Wake Up (Aug 520 BC)", detail: "Confronts the people who build paneled houses while God's Temple lies in ruins: 'You have sown much and harvested little… go up to the hills and bring wood and build.' Temple work resumes within 23 days.", refs: "Hag 1:1–15" },
          { label: "Second Message: Greater Glory (Oct 520 BC)", detail: "To those weeping over the inferior second Temple: 'The latter glory of this house shall be greater than the former' — pointing forward to Christ entering that very Temple.", refs: "Hag 2:1–9; Mal 3:1; Luke 2:27" },
          { label: "Third & Fourth Messages (Dec 520 BC)", detail: "Holiness and defilement contrasted; then Zerubbabel named as the Lord's signet ring — messianic imagery pointing to the Davidic line through which Christ descended.", refs: "Hag 2:10–23; Matt 1:12" },
        ],
      },
      {
        name: "Zechariah",
        title: "The Prophet of Messianic Visions",
        years: "c. 520–480 BC",
        icon: "✨",
        refs: "Zech 1–14",
        events: [
          { label: "Eight Night Visions (Feb 519 BC)", detail: "In a single night, Zechariah receives eight apocalyptic visions: the horsemen, horns and craftsmen, measuring Jerusalem, the high priest, the lampstand, the flying scroll, the woman in a basket, and four chariots.", refs: "Zech 1–6" },
          { label: "The Branch Crowned (519 BC)", detail: "Joshua the high priest crowned in a symbolic act pointing to one person who is both King and Priest — 'the Branch' (cf. Jer 23:5); a foreshadowing of Christ's dual office.", refs: "Zech 6:9–15; Heb 7" },
          { label: "The Triumphal Entry Foretold (c. 480 BC)", detail: "Written 500 years before Palm Sunday: 'Your king is coming to you, righteous and having salvation, lowly and riding on a donkey.' Fulfilled to the letter.", refs: "Zech 9:9; Matt 21:5; John 12:15" },
          { label: "The Thirty Pieces of Silver (c. 480 BC)", detail: "The price of a pierced shepherd — 30 pieces cast to the potter in the Temple. Fulfilled when Judas returned the betrayal money, which bought the Potter's Field.", refs: "Zech 11:12–13; Matt 27:3–10" },
          { label: "They Shall Look on Him Whom They Pierced (c. 480 BC)", detail: "Eschatological prophecy of Israel's national mourning and repentance at the sight of the Messiah they pierced — cited by John at the Crucifixion and in Revelation.", refs: "Zech 12:10; John 19:37; Rev 1:7" },
        ],
      },
      {
        name: "Malachi",
        title: "The Last Voice Before 400 Years of Silence",
        years: "c. 433–430 BC",
        icon: "🌅",
        refs: "Mal 1–4",
        events: [
          { label: "Rebukes Corrupt Priesthood (430 BC)", detail: "Priests offering blind and lame animals; Malachi delivers God's rebuke: 'I have no pleasure in you… Cursed is the cheat.' Called the people back to the covenant.", refs: "Mal 1:6–14; 2:1–9" },
          { label: "Predicts the Messenger & the Lord (430 BC)", detail: "'Behold, I send my messenger… and the Lord whom you seek will suddenly come to his Temple.' John the Baptist preparing the way for Christ — 400 years before it happened.", refs: "Mal 3:1; Matt 11:10; Mark 1:2" },
          { label: "Elijah Before the Day of the Lord (430 BC)", detail: "The final two verses of the OT: 'Behold, I will send you Elijah the prophet before the great and dreadful day of the LORD.' Jesus confirmed John the Baptist fulfilled this first fulfillment.", refs: "Mal 4:5–6; Matt 11:14; 17:12–13" },
        ],
      },
    ],
  },
  {
    id: "greece",
    name: "Greece",
    years: "331–146 BC",
    symbol: "🐐",
    symbolLabel: "He-Goat (from the West)",
    danielRef: "Dan 2:32,39b; 7:6; 8:5–8,21",
    descriptor: "Belly & Thighs of Bronze",
    bg: "#050F0A",
    primary: "#4CAF50",
    secondary: "#CD853F",
    accent: "#F1F8E9",
    textLight: "#F1F8E9",
    gradient: "linear-gradient(135deg, #050F0A 0%, #0D2818 50%, #050F0A 100%)",
    headerGradient: "linear-gradient(90deg, #2E7D32, #4CAF50, #CD853F, #4CAF50, #2E7D32)",
    rulers: [
      { name: "Alexander III (the Great)", years: "336–323 BC", note: "The 'notable horn' (Dan 8:5); conquered Persia in 3 years" },
      { name: "Wars of the Diadochi (Successors)", years: "323–301 BC", note: "Four generals divide the empire (Dan 8:22)" },
      { name: "Ptolemy I (Soter)", years: "305–285 BC", note: "King of South = Egypt (Dan 11:5–6)" },
      { name: "Seleucus I (Nicator)", years: "305–281 BC", note: "King of North = Syria (Dan 11:6)" },
      { name: "Antiochus III (the Great)", years: "223–187 BC", note: "Major campaigns in Dan 11:10–19" },
      { name: "Antiochus IV Epiphanes", years: "175–164 BC", note: "'The little horn' — type of Antichrist (Dan 8:9–14; 11:21–35)" },
    ],
    events: [
      { year: "334–331 BC", label: "Alexander's Conquest", detail: "He-goat from the west 'touched not the ground' — lightning speed from Granicus → Issus → Gaugamela", refs: "Dan 8:5–7; 11:3" },
      { year: "332 BC", label: "Siege of Tyre & Gaza", detail: "Alexander fulfills Ezekiel's prophecy — Tyre made bare like a rock, stones thrown into sea", refs: "Ezek 26:3–14; Zech 9:3–4" },
      { year: "323 BC", label: "Death of Alexander", detail: "Dies Babylon, age 32; 'great horn was broken' — four successors emerge (four heads of the leopard)", refs: "Dan 8:8; 7:6" },
      { year: "301 BC", label: "Battle of Ipsus", detail: "Antigonus defeated; empire formally divided among four Diadochi (Ptolemy, Seleucus, Cassander, Lysimachus)", refs: "Dan 8:22; 11:4" },
      { year: "175 BC", label: "Antiochus IV Epiphanes", detail: "'Vile person' seizes throne by flattery; attacks Egypt twice; turns wrath on Israel", refs: "Dan 8:9; 11:21–30" },
      { year: "167 BC", label: "Abomination of Desolation", detail: "Antiochus defiles Temple: sacrifices pig on altar, erects Zeus statue, bans Torah & Sabbath — type of end-time Antichrist", refs: "Dan 8:11–14; 11:31; Matt 24:15; 2 Thess 2:3–4" },
      { year: "167–165 BC", label: "Maccabean Revolt", detail: "Mattathias and sons (Judas 'Maccabee') purify Temple after exactly 2,300 days (evening–mornings)", refs: "Dan 8:13–14; 1 Macc 1–4; John 10:22" },
      { year: "146 BC", label: "Rome Conquers Greece", detail: "Battle of Corinth; Greece becomes Roman province Achaea; iron legs replace bronze thighs", refs: "Dan 2:40; 7:7" },
    ],
    prophecies: [
      { title: "Belly & Thighs of Bronze (Dan 2:39b)", body: "Bronze = Greece; 'shall bear rule over all the earth' — Alexander's universal reach. Bronze armor was the signature of Greek hoplite warfare." },
      { title: "Four-Headed Leopard (Dan 7:6)", body: "Leopard = Greece's blinding speed (cf. Dan 8:5 'touched not the ground'); four heads = four Diadochi kingdoms after Alexander's death." },
      { title: "The 2,300 Days (Dan 8:13–14)", body: "From Antiochus's desecration to the Maccabean rededication = 2,300 evening-morning sacrifices (c. 6.3 years, 171–165 BC). Type of the Great Tribulation '1,260 days' (Rev 11:3)." },
    ],
    archaeology: [
      { title: "Dead Sea Scrolls — 4QDanᵃ (Qumran)", body: "Carbon-dated to 125–100 BC — proves Daniel existed before Rome's conquest, demolishing the Maccabean-forgery hypothesis. Daniel was written pre-167 BC." },
      { title: "Zeno Papyri (3rd c. BC)", body: "Greek documents from Egypt detailing economic conditions confirm the 'king of the south' (Ptolemaic) and 'king of the north' (Seleucid) geo-political framework of Dan 11." },
      { title: "1 Maccabees (c. 100 BC)", body: "Historical account of Antiochus IV's defilement and the Maccabean revolt corroborates Dan 8 and 11 in detail, including the 2,300-day desolation period." },
    ],
    prophets: [
      {
        name: "The 400 Years of Silence",
        title: "Between Malachi and John the Baptist",
        years: "c. 430–26 BC",
        icon: "🤫",
        refs: "Mal 4:6 → Luke 1:17",
        events: [
          { label: "End of Canonical Prophecy (430 BC)", detail: "After Malachi, the Talmud records: 'When the last prophets — Haggai, Zechariah, and Malachi — died, the Holy Spirit departed from Israel.' A divinely ordained silence begins.", refs: "b. Yoma 9b; Mal 4:6" },
          { label: "The Septuagint (LXX) Translation (c. 285 BC)", detail: "72 Jewish scholars translate the Hebrew Scriptures into Greek under Ptolemy II Philadelphus in Alexandria — Providence preserving Daniel's prophecies for all nations, including the Roman world.", refs: "Letter of Aristeas; cf. Acts 8:32–33" },
        ],
      },
      {
        name: "Simon the Just",
        title: "High Priest & Guardian of Torah",
        years: "c. 310–270 BC",
        icon: "📜",
        refs: "Sirach 50; Josephus, Ant. XI.8",
        events: [
          { label: "Alexander Bows Before the High Priest (332 BC)", detail: "Josephus records that Alexander the Great, approaching Jerusalem to destroy it, instead bowed before Simon (or his successor Jaddus) in high priestly garments, saying he had seen this figure in a dream pointing him to conquest.", refs: "Josephus, Ant. XI.8.4–5; cf. Dan 8:5–7" },
          { label: "'On Three Things the World Stands' (c. 290 BC)", detail: "Simon the Just's famous dictum in Pirkei Avot: 'On Torah, on Temple service, and on acts of loving-kindness' — a bridge between OT covenant theology and the intertestamental period.", refs: "m. Avot 1:2" },
        ],
      },
      {
        name: "Mattathias the Hasmonean",
        title: "Father of the Maccabean Revolt",
        years: "d. 166 BC",
        icon: "⚔️",
        refs: "1 Macc 2; Dan 11:32–35",
        events: [
          { label: "Refuses to Sacrifice to Zeus (167 BC)", detail: "When a Hellenized Jew steps forward to offer the pagan sacrifice, Mattathias kills him and the king's officer on the altar — echoing Phinehas (Num 25). He flees to the hills and raises the revolt.", refs: "1 Macc 2:15–28; cf. Num 25:7–8" },
          { label: "'Follow Me!' — The Rallying Cry (167 BC)", detail: "Mattathias calls all who are 'zealous for the law and support the covenant' to follow him into the wilderness — embodying Dan 11:32b: 'the people who know their God shall stand firm and take action.'", refs: "1 Macc 2:27; Dan 11:32" },
          { label: "Death & Charge to His Sons (166 BC)", detail: "On his deathbed, he appoints Judas as military commander ('mighty in strength from his youth') and Simon as counselor — the Maccabean leadership that would purify the Temple.", refs: "1 Macc 2:49–70" },
        ],
      },
      {
        name: "Judas Maccabeus",
        title: "The Hammer — Deliverer of Israel",
        years: "d. 160 BC",
        icon: "🔨",
        refs: "1 Macc 3–9; Dan 11:32–35",
        events: [
          { label: "Victories Against Antiochus's Generals (166–165 BC)", detail: "Judas defeats Apollonius, Seron, Gorgias, and Lysias in rapid succession with vastly outnumbered forces — 'not by might, nor by power, but by My Spirit' (Zech 4:6).", refs: "1 Macc 3–4; Dan 11:32–35" },
          { label: "Purification of the Temple (25 Kislev, 165 BC)", detail: "Exactly 2,300 days (Dan 8:14) after Antiochus's desecration, Judas cleanses and rededicated the Temple; the 8-day Feast of Dedication (Hanukkah) is instituted — still observed in Jesus' day.", refs: "1 Macc 4:36–59; Dan 8:13–14; John 10:22" },
          { label: "Alliance with Rome (161 BC)", detail: "Judas sends envoys to the Senate — an ironic historical hinge: the only surviving Maccabean ally becomes the very empire (Rome / iron legs) that will later destroy the Temple.", refs: "1 Macc 8; Dan 2:40; 7:7" },
        ],
      },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    years: "146 BC – 476 AD",
    symbol: "🦅",
    symbolLabel: "Roman Eagle",
    danielRef: "Dan 2:33,40–43; 7:7–8,19–26",
    descriptor: "Legs of Iron / Feet of Iron & Clay",
    bg: "#0F0000",
    primary: "#DC143C",
    secondary: "#708090",
    accent: "#FFF5F5",
    textLight: "#FFF5F5",
    gradient: "linear-gradient(135deg, #0F0000 0%, #2D0A0A 50%, #0F0000 100%)",
    headerGradient: "linear-gradient(90deg, #8B0000, #DC143C, #708090, #DC143C, #8B0000)",
    rulers: [
      { name: "Julius Caesar", years: "49–44 BC", note: "Reformed Republic; assassinated 44 BC" },
      { name: "Augustus (Octavian)", years: "27 BC – AD 14", note: "Census at Jesus' birth (Luke 2:1); 'peace' = Pax Romana" },
      { name: "Tiberius Caesar", years: "AD 14–37", note: "Emperor during Christ's ministry and crucifixion (Luke 3:1)" },
      { name: "Pontius Pilate (governor)", years: "AD 26–36", note: "Tried and sentenced Jesus; inscription found 1961" },
      { name: "Nero", years: "AD 54–68", note: "First empire-wide persecution of Christians; martyred Paul & Peter" },
      { name: "Vespasian / Titus", years: "AD 69–81", note: "Titus destroys Jerusalem & Temple, AD 70 (Dan 9:26; Luke 21:20)" },
    ],
    events: [
      { year: "63 BC", label: "Pompey Takes Jerusalem", detail: "Roman general Pompey enters Holy of Holies; Judea becomes Roman client state — iron legs begin to crush", refs: "Dan 2:40; 7:7; cf. Ps 2" },
      { year: "c. 5/4 BC", label: "Birth of Jesus Christ", detail: "Augustus's census brings Mary & Joseph to Bethlehem; 'the stone cut without hands' enters history (Dan 2:45)", refs: "Luke 2:1–7; Dan 9:25; Mic 5:2; Matt 2:1" },
      { year: "AD 26–30", label: "Ministry of Jesus", detail: "Tiberius's 15th year (AD 29) begins; Messiah 'the Prince' appears exactly on schedule per Dan 9:25", refs: "Luke 3:1; Dan 9:25; Matt 4:17" },
      { year: "AD 30/33", label: "Crucifixion & Resurrection", detail: "Messiah 'cut off, but not for himself' (Dan 9:26a); atonement complete; death conquered", refs: "Dan 9:26; Matt 27; Isa 53; John 19; 1 Cor 15:3–4" },
      { year: "AD 70", label: "Temple Destroyed", detail: "Titus's army burns the Temple; 1.1M Jews killed, 97,000 enslaved; not one stone left on another — Dan 9:26b, Luke 21:6 fulfilled precisely", refs: "Dan 9:26; Luke 21:20–24; Matt 24:2; Josephus, Jewish War VI" },
      { year: "AD 50–62", label: "Paul Before Roman Courts", detail: "Paul appeals to Caesar; carries gospel to Rome; believers told to submit to governing authorities (Rom 13); fulfills Acts 1:8", refs: "Acts 25–28; Rom 13:1–7; Phil 4:22" },
      { year: "AD 313", label: "Edict of Milan", detail: "Constantine legalizes Christianity; begins church-state fusion; feet of clay entering iron (Dan 2:41–43)", refs: "Dan 2:41–43; Rev 17:3" },
      { year: "AD 476", label: "Fall of Western Rome", detail: "Odoacer deposes Romulus Augustulus; iron legs shattered yet toes remain — empire to be revived (Dan 2:42–43; 7:8)", refs: "Dan 2:42–43; 7:7–8,24; Rev 13:1; 17:9–14" },
    ],
    prophecies: [
      { title: "Legs of Iron (Dan 2:40)", body: "'Strong as iron — it breaks in pieces and shatters all things.' Rome crushed all previous empires. Two legs = Eastern (Constantinople) and Western (Rome) division, AD 285/395." },
      { title: "Ten Toes of Iron & Clay (Dan 2:41–43)", body: "Partly strong (iron = autocracy) and partly broken (clay = democracy/populism). The toes = ten kings yet future (Rev 17:12) — a revived Roman power base for the Antichrist." },
      { title: "The Terrible Fourth Beast (Dan 7:7–8,24–26)", body: "Unlike any before it; ten horns → little horn (Antichrist) uproots three, speaks blasphemy, persecutes saints for 'time, times, and half a time' (3½ years = Rev 13:5). The Ancient of Days takes dominion — Christ's Kingdom." },
    ],
    archaeology: [
      { title: "Pontius Pilate Inscription (Caesarea Maritima, 1961)", body: "Limestone block bearing 'TIBERIEUM … PONTIUS PILATUS … PRAEFECTUS IUDAEAE' — first extra-biblical artifact to name the man who sentenced Jesus. Now in Israel Museum." },
      { title: "Arch of Titus (Rome, AD 82)", body: "Relief carvings show Roman soldiers carrying the 7-branched menorah from the Temple — visual confirmation of the AD 70 sack of Jerusalem (Dan 9:26; Luke 21:24)." },
      { title: "Gallio Inscription (Delphi, c. AD 52)", body: "Proconsul Gallio's tenure anchors Pauline chronology with precision — confirms Acts 18:12–17, dating Paul's Corinthian ministry and entire missionary timeline." },
    ],
    prophets: [
      {
        name: "John the Baptist",
        title: "The Voice in the Wilderness",
        years: "c. AD 26–29",
        icon: "🏜️",
        refs: "Matt 3; 11; Mark 1; Luke 1; 3; John 1",
        events: [
          { label: "Birth Announced by Gabriel (5 BC)", detail: "Angel Gabriel tells Zechariah his elderly wife Elizabeth will bear a son; he will go before the Lord 'in the spirit and power of Elijah' — Malachi's 400-year-old promise activated.", refs: "Luke 1:11–17; Mal 4:5–6" },
          { label: "Baptizing in the Jordan (AD 26)", detail: "Begins public ministry in the 15th year of Tiberius, fulfilling Isaiah 40:3 — 'the voice of one crying in the wilderness: Prepare the way of the Lord.' Crowds, Pharisees, soldiers, and tax collectors all come.", refs: "Luke 3:1–18; Isa 40:3; Matt 3:1–12" },
          { label: "Baptizes Jesus (AD 26/27)", detail: "Recognizes Jesus: 'Behold, the Lamb of God who takes away the sin of the world!' Baptizes Him; the Spirit descends as a dove; the Father speaks from heaven — the Trinity at the Jordan.", refs: "John 1:29–34; Matt 3:13–17" },
          { label: "Greatest Born of Women (AD 28)", detail: "Jesus declares: 'Among those born of women there has arisen no one greater than John the Baptist' — and yet the least in the Kingdom of Heaven is greater than he. The hinge of the ages.", refs: "Matt 11:11; Luke 7:28" },
          { label: "Beheaded by Herod Antipas (AD 29)", detail: "Imprisoned for condemning Herod's marriage to his brother's wife; Herodias's daughter Salome dances; John's head delivered on a platter — the final OT-style prophet martyred.", refs: "Matt 14:1–12; Mark 6:14–29" },
        ],
      },
      {
        name: "Jesus of Nazareth",
        title: "The Prophet, Priest & King — The Word Made Flesh",
        years: "c. 4 BC – AD 30/33",
        icon: "✝️",
        refs: "All four Gospels; Dan 9:25–26; Isa 53",
        events: [
          { label: "Baptism & Temptation (AD 26/27)", detail: "Anointed by the Spirit at the Jordan; immediately led into the wilderness 40 days — a recapitulation of Israel's 40 years, where Jesus succeeds where Israel failed.", refs: "Matt 3:13–4:11; Luke 4:1–13" },
          { label: "Sermon on the Mount (AD 28)", detail: "Eight Beatitudes, the Lord's Prayer, the Golden Rule — the constitution of the Kingdom of Heaven. 'You have heard it said… but I say to you': a prophet with unique divine authority.", refs: "Matt 5–7; cf. Deut 18:15,18" },
          { label: "Transfiguration (AD 29)", detail: "On a high mountain, Jesus shines like the sun; Moses (Law) and Elijah (Prophets) appear with Him; the Father speaks: 'This is my beloved Son… listen to him' — He is greater than both.", refs: "Matt 17:1–8; 2 Pet 1:17–18" },
          { label: "Triumphal Entry (14 Nisan, AD 30/32)", detail: "Rides into Jerusalem on a donkey precisely on the day Daniel's 69-week countdown reached zero — Zech 9:9 and Dan 9:25 fulfilled simultaneously. The crowd cries Hosanna.", refs: "Matt 21:1–11; Zech 9:9; Dan 9:25" },
          { label: "Crucifixion & Resurrection (AD 30/33)", detail: "Messiah 'cut off but not for himself' (Dan 9:26); buried; rose bodily on the third day. The stone cut without hands (Dan 2:45) strikes the statue. Death is conquered.", refs: "Dan 9:26; Isa 53; 1 Cor 15:3–4; Matt 28" },
        ],
      },
      {
        name: "Paul of Tarsus",
        title: "The Apostle to the Gentiles",
        years: "c. AD 34–67",
        icon: "✉️",
        refs: "Acts 9–28; Romans–Philemon",
        events: [
          { label: "Damascus Road Conversion (AD 34)", detail: "Saul the persecutor is struck blind by the risen Christ on the road to Damascus — 'Why are you persecuting me?' The most dramatic conversion in history; chosen vessel to carry the Name to Gentiles, kings, and Israel.", refs: "Acts 9:1–19; 22:6–16" },
          { label: "Three Missionary Journeys (AD 46–57)", detail: "Plants churches from Antioch to Corinth to Ephesus; reasoning in synagogues and marketplaces; the iron-legged Roman road network becomes the highway of the Gospel.", refs: "Acts 13–20; Rom 15:19" },
          { label: "Appeal to Caesar & Roman Imprisonment (AD 59–62)", detail: "Arrested in Jerusalem, appeals to Caesar; transported to Rome; under house arrest writes Ephesians, Philippians, Colossians, Philemon — the 'Prison Epistles' from the heart of the iron empire.", refs: "Acts 25–28; Phil 1:12–14; 4:22" },
          { label: "Martyrdom Under Nero (c. AD 67)", detail: "Tradition and Eusebius record Paul beheaded on the Ostian Way, Rome, during Nero's persecution — 'I have fought the good fight, I have finished the race, I have kept the faith.'", refs: "2 Tim 4:6–8; Eusebius, Hist. Eccl. II.25" },
        ],
      },
      {
        name: "John the Apostle",
        title: "The Seer of Patmos — Revelation's Prophet",
        years: "c. AD 33–100",
        icon: "👁️",
        refs: "John 1–21; 1–3 John; Rev 1–22",
        events: [
          { label: "Beloved Disciple & Eyewitness (AD 26–33)", detail: "Reclines at the Last Supper; stands at the cross; first to believe at the empty tomb — eyewitness of everything from Galilee to Resurrection.", refs: "John 13:23; 19:26; 20:8; 1 John 1:1–3" },
          { label: "Pentecost & Jerusalem Church (AD 33–50)", detail: "A pillar of the Jerusalem church alongside Peter and James; Paul meets him and receives the right hand of fellowship — confirming the unity of Jew and Gentile mission.", refs: "Acts 3–4; Gal 2:9" },
          { label: "Exiled to Patmos (c. AD 95)", detail: "Banished to the Aegean island of Patmos under Domitian's persecution 'on account of the word of God and the testimony of Jesus' — the isolation becomes a throne room.", refs: "Rev 1:9; Eusebius, Hist. Eccl. III.18" },
          { label: "The Revelation of Jesus Christ (c. AD 95)", detail: "On the Lord's Day, caught up in the Spirit; receives the most comprehensive prophetic vision in Scripture — completing and unsealing Daniel's sealed visions (Dan 12:4,9; Rev 22:10). The four empires culminate in the Beast, the Stone Kingdom, and the New Jerusalem.", refs: "Rev 1:1–3; 13:1–8; 21:1–4; Dan 2:44–45; 7:27" },
        ],
      },
    ],
  },
];

function EmpireCard({ empire, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: isSelected ? empire.headerGradient : "rgba(255,255,255,0.07)",
        border: `2px solid ${isSelected ? empire.primary : "rgba(255,255,255,0.15)"}`,
        borderRadius: 12,
        padding: "12px 16px",
        cursor: "pointer",
        transition: "all 0.3s",
        textAlign: "center",
        minWidth: 140,
      }}
    >
      <div style={{ fontSize: 28 }}>{empire.symbol}</div>
      <div style={{ color: isSelected ? "#fff" : "#ccc", fontWeight: 700, fontSize: 15 }}>{empire.name}</div>
      <div style={{ color: isSelected ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)", fontSize: 11 }}>{empire.years}</div>
    </button>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 13, fontWeight: 800, letterSpacing: 2, color, textTransform: "uppercase",
        borderBottom: `2px solid ${color}`, paddingBottom: 6, marginBottom: 14
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function EventCard({ event, primary, secondary }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid rgba(255,255,255,0.1)`,
      borderLeft: `4px solid ${primary}`,
      borderRadius: 8,
      padding: "12px 14px",
      marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <span style={{ color: primary, fontWeight: 800, fontSize: 13, minWidth: 72 }}>{event.year}</span>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{event.label}</span>
      </div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 5, lineHeight: 1.5 }}>{event.detail}</div>
      <div style={{ color: secondary, fontSize: 11, fontStyle: "italic" }}>{event.refs}</div>
    </div>
  );
}

function ProphecyCard({ item, primary }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
      border: `1px solid ${primary}44`,
      borderRadius: 10,
      padding: "14px 16px",
      marginBottom: 10,
    }}>
      <div style={{ color: primary, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>{item.title}</div>
      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.6 }}>{item.body}</div>
    </div>
  );
}

function ArchCard({ item, secondary }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${secondary}55`,
      borderRadius: 10,
      padding: "14px 16px",
      marginBottom: 10,
    }}>
      <div style={{ color: secondary, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🏛 {item.title}</div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5 }}>{item.body}</div>
    </div>
  );
}

function ProphetCard({ prophet, primary, secondary, bg }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
      border: `1px solid ${primary}55`,
      borderRadius: 12,
      marginBottom: 14,
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "14px 16px", textAlign: "left", display: "flex", alignItems: "center", gap: 14,
        }}
      >
        <span style={{ fontSize: 32 }}>{prophet.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: primary, fontWeight: 800, fontSize: 15 }}>{prophet.name}</div>
          <div style={{ color: secondary, fontSize: 12, fontWeight: 600 }}>{prophet.title}</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>{prophet.years} &nbsp;•&nbsp; {prophet.refs}</div>
        </div>
        <span style={{ color: primary, fontSize: 18, fontWeight: 700, marginRight: 4 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${primary}22` }}>
          {prophet.events.map((ev, i) => (
            <div key={i} style={{
              marginTop: 12,
              paddingLeft: 12,
              borderLeft: `3px solid ${primary}88`,
            }}>
              <div style={{ color: primary, fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{ev.label}</div>
              <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, lineHeight: 1.55, marginBottom: 3 }}>{ev.detail}</div>
              <div style={{ color: secondary, fontSize: 11, fontStyle: "italic" }}>{ev.refs}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineBar({ events, primary, secondary, bg }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ position: "relative", margin: "24px 0 32px", padding: "0 12px" }}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${secondary}44, ${primary}, ${secondary}44)`, borderRadius: 3, position: "relative" }}>
        {events.map((ev, i) => {
          const pct = (i / (events.length - 1)) * 100;
          return (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left: `${pct}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: hovered === i ? 18 : 12,
                height: hovered === i ? 18 : 12,
                background: primary,
                borderRadius: "50%",
                border: `2px solid ${secondary}`,
                cursor: "pointer",
                transition: "all 0.2s",
                zIndex: 2,
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        {events.map((ev, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1, fontSize: 10, color: hovered === i ? primary : "rgba(255,255,255,0.45)", transition: "color 0.2s", fontWeight: hovered === i ? 700 : 400 }}>
            {ev.year}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const empire = EMPIRES[selected];

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", fontFamily: "'Georgia', serif", color: "#fff" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a0000 0%, #0A0A0A 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "28px 24px 20px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#FFD700", textTransform: "uppercase", marginBottom: 8 }}>
          Daniel's Prophetic Empires
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: 1, background: "linear-gradient(90deg, #FFD700, #C0C0C0, #4CAF50, #DC143C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Four World Empires
        </h1>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 6 }}>
          Daniel 2 • Daniel 7 • Daniel 8 • Daniel 11
        </div>
      </div>

      {/* Empire Selector */}
      <div style={{ display: "flex", gap: 10, padding: "20px 20px 0", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
        {EMPIRES.map((e, i) => (
          <EmpireCard key={e.id} empire={e} isSelected={selected === i} onClick={() => setSelected(i)} />
        ))}
      </div>

      {/* Empire Content */}
      <div style={{ padding: "24px 20px", maxWidth: 900, margin: "0 auto" }}>
        {/* Empire Hero */}
        <div style={{
          background: empire.gradient,
          borderRadius: 16,
          border: `1px solid ${empire.primary}44`,
          padding: "24px",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "absolute", right: 20, top: 10, fontSize: 80, opacity: 0.08 }}>{empire.symbol}</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ fontSize: 56 }}>{empire.symbol}</div>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: 32, fontWeight: 900, color: empire.primary }}>{empire.name}</h2>
              <div style={{ color: empire.secondary, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{empire.years}</div>
              <div style={{ background: `${empire.primary}22`, border: `1px solid ${empire.primary}55`, borderRadius: 6, display: "inline-block", padding: "4px 12px", color: empire.primary, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                {empire.descriptor}
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                Symbol: {empire.symbolLabel} &nbsp;•&nbsp; {empire.danielRef}
              </div>
            </div>
          </div>

          {/* Timeline Bar */}
          <TimelineBar events={empire.events} primary={empire.primary} secondary={empire.secondary} />
        </div>

        {/* Rulers */}
        <Section title="Rulers & Monarchs" color={empire.primary}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: `${empire.primary}22` }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", color: empire.primary, borderBottom: `1px solid ${empire.primary}44` }}>Ruler</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", color: empire.primary, borderBottom: `1px solid ${empire.primary}44` }}>Reign</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", color: empire.primary, borderBottom: `1px solid ${empire.primary}44` }}>Significance</th>
                </tr>
              </thead>
              <tbody>
                {empire.rulers.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td style={{ padding: "8px 12px", color: "#fff", fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: "8px 12px", color: empire.secondary }}>{r.years}</td>
                    <td style={{ padding: "8px 12px", color: "rgba(255,255,255,0.65)" }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Prophets */}
        <Section title="✦ Significant Prophets" color={empire.primary}>
          {empire.prophets.map((p, i) => (
            <ProphetCard key={i} prophet={p} primary={empire.primary} secondary={empire.secondary} bg={empire.bg} />
          ))}
        </Section>

        {/* Events */}
        <Section title="Key Historical Events" color={empire.primary}>
          {empire.events.map((ev, i) => (
            <EventCard key={i} event={ev} primary={empire.primary} secondary={empire.secondary} />
          ))}
        </Section>

        {/* Prophecy */}
        <Section title="Prophetic Interpretation" color={empire.secondary}>
          {empire.prophecies.map((p, i) => (
            <ProphecyCard key={i} item={p} primary={empire.primary} />
          ))}
        </Section>

        {/* Archaeology */}
        <Section title="Archaeological Corroboration" color={empire.secondary}>
          {empire.archaeology.map((a, i) => (
            <ArchCard key={i} item={a} secondary={empire.secondary} />
          ))}
        </Section>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px", color: "rgba(255,255,255,0.3)", fontSize: 12, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        Sources: British Museum • Dead Sea Scrolls • Josephus • Sir Robert Anderson, <em>The Coming Prince</em> • ANET • Israel Museum
      </div>
    </div>
  );
}
