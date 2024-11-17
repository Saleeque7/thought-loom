export const validateForm = (formData,confirmPassword, setErrors) => {
    const { firstName, lastName, email, phone, password } = formData;
    const newError = {};
    const phoneRegex = /^[0-9]{10,12}$/;
  
   
    const hasAtLeastThreeUniqueDigits = (phone) => {
      const uniqueDigits = new Set(phone.split(""));
      return uniqueDigits.size > 3;
    };
  
 
    if (!firstName?.trim()) newError.firstName = "First name is required";
    if (!lastName?.trim()) newError.lastName = "Last name is required";
    if (!email?.trim()) newError.email = "Email is required";
    if (!phone?.trim()) newError.phone = "Phone number is required";
    else if (!phoneRegex.test(phone))
      newError.phone = "Phone number must be 10-12 digits";
    else if (!hasAtLeastThreeUniqueDigits(phone))
      newError.phone = "Phone number must contain at least 3 unique digits";
  
    if (!password?.trim()) newError.password = "Password is required";
    if (!confirmPassword?.trim()) newError.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      newError.confirmPassword = "Passwords do not match";
  
   
    setErrors(newError);
  
   
    setTimeout(() => {
      setErrors({});
    }, 2000);
  
    return Object.keys(newError).length === 0;
  };

  export const validateLogin = (formdata,setErrors)=>{
    const {email  ,password } = formdata
    const newError  = {}
    if (!email?.trim()) newError.email = "Email is required";
    if (!password?.trim()) newError.password = "Password is required";

    setErrors(newError)

    setTimeout(() => {
      setErrors({});
    }, 2000);
  
    return Object.keys(newError).length === 0;

  }

  export const validateArticle = (formData, setErrors) => {
    const newErrors = {};
  
  
    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Title is required.";
    }
  

    if (!formData.subTitle || formData.subTitle.trim() === "") {
      newErrors.subTitle = "Subtitle is required.";
    }
  
 
    if (!formData.content || formData.content.trim().length < 20) {
      newErrors.content = "Content should be at least 20 characters.";
    }
  
    if (!formData.image) {
      newErrors.image = "An image is required.";
    }
  

    setErrors(newErrors);
    setTimeout(() => {
      setErrors({});
    }, 2000);
  
    return Object.keys(newErrors).length === 0;
  };
  