<template>
    <v-container>
        <v-tabs
            v-model="tab"
            centered
            dark
            icons-and-text
        >
            <v-tab href="#tab-1">
                Editar perfil
                <v-icon>mdi-account</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                Cambiar contraseña
                <v-icon>mdi-eye</v-icon>
            </v-tab>
        </v-tabs>
        <v-tabs-items
            v-model="tab"
        >
            <v-tab-item
                value="tab-1"
            >
                <EditProfile/>
            </v-tab-item>
            <v-tab-item
                value="tab-2"
            >
                <ChangePassword/>
            </v-tab-item>
        </v-tabs-items>
       
    </v-container>
</template>

<script>
import EditProfile from '@/components/user/profile/editprofile.vue';
import ChangePassword from '@/components/user/profile/changepassword.vue';
export default {
    components: {
        EditProfile,
        ChangePassword
    },
    mounted : function(){
        // this.isAuthenticated = localStorage.getItem('login')?localStorage.getItem('login'):false;
        
    },
    data(){
        return{
            tab : null,

        };
    },//data
    

}
</script>

<style>

</style>