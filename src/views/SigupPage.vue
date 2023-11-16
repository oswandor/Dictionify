<template>
  <ion-page>
    <ion-card class="ion-no-margin ion-card">
      <img alt="Silhouette of mountains" src="https://i.pinimg.com/736x/bb/3d/02/bb3d027efc8586606821a1c60c10a986.jpg" />
      <ion-card-header class="ion-card-header-centered">
        <ion-card-title>
          <ion-icon :icon="personAdd" class="large-icon"></ion-icon>
          
        </ion-card-title>
        <ion-subtitle>
          <h1 class="signup-title"> Sign Up </h1>
        </ion-subtitle>
      </ion-card-header>

      <ion-card-content>
        <form @submit.prevent="signUpUser">
          <ion-item class="signup-input">
            <ion-label position="floating" >Name</ion-label>
            <ion-input v-model="name" type="text" clear-input required fill="solid"
              placeholder="Enter text" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="signup-input">
            <ion-label position="floating" >Email</ion-label>
            <ion-input v-model="email" type="email" clear-input required fill="solid"
              placeholder="Enter text" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="signup-input">
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password" clear-input required fill="solid"
              placeholder="Enter password" class="custom-input"></ion-input>
          </ion-item>

          <ion-button type="submit" class="ion-margin ion-margin-no-solid" fill="outline" shape="round" @click="signUpUser">
            <ion-icon :icon="logOut" class="ion-margin-end"></ion-icon>sig-up
          </ion-button>

        </form>
      </ion-card-content>
    </ion-card>
    <ion-toast
      :message="toastMessage"
      :is-open="toastState"
      :duration="2500"
      @did-dismiss="toastState = false"
    ></ion-toast>
  </ion-page>
</template>

<script>
import { onMounted, ref,createApp } from 'vue';
import { IonPage, IonButton, IonItem, IonLabel, IonInput, IonToast, IonCard, IonCardHeader, IonCardContent,IonCardTitle,IonCardSubtitle,IonIcon } from '@ionic/vue';
import { auth, createUserWithEmailAndPassword } from "./firebase.js";
import {personAdd,logOut} from 'ionicons/icons';
import { useRouter } from 'vue-router';


export default {
  name: "SignupPage",
  components: {
    IonPage,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonToast,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
  },

  data() {
    return {
      email: '',
      password: '',
      name: '',
      toastState: false,
      toastMessage: null,
      personAdd,
      logOut,
    };
  },
  methods: {
    async signUpUser() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);

        this.toastMessage = 'Usuario agregado correctamente';
        this.toastState = true;

        this.$router.push('/LoginPage')
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.toastMessage = 'El usuario ya existe';

          this.$router.push('/LoginPage')
        } else {
          this.toastMessage = 'Error al agregar el usuario';
        }
        this.toastState = true;
      }
    }
  },  
  
};
</script>

<style lang="scss">
.ion-margin-solid {

--background: rgb(98, 62, 168, 1);
}
.ion-margin-no-solid {
  margin-bottom: 20px;
--border-color: rgb(98, 62, 168, 1);
--color: rgb(98, 62, 168, 1);
}
.ion-card-header-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.ion-margin-no-solid {
  border: 20px;
--border-color: rgb(98, 62, 168, 1);
--color: rgb(98, 62, 168, 1);
}
.signup-card {
  display: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  padding: 20px;
}
.signup-title {
  text-align: center;
  margin-bottom: 20px;
}
.ion-card {
  height: 100%;
}
.signup-input {
  --ion-color-primary: #8a2be2;
  --ion-color-primary-rgb: 138, 43, 226;

  border-bottom: 1px solid var(--ion-color-primary);
}

.custom-input {
  --ion-color-base: white;
  --ion-color-border: var(--ion-color-primary);

  background-color: var(--ion-color-base);
  border: none; 
  border-bottom: 2px solid var(--ion-color-border); 
  font-size: 16px;
  padding: 10px;
}

.custom-input::placeholder {
  opacity: 0.8;
}
.large-icon {
    font-size: 4em;
    color: rgb(98, 62, 168, 1);
}

.signup-button {
  --background: #673ab7;
  --color: #fff;
}
</style>