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
            valid: true,
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
        async updatePassword(){
            if(this.$refs.form.validate()){
                if(this.password === this.passwordRepeat){
                    const request = await fetch('http://localhost:5000/user/changepassword', {
                        method : 'PUT',
                        headers : {
                            'Content-Type': 'application/json',
                            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                        },
                        body : JSON.stringify({
                            'password' : this.passwordRepeat
                        })
                    });
                    switch(request.status){
                        case 200:
                            alert('Contraseña actualizada');
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