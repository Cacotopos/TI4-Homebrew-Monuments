const { world, refPackageId } = require("@tabletop-playground/api");

const localeStrings = {
  "faction.abbr.blex": "Blex",
  "faction.full.blex": "Blex Pestilence",
  "planet.avicenna": "Avicenna",
  "technology.name.biotic_weapons": "Biotic Weapons",
  "unit.flagship.auriga": "Auriga",
  "unit.fighter.vector": "Vector",
  "unit.fighter.vector_2": "Vector 2",
  "unit.mech.pustule": "Pustule",
  "unit_modifier.name.blight": "Blight",
  "unit_modifier.desc.blight": "NOT YET APPLIED!!! -1 to the results of other players' combat rolls during the first round of combat in systems that contain Blight tokens" ,
};


const factions = [{
  faction: "blex",
  abilities: [
    "contagion",
    "blight",
    "shared_misery",
  ],
  commodities: 2,
  home: 3231,
  leaders: {
    agents: ["tox"],
    commanders: ["silas_deriga"],
    heroes: ["speygh"],
  },
  promissoryNotes: ["shared_misery"],
  icon: "discordant-stars/faction-icons/blex.png",
  source: "homebrew.discordant_stars",
  startingTech: ["dacxive_animators", "biostims"],
  startingUnits: {
    carrier: 1,
    dreadnought: 1,
    destroyer: 1,
    infantry: 3,
    space_dock: 1,
  },
  techs: ["biotic_weapons"],
  units: ["auriga", "vector", "vector_2", "pustule"],
  packageId: refPackageId,
  unpackExtra: [{
    tokenNsid: "token.system:homebrew.discordant_stars.blight/blex",
    tokenCount: 4,
  }]

}];

 const nsidToTemplateId = {
    "sheet.faction:homebrew.discordant_stars/blex":
      "87BBEE704B999E945F806DB0A881ED50",
    "tile.system:homebrew.discordant_stars/3231":
      "D979798344A89C664EC1E1B464534D21",
    "token.command:homebrew.discordant_stars/blex":
      "E1D61045492625569AB4BA82E05F4C9D",
    "token.control:homebrew.discordant_stars/blex":
      "F78A93DE437BF9F76AA260A0F0D8E7F6",
    "token.system:homebrew.discordant_stars.blight/blex":
      "F8A85C7B4CE5FD661DC7DA905C80E3DF",
};

const technologies = [{
    localeName: "technology.name.biotic_weapons",
    cardNsid:
      "card.technology.green.blex:homebrew.discordant_stars/biotic_weapons",
    type: "Green",
    requirements: { Green: 2 },
    source: "homebrew.discordant_stars",
    faction: "blex",
  }, {
    localeName: "unit.fighter.vector_2",
    cardNsid: "card.technology.unit_upgrade.blex:homebrew.discordant_stars/vector_2",
    type: "unitUpgrade",
    requirements: { Green: 1, Blue: 1 },
    abbrev: " VE II",
    source: "homebrew.discordant_stars",
    faction: "blex",
    unitPosition: 9,
  },
];

const systems = [
  {
    tile: 3231,
    source: "homebrew.discordant_stars",
    home: true,
    packageId: refPackageId,
    img: "discordant-stars/tiles/homeworld/tile_3231.jpg",
    planets: [
        { localeName: "planet.avicenna", resources: 4, influence: 0 },
    ],
  },
];

const unitAttrs = [
  {
    unit: "flagship",
    upgradeLevel: 1,
    localeName: "unit.flagship.auriga",
    triggerNsid:
      "card.technology.unit_upgrade.blex:franken.discordant_stars/auriga",
    spaceCombat: { dice: 2, hit: 7 },
    capacity: 6,
  },
  {
    unit: "fighter",
    upgradeLevel: 1,
    localeName: "unit.fighter.vector",
    triggerNsid: "card.technology.unit_upgrade.blex:franken.discordant_stars/vector",
    move: 2,
  },
  {
    unit: "fighter",
    upgradeLevel: 2,
    localeName: "unit.fighter.vector_2",
    triggerNsid: "card.technology.unit_upgrade.blex:homebrew.discordant_stars/vector_2",
    spaceCombat: { hit: 8 },
    move: 3,
  },
  {
    unit: "mech",
    upgradeLevel: 1,
    localeName: "unit.mech.pustule",
    triggerNsid: "card.leader.mech.blex:homebrew.discordant_stars/pustule",
  },
];

function containsBlightToken() {
    // check for blight token   
    const system = auxData.self.activeSystem;
    if (!system) {
      return;
    }
    const blightHexes = world.getAllObjects().filter(obj => {
      const nsid = ObjectNamespace.getNsid(obj);
      if (nsid !== "token.system:homebrew.discordant_stars.blight/blex") {
        return false; // no blight token
      }
      if (false /* TODO obj.isMech() && obj.getPlayerOwner() === blexPlayer */) {
        return false; // no pustule mech
      }
    }).map(gameObject => {
      return 0; /* TODO Hex.fromPosition(gameObject.getPosition()); */
    });
    return blightHexes.contains(system);
}

const unitModifiers = [{
  // "-1 on other players combat rolls in the first round of combat in systems with a blight token",  
  isCombat: true,
  localeName: "unit_modifier.name.blight",
  localeDescription: "unit_modifier.desc.blight",
  owner: "any",
  priority: "adjust",
  triggerFactionAbility: "blight", // ??? remove to not trigger only for the owner?
  filter: (auxData) => {
    return auxData.rollType === "spaceCombat";
  },
  applyEach: (unitAttrs, auxData) => {
    if (auxData.self.faction === "blex") {
      return; // does not affects blex
    }

    
    if (false) {
      return; // check if the active system contains a mech (can be a "netral" party if the mech is on a planet!)
    }
    
    if (false /* only in the first round */ && unitAttrs.raw.spaceCombat) {
      unitAttrs.raw.spaceCombat.hit += 1;
    }
  },
},
// TODO: (RM) "biotic weapons": +1 dice for one unit with the token 
// TODO: (RM) "promissory: shared misery": -1 for opponent on a ground combat
];

console.log("DISCORDANT STARS ADDING BLEX");
world.TI4.homebrew.inject({
  localeStrings,
  factions,
  nsidToTemplateId,
  systems,
  technologies,
  unitAttrs,
  unitModifiers,
});
