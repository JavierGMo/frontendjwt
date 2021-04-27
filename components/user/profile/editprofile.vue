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
                            v-model="usertName"
                            label="Nombre de usuario"
                            :disabled="editProfile"
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
    data(){
        return{
            valid : true,
            editProfile : true,
            products : [],
            firstNameUser : 'javier',
            firstNameUserRules : [],
            lastNameUser : 'Gonzalez Mora',
            lastNameUserRules : [],
            usertName : 'malohunt',
            usertNameRules : [],
        };
    },//data
    methods : {
        updateProfile(){
            if(this.$refs.form.validate()){
                console.log('Hola es valido');
            }
        },
    },//Methods
}
</script>

<style>

</style>