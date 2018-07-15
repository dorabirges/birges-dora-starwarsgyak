// ide deklaráljátok a függvényeket.

// A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)
function advBubble(array) {
  var i = array.length;
  while (i > 0) {
    var swap = 0;
    for (var j = 0; j < i - 1; j++) {
      if (array[j].cost_in_credits !== null && array[j + 1].cost_in_credits === null || array[j].cost_in_credits !== null && array[j + 1].cost_in_credits !== null && parseInt(array[j].cost_in_credits, 10) > parseInt(array[j + 1].cost_in_credits, 10)) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swap = j + 1;
      }
    }
    i = swap;
  }
  return array;
}

// Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!
function deleteNullConsumables(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i].consumables === null) {
      array.splice(i, 1);
    }
  }
  return array;
}

// Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra.
function modifyNullValues(array) {
  for (var i = 0; i < array.length; i++) {
    for (var k in array[i]) {
      if (array[i][k] === null) {
        array[i][k] = 'unknown';
      }
    }
  }
  return array;
}

// A spaceship-list class-ű divbe jelenítsd meg az így kapott hajók adatait, beleérve a képét is.
function createSpaceshipClickHandler(array, i) {
  return function () {
    showOneSpaceship(array[i]);
  };
}

function showSpaceships(array) {
  var spaceshipList = document.querySelector('.spaceship-list');
  for (var i = 0; i < array.length; i++) {
    var spaceshipDiv = document.createElement('div');
    spaceshipDiv.onclick = createSpaceshipClickHandler(array, i);
    var spaceshipsString = '<div class="one-half">';
    for (var k in array[i]) {
      if (k !== 'image') {
        spaceshipsString += `<p><strong>${k}:</strong> ${array[i][k]}</p>`;
      }
    }
    spaceshipsString += `</div><div class="one-half image-div"><img src="../img/${array[i].image}"></div>`;
    spaceshipDiv.innerHTML = spaceshipsString;
    spaceshipList.appendChild(spaceshipDiv);
  }
}

// Ha valamelyik hajó adatait tartalmazó html elemre (pl.: a divre amibe benne van minden adata) rákattintunk, akkor töltse be az adott hajó adatait a one-spaceship class-ű div-be.
function showOneSpaceship(spaceship) {
  var sidebar = document.querySelector('.one-spaceship');
  var searchbar = document.querySelector('.searchbar');
  var oneSpaceship = document.getElementById('spaceshipDetails');
  if (oneSpaceship === null) {
    oneSpaceship = document.createElement('div');
    oneSpaceship.id = 'spaceshipDetails';
    sidebar.insertBefore(oneSpaceship, searchbar);
  }
  var oneSpaceshipString = '<div class="selected-spaceship">';
  for (var k in spaceship) {
    if (k !== 'image') {
      oneSpaceshipString += `<p><strong>${k}:</strong> ${spaceship[k]}</p>`;
    }
  }
  oneSpaceshipString += `</div><div><img src="../img/${spaceship.image}"></div>`;
  oneSpaceship.innerHTML = oneSpaceshipString;
}

// Készítened kell egy statisztikát, mely a spaceship-list class-ú div aljára a következő adatokat fogja beleírni:

// Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
function numberOfShipsWithOneCrewMember(array) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].crew === '1') {
      count++;
    }
  }
  return count;
}

// A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
function biggestCargoCapacity(array) {
  var biggest = null;
  for (var i = 0; i < array.length; i++) {
    if (array[i].cargo_capacity !== 'unknown') {
      if (biggest === null || parseInt(array[i].cargo_capacity) > parseInt(biggest.cargo_capacity)) {
        biggest = array[i];
      }
    }
  }
  return biggest.model;
}

// Az összes hajó utasainak (passengers) összesített száma
function numberOfPassengers(array) {
  var passengers = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].passengers !== 'unknown') {
      passengers += parseInt(array[i].passengers);
    }
  }
  return passengers;
}

// A leghosszabb(lengthiness) hajó képének a neve
function longestShipImage(array) {
  var longest = null;
  for (var i = 0; i < array.length; i++) {
    if (array[i].lengthiness !== 'unknown') {
      if (longest === null || parseInt(array[i].lengthiness) > parseInt(longest.lengthiness)) {
        longest = array[i];
      }
    }
  }
  return longest.image;
}

function showStatistics(array) {
  var spaceshipList = document.querySelector('.spaceship-list');
  var statDiv = document.createElement('div');
  var stats = '<h2>Statisztika:</h2><ul>';
  stats += `<li>Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma: ${numberOfShipsWithOneCrewMember(array)}</li>`;
  stats += `<li>A legnagyobb cargo_capacity-vel rendelkező hajó neve (model): ${biggestCargoCapacity(array)}</li>`;
  stats += `<li>Az összes hajó utasainak (passengers) összesített száma: ${numberOfPassengers(array)}</li>`;
  stats += `<li>A leghosszabb(lengthiness) hajó képe:</li></ul><div class="stat-image-div"><img src="../img/${longestShipImage(array)}"></div>`;
  statDiv.innerHTML = stats;
  spaceshipList.appendChild(statDiv);
}


/* 7. Legyen lehetőség a hajókra rákeresni _model_ szerint.
* A keresett nevet paraméterként kapja a függvényed.
* A keresés nem case sensitive
* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
* Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
* Az adott hajó adatait a one-spaceship class-ű div-be kell megjeleníteni rendezett formában, képpel együtt. */

function searchByModel(array, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  var result = null;
  for (var i = 0; i < array.length; i++) {
    if (array[i].model.toLowerCase().indexOf(searchTerm) > -1) {
      if (result === null || array[i].model.localeCompare(result.model) < 0 ) {
        result = array[i];
      }
    }
  }
  return result;
}
function setupSearch(array) {
  document.getElementById('search-button').onclick = function () {
    var textField = document.getElementById('search-text');
    var spaceship = searchByModel(array, textField.value);
    if (spaceship !== null) {
      showOneSpaceship(spaceship);
    } else {
      var sidebar = document.querySelector('.one-spaceship');
      var previousSpaceship = document.getElementById('spaceshipDetails');
      if (previousSpaceship !== null) {
        sidebar.removeChild(previousSpaceship);
      }
      alert('Nincs találat.');
    }
  };
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  advBubble(userDatas);
  deleteNullConsumables(userDatas);
  modifyNullValues(userDatas);
  console.log(userDatas);
  showSpaceships(userDatas);
  showStatistics(userDatas);
  setupSearch(userDatas);
}
getData('/json/spaceships.json', successAjax);
