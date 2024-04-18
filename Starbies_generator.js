var sizes

var num_bases
var bases

var syrups
var num_syrups

var milk_types

//sitewide drink obj that is updated
var drink
var seed

var first_seed = true

function setup() {
  drink = {
    size: '',
    //dict of bases (keys), and shots (values)
    bases: new Map(),
    milk_type: '',
    ice: false,
    //syrups stores a dict of syrups (keys) and pumps (values)
    syrups: new Map(),
    sugars: 0
  }

  //def possible sizes
  sizes = ['tall', 'grande', 'venti', 'trenta']

  //def possible syrups
  syrups = ['chocolate', 'caramel', 'vanilla', 'raspberry', 'hazelnut',
    'peppermint', 'toffee nut', 'cinnamon dolce', 'classic', 'maple', 'mocha'
  ]

  milk_types = ['whole', '2%', 'nonfat', 'half & half', 'heavy cream', 'almond', 'oat', 'soy', 'coconut']

  //def possible bases
  bases = ['coffee', 'matcha', 'chai', 'tea', 'espresso', 'water']
  
}

function generateDrink(){
  if(first_seed && document.getElementById("seed").value == ''){
    seed = random(1, 10000)
  }
  else{
    //grab seed from text box
    //set seed to be a random int based off the string
    //later generations are influenced by the seed before them
    seed = document.getElementById("seed").value
    let newseed = ''
    for(let i = 0; i < seed.length; i ++){
      newseed += seed.charCodeAt(i)
    }
    seed = newseed
  }
  first_seed = false
  randomSeed(seed)

  drink.size = random(sizes)

  num_bases = int(random(1,4))
  for(let i = 0; i < num_bases; i++){
    //adds i num bases with random # of shots
    drink.bases.set(random(bases), int(random(1,3)))
  }


  num_syrups = int(random(0, 3))
  for(let i = 0; i < num_syrups; i++){
    drink.syrups.set(random(syrups), int(random(1,3)))
  }

  drink.milk_type = random(milk_types)

  drink.ice = random() < 0.5
  drink.sugars = int(random(0, 10))
  //generates next seed based off current one
  seed = (int(random(1, 10000)))
  displayDrink()
}

function displayDrink(){
  //use simple variable checking to determine what name to print
  drinkString = 'Size: ' + drink.size + '<br>'
  drinkString += 'Drink Base:<br>'
  for (const entry of drink.bases.entries()){
    drinkString += entry[0] + ' ' + entry[1] + (entry[1] > 1 ? ' shots' : ' shot') + '<br>'
  }
  drinkString += '<br>Syrups:<br>'
  if(drink.syrups.size == 0){
    drinkString += 'None<br>'
  }
  for (const entry of drink.syrups.entries()){
    drinkString += entry[0] + ' ' + entry[1] + (entry[1] > 1 ? ' pumps' : ' pump') + '<br>'
  }
  drinkString += '<br>Milk Type: ' + drink.milk_type + '<br>'
  drinkString += '<br>Sugars: ' + drink.sugars + '<br>'
  drinkString += '<br>Ice: ' + (drink.ice ? "Yes" : "No") + '<br>'

  document.getElementById('output').innerHTML = drinkString
  document.getElementById('seed').value = seed

  clearDrink()
}

function clearDrink(){
  drink = {
    size: '',
    //dict of bases (keys), and shots (values)
    bases: new Map(),
    milk_type: '',
    ice: false,
    //syrups stores a dict of syrups (keys) and pumps (values)
    syrups: new Map(),
    sugars: 0
  }
}