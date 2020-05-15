/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/hopeful89')
.then(data => {
  newUser(data)
})
.catch(err => {
  console.log(err)
})


/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.
 
    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
followersArray.forEach(user => axios.get(`https://api.github.com/users/${user}`)
.then(user => {
  newUser(user)
})
.catch(err => {
  console.log(err)
}))



/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">------------------
      <img src={image url of user} />----------------
      <div class="card-info">-------------------
        <h3 class="name">{users name}</h3>----
        <p class="username">{users user name}</p>----
        <p>Location: {users location}</p>-----
        <p>Profile:-----
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>------
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function newUser(object){

  let cardsDom = document.querySelector('.cards')
  let card = document.createElement('div');     
  let userImg = document.createElement('img');  
  let cardInfo = document.createElement('div');
  let userNameH3 = document.createElement('h3');
  let userNameP = document.createElement('p');
  let userLocationP = document.createElement('p');
  let userProfileP = document.createElement('p');
  let userProfileA = document.createElement('a')
  let userFollowersP = document.createElement('p');
  let userFollowingP = document.createElement('p');
  let userBioP = document.createElement('p');

  //Class List
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  userNameH3.classList.add('name');
  userNameP.classList.add('username');

  //Dom relationships

  card.append(userImg, cardInfo);
  cardInfo.append(userNameH3, userNameP, userLocationP, userProfileP, userFollowersP, userFollowingP, userBioP);

  //add textContent information
  userImg.src = object.data.avatar_url;
  userNameH3.textContent = object.data.name;
  userNameP.textContent = object.data.login;
  userLocationP.textContent = `Location: ${object.data.location}`;
 
  userProfileA.textContent = `${object.data.html_url}`
  userProfileA.href = object.data.html_url;
  userProfileA.target = "_blank"
  userProfileP.textContent = 'Profile: ';
  userFollowersP.textContent = `Followers: ${object.data.followers}`;
  userFollowingP.textContent = `Following: ${object.data.following}`
  userBioP.textContent = `Bio: ${object.data.bio}`;
  userProfileP.appendChild(userProfileA)
  cardsDom.append(card);
  return card
}


