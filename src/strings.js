/**
 * @author Kowtha Saketh
 * @description Fundoo Strings collection 
 */

import {getParameterByName} from './helper'
import {LANGUAGES} from './constants'

const strings =
{
    "en": {
        title: "Fundoo",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        signIn: "Sign In",
        signInDesc: "to Continue with Fundoo",
        signUpDesc: "to Start with Fundoo",
        signUp: "Sign Up",
        userName: "Username",
        forgotPasswd: "Forgot Password?",
        createAccount: "Create Account",
        send: "Send",
        forgetPasswordDesc: "Enter your recovery email",
        findYourMail: "Find Your Email",
        invalidcredntails:"Invalid Credintails",
        invalidEmail: "Invalid EMail"
    },
    "fr":{
        title:"Fundoo",
        firstName:"Prénom",
        lastName:"Nom de famille",
        email:"Email",
        password:"Mot de passe",
        confirmPassword:"Confirmez le mot de passe",
        signIn:"Se connecter",
        signInDesc:"continuer avec Fundoo",
        signUpDesc:"commencer avec Fundoo",
        signUp:"S'inscrire",
        userName:"Nom d'utilisateur",
        forgotPasswd:"Mot de passe oublié?",
        createAccount:"Créer un compte",
        send:"Envoyer",
        forgetPasswordDesc:"Entrez votre e-mail de récupération",
        findYourMail:"Trouvez votre e-mail"
    },
    "jp":{
        title: "Fundoo",
        firstName: "ファーストネーム",
        lastName: "苗字",
        email: "Eメール",
        password: "パスワード",
        confirmPassword: "パスワードを認証する",
        signIn: "サインイン",
        signInDesc: "Fundooを続行するには",
        signUpDesc :"Fundooで始める",
        signUp :"サインアップ",
        userName:"ユーザー名",
        forgotPasswd:"パスワードをお忘れですか？",
        createAccount:"アカウントを作成する",
        send:"送る",
        forgetPasswordDesc:"予備のメールアドレスを入力してください",
        findYourMail:"メールを探す"
    }
}

/**
 * @name geti18N
 * @description Returns Required strings
 */
const geti18N = () =>{
    const lang = getParameterByName("lang") || "en"
    if(LANGUAGES[lang])
        return strings[lang]
    return strings["en"]
}

export default geti18N