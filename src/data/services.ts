import { ServicePackage } from "@/types";

export const SERVICES: ServicePackage[] = [
  {
    id: "professional-circus",
    slug: "professional-circus",
    title: "Professional Circus",
    category: "Main Stage Performance",
    summary:
      "Full-scale circus productions featuring high-voltage acrobatics, banquine tosses, human pyramids, Chinese pole, Cyr wheel, and contortion.",
    description:
      "Our flagship professional circus productions unite Ethiopia's most gifted acrobatic artists trained in Arba Minch. Each production integrates physical courage with traditional Ethiopian cultural rhythms and theatrical narrative.",
    details: [
      "Ensemble scale options from solo virtuosos to 20-artist troupe spectacles",
      "Flexible staging: adapted for indoor theaters, outdoor festival arenas, and convention stages",
      "Live acoustic rhythm integration with traditional percussion and horns",
      "Rigorous technical safety management and professional rigging compliance",
    ],
    suitableFormats: [
      "Full Theatrical Production (45 to 90 minutes)",
      "High-Voltage Festival Showcase (20 to 30 minutes)",
      "Custom Corporate Gala & Opening Ceremony Highlights",
    ],
    relatedTroupeIds: [
      "troupe-african-pride",
      "troupe-gamo-bayira",
      "yoga-brothers",
      "troupe-black-lioness",
      "kefeni-queen-of-gamo",
    ],
    imageUrl: "/images/circus_performance_1.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 1,
  },
  {
    id: "dance",
    slug: "dance",
    aliases: ["dance-fusion"],
    title: "Dance",
    category: "Traditional & Contemporary Dance",
    summary:
      "Authentic regional folk dances from southern Ethiopia (Gamo, Wolaita, Sidama, Oromo) harmonized with modern expressive movement.",
    description:
      "Rooted in ancestral traditions and contemporary movement, our dancers convey the living rhythms of the Great Rift Valley. Performances celebrate regional heritage through high-energy step-work, expressive shoulder choreography, and vibrant community celebration.",
    details: [
      "Authentic southern Ethiopian ethnic choreographies and celebratory dances",
      "Contemporary social-impact dance narratives addressing community themes",
      "Traditional handwoven garments and cultural ceremonial adornments",
      "Interactive cultural engagement inviting audiences to celebrate together",
    ],
    suitableFormats: [
      "Cultural Celebration & Festival Programs",
      "Conference & Diplomatic Opening Receptions",
      "Community Outreach & Public Holiday Gatherings",
    ],
    relatedTroupeIds: ["troupe-black-lioness", "troupe-african-pride"],
    imageUrl: "/images/circus_performance_2.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 2,
  },
  {
    id: "puppetry",
    slug: "puppetry",
    aliases: ["giant-puppets"],
    title: "Puppetry",
    category: "Street & Carnival Arts",
    summary:
      "Towering handcrafted giant puppets, animated walking figures, and stilt characters bringing carnival magic to parades and open-air gatherings.",
    description:
      "Constructed by hand in our Arba Minch workshop using sustainable and locally reclaimed materials, our giant puppets stand 3 to 4 meters tall. They lead festive processions, animate public parks, and engage communities with visual storytelling.",
    details: [
      "Towering giant puppets depicting Ethiopian folklore, nature, and community symbols",
      "Costumed stilt-walking performers providing interactive crowd animation",
      "Street parade leadership for civic festivals and community celebrations",
      "Educational outreach puppets for child-focused health and education campaigns",
    ],
    suitableFormats: [
      "Street Parades & Carnival Processions",
      "Community Awareness & Public Health Drives",
      "Youth Festivals & Outdoor Park Activations",
    ],
    relatedTroupeIds: ["troupe-gamo-bayira"],
    imageUrl: "/images/circus_performance_1.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 3,
  },
  {
    id: "theater",
    slug: "theater",
    title: "Theater",
    category: "Theatrical Arts",
    summary:
      "Thought-provoking community drama, interactive forum theater, and storytelling addressing social issues and youth empowerment.",
    description:
      "Our theatrical productions give voice to local youth experiences and community narratives. Performed by talented local actors in Amharic, Gamotho, and English, our plays tackle social development themes with humor, dignity, and insight.",
    details: [
      "Forum theater sessions inviting audience participation and dialogue",
      "Educational theater pieces tailored for schools and community centers",
      "Dramatic productions highlighting child protection, education, and resilience",
      "Cultural oral histories preserving indigenous Rift Valley folklore",
    ],
    suitableFormats: [
      "Community Forum Theater (Interactive 45-60 min)",
      "School & Educational Tour Productions",
      "NGO Campaign Drama & Public Dialogue Events",
    ],
    relatedTroupeIds: ["troupe-african-pride"],
    imageUrl: "/images/circus_performance_2.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 4,
  },
  {
    id: "music",
    slug: "music",
    aliases: ["music-productions"],
    title: "Music",
    category: "Musical Arts",
    summary:
      "Live musical ensembles blending traditional Ethiopian folk instruments (krar, masenqo, kebero, washint) with acoustic rhythms.",
    description:
      "Music forms the acoustic backbone of AMEPAC. Our musicians arrange original rhythms reflecting the Lake Chamo and Gamo highland soundscapes, delivering live accompaniment for circus productions as well as standalone acoustic concerts.",
    details: [
      "Live soundtrack accompaniment for circus, acrobatics, and dance acts",
      "Traditional instrument performances (Krar, Masenqo, Kebero, Washint)",
      "Acoustic dinner and cultural reception ensemble sets",
      "Demonstrations of indigenous rhythm structures and melodies",
    ],
    suitableFormats: [
      "Live Stage Accompaniment",
      "Acoustic Concert Sets (30 to 60 min)",
      "Cultural Receptions & Formal Banquets",
    ],
    relatedTroupeIds: ["troupe-african-pride", "troupe-black-lioness"],
    imageUrl: "/images/circus_performance_1.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 5,
  },
  {
    id: "workshops",
    slug: "workshops",
    aliases: ["performing-arts-workshops"],
    title: "Workshops",
    category: "Education & Outreach",
    summary:
      "Structured masterclasses in acrobatics, juggling, contortion, and social circus methodology for youth, schools, and partner organizations.",
    description:
      "Led by senior coaches and FIG-certified instructors, our workshops cultivate discipline, trust, and physical confidence. We teach safe foundational movement, collaborative balance, and social circus pedagogy that transforms lives.",
    details: [
      "Youth introductory circus camps and team-building workshops",
      "Safe coach training protocols and child safeguarding standards",
      "Social circus methodologies for NGOs working with vulnerable youth",
      "Specialized flexibility and contortion clinics for physical artists",
    ],
    suitableFormats: [
      "Half-Day Youth Discovery Clinics (2 to 3 hours)",
      "Multi-Day Intensive Training Camps",
      "Professional Train-the-Trainer Modules for Educators",
    ],
    relatedTroupeIds: [
      "yoga-brothers",
      "troupe-gamo-bayira",
      "kefeni-queen-of-gamo",
    ],
    imageUrl: "/images/circus_facility_3.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 6,
  },
  {
    id: "visual-art",
    slug: "visual-art",
    title: "Visual Art",
    category: "Visual & Creative Arts",
    summary:
      "Handcrafted stage backdrops, thematic event banners, community murals, and cultural exhibitions celebrating southern Ethiopian heritage.",
    description:
      "The visual identity of AMEPAC is expressed through traditional artisanry and contemporary scenic design. Our visual artists craft hand-painted backdrops, promotional banners, and educational murals that visually enrich our productions and community spaces.",
    details: [
      "Custom stage backdrops and thematic performance scenic design",
      "Hand-painted public murals addressing youth education and health",
      "Exhibition displays of traditional Gamo artisanal craftwork",
      "Collaborative community art sessions for young people",
    ],
    suitableFormats: [
      "Commissioned Scenic Backdrops & Stage Design",
      "Community Mural Projects (1 to 2 weeks)",
      "Cultural Exhibition Booth Displays",
    ],
    relatedTroupeIds: ["troupe-gamo-bayira"],
    imageUrl: "/images/circus_facility_3.png",
    isPlaceholderImage: true,
    isPublished: true,
    orderIndex: 7,
  },
  {
    id: "gymnastics",
    slug: "gymnastics",
    title: "Gymnastics",
    category: "Athletics & Physical Training",
    summary:
      "Certified foundational artistic gymnastics coaching, floor tumbling, and physical conditioning led under FIG-certified safety standards.",
    description:
      "Directed by FIG-certified trainer Tesfahun Mergia, our gymnastics academy develops athletic discipline, coordination, and strength in youth ages 7 to 21. AMEPAC gymnasts compete regionally and nationally, mastering vaulting, floor tumbling, and apparatus fundamentals.",
    details: [
      "Foundational gymnastics for youth and aspiring competitive athletes",
      "Floor tumbling: cartwheels, round-offs, handsprings, and aerial flips",
      "FIG international safety and athlete safeguarding protocols",
      "National competition preparation under Ethiopian Gymnastics Federation standards",
    ],
    suitableFormats: [
      "Weekly Academy Training Sessions",
      "Seasonal Youth Athletic Camps",
      "School Physical Education Coaching Partnerships",
    ],
    relatedTroupeIds: ["troupe-african-pride", "yoga-brothers"],
    imageUrl: "/images/circus_performance_2.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 8,
  },
  {
    id: "fitness",
    slug: "fitness",
    title: "Fitness",
    category: "Health & Conditioning",
    summary:
      "Functional bodyweight conditioning, flexibility development, core stability, and cardiovascular endurance inspired by circus training.",
    description:
      "Our fitness programs adapt professional circus conditioning into accessible, results-oriented training for community members and athletes. Emphasizing core control, joint mobility, and functional strength, sessions build enduring physical health.",
    details: [
      "Circus-inspired calisthenics and functional bodyweight workouts",
      "Deep flexibility, spinal mobility, and active joint stretching",
      "Core stability, posture correction, and balance development",
      "Injury prevention routines and safe conditioning progressions",
    ],
    suitableFormats: [
      "Group Conditioning Classes (45 to 60 minutes)",
      "Corporate Wellness & Movement Clinics",
      "Individual Physical Conditioning Consultation",
    ],
    relatedTroupeIds: ["yoga-brothers"],
    imageUrl: "/images/circus_facility_3.png",
    isPlaceholderImage: true,
    isPublished: true,
    orderIndex: 9,
  },
  {
    id: "costume-production",
    slug: "costume-production",
    title: "Costume Production",
    category: "Artistic Production & Tailoring",
    summary:
      "In-house design and fabrication of stage costumes combining traditional Ethiopian cotton textiles with high-stretch athletic performance wear.",
    description:
      "Every AMEPAC production features bespoke costumes handcrafted in our Arba Minch production studio. Our tailors combine locally woven Gamo handloom fabrics (Shemma) with reinforced stretch fabrics capable of enduring extreme acrobatics, contortion, and tosses.",
    details: [
      "Bespoke circus and theatrical costume design and fabrication",
      "Integration of authentic Gamo traditional handwoven textiles",
      "High-durability athletic wear engineered for extreme acrobatic stress",
      "Wardrobe consultation and custom costume tailoring for external arts troupes",
    ],
    suitableFormats: [
      "Custom Troupe Wardrobe Commissioning",
      "Stage Costume Rental & Fitting Support",
      "Cultural Textile Design Consultations",
    ],
    relatedTroupeIds: ["troupe-black-lioness", "troupe-african-pride"],
    imageUrl: "/images/circus_performance_2.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 10,
  },
  {
    id: "prop-workshop",
    slug: "prop-workshop",
    aliases: ["prop-production-workshop"],
    title: "Prop Workshop",
    category: "Engineering & Fabrication",
    summary:
      "Fabrication and maintenance of circus equipment including juggling clubs, rola bola cylinders, free-standing ladders, and balance apparatus.",
    description:
      "Born from resourcefulness and technical skill, our prop workshop engineers safe, durable performance apparatus using locally available and repurposed materials. We build, test, and maintain equipment to rigorous safety standards.",
    details: [
      "Handcrafted circus apparatus: rola bola, free ladders, juggling props, and aerial frames",
      "Upcycling of regional materials (reclaimed timber, industrial steel, woven cords)",
      "Apparatus load testing, weld checks, and routine safety inspections",
      "Custom prop engineering for specific theatrical themes and client productions",
    ],
    suitableFormats: [
      "Custom Circus Equipment Fabrication",
      "Rigging & Apparatus Safety Consultations",
      "Prop Maintenance and Repair Services",
    ],
    relatedTroupeIds: ["troupe-gamo-bayira", "troupe-african-pride"],
    imageUrl: "/images/circus_facility_3.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 11,
  },
  {
    id: "music-video-studio",
    slug: "music-video-studio",
    title: "Music and Video Studio",
    category: "Media & Documentation",
    summary:
      "Audio recording, multi-camera video production, and portfolio documentation capturing performing artists, auditions, and community stories.",
    description:
      "Our studio records sound, music compositions, and high-definition video archives. The facility produces professional audition reels that have enabled our senior youth to secure international performance contracts in Turkey, India, and Algeria.",
    details: [
      "Professional artist audition reel production and digital portfolio recording",
      "Multi-camera documentation of live stage productions and cultural festivals",
      "Sound recording, audio mastering, and voiceover production for stage tracks",
      "Community documentary archiving highlighting social development and youth progress",
    ],
    suitableFormats: [
      "Audition Reel & Video Portfolio Sessions",
      "On-Location Live Event Video Production",
      "Studio Voice & Musical Track Recording",
    ],
    relatedTroupeIds: ["troupe-african-pride", "kefeni-queen-of-gamo"],
    imageUrl: "/images/circus_performance_1.png",
    isPlaceholderImage: false,
    isPublished: true,
    orderIndex: 12,
  },
  {
    id: "makeup",
    slug: "makeup",
    aliases: ["stage-makeup"],
    title: "Makeup",
    category: "Artistic Aesthetics",
    summary:
      "Specialized theatrical makeup, character face painting, and festival cosmetic styling for stage performers, parades, and community events.",
    description:
      "Our makeup artists design evocative stage looks that highlight facial expressions under performance lighting. Using skin-safe cosmetic materials, they provide artistic character styling for circus shows, street parades, and children's festival events.",
    details: [
      "Theatrical stage makeup tailored for distance visibility and stage lighting",
      "Creative character face painting for children during festivals and carnivals",
      "Cultural face adornment incorporating traditional Ethiopian patterns",
      "Rapid backstage hair and cosmetic preparation for large ensemble casts",
    ],
    suitableFormats: [
      "Backstage Production Styling (Full Troupe Support)",
      "Festival Children's Face Painting Activation Booths",
      "Creative Thematic Styling for Commercial & Photographic Shoots",
    ],
    relatedTroupeIds: ["troupe-black-lioness", "troupe-gamo-bayira"],
    imageUrl: "/images/circus_performance_2.png",
    isPlaceholderImage: true,
    isPublished: true,
    orderIndex: 13,
  },
];
