const { world } = require("@tabletop-playground/api");
require("./right-click-intrigue");
const UNIT_MODIFIERS = require("./unit-modifiers.data");
const LOCALE_STRINGS = require("./locale-strings.data");

const REPLACE = {
    "card.action:base/ancient_burial_sites": "card.action:homebrew.action_deck_2/adrenaline_shots",
    "card.action:base/assassinate_representative": "card.action:homebrew.action_deck_2/ancient_data_archive",
    "card.action:base/bribery": "card.action:homebrew.action_deck_2/ancient_trade_routes",
    "card.action:base/bunker": "card.action:homebrew.action_deck_2/annexation",
    "card.action:base/confusing_legal_text": "card.action:homebrew.action_deck_2/antigravity_drive",
    "card.action:base/construction_rider": "card.action:homebrew.action_deck_2/arms_deal",
    "card.action:base/courageous_to_the_end": "card.action:homebrew.action_deck_2/artifact_hunters",
    "card.action:base/cripple_defenses": "card.action:homebrew.action_deck_2/artifact_research",
    "card.action:base/diplomacy_rider": "card.action:homebrew.action_deck_2/assassination_attempt",
    "card.action:base/disable": "card.action:homebrew.action_deck_2/black_market_raid",
    "card.action:base/distinguished_councilor": "card.action:homebrew.action_deck_2/brilliant_tactician",
    "card.action:base/economic_initiative": "card.action:homebrew.action_deck_2/brutal_occupation",
    "card.action:base/emergency_repairs": "card.action:homebrew.action_deck_2/bureaucracy_rider",
    "card.action:base/experimental_battlestation": "card.action:homebrew.action_deck_2/call_for_a_crusade",
    "card.action:base/fighter_prototype": "card.action:homebrew.action_deck_2/chain_reaction",
    "card.action:base/fire_team": "card.action:homebrew.action_deck_2/close_quarters",
    "card.action:base/focused_research": "card.action:homebrew.action_deck_2/collaborative_planning",
    "card.action:base/frontline_deployment": "card.action:homebrew.action_deck_2/concise_legal_text",
    "card.action:base/ghost_ship": "card.action:homebrew.action_deck_2/contradictory_legal_text",
    "card.action:base/imperial_rider": "card.action:homebrew.action_deck_2/counterintelligence",
    "card.action:base/in_the_silence_of_space": "card.action:homebrew.action_deck_2/custodian_support",
    "card.action:base/industrial_initiative": "card.action:homebrew.action_deck_2/cyberwarfare",
    "card.action:base/infiltrate": "card.action:homebrew.action_deck_2/deep_cover_operatives",
    "card.action:base/insubordination": "card.action:homebrew.action_deck_2/deep_space_station",
    "card.action:base/intercept": "card.action:homebrew.action_deck_2/defectors",
    "card.action:base/leadership_rider": "card.action:homebrew.action_deck_2/defense_installation",
    "card.action:base/lost_star_chart": "card.action:homebrew.action_deck_2/defense_rider",
    "card.action:base/lucky_shot": "card.action:homebrew.action_deck_2/deflection_tactics",
    "card.action:base/mining_initiative": "card.action:homebrew.action_deck_2/disrupt_logistics",
    "card.action:base/parley": "card.action:homebrew.action_deck_2/emergency_conscription",
    "card.action:base/plague": "card.action:homebrew.action_deck_2/exploration_rider",
    "card.action:base/political_stability": "card.action:homebrew.action_deck_2/fire_for_effect",
    "card.action:base/politics_rider": "card.action:homebrew.action_deck_2/firing_solution_",
    "card.action:base/public_disgrace": "card.action:homebrew.action_deck_2/flawless_strategy",
    "card.action:base/reactor_meltdown": "card.action:homebrew.action_deck_2/freedom_fighters",
    "card.action:base/reparations": "card.action:homebrew.action_deck_2/frontier_rider",
    "card.action:base/repeal_law": "card.action:homebrew.action_deck_2/fulfillment_protocols",
    "card.action:base/rise_of_a_messiah": "card.action:homebrew.action_deck_2/garner_tribute",
    "card.action:base/salvage": "card.action:homebrew.action_deck_2/grand_heist",
    "card.action:base/signal_jamming": "card.action:homebrew.action_deck_2/graviton_negator",
    "card.action:base/spy": "card.action:homebrew.action_deck_2/graviton_shielding",
    "card.action:base/summit": "card.action:homebrew.action_deck_2/hostile_world",
    "card.action:base/tactical_bombardment": "card.action:homebrew.action_deck_2/illusory_duplication",
    "card.action:base/technology_rider": "card.action:homebrew.action_deck_2/impeachment",
    "card.action:base/trade_rider": "card.action:homebrew.action_deck_2/intrigue",
    "card.action:base/unexpected_action": "card.action:homebrew.action_deck_2/ixthian_gift",
    "card.action:base/unstable_planet": "card.action:homebrew.action_deck_2/kickbacks",
    "card.action:base/upgrade": "card.action:homebrew.action_deck_2/last_minute_deliberation",
    "card.action:base/uprising": "card.action:homebrew.action_deck_2/magen_engineers",
    "card.action:base/veto": "card.action:homebrew.action_deck_2/micrometeoroid_storm",
    "card.action:base/war_effort": "card.action:homebrew.action_deck_2/overtime",
    "card.action:base/warfare_rider": "card.action:homebrew.action_deck_2/political_upheaval",
    "card.action:codex.ordinian/blitz": "card.action:homebrew.action_deck_2/production_rider",
    "card.action:codex.ordinian/counterstroke": "card.action:homebrew.action_deck_2/propaganda",
    "card.action:codex.ordinian/fighter_conscription": "card.action:homebrew.action_deck_2/prophecy",
    "card.action:codex.ordinian/forward_supply_base": "card.action:homebrew.action_deck_2/proxy_war",
    "card.action:codex.ordinian/ghost_squad": "card.action:homebrew.action_deck_2/psychological_operations",
    "card.action:codex.ordinian/hack_election": "card.action:homebrew.action_deck_2/public_outcry",
    "card.action:codex.ordinian/harness_energy": "card.action:homebrew.action_deck_2/rapid_mobilization",
    "card.action:codex.ordinian/impersonation": "card.action:homebrew.action_deck_2/reconstruction",
    "card.action:codex.ordinian/insider_information": "card.action:homebrew.action_deck_2/recurrence_protocols",
    "card.action:codex.ordinian/master_plan": "card.action:homebrew.action_deck_2/rehash_debates",
    "card.action:codex.ordinian/plagiarize": "card.action:homebrew.action_deck_2/relay_connection",
    "card.action:codex.ordinian/rally": "card.action:homebrew.action_deck_2/relic_rider",
    "card.action:codex.ordinian/reflective_shielding": "card.action:homebrew.action_deck_2/rigged_explosives",
    "card.action:codex.ordinian/sanction": "card.action:homebrew.action_deck_2/risky_jump_piloting",
    "card.action:codex.ordinian/scramble_frequency": "card.action:homebrew.action_deck_2/safety_overrides",
    "card.action:codex.ordinian/solar_flare": "card.action:homebrew.action_deck_2/shock_and_awe",
    "card.action:pok/archaeological_expedition": "card.action:homebrew.action_deck_2/shock_troops",
    "card.action:pok/confounding_legal_text": "card.action:homebrew.action_deck_2/shortlived_clone",
    "card.action:pok/coup_detat": "card.action:homebrew.action_deck_2/shrapnel_turrets",
    "card.action:pok/deadly_plot": "card.action:homebrew.action_deck_2/side_project",
    "card.action:pok/decoy_operation": "card.action:homebrew.action_deck_2/singularity_charge",
    "card.action:pok/divert_funding": "card.action:homebrew.action_deck_2/smuggler_routes",
    "card.action:pok/exploration_probe": "card.action:homebrew.action_deck_2/space_mines",
    "card.action:pok/manipulate_investments": "card.action:homebrew.action_deck_2/special_considerations",
    "card.action:pok/nav_suite": "card.action:homebrew.action_deck_2/stasis_haul",
    "card.action:pok/refit_troops": "card.action:homebrew.action_deck_2/steal_prototype",
    "card.action:pok/reveal_prototype": "card.action:homebrew.action_deck_2/stranded_ship",
    "card.action:pok/reverse_engineer": "card.action:homebrew.action_deck_2/technological_breakthrough",
    "card.action:pok/rout": "card.action:homebrew.action_deck_2/terraforming_initiative",
    "card.action:pok/scuttle": "card.action:homebrew.action_deck_2/timely_reinforcements",
    "card.action:pok/seize_artifact": "card.action:homebrew.action_deck_2/transference_protocol",
    "card.action:pok/waylay": "card.action:homebrew.action_deck_2/virulent_gas_canisters"
}

var remove = [];
var randomNumberOfCards = Math.floor(Math.random() * Object.keys(REPLACE).length + 1);
for (let i = 0; i < randomNumberOfCards; i++) {
    let originalActionCards = Object.keys(REPLACE);
    let randomOriginalActionCard = originalActionCards[Math.random() * originalActionCards.length << 0];
    let homebrewToRemove = REPLACE[randomOriginalActionCard];
    remove.push(homebrewToRemove);
    delete REPLACE[randomOriginalActionCard];
}

world.TI4.homebrew.inject({
    nsidToTemplateId:
    {
        "card.action:homebrew.action_deck_2/0": "934D6DF9DCB340AD826E2416C7C78580"
    },
    remove,
    replace: REPLACE,
    unitModifiers: UNIT_MODIFIERS,
    localeStrings: LOCALE_STRINGS
  });

world.TI4.homebrew.resetOnTableDecks()