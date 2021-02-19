function Pokemon() {
	let id;
	let name;
	let type;
	let level;
	let stats = {
		"maxHP": 0,
		"currentHP": 0,
		"Attack": 0,
		"Defense": 0,
		"Sp. Attack": 0,
		"Sp. Defense": 0,
		"Speed": 0
	};
	let status;
	let captureRate;

	/** 
		@param attackMove the move being used
		@param target the target pokemon that is being attacked 
		@param numOfTargets is 0.75 if the move has more than one target, and 1 otherwise.
		@param weather is 1.5 if a Water-type move is being used during rain or a Fire-type move during harsh sunlight, and 0.5 if a Water-type move is used during harsh sunlight or a Fire-type move during rain, and 1 otherwise.
		@param critical is 1.5 for a critical hit and 1 otherwise.
		@param random is a random integer percentage between 0.85 and 1.00 (inclusive)
		@param stab is the same-type attack bonus. This is equal to 1.5 if the move's type matches any of the user's types, 2 if the user of the move additionally has Adaptability, and 1 if otherwise.
		@param typeEffectiveness is the type effectiveness. This can be 0 (ineffective); 0.25, 0.5 (not very effective); 1 (normally effective); 2, or 4 (super effective), depending on both the move's and target's types.
		@param burn is 0.5 if the attacker is burned, its Ability is not Guts, and the used move is a physical move (other than Facade from Generation VI onward), and 1 otherwise.
		@param other is 1 in most cases, and a different multiplier when specific interactions of moves, Abilities, or items take effect:
		@link see https://bulbapedia.bulbagarden.net/wiki/Damage for complete list 
	*/
	const getDamage = (attackMove, target, numOfTargets, weather, critical, random, stab, typeEffectiveness, burn, other) => {
		const modifier = getModifier(numOfTargets, weather, critical, random, stab, typeEffectiveness, burn, other);
		const damageAmount = ((((((2 * level) / 5) + 2) * attackMove.power * (stats["Attack"] / target.stats["Defense"])) / 50) + 2) * modifier;
		return damageAmount;
	}

	const setDamage = (attackMove, target, numOfTargets, weather, critical, random, stab, typeEffectiveness, burn, other) => {
		const damage = getDamage(attackMove, target, numOfTargets, weather, critical, random, stab, typeEffectiveness, burn, other);
		target.stats["HP"] -= damage;
	}

	const getModifier = (numOfTargets, weather, critical, random, stab, typeEffectiveness, burn, other) => {
		return numOfTargets * weather * critical * random * stab * typeEffectiveness * burn * other;
	}
}