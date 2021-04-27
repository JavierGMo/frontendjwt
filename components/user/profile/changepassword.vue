<template>
    <v-container
        class="my-3 mx-1"
    >
        <v-col>
            <v-row
                align="center"
                justify="center"
            >
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="password"
                        label="Contraseña"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-text-field
                        v-model="passwordRepeat"
                        label="Confirmar contraseña"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-btn
                        color="success"
                        class="mr-4"
                        @click="updatePassword"
                    >
                        Actualizar contraseña
                    </v-btn>
                </v-form>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            showPassword : false,
            password : '',
            passwordRepeat : '',
            
            rules: {
                required: value => !!value || 'Requerido',
                min: v => v.length >= 8 || 'Minimo 8 caracteres',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        };
    },//data
    methods : {
        updatePassword(){
            if(this.$refs.form.validate()){
                if(this.password === this.passwordRepeat){
                    console.log('Contaseña cambiada');
                    this.password = '';
                    this.passwordRepeat = '';
                    
                }
            }
        },
    },//methods
}
</script>

<style>

</style>