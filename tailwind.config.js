/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        icons:'#344e41',
        articles_bg:'#edeec9',
        signUpBg:'#dda15e',
        signUpbtn:'#606c38',
        signinbtn:'#a49966',
        registerpage:'#edf6f9',
        customYellow: '#e9c46a', 
        customGray:'#99582a',
        customPeach:'#ffe6a7',
        customBox:'#ffffff',
      },
      fontFamily: {
    
        sans: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],        
        heading: ['Poppins', 'sans-serif'],      

   
        serif: ['Merriweather', 'Georgia', 'serif'],
        display: ['Playfair Display', 'serif'],    

        
        mono: ['Source Code Pro', 'Courier New', 'monospace'],
        code: ['Fira Code', 'monospace'],          

    
        cursive: ['Pacifico', 'cursive'],          
        handwrite: ['Dancing Script', 'cursive'],  

       
        customSans: ['Nunito Sans', 'sans-serif'], 
        customSerif: ['Lora', 'serif'],            
      },
    },
  },
  plugins: [],
}

