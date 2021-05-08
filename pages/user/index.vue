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
                <EditProfile
                    ref="editprofile"
                />
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
        this.getUserData();
    },
    data(){
        return{
            tab : null,
            firstName : '',
            lastName : '',
            userName : '',

        };
    },//data
    methods : {
        async getUserData(){
            const url = 'http://localhost:5000/user/profile';
            const request = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = {};
            switch(request.status){
                case 200:
                    data['ok'] = await request.json();
                    this.dataProfile(data.ok.data);
                    break;
                case 403:
                    alert('Acceso denegado');
                    break;
                case 404:
                    alert('Usuario no encontrado');
                    break;
                case 500:
                    alert('Algo salio mal, intente mas tarde.');
                    break;
                default:
                    alert('Algo salio mal, intente mas tarde.');
                
            }
        },
        dataProfile(profile){
            if(profile!==null && profile!==undefined){
                console.log(profile);
                this.firstName = profile['firstname'];
                this.lastName = profile['lastname'];
                this.userName = profile['username']
                console.log(`${this.userName}`);
                const dataForChild = {
                    firstName : this.firstName,
                    lastName : this.lastName,
                    userName : this.userName
                };
                this.$refs.editprofile.dataUser(dataForChild);
            }
        }
    }//Methods

}
</script>

<style>

</style>