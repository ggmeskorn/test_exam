import * as firebase from "firebase";
import 'firebase/storage';
import {DarkTheme, DefaultTheme} from 'react-native-paper';

const firebaseConfig = {
    apiKey: "AIzaSyA-Dpdt_E1NlYx1Glsx6OJzGUA-tgYYYLA",
    authDomain: "testexam-a8db1.firebaseapp.com",
    projectId: "testexam-a8db1",
    storageBucket: "testexam-a8db1.appspot.com",
    messagingSenderId: "169509405234",
    appId: "1:169509405234:web:9dee1f25f0c4100614f22b",
    measurementId: "G-812M6QZJL1"
  };

  // Initialize Firebase

 if(firebaseConfig.apiKey != undefined && !firebase.inited ){    
    firebase.initializeApp(firebaseConfig);  
    firebase.inited = true;
 }
//  const storage = firebase.storage();
//  export{
//     storage, firebase as default
//  }



const theme = {
  dark: false,
  colors: {
          primary: '#fff',
          accent: '#fff',
          background: '#E5E5E5',
          surface : '#777',
          text: '#000',
          card: '#fff',
          border : '#000',
    },    
}   


global.app = null;
global.firebase = firebase, 
global.theme = theme, 
global.config = firebaseConfig, 

global.comma = function(num){
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default global;