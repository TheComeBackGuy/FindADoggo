// setting main request URL
const allBreeds = 'https://dog.ceo/api/breeds/list/all';
let randoDog = `https://dog.ceo/api/breeds/image/random`;
// let sameBreedRando = '';

// selecting the div .breeds to put stuff in
const select = document.querySelector('.breeds');

function capped(wordToCapitalize) {
	let capitalized = wordToCapitalize.replace(
		wordToCapitalize.charAt(0),
		wordToCapitalize.charAt(0).toUpperCase()
	);
	return capitalized;
}

function findCurrentDogList(dog) {
	const listOfDogsInThisBreed = ``;
}

/***create list options for selecting***/
fetch(allBreeds)
	.then((response) => response.json())
	.then((data) => {
		const breedsObject = data.message;
		const breedsArray = Object.keys(breedsObject);

		for (let i = 0; i < breedsArray.length; i++) {
			const option = document.createElement('option');
			option.value = breedsArray[i];
			option.innerText = capped(breedsArray[i]);

			select.appendChild(option);
		}
	});

/***creates initial picture */
function createDoggo() {
	fetch(randoDog)
		.then((response) => response.json())
		.then((data) => {
			findFirstDog(data.message);
			const img = document.createElement('img');
			img.src = data.message;
			img.alt = "Here's a sweet puppy!";
			img.classList.add('.doggoPic');
			document.querySelector('.doggoImage').appendChild(img);
		});
}
createDoggo();

/***finds the breed of any randomly generated dog and sets it as the currentDog.
 * This is so the user can generate a random dog and veiw more of them.
 */
function findFirstDog(dataMessage) {
	let currentBreed = '';
	let endOfBreed = 0;
	const url = dataMessage;
	// 30 is picked because it is where "breeds/" ends in the url being referenced.
	if (dataMessage.search(`-`) === -1) {
		endOfBreed = dataMessage.indexOf('/', 30);
	} else {
		endOfBreed = dataMessage.search(`-`);
	}
	for (let i = 30; i < endOfBreed; i++) {
		currentBreed += dataMessage[i];
	}
	console.log(currentBreed);
	randoDog = `https://dog.ceo/api/breed/${currentBreed}/images/random`;
	document.querySelector('.RandoSameBreed').innerText = `More ${capped(
		currentBreed
	)}s please!`;
	return currentBreed;
}

function pickAnAction(e) {
	if (e.target !== e.target.classList) {
		const clicked = e.target.classList;
		switch (true) {
			case clicked.contains('.randomButton'):
		}
	}
}

/***event listener for same Breed button */
select.addEventListener('change', (event) => {
	randoDog = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
	updateDoggo();
	document.querySelector(
		'.RandoSameBreed'
	).innerText = `More ${event.target.value}s please!`;
	currentBreed = event.target.value;
	console.log(`We should be looking for a ${randoDog}`);
});

/***event listener for new random dog */
document.querySelector('.randomButton').addEventListener('click', () => {
	randoDog = 'https://dog.ceo/api/breeds/image/random';
	fetch(randoDog)
		.then((response) => response.json())
		.then((data) => {
			console.log('hit it');
			document.querySelector('.doggoImage img').src = data.message;
			findFirstDog(data.message);
		});
});

/***event listener for Random button */
document
	.querySelector('.RandoSameBreed')
	.addEventListener('click', updateDoggo);

/***just updates the initially created image */
function updateDoggo() {
	// loadingBone(true);

	fetch(randoDog)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.message);
			document.querySelector('.doggoImage img').src = data.message;
			// loadingBone(false);
		});
}

// /***create dropdown items based on query for user to select */
// let BreedArray = (dog) => {
// 	const breedList = `https://dog.ceo/api/breed/${dog}/images`;

// 	fetch(breedList)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			const activeBreedArray = data.message;
// 			console.log(activeBreedArray[3].value);
// 		});
// };
// BreedArray('hound');

/***loading spinner */
function loadingBone(active) {
	const boneBox = document.querySelector('.bone');
	if (active) {
		const bone = document.createElement('img');
		bone.alt = 'loading a bone';
		bone.src = './bone.svg';
		bone.zindex = 10;
		// bone.classList('bone');
		boneBox.appendChild(bone);
	} else {
		boneBox.removeChild(bone);
	}
}
