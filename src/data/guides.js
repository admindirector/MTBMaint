export const maintenanceGuides = [
  // DRIVETRAIN
  {
    id: 'chain-lube',
    title: 'Clean and Lube Chain',
    category: 'drivetrain',
    difficulty: 'beginner',
    intervalMiles: 50,
    tools: ['Chain lube', 'Degreaser', 'Brush', 'Rag'],
    videoUrl: 'https://www.youtube.com/watch?v=5dMh_z5VPVY',
    steps: [
      {
        title: 'Prepare your workspace',
        description: 'Put your bike on a stand or flip it upside down. Lay down some cardboard or rags to catch drips.'
      },
      {
        title: 'Apply degreaser',
        description: 'Spray degreaser onto the chain while slowly spinning the pedals backward. Let it soak for 2-3 minutes.'
      },
      {
        title: 'Scrub the chain',
        description: 'Use a stiff brush to scrub the chain, getting between the links. Continue spinning the pedals.'
      },
      {
        title: 'Wipe clean',
        description: 'Use a clean rag to wipe off the degreaser and grime. The chain should look clean and shiny.'
      },
      {
        title: 'Dry completely',
        description: 'Let the chain dry for 5-10 minutes or wipe thoroughly. Lube won\'t stick to a wet chain.'
      },
      {
        title: 'Apply lube',
        description: 'Apply one drop of lube to each chain link while slowly spinning the pedals backward.'
      },
      {
        title: 'Wipe excess',
        description: 'Wait 2 minutes, then wipe off excess lube with a clean rag. Too much lube attracts dirt!'
      }
    ]
  },
  {
    id: 'chain-wear-check',
    title: 'Check Chain Wear',
    category: 'drivetrain',
    difficulty: 'beginner',
    intervalMiles: 200,
    tools: ['Chain wear indicator tool'],
    steps: [
      {
        title: 'Get a chain checker',
        description: 'A chain wear indicator tool is cheap and essential. It measures how much your chain has stretched.'
      },
      {
        title: 'Insert the tool',
        description: 'Hook one end into a chain link, then try to drop the other end into a link 12 inches away.'
      },
      {
        title: 'Read the result',
        description: 'If the 0.5 side drops in: Chain is worn, replace soon. If the 0.75 side drops in: Replace immediately, may need new cassette too.'
      }
    ]
  },
  {
    id: 'chain-replace',
    title: 'Replace Chain',
    category: 'drivetrain',
    difficulty: 'intermediate',
    intervalMiles: 500,
    tools: ['New chain', 'Chain breaker tool', 'Quick link pliers', 'Chain wear indicator'],
    videoUrl: 'https://www.youtube.com/watch?v=O0YibMDWBAw',
    steps: [
      {
        title: 'Get the right chain',
        description: 'Count the gears on your rear cassette (8, 9, 10, 11, or 12 speed) and buy a matching chain.'
      },
      {
        title: 'Remove old chain',
        description: 'Find the quick link (master link) and use quick link pliers to remove it. If no quick link, use the chain breaker.'
      },
      {
        title: 'Size the new chain',
        description: 'Lay the new chain next to the old one. They should be the same length. Or route through big/big gears and add 2 links.'
      },
      {
        title: 'Thread the new chain',
        description: 'Route the chain through the rear derailleur (follow the same path as the old one), then around the cassette and chainring.'
      },
      {
        title: 'Connect with quick link',
        description: 'Insert the quick link through both chain ends, then pull the pedals hard to snap it into place.'
      },
      {
        title: 'Test all gears',
        description: 'Shift through all gears to make sure the chain runs smoothly. Listen for any clicking or skipping.'
      }
    ]
  },
  {
    id: 'derailleur-adjust',
    title: 'Adjust Rear Derailleur',
    category: 'drivetrain',
    difficulty: 'intermediate',
    tools: ['Phillips screwdriver', 'Allen keys'],
    videoUrl: 'https://www.youtube.com/watch?v=UkZxPIZ1ngY',
    steps: [
      {
        title: 'Understand the limit screws',
        description: 'H (High) limits outward movement (small cog). L (Low) limits inward movement (big cog). B adjusts body angle.'
      },
      {
        title: 'Set the H limit',
        description: 'Shift to the smallest cog. Turn H screw so the upper pulley aligns directly under the smallest cog.'
      },
      {
        title: 'Set the L limit',
        description: 'Shift to the largest cog. Turn L screw so the upper pulley aligns directly under the largest cog.'
      },
      {
        title: 'Adjust cable tension',
        description: 'If gears skip or won\'t shift up: turn barrel adjuster counter-clockwise. If they won\'t shift down: turn clockwise.'
      },
      {
        title: 'Fine tune',
        description: 'Shift through all gears while pedaling. Each shift should be crisp with no hesitation or noise.'
      }
    ]
  },
  {
    id: 'cassette-clean',
    title: 'Clean Cassette',
    category: 'drivetrain',
    difficulty: 'beginner',
    intervalMiles: 100,
    tools: ['Degreaser', 'Stiff brush', 'Floss or gear floss', 'Rags'],
    steps: [
      {
        title: 'Remove the rear wheel',
        description: 'Open the quick release or thru-axle and remove the rear wheel from the bike.'
      },
      {
        title: 'Spray degreaser',
        description: 'Spray degreaser onto the cassette cogs. Let it soak for a few minutes.'
      },
      {
        title: 'Scrub the cogs',
        description: 'Use a stiff brush to scrub each cog. Get the teeth and the spaces between cogs.'
      },
      {
        title: 'Floss between cogs',
        description: 'Use gear floss or a rag to get in between each cog, removing built-up grime.'
      },
      {
        title: 'Rinse and dry',
        description: 'Wipe clean with a rag. Reinstall the wheel and lube the chain.'
      }
    ]
  },

  // BRAKES
  {
    id: 'brake-pad-check',
    title: 'Check Brake Pads',
    category: 'brakes',
    difficulty: 'beginner',
    intervalMiles: 100,
    tools: ['Flashlight'],
    steps: [
      {
        title: 'Look at the pads',
        description: 'Peer into the caliper from above or remove the wheel for a better view. You\'ll see two pads on either side of the rotor.'
      },
      {
        title: 'Check pad thickness',
        description: 'Brake pads should have at least 1-2mm of material. If you can see the metal backing plate, replace immediately.'
      },
      {
        title: 'Look for glazing',
        description: 'Shiny, glazed pads don\'t grip well. They may need to be sanded or replaced.'
      },
      {
        title: 'Check for contamination',
        description: 'Oil-contaminated pads look wet or discolored and squeal loudly. These must be replaced.'
      }
    ]
  },
  {
    id: 'brake-pad-replace',
    title: 'Replace Brake Pads',
    category: 'brakes',
    difficulty: 'beginner',
    tools: ['New brake pads', 'Allen keys', 'Needle-nose pliers', 'Isopropyl alcohol'],
    videoUrl: 'https://www.youtube.com/watch?v=NmqGeLNcVIg',
    steps: [
      {
        title: 'Remove the wheel',
        description: 'Remove the wheel from the bike to access the brake caliper.'
      },
      {
        title: 'Remove the old pads',
        description: 'Look for a cotter pin or bolt holding the pads. Remove it, then slide the old pads out.'
      },
      {
        title: 'Push pistons back',
        description: 'Use a plastic tire lever to gently push the pistons back into the caliper, making room for new pads.'
      },
      {
        title: 'Clean the caliper',
        description: 'Spray isopropyl alcohol inside the caliper to remove any contamination. Don\'t touch the pad surface!'
      },
      {
        title: 'Insert new pads',
        description: 'Slide the new pads in with the spring clip between them. Make sure they\'re seated properly.'
      },
      {
        title: 'Secure the pads',
        description: 'Reinstall the cotter pin or bolt. Give it a firm tug to make sure it\'s secure.'
      },
      {
        title: 'Bed in the pads',
        description: 'Reinstall wheel. Do 10 stops from moderate speed to bed in the pads. They\'ll get stronger after a few rides.'
      }
    ]
  },
  {
    id: 'brake-bleed-shimano',
    title: 'Bleed Brakes (Shimano)',
    category: 'brakes',
    difficulty: 'advanced',
    tools: ['Shimano bleed kit', 'Mineral oil', '7mm wrench', 'Bleed block', 'Isopropyl alcohol', 'Rags'],
    videoUrl: 'https://www.youtube.com/watch?v=sLHPqFDj6mk',
    steps: [
      {
        title: 'Remove the wheel and pads',
        description: 'Take off the wheel and remove brake pads. Insert bleed block between pistons.'
      },
      {
        title: 'Level the brake lever',
        description: 'Position the lever so the bleed port is at the highest point. Remove the bleed port screw.'
      },
      {
        title: 'Attach lever funnel',
        description: 'Screw the bleed funnel into the lever. Fill halfway with mineral oil.'
      },
      {
        title: 'Prepare the caliper',
        description: 'Remove the caliper bleed nipple cover. Attach a syringe filled with mineral oil.'
      },
      {
        title: 'Push fluid through',
        description: 'Slowly push fluid from the caliper up to the lever. Watch for bubbles in the funnel.'
      },
      {
        title: 'Pump the lever',
        description: 'Squeeze the lever several times while tapping the hose and caliper to release trapped air.'
      },
      {
        title: 'Close and clean',
        description: 'Close the caliper bleed nipple, remove funnel, replace screw. Clean any spilled oil immediately!'
      },
      {
        title: 'Test the brakes',
        description: 'Reinstall pads and wheel. Pump lever - it should feel firm. Test brakes before riding.'
      }
    ]
  },
  {
    id: 'brake-bleed-sram',
    title: 'Bleed Brakes (SRAM)',
    category: 'brakes',
    difficulty: 'advanced',
    tools: ['SRAM bleed kit', 'DOT 5.1 fluid', 'T10 Torx', 'Bleed block', 'Gloves', 'Safety glasses'],
    videoUrl: 'https://www.youtube.com/watch?v=qkN9UhkVn8U',
    steps: [
      {
        title: 'Safety first',
        description: 'DOT fluid is corrosive! Wear gloves and safety glasses. Keep away from rotors and pads.'
      },
      {
        title: 'Remove wheel and pads',
        description: 'Remove wheel, take out brake pads, insert bleed block.'
      },
      {
        title: 'Set up the lever',
        description: 'Level the bike so the lever is horizontal. Remove the lever bleed port screw with T10 Torx.'
      },
      {
        title: 'Attach syringe to lever',
        description: 'Fill syringe halfway with DOT fluid, attach to lever bleed port. Push in slightly to purge air.'
      },
      {
        title: 'Set up caliper syringe',
        description: 'Attach empty syringe to caliper bleed port. Open the port.'
      },
      {
        title: 'Push fluid through',
        description: 'Push fluid from lever syringe while pulling caliper syringe. Fluid should flow bubble-free.'
      },
      {
        title: 'Pressure bleed',
        description: 'Close caliper port. Pull lever syringe, hold, squeeze brake lever 10 times. Release syringe.'
      },
      {
        title: 'Finish and clean',
        description: 'Remove syringes, replace screws. Clean ANY spilled fluid immediately with water.'
      }
    ]
  },
  {
    id: 'rotor-check',
    title: 'Check Brake Rotors',
    category: 'brakes',
    difficulty: 'beginner',
    intervalMiles: 200,
    tools: ['Ruler or caliper'],
    steps: [
      {
        title: 'Spin the wheel',
        description: 'With the wheel off the ground, spin it and watch the rotor pass through the caliper. It should spin true.'
      },
      {
        title: 'Check for wobble',
        description: 'If the rotor wobbles, it may be bent. Minor bends can be straightened with a rotor truing tool.'
      },
      {
        title: 'Measure thickness',
        description: 'Check rotor thickness with calipers. Minimum thickness is stamped on the rotor (usually 1.5-1.8mm).'
      },
      {
        title: 'Look for damage',
        description: 'Check for deep grooves, cracks, or discoloration (blue/brown from overheating). Replace if damaged.'
      }
    ]
  },

  // SUSPENSION
  {
    id: 'suspension-sag',
    title: 'Set Suspension Sag',
    category: 'suspension',
    difficulty: 'beginner',
    tools: ['Shock pump', 'Zip tie or o-ring', 'Measuring tape'],
    videoUrl: 'https://www.youtube.com/watch?v=xQSi5I77vbE',
    steps: [
      {
        title: 'Understand sag',
        description: 'Sag is how much the suspension compresses under your weight. Usually 25-30% for trail riding.'
      },
      {
        title: 'Measure total travel',
        description: 'Push the fork or shock through its full travel and measure the distance. Note this number.'
      },
      {
        title: 'Set the o-ring',
        description: 'Push the rubber o-ring (or use a zip tie) down against the seal on the stanchion or shock shaft.'
      },
      {
        title: 'Get on the bike',
        description: 'Wearing your riding gear, carefully get on the bike in your normal riding position. Don\'t bounce.'
      },
      {
        title: 'Get off carefully',
        description: 'Dismount without pushing down. The o-ring shows how far the suspension compressed.'
      },
      {
        title: 'Measure and adjust',
        description: 'Measure from seal to o-ring. For 25-30% sag, divide total travel by 4. Add air to reduce sag, remove to increase.'
      },
      {
        title: 'Repeat until correct',
        description: 'Adjust in 5-10 psi increments and re-measure. Takes a few tries to dial in.'
      }
    ]
  },
  {
    id: 'fork-air-pressure',
    title: 'Check Fork Air Pressure',
    category: 'suspension',
    difficulty: 'beginner',
    intervalMiles: 50,
    tools: ['Shock pump'],
    steps: [
      {
        title: 'Find the air valve',
        description: 'Look on top of the fork\'s left leg (usually). There\'s a Schrader valve under a cap.'
      },
      {
        title: 'Remove the cap',
        description: 'Unscrew the valve cap. Keep it safe!'
      },
      {
        title: 'Attach shock pump',
        description: 'Thread the shock pump onto the valve. You\'ll hear a small hiss - that\'s normal. The gauge shows current pressure.'
      },
      {
        title: 'Check against spec',
        description: 'Compare to the pressure chart on your fork (based on rider weight). Adjust if needed.'
      },
      {
        title: 'Remove pump carefully',
        description: 'Quickly unthread the pump. A small amount of air loss is normal. Replace the cap.'
      }
    ]
  },
  {
    id: 'fork-lowers-service',
    title: 'Service Fork Lowers',
    category: 'suspension',
    difficulty: 'intermediate',
    intervalMiles: 50,
    tools: ['Allen keys', 'Suspension oil (weight per fork spec)', 'Clean rags', 'Isopropyl alcohol'],
    videoUrl: 'https://www.youtube.com/watch?v=L9jMPl6Pz4g',
    steps: [
      {
        title: 'Remove the wheel',
        description: 'Take off the front wheel and set the bike in a stand.'
      },
      {
        title: 'Remove bottom bolts',
        description: 'Remove the bolts at the bottom of each fork leg. These hold the lowers on.'
      },
      {
        title: 'Pull off the lowers',
        description: 'Gently pull down on the lower legs while wiggling. They\'ll slide off the stanchions.'
      },
      {
        title: 'Clean everything',
        description: 'Wipe the stanchions clean with isopropyl alcohol. Clean inside the lowers and the foam rings.'
      },
      {
        title: 'Inspect seals',
        description: 'Check the dust seals and foam rings for damage. Replace if torn or hardened.'
      },
      {
        title: 'Add fresh oil',
        description: 'Put 10-15ml of suspension oil (check your fork spec) into each lower leg.'
      },
      {
        title: 'Reinstall lowers',
        description: 'Slide lowers back on, compress the fork, and reinstall bottom bolts to spec torque.'
      },
      {
        title: 'Cycle the fork',
        description: 'Compress the fork 20-30 times to distribute the oil. Wipe any excess from the seals.'
      }
    ]
  },
  {
    id: 'shock-air-pressure',
    title: 'Check Rear Shock Pressure',
    category: 'suspension',
    difficulty: 'beginner',
    intervalMiles: 50,
    tools: ['Shock pump'],
    steps: [
      {
        title: 'Locate the air valve',
        description: 'Find the Schrader valve on your rear shock. It\'s usually on the air can end.'
      },
      {
        title: 'Attach shock pump',
        description: 'Thread pump onto valve carefully. Read current pressure on the gauge.'
      },
      {
        title: 'Compare to spec',
        description: 'Check the pressure chart on your shock or the manufacturer\'s website for your weight.'
      },
      {
        title: 'Adjust as needed',
        description: 'Add or release air to match the recommended pressure. Remove pump and replace cap.'
      }
    ]
  },

  // WHEELS & TIRES
  {
    id: 'tire-pressure',
    title: 'Check Tire Pressure',
    category: 'wheels',
    difficulty: 'beginner',
    intervalMiles: 25,
    tools: ['Floor pump with gauge or digital gauge'],
    steps: [
      {
        title: 'Know your target pressure',
        description: 'MTB tires run 22-35 PSI typically. Lower for grip, higher for speed. Tubeless can run lower than tubed.'
      },
      {
        title: 'Remove valve cap',
        description: 'Unscrew the cap from the Presta or Schrader valve.'
      },
      {
        title: 'For Presta valves',
        description: 'Unscrew the small brass nut at the top of the valve before attaching the pump.'
      },
      {
        title: 'Check pressure',
        description: 'Attach pump head firmly. Read the gauge. Adjust to your target pressure.'
      },
      {
        title: 'Replace cap',
        description: 'For Presta, tighten the brass nut back down. Replace the valve cap.'
      }
    ]
  },
  {
    id: 'tubeless-sealant',
    title: 'Check/Add Tubeless Sealant',
    category: 'wheels',
    difficulty: 'beginner',
    intervalMiles: 500,
    tools: ['Tubeless sealant', 'Valve core remover', 'Syringe or injector'],
    steps: [
      {
        title: 'When to check',
        description: 'Sealant dries out over time. Check every 2-3 months or when tires won\'t hold air.'
      },
      {
        title: 'Remove valve core',
        description: 'Use a valve core remover to unscrew the valve core. Air will rush out.'
      },
      {
        title: 'Check existing sealant',
        description: 'Spin the wheel and listen for sloshing. No sound = sealant has dried up.'
      },
      {
        title: 'Add fresh sealant',
        description: 'Use a syringe to inject 60-90ml of sealant through the valve. Check sealant bottle for exact amount.'
      },
      {
        title: 'Reinstall valve core',
        description: 'Screw the valve core back in firmly. Inflate the tire.'
      },
      {
        title: 'Spin to distribute',
        description: 'Spin the wheel to spread sealant around the entire tire. Lay bike on each side briefly.'
      }
    ]
  },
  {
    id: 'wheel-true',
    title: 'Check Wheel True',
    category: 'wheels',
    difficulty: 'beginner',
    intervalMiles: 200,
    tools: ['Your eyes'],
    steps: [
      {
        title: 'Spin the wheel',
        description: 'Lift the wheel off the ground and spin it. Watch the rim pass by the brake pads or a fixed point.'
      },
      {
        title: 'Look for wobble',
        description: 'Side-to-side wobble means the wheel is out of true. Up-and-down wobble means it\'s out of round.'
      },
      {
        title: 'Minor wobble is OK',
        description: '1-2mm of wobble is usually fine. Larger wobbles affect braking and handling.'
      },
      {
        title: 'When to get help',
        description: 'Wheel truing requires a truing stand and spoke wrench. Take to a shop if badly out of true.'
      }
    ]
  },

  // FRAME & GENERAL
  {
    id: 'bolt-check',
    title: 'Check Critical Bolts',
    category: 'frame',
    difficulty: 'beginner',
    intervalMiles: 100,
    tools: ['Allen keys (4mm, 5mm, 6mm)', 'Torque wrench (recommended)'],
    steps: [
      {
        title: 'Why this matters',
        description: 'Loose bolts can cause crashes. A quick check keeps you safe and prevents damage.'
      },
      {
        title: 'Stem bolts',
        description: 'Check the bolts that clamp the stem to the steerer tube and handlebars. Should be firm.'
      },
      {
        title: 'Handlebar bolts',
        description: 'If you have a face plate, check all four bolts are evenly tight.'
      },
      {
        title: 'Seat post clamp',
        description: 'Make sure the seat post doesn\'t slip down. Tighten clamp if needed.'
      },
      {
        title: 'Brake caliper bolts',
        description: 'Check the bolts holding brake calipers to the frame and fork.'
      },
      {
        title: 'Axle/QR',
        description: 'Check thru-axles are tight or quick releases are properly clamped.'
      },
      {
        title: 'Suspension pivots (if applicable)',
        description: 'On full suspension bikes, check pivot bolts haven\'t loosened.'
      }
    ]
  },
  {
    id: 'bike-wash',
    title: 'Wash Your Bike',
    category: 'frame',
    difficulty: 'beginner',
    intervalMiles: 100,
    tools: ['Bucket', 'Bike wash soap', 'Soft brush', 'Sponge', 'Hose or water'],
    steps: [
      {
        title: 'Rinse first',
        description: 'Use low-pressure water to rinse off loose mud and dirt. Never use a pressure washer!'
      },
      {
        title: 'Mix soap',
        description: 'Add bike-specific wash to a bucket of water. Dish soap works too but can strip wax.'
      },
      {
        title: 'Wash frame',
        description: 'Use a sponge to wash the frame, fork, and components. Work top to bottom.'
      },
      {
        title: 'Scrub drivetrain',
        description: 'Use a brush on chain, cassette, chainrings, and derailleurs. These need more attention.'
      },
      {
        title: 'Rinse thoroughly',
        description: 'Rinse all soap off with clean water. Get into all the nooks and crannies.'
      },
      {
        title: 'Dry the bike',
        description: 'Wipe down with clean rags. Bounce the bike to shake out water from crevices.'
      },
      {
        title: 'Re-lube',
        description: 'Always lube your chain after washing. Water displaces the old lube.'
      }
    ]
  },
  {
    id: 'pre-ride-check',
    title: 'Pre-Ride Safety Check',
    category: 'frame',
    difficulty: 'beginner',
    tools: ['None - just your hands and eyes'],
    steps: [
      {
        title: 'Check tires',
        description: 'Squeeze both tires - they should feel firm. Look for cuts, thorns, or bulges.'
      },
      {
        title: 'Check brakes',
        description: 'Squeeze each brake lever. It should engage firmly before touching the handlebar.'
      },
      {
        title: 'Check quick releases/axles',
        description: 'Make sure wheels are secure. Thru-axles tight, QR levers fully closed.'
      },
      {
        title: 'Check handlebars',
        description: 'Stand over bike and twist bars - they shouldn\'t move in the stem.'
      },
      {
        title: 'Bounce test',
        description: 'Bounce the bike and listen for rattles or clunks. Investigate any unusual sounds.'
      },
      {
        title: 'Check suspension',
        description: 'Compress fork and shock - they should move smoothly without sticking.'
      }
    ]
  }
]

export const getGuidesByCategory = (category) =>
  maintenanceGuides.filter(g => g.category === category)

export const getGuide = (guideId) =>
  maintenanceGuides.find(g => g.id === guideId)

export const categories = [
  { id: 'drivetrain', name: 'Drivetrain', color: '#FF6B35' },
  { id: 'brakes', name: 'Brakes', color: '#E53935' },
  { id: 'suspension', name: 'Suspension', color: '#7E57C2' },
  { id: 'wheels', name: 'Wheels', color: '#42A5F5' },
  { id: 'frame', name: 'Frame & General', color: '#66BB6A' }
]
