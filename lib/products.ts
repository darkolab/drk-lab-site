// lib/products.ts

export type ProductTechnicalSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  category: string;
  categoryKey?: string;
  status: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  image?: string;
  notes?: string;
  technicalSpecs?: ProductTechnicalSpec[];
  availability?: "in-stock" | "made-to-order" | "prototype";
  price?: number;
  currency?: string;
  leadTimeWeeks?: number;
  tags?: string[];
};

export const products: Product[] = [
  {
    slug: "drk-cap-led",
    code: "DRK-CAP LED",
    name: "Tapes Bowens per a caps LED",
    shortName: "Tapes Bowens",
    category: "Llum",
    status: "En producció sota comanda",
    shortDescription:
      "Tapes de protecció per a caps LED Bowens (Aputure, Forza, SmallRig...). Protegeixen el COB durant transport i magatzem.",
    longDescription:
      "Tapes de protecció dissenyades específicament per a caps LED amb muntura Bowens. Ajust precís, interior suau i opció de personalització amb logo del rental o productora. Pensades per aguantar el ritme de maletes, furgonetes i rodatges intensius.",
    image: "/hero/drk-bowens-led.jpg",
    features: [
      "Compatible amb muntura Bowens estàndard",
      "Opció de logo personalitzat",
      "Disseny pensat per a rental i transport intensiu",
      "Material resistent a cops i ratllades",
    ],
    notes: "Sèries inicials ja en ús en rentals.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Caps LED Bowens estàndard" },
      {
        label: "Models provats",
        value: "Aputure 300d II/600d, Nanlite Forza 300B II, SmallRig RC 220",
      },
      { label: "Material", value: "Nylon tècnic reforçat (PA12)" },
      { label: "Color", value: "Negre mat (personalitzable)" },
      { label: "Pes aproximat", value: "120 g" },
      { label: "Diàmetre interior útil", value: "95 mm" },
      { label: "Gruix de paret", value: "3.5 mm de mitjana" },
      { label: "Rang de temperatura recomanat", value: "-10 ºC a 80 ºC" },
    ],
    availability: "made-to-order",
    leadTimeWeeks: 2,
  },
  {
    slug: "drk-case-media",
    code: "DRK-CASE Media",
    name: "Càixes per a targetes SD / CFexpress / CFast",
    shortName: "Càixes targetes",
    category: "Media / emmagatzematge",
    status: "Nova sèrie prevista gener 2026",
    shortDescription:
      "Càixes compactes i robustes per a targetes SD, CFexpress i CFast, amb interiors configurables.",
    longDescription:
      "Sistema de caixes modular per organitzar i protegir targetes SD, CFexpress tipus B i CFast. Cada caixa pot configurar-se per capacitat i tipus de targeta, amb opcions de codi de color i identificació ràpida per a equip o producció.",
    image: "/hero/drk-sd-cases.jpg",
    features: [
      "Interiors configurables segons tipus de targeta",
      "Format compacte pensat per flightcases",
      "Opció de codi de color per producció o càmeres",
      "Tancament ferm i fàcil d’obrir amb guants",
    ],
    technicalSpecs: [
      { label: "Compatible amb", value: "Targetes SD, CFexpress B i CFast" },
      { label: "Models provats", value: "Sony Tough CFexpress B, Angelbird, ProGrade SD" },
      { label: "Material", value: "Polímer tècnic resistent a cops" },
      { label: "Color", value: "Negre carbó amb opcions de color interior" },
      { label: "Pes aproximat", value: "85 g per caixa" },
      { label: "Diàmetre interior útil", value: "Layout adaptable segons combinació" },
      { label: "Gruix de paret", value: "2.8 mm" },
      { label: "Rang de temperatura recomanat", value: "-10 ºC a 70 ºC" },
    ],
    availability: "prototype",
  },
  {
    slug: "drk-hood-sh7",
    code: "DRK-HOOD SH7",
    name: "Parasol per a Atomos Shinobi 7\"",
    shortName: "Parasol Shinobi 7\"",
    category: "Monitors",
    status: "Producció sota comanda",
    shortDescription:
      "Parasol a mida per al monitor Atomos Shinobi 7\", amb encaix precís sense adhesius.",
    longDescription:
      "Parasol dissenyat específicament per al monitor Atomos Shinobi 7\". Millora la visibilitat en exteriors i aporta una capa extra de protecció contra cops i ratllades. El sistema d’encaix no requereix adhesius ni modificacions al monitor.",
    image: "/hero/drk-hood-sh7.jpg",
    features: [
      "Disseny específic per a Shinobi 7\"",
      "Encaix mecànic, sense adhesius",
      "Millora la lectura en exteriors",
      "Afegix protecció extra a la pantalla",
    ],
    notes: "Actualment en ús en entorn de rental.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Atomos Shinobi 7\"" },
      { label: "Models provats", value: "Atomos Shinobi 7\" en rigs FX3/FX30" },
      { label: "Material", value: "TPU + PA12 per zones estructurals" },
      { label: "Color", value: "Negre mat" },
      { label: "Pes aproximat", value: "95 g" },
      { label: "Diàmetre interior útil", value: "Finestra adaptada al marc Shinobi" },
      { label: "Gruix de paret", value: "2.5 mm amb reforços" },
      { label: "Rang de temperatura recomanat", value: "-5 ºC a 60 ºC" },
    ],
    availability: "made-to-order",
    leadTimeWeeks: 3,
  },
  {
    slug: "drk-honeycomb-v1s",
    code: "DRK-HONEY V1S",
    name: "Honeycomb per a Godox V1s",
    shortName: "Honeycomb V1s",
    category: "Llum",
    status: "En producció sota comanda",
    shortDescription:
      "Niu d’abella per al flaix Godox V1s, amb sistema d’encaix per pressió, sense imants ni adhesius. Angle de llum 40°, disponible en altres angulacions.",
    longDescription:
      "Honeycomb dissenyat específicament per al capçal rodó del flaix Godox V1s. El sistema d’encaix per pressió evita l’ús d’imants o adhesius, garantint una subjecció segura fins i tot en sessions de treball ràpides. Redueix l’angle de llum a 40°, aportant més control, evitant spill i millorant la direccionalitat en retrat i fotografia de producte. Fabricat amb material resistent a altes temperatures i cops, pensat per a un ús intensiu en estudis i rodatges.",
    image: "/hero/drk-bowens-cap.jpg",
      features: [
      "Compatible amb Godox V1s",
      "Sistema d’encaix per pressió, sense imants ni adhesius",
      "Angle de llum 40° (altres angulacions sota comanda)",
      "Material lleuger i resistent a la calor",
      "Millora el control i direccionalitat de la llum",
      "Evita spill i reflexes no desitjats",
    ],
    notes:
      "Model provat i validat per ús en sessions de retrat i rodatges interiors.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Flaix Godox V1s (capçal rodó)" },
      { label: "Models provats", value: "Godox V1s i V1 per Sony" },
      { label: "Material", value: "PC-ABS resistent a temperatura" },
      { label: "Color", value: "Negre texturat" },
      { label: "Pes aproximat", value: "55 g" },
      { label: "Diàmetre interior útil", value: "76 mm" },
      { label: "Gruix de paret", value: "2.2 mm" },
      { label: "Rang de temperatura recomanat", value: "-5 ºC a 70 ºC" },
    ],
    availability: "made-to-order",
    leadTimeWeeks: 2,
  },
  {
    slug: "drk-case-media-system",
    code: "DRK-CASE MEDIA",
    name: "Sistema modular de caixes per targetes",
    shortName: "Case Media System",
    category: "Media / emmagatzematge",
    status: "En producció sota comanda",
    shortDescription:
      "Caixa modular per a targetes SD, CFexpress A, CFexpress B i CFast. Interiors completament configurables.",
    longDescription:
      "El DRK-CASE MEDIA és un sistema modular de caixes per organitzar i protegir targetes SD, CFexpress tipus A, CFexpress tipus B i CFast. El cos exterior és sempre el mateix: compacte, robust i pensat per cabre fàcilment en flightcases i bosses tècniques. L’interior és 100% configurable segons les necessitats de cada equip, rental o producció. Es pot fabricar amb qualsevol combinació de targetes, incloent-hi formats mixtes o layouts personalitzats per càmera.",
    features: [
      "Interiors configurables per SD, CFexpress A, CFexpress B i/o CFast",
      "Sistema modular per adaptar-se a qualsevol combinació",
      "Tancament segur, opcionalment magnètic",
      "Cos exterior compacte i resistent a cops",
      "Disseny pensat per flightcases i set",
      "Opció de codi de colors o gravat per producció",
      "Versió 'Custom' per targetes especials o quantitats no estàndard",
    ],
    notes:
      "Projectat com a sistema únic. Les variants d'interior poden crear-se sota demanda segons càmera.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Layouts mixtes per SD, CFexpress A/B i CFast" },
      { label: "Models provats", value: "Sony FX3/FX6 media kits, Blackmagic, Canon C70" },
      { label: "Material", value: "Cos en PA12; interiors segons configuració" },
      { label: "Color", value: "Cos negre; interiors personalitzables" },
      { label: "Pes aproximat", value: "110 g (configuració base)" },
      { label: "Diàmetre interior útil", value: "Cavitats segons targetes seleccionades" },
      { label: "Gruix de paret", value: "3 mm" },
      { label: "Rang de temperatura recomanat", value: "-10 ºC a 70 ºC" },
    ],
    availability: "made-to-order",
    leadTimeWeeks: 3,
  },
  {
    slug: "drk-merch-pro",
    code: "DRK-MERCH PRO",
    name: "Merch funcional i personalitzat per a rentals i productores",
    shortName: "Merch funcional",
    category: "Corporate / Merchandising",
    status: "Sota comanda",
    shortDescription:
      "Llavors, eines i accessoris personalitzats amb logo: merch útil pensat per a tècnics, no per oblidar en un calaix.",
    longDescription:
      "DRK MERCH PRO és una línia de merchandising funcional dissenyada per rentals, productores i escoles de cinema que volen regalar alguna cosa que realment serveixi. No és merch decoratiu: són peces útils, creades per tècnics i per al dia a dia en un set. Clauers-eina per cargols 1/4'', plaques d’identificació, suports personalitzats, eines ràpides o accessoris amb el logo del teu equip. Tot es fabrica sota comanda i pot adaptar-se a qualsevol workflow.",
    features: [
      "Llavors-eina 1/4'' i 3/8'' personalitzades amb logo",
      "Mini eines per càmera i accessoris",
      "Peces útils per a rental amb logotip gravat o integrat",
      "Disseny totalment personalitzat per equip, productora o escola",
      "Fabricació robusta amb materials tècnics",
      "Opció de codis de color per departament",
    ],
    notes:
      "Projecte obert: qualsevol peça petita es pot convertir en merch funcional amb el logo del client.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Personalització per a kits de càmera i rental" },
      { label: "Models provats", value: "FX3/FX6, kits de so ENG, flightcases de rental" },
      { label: "Material", value: "Depèn de la peça: TPU, PA12, alumini lleuger" },
      { label: "Color", value: "Negre base amb opcions de color corporatiu" },
      { label: "Pes aproximat", value: "10 g – 150 g segons peça" },
      { label: "Diàmetre interior útil", value: "Variable segons disseny" },
      { label: "Gruix de paret", value: "Adaptat a cada peça (mínim 2 mm)" },
      { label: "Rang de temperatura recomanat", value: "-10 ºC a 70 ºC" },
    ],
    availability: "made-to-order",
  },
  {
    slug: "drk-nato-150",
    code: "DRK-NATO 150",
    name: "Rail NATO 150mm per a càmeres i accessoris",
    shortName: "NATO 150mm",
    category: "Càmera / Accessoris",
    status: "Prototip validat · Producció sota comanda",
    shortDescription:
      "Rail NATO de 150mm pensat per a Sony FX3/FX30, lleuger, rígid i imprimt en PAHT-CF per suportar accessoris professionals.",
    longDescription:
      "Rail NATO de 150mm dissenyat inicialment per a Sony FX3/FX30, però adaptable a qualsevol càmera o configuració. Fabricat en PAHT-CF per oferir rigidesa, estabilitat i una tolerància d’encaix precisa amb clamps NATO estàndard. Ideal per muntar handles, braç articulat, monitors, receptors de so o qualsevol accessori de rodatge. Format lleuger, sense ressonàncies i preparat per patir en entorns de set, gimbals i càmeres de mà.",
    features: [
      "Longitud de 150mm compatible amb rigs compactes",
      "Material tècnic PAHT-CF: resistent, rígid i estable a temperatura",
      "Toleràncies ajustades per a clamps NATO estàndard",
      "Compatible amb FX3/FX30 i adaptable a qualsevol càmera",
      "Pes reduït sense comprometre la rigidesa",
      "Perfecte per handles, monitors i accessoris de so",
    ],
    notes:
      "Disponible també en longituds personalitzades sota comanda. Compatibilitat futura amb cheese plates universals, sistemes ARRI i muntatges híbrids — en desenvolupament.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Clamps NATO estàndard i rigs FX3/FX30" },
      { label: "Models provats", value: "Sony FX3/FX30 amb SmallRig i Tilta" },
      { label: "Material", value: "PAHT-CF (nylon amb fibra de carboni)" },
      { label: "Color", value: "Negre amb textura tècnica" },
      { label: "Pes aproximat", value: "60 g" },
      { label: "Diàmetre interior útil", value: "Canal NATO de 20 mm" },
      { label: "Gruix de paret", value: "Variable, reforç principal 3 mm" },
      { label: "Rang de temperatura recomanat", value: "-10 ºC a 90 ºC" },
    ],
    availability: "prototype",
  },
  {
    slug: "drk-hinge-ls",
    code: "DRK-HINGE LS",
    name: "Bisagra de recanvi per a marcs Lastolite",
    shortName: "Bisagra Lastolite",
    category: "Recanvis / Grip",
    status: "En producció sota comanda",
    shortDescription:
      "Bisagra de recanvi per als panells plegables Lastolite, amb rosca reforçada i encaix compatible amb els marcs originals.",
    longDescription:
      "Peça de recanvi dissenyada per substituir la bisagra original dels kits Lastolite (reflectors, panells panoràmics i fons plegables). Fabricada en material resistent i amb rosca robusta, garanteix una connexió ferma i duradora entre els segments del marc. Perfecte per a rentals o equips que utilitzen sovint panells Lastolite i necessiten mantenir-los en perfecte estat sense comprar marcs sencers.",
    features: [
      "Compatibilitat total amb marcs Lastolite (bisagra esquerra/dreta)",
      "Rosca reforçada i més duradora que l’original",
      "Encaix ajustat, toleràncies testades en entorn de rental",
      "Material resistent a cops i torsió",
      "Ideal com a recanvi ràpid per a kits malmesos",
    ],
    notes: "Disponible també en packs de 2, 4 o 8 unitats per manteniment de rental.",
    technicalSpecs: [
      { label: "Compatible amb", value: "Marcs plegables Lastolite" },
      { label: "Models provats", value: "Lastolite Skylite Rapid i Panoramic" },
      { label: "Material", value: "Polímer reforçat amb fibra" },
      { label: "Color", value: "Negre grafit" },
      { label: "Pes aproximat", value: "35 g per bisagra" },
      { label: "Diàmetre interior útil", value: "Tija central 8 mm" },
      { label: "Gruix de paret", value: "3 mm amb reforç a la rosca" },
      { label: "Rang de temperatura recomanat", value: "-10 ºC a 70 ºC" },
    ],
    availability: "made-to-order",
    leadTimeWeeks: 1,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
