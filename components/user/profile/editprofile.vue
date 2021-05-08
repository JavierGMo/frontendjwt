<template>
    <v-container
        class="my-3"
    >
        <v-row>
            <v-col>
                <v-avatar
                    size="200"
                >
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    >
                </v-avatar>
            </v-col>
            <v-col>
                <v-row>
                    <h3>
                        Tus datos
                    <v-btn
                        icon
                        @click="editProfile=!editProfile"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    </h3>
                </v-row>
                <v-row>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="firstNameUser"
                            label="Nombre(s)"
                            :disabled="editProfile"
                        ></v-text-field>
                        <v-text-field
                            v-model="lastNameUser"
                            label="Apellidos(s)"
                            :disabled="editProfile"
                        ></v-text-field>
                        <v-text-field
                            v-model="userName"
                            label="Nombre de usuario"
                            disabled
                        ></v-text-field>
                        <v-btn
                            color="success"
                            class="mr-4"
                            :disabled="editProfile"
                            @click="updateProfile"
                        >
                            Actualizar datos del perfil
                        </v-btn>
                    </v-form>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    mounted(){
        this.dataUser();
        if(this.dataForUserReady){
            //Hacer funcion para disparar una funcion al padre y que esta vuelva a disparar a this.dataUser, se arregla el problem para cuando se guardan los cambios en este component
        }
    },
    data(){
        return{
            valid : true,
            editProfile : true,
            products : [],
            firstNameUser : '',
            firstNameUserRules : [],
            lastNameUser : '',
            lastNameUserRules : [],
            userName : '',
            userNameRules : [],
            dataForUserReady : false,
        };
    },//data
    methods : {
        dataUser(dataFromParent){
            
            if(dataFromParent!==undefined && dataFromParent!==null){
                this.firstNameUser = dataFromParent.firstName;
                this.lastNameUser = dataFromParent.lastName;
                this.userName = dataFromParent.userName;
            }else{
                console.log(`no hay data`);
            }
            
            // this.firstNameUser = dataFromParent.firstName;
            // this.lastNameUser = dataFromParent.lastName;
            // this.userName = dataFromParent.userName;
            
        },
        async updateProfile(){
            if(this.$refs.form.validate()){
                const request = await fetch('http://localhost:5000/user/update', {
                    method : 'PUT',
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                    },
                    body : JSON.stringify({
                        'firstname' : this.firstNameUser,
                        'lastname' : this.lastNameUser,
                        'username' : this.userName
                    })
                });
                switch(request.status){
                    case 200:
                        alert('Usuario actualizadp');
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
            }
        },
    },//Methods
}
</script>

<style>

</style>