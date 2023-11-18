<template>
    <ion-page>
        <ion-content>


            <div>
                <h1>hello Page favoritos</h1>
            </div>
            <ion-button @click="retrieveData">Retrieve Data from Storage</ion-button>

        </ion-content>
    </ion-page>
</template>
<script>
import { IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { Storage } from '@ionic/storage';

export default {
    name: 'FavoritosPage',
    components: {

        IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },

    methods: {
        async retrieveData() {
            // Instanciar el servicio Storage
            let storage = new Storage();

            // Crear el almacenamiento
            await storage.create();

            // Obtener datos del almacenamiento
            const uid = await storage.get('uid');

            // Hacer algo con los datos recuperados
            console.log('UID from Storage:', uid);
        },
    }
    
    }
</script>
<style></style>