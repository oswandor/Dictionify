<template >
    <ion-page>

        <ion-content>

            <ion-searchbar v-model="searchTerm" @ionInput="search"></ion-searchbar>

            <ion-list>
                <ion-item v-for="result in results" :key="result.word">
                    <ion-label>
                        <h2>{{ result.word }}</h2>
                        <p>{{ result.definition }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

export default {
    name: "DiccionariPage",

    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },

    data() {
        return {
            searchTerm: "",
            results: null,
        };
    },
    method: {

        search() {
            axios.get(`URL_DE_TU_API?word=${this.searchTerm}`).then((response) => {
                this.results = response.data;
            });

        }

    }
}
</script>
<style lang="">
    
</style>