<template>
    <v-container>
        <v-form
            ref="form"
            v-model="validateForm"
            lazy-validation
        >
            <v-col>
                <v-row>
                    <v-text-field
                        v-model="userOrEmail"
                        label="Usuario o e-mail"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        v-model="password"
                        label="Contraseña"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-btn
                        @click="login"
                    >
                        Iniciar sesion
                    </v-btn>
                </v-row>
            </v-col>
        </v-form>
    </v-container>
</template>

<script>

export default {
    
    mounted : function(){
        
        if(localStorage.getItem('login')) {
            this.$router.push('/');
            console.log(localStorage.getItem('login'));
        }
        //this.isAuthenticated = localStorage.getItem('login')?localStorage.getItem('login'):false;
    },
    data(){
        return {
            validateForm : false,
            userOrEmail : '',
            password : '',
            showPassword : false,
            rules: {
                required: value => !!value || 'Requerido',
                min: v => v.length >= 8 || 'Minimo 8 caracteres',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        };
    },
    methods : {
        async login(){
            const routeLogin = 'http://localhost:5000/login';
            const okForm = {};
            try {
                okForm['ok'] = this.$refs.form.validate() && this.validateForm;
                if(okForm['ok']) this.dataOfRequest(routeLogin);
                else alert('Faltan por llenar campos');
            } catch (error) {
                
            }
        },
        async dataOfRequest(url){
            const request = await fetch(url, {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body : JSON.stringify({
                    'user' : this.userOrEmail,
                    'password' : this.password
                }),
            });//Request login

            // const data = await request.json();
            const data = {};
            

            switch(request.status){
                case 200:
                    data['ok'] = await request.json();
                    console.log(data);
                    this.setUserLogged(data.ok.token);
                    this.$router.push('user/');
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

        },//Funcion de paoyo para traer la data
        setUserLogged(token){
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('login', true);
        }
    },
}
</script>

<style>

</style>