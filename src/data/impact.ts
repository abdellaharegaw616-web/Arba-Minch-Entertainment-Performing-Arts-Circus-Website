export interface ImpactStory {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  heroImage: string;
  summary: string;
  body: string[];
  keyOutcomes: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: "street-to-stage",
    slug: "street-to-stage",
    title: "From the Streets of Arba Minch to Global Stages",
    category: "Livelihood & Economic Self-Sufficiency",
    subtitle: "Over 10 former street youth achieving sustainable independent livelihoods through performing arts.",
    heroImage: "/images/circus_performance_1.png",
    summary:
      "When AMEPAC was founded in 2011, many children in Arba Minch had lost family support, affection, and safety on the streets. Through disciplined acrobatic training, these children found identity, self-worth, and a brotherhood.",
    body: [
      "Life on the streets in provincial Ethiopia exposes children to crime, substance abuse, and despair. Before AMEPAC, local perception often treated street youth as outcasts.",
      "Founder Tesfahun Mergia began rehearsals with repurposed dormitory mattresses from Arba Minch University. As the youth mastered banquine tosses, human pyramids, and object manipulation, local perceptions shifted completely.",
      "Today, senior alumni have completed professional performance contracts in Turkey, India, and Algeria. They now earn steady incomes, rent their own independent apartments, and support younger siblings' schooling.",
    ],
    keyOutcomes: [
      "Over 10 former street children fully self-sufficient with independent housing",
      "Senior alumni touring internationally across 3 countries",
      "Zero active members returning to street begging or crime",
      "Dignified recognition as respected community cultural ambassadors",
    ],
    quote: {
      text: "You could say that the circus school is a place to heal. Through the circus, street children can become resilient and self-reliant. They change their lifestyles and show what is inside them.",
      author: "Tesfahun Mergia, Founder & Director",
    },
  },
  {
    id: "education-first",
    slug: "education-first",
    title: "Education First: Mandatory School Attendance",
    category: "Child Protection & Scholastic Support",
    subtitle: "Circus training is conditional upon verified regular school attendance.",
    heroImage: "/images/circus_facility_3.png",
    summary:
      "AMEPAC operates on an uncompromising rule: no child can attend circus rehearsals without being enrolled and attending formal daytime school.",
    body: [
      "Circus is an extraordinary catalyst for change, but education guarantees long-term self-determination. Many children who initially joined our group had dropped out of school or had never enrolled.",
      "Under our parent organization, Building Tomorrow Integrated Youth & Community Development Organization (registered Nov 2022), every trainee receives scholastic supplies: notebooks, pens, school uniforms, and tutoring.",
      "Attendance records are cross-checked directly with local institutions including Sikkela High School. Children learn that physical excellence in acrobatics must match intellectual diligence in class.",
    ],
    keyOutcomes: [
      "100% formal school enrollment rate among active trainees",
      "Scholastic exercise books, uniforms, and tutoring provided directly",
      "Regular tracking and coordination with local Arba Minch schools",
      "Multiple trainees advancing into higher education and technical colleges",
    ],
    quote: {
      text: "The condition to attend the circus classes is that they also attend regular school. Education is the ultimate target.",
      author: "Tesfahun Mergia, Founder & Director",
    },
  },
  {
    id: "girls-in-circus",
    slug: "girls-in-circus",
    title: "Breaking Barriers: Girls & Women in Circus Arts",
    category: "Gender Equity & Athletic Excellence",
    subtitle: "From Troupe Black Lioness to international gymnastics scholarships in China.",
    heroImage: "/images/circus_performance_2.png",
    summary:
      "In traditional communities, girls often face severe vulnerability and lack athletic platforms. At AMEPAC, female performers outnumber boys in several training tiers, mastering solo contortion, banquine, and antipode.",
    body: [
      "Young women face intense pressures of early marriage and economic vulnerability. Circus provides a safe physical sanctuary where girls develop confidence, physical strength, and artistic authority.",
      "Performers like Kefeni Teshome ('Queen of Gamo') and the 4 members of Troupe Black Lioness demonstrate extraordinary poise in trio balancing, hula hoop mastery, and foot juggling.",
      "In 2023, two female AMEPAC acrobats secured scholarships to train in the People's Republic of China, inspiring the next generation of young Ethiopian women.",
    ],
    keyOutcomes: [
      "Troupe Black Lioness: 100% all-female acrobatic ensemble",
      "Two international gymnastics training scholarships awarded to female artists in China",
      "Kefeni Teshome recognized as one of Ethiopia's premier contortionists",
      "Safe physical haven providing dignity, health education, and leadership coaching",
    ],
    quote: {
      text: "The rain makes it hard to achieve our dreams in our current hall, but we don't want to give up. We want to change our situation by performing in the hardship!",
      author: "Kefeni Teshome, Solo Contortionist",
    },
  },
];
