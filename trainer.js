function Trainer() {
	let id;
	let name;

	const catchWildPokemon = (wildPokemon, ballUsed) => {
		const catchRate = getCatchRate(wildPokemon, ballUsed);
		if(catchRate >= 255) {
			return `${wildPokemon.name} caught`;
		} else {
			const throwBallRate = getThrowBallRate(catchRate);
			let i = 4;
			while(i > 0) {
				let randomNum = getRandomNumber(0, 65535);
				if(randomNum >= throwBallRate) {
					i = -1;
					return `${wildPokemon.name} broke free`;
				} else {
					i--;
				}
			}
			if(i = 0) {
				return `${wildPokemon.name} caught`;
			}
		}
	};

	const getCatchRate = (wildPokemon, ballUsed) => {
		return (((3 * wildPokemon.maxHP) - (2 * wildPokemon.currentHP) * (wildPokemon.captureRate * ballUsed.bonus)) / (3 * wildPokemon.maxHP)) * wildPokemon.status;
	};

	const getThrowBallRate = (catchRate) => {
		return 1048560/Math.sqrt(Math.sqrt((16711680/catchRate)));
	};

	const getRandomNumber = (min, max) => {
		return Math.random() * (max - min + 1) + min;
	};
}