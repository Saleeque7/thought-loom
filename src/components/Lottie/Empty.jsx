import React, { useState, useEffect, useRef, memo } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { config } from "../../config/config";
const Empty = ({ message }) => {
  const [dotLottie, setDotLottie] = useState(null);


  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  return (
    <div>
      <div className="w-64 h-64 mx-auto">
        <DotLottieReact
          src={config.VITE_APP_LOTTIE_EMPTY}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
        />
      </div>  
    </div>
  );
};

export default memo(Empty);
