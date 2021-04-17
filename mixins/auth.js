//Mixin for auth
export default{
    watch : {
        isAuthenticated(value){
            console.log(`mixin de raiz  valor ${value}`);
            if(!value){

                this.$router.push('login/');
            }
        }
    },
    data(){
        return {
            isAuthenticated : false,
        };
    },
    methods : {
        logOut(){
            localStorage.setItem('token', '');
            localStorage.setItem('login', false);
            this.isAuthenticated = false;
            this.$router.push('/');

        }
    }
}