# Ask Me Question

### Application Structure 👇🏻
----
```
AskMeQuestion 
│
└───src
│   │   assets // images used to immitate inner shadows on Android
│   │   components // components used in the app
│   │   context // Error and Question contexts
│   │   utils // server and color palette files
```



### Providers 👇🏻
----
There are two providers used in the app:
* Error Provider - manages error state of the application
* Question Provider - manages question state

Contexts of these provided are not exposed directly instead they are wrapped into
custom hooks `use<ProviderName>State || use<ProviderName>Dispatch` that returns
state or dispatch function that is returned from useReducer.



### User Specification 👇🏻
---
The user specification file can be found at the root of the project. Look for `AskMeQuestion_UserSpecifications.pdf` 

---

### Workarounds 👇🏻
---
* Shadows:
  To imitate inset shadows on Android I used a background image. All background images are located in `src/assets`. For outer shadows on Android, I used elevation only. 


### Areas of improvement 👇🏻
---
- [ ] Add type checking with TypeScript. Here I used a very simplified version of type checking to indicate that I care about checking types. I usually do it with TypeScript, however for the sake of keeping things simple and readable used PropTypes.
- [ ] Allow only number in the input. I used number keyboard type, however on a simulator/emulator you can steel type strings that are not converted to numbers.
- [ ] Write tests

### Feedback 👇🏻
---
An interesting and not very cumbersome task that involves quite a lot of styling. However, from React perspective it is a good challenge to be able to use Context, custom hooks, memo-s in the app. Animations are simple enoguh to be able to implement it with Animated API
