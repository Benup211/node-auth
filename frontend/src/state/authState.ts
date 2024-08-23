import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { IRegister } from "../interface/IRegister";
import { ErrorResponse } from "../interface/Response";
import { IAuthState } from "../interface/IAuthState";
const API_URL = "http://localhost:3000/auth";

axios.defaults.withCredentials = true;
export const useAuthState = create<IAuthState>((set) => ({
    user: {
        id: 0,
        name: "",
        email: "",
        isActive: false,
        lastLogin: new Date(),
    },
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (data: IRegister) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/register`, data);
            set({
                user: res.data.user,
                isAuthenticated: true,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({ error: "Error signing up", isLoading: false });
                }
            } else {
                set({ error: "Error signing up", isLoading: false });
            }
            throw error;
        }
    },
    verifyEmail: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}//verify-email`, { code });
            set({
                user: res.data.user,
                isAuthenticated: true,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({ error: "Error verifying email", isLoading: false });
                }
            } else {
                set({ error: "Error verifying email", isLoading: false });
            }
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const res = await axios.get(`${API_URL}/`);
            set({
                user: res.data.user,
                isAuthenticated: true,
                error: null,
                isCheckingAuth: false,
            });
        } catch (error) {
            if(axios.isAxiosError(error)){
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        isCheckingAuth: false,
                    });
                } else {
                    set({isCheckingAuth: false,isAuthenticated:false });
                }
            }else{
                set({isCheckingAuth: false,isAuthenticated:false });
            }
        }
    },
    login:async (email:string,password:string)=>{
        set({isLoading:true,error:null});
        try{
            const res = await axios.post(`${API_URL}/login`,{email,password});
            set({
                user:res.data.user,
                isAuthenticated:true,
                error:null,
                isLoading:false
            });
        }catch(error){
            if(axios.isAxiosError(error)){
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({ error: "Error logging in", isLoading: false });
                }
            } else {
                set({ error: "Error logging in", isLoading: false });
            }
            throw error;
        }
    },
    logout:async()=>{
        set({isLoading:true,error:null});
        try{
            await axios.get(`${API_URL}/logout`);
            set({
                user:{
                    id:0,
                    name:"",
                    email:"",
                    isActive:false,
                    lastLogin:new Date()
                },
                isAuthenticated:false,
                error:null,
                isLoading:false
            });
        }catch(error){
            if(axios.isAxiosError(error)){
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({ error: "Error logging out", isLoading: false });
                }
            } else {
                set({ error: "Error logging out", isLoading: false });
            }
            throw error;
        }
    },
    forgetPassword:async(email:string)=>{
        set({isLoading:true,error:null});
        try{
            const res=await axios.post(`${API_URL}/forget-password`,{email});
            set({isLoading:false,message:res.data.message});
        }catch(error){
            if(axios.isAxiosError(error)){
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({ error: "Error sending email", isLoading: false });
                }
            } else {
                set({ error: "Error sending email", isLoading: false });
            }
            throw error;
        }
    },
    resetPassword:async(password:string,confirmPassword:string,resetPasswordToken:string)=>{
        set({isLoading:true,error:null});
        try{
            const res=await axios.post(`${API_URL}/reset-password`,{password,confirmPassword,resetPasswordToken});
            set({isLoading:false,message:res.data.message});
        }catch(error){
            if(axios.isAxiosError(error)){
                const { response } = error as AxiosError<ErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({ error: "Error resetting password", isLoading: false });
                }
            } else {
                set({ error: "Error resetting password", isLoading: false });
            }
            throw error;
        }
    }
}));
