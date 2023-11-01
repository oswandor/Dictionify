<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="custom-icon" slot="bottom">
        <ion-tab-button class="custom-icon" tab="home" href="/tabs/DiccionariPage">
          <ion-icon :icon="library" class="custom-icon" />
          <ion-label>Diccionary</ion-label>
        </ion-tab-button>

        <ion-tab-button class="custom-icon" tab="radio" href="/tabs/TraductorPage">
          <ion-icon :icon="radio" class="custom-icon" />
          <ion-label>Translater</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
  
<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { playCircle, radio, search, library } from 'ionicons/icons';

export default {
  name: "TabsPage",
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  data() {
    return {
      playCircle,
      radio,
      library,
      search,
    };
  },

}
</script>
<style>
.ion-tabsColor {
  background: rgb(98, 62, 168);
  /* Cambia este valor al color morado que desees */
}

.custom-icon {
  background: #623DB3 !important;
  --color: #ffffff !important;
  --color-selected: #352161!important;
  --color-focused: rgb(255, 255, 255) !important;
}
</style>