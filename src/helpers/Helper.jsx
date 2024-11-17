export function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`; // Generate a color based on the hash
    return color;
  }

  
  export function getInitials(fullName) {
   
    
    const names = fullName.split(" ");
  
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  }

  // export function getInitials(fullName) {
  //   if (!fullName || typeof fullName !== 'string') {
  //     return '';
  //   }
  
  //   const names = fullName.split(" ");
  //   const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  //   const initialsStr = initials.join("");
  
  //   return initialsStr;
  // }

  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const today = new Date();
    const isToday = 
      today.getDate() === inputDate.getDate() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getFullYear() === inputDate.getFullYear();
  
    if (isToday) {
      return "Today";
    }
  
    const year = inputDate.getFullYear();
    const month = inputDate.toLocaleString("default", { month: "long" });
    const day = inputDate.getDate();
  
    const formattedDate = `${month.slice(0,3)} ${day}, ${year}`;
    return formattedDate;
  }
  

//   <hr style={{ borderColor: '#31572c', borderWidth: '1px', borderStyle: 'solid', marginTop: '16px' }} />

     {/* <MdLogout
              size={26}
              className="text-gray-700 hover:text-gray-900"
              // onClick={()=>{dispatch(logoutUserInfo()) }}
            /> */}