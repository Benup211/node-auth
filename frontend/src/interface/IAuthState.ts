interface User{
    id:number;
    name:string;
    email:string;
    isActive:boolean;
    lastLogin:Date;
}
export interface IAuthState {
    user:User;
    isAuthenticated:boolean;
    error:string|null;
    isLoading:boolean;
    isCheckingAuth:boolean;
    message:string|null;
    signup:Function;
    verifyEmail:Function;
    checkAuth:Function;
    login:Function;
    logout:Function;
    forgetPassword:Function;
    resetPassword:Function;
}