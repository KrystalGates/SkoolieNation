## Skoolie Nation

Welcome to Skoolie Nation! It is a social platform that allows skoolie owners to add hangouts they've taken their skoolie, review them, and allows other users to review them. A user can also add destinations to their profile catagorized by places you have been or want to visit that appear as markers on a map. Users can also view other users profiles. I hopeyou enjoy my application!

## Getting Started

These instructions will get you a copy of the project up and runnning on your local machine.

## Installing

First. you'll need to clone down the repo into a directory. open your terminal and enter

```
git clone git@github.com:KrystalGates/SkoolieNation.git
```
Next, enter in the terminal

```
mkdir SkoolieNation/src/config

touch SkoolieNation/src/congif/firebase.js

touch SkoolieNation/src/congif/mapbox.js.js
```
Then you can install all the modules. Make sure you are in the SkoolieNation directory and enter into the terminal

```
npm install
```

Then enter into the terminal

```
npm start
```
The next thing to do is run your json-server. In the terminal, run the following command
```
json-server -p 5002 -w skoolieNation.json
```

After that, open up your editor.

Next you will need to create a project on [Firebase](https://console.firebase.google.com/) with the name Skoolie Nation. Once the project has been made you will click on storage on the side bar then create two folders:
 ```
 hangoutImage

 profileImage
 ```

 Then you will click on the rules tab at the top and make sure the text matches this

 ```
 rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

Then copy and paste the key into your firebase.js file.
It should look like this

```
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_DOMAIN_HERE",
  databaseURL: "YOUR_DATABASE_URL_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

Next, your will create an API key on [Mapbox](mapbox.com). Copy and paste your API key into your mapbox.js file.
It should look like this:

```
export const TOKEN="YOUR_API_KEY_HERE"
```

You will need to create your last API key [Google Maps API](https://developers.google.com/maps/documentation/).

You will insert the API key on your index.html file in the header. It should look like this

```
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places"></script>
```

###### You are now ready to use Skoolie Nation!

## First Time User instructions
* The first thing you have to do is register as new user otherwise you will not be able to use Skoolie Nation
* Once registered, you are now able to use the application
* At this point, you can explore the application. If you click on the Hangouts tab you can add a hangout, add them to your map, add a review, and read others reviews.
* You can also see other peoples profiles by clicking on their picture on their reviews.

### I hope you enjoyed my app!

## Built With
* [React](https://reactjs.org/) - Framework
* [Semantic UI React 0.87.3](https://react.semantic-ui.com/collections/grid/) - Used for styling







