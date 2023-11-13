<template>
    <ion-page>

        <div>
            <h1>Hello Iam Sig Up</h1>
            <ion-button  @click="signUpUser">Sign Up</ion-button>
        </div>

    </ion-page>
</template>
<script>
import { onMounted } from 'vue';
import { IonPage, IonButton } from '@ionic/vue';
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

export default {
  name: "SigupPage",
  components: {
    IonPage, IonButton,
  },
  setup() {
    const signUpUser = () => {
      createUserWithEmailAndPassword(auth, "ronalgonzalez2023sv@gmail.com", "Gnulinux2023")
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          // Do something with the user, if needed
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing up:", errorCode, errorMessage);
          // Handle the error
        });
    };

    onMounted(() => {
      signUpUser();
    });

    return {
      signUpUser,
    };
  },
};
</script>
<style lang="">
    
</style>