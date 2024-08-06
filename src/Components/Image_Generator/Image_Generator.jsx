import './Image_Generator.css'
import Image from '../Assets/image.png'
import { useRef, useState } from 'react';


function Image_Generator() {

  const [image_url,setImage_url] = useState("/");

  const [loading,setLoading] = useState(false);


   let inputRef = useRef(null);

   const imageGenerate = async () =>
   {
    if(inputRef.current.value === ""){
      return 0;
    }

    setLoading(true);

     const response = await fetch(
      "Image Generate Api",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization: "Bearer ${Open Ai Key}",

          "User-Agent":"Chrome"
        },
        body:JSON.stringify({
          prompt:`${inputRef.current.value}`,
          n:1,
          size:"512x512",
        }),

      }
     );

     let data = await response.json();

     let data_array = data.data;
     setImage_url(data_array[0].url);
     
     setLoading(false);

   }

  return (
    <div className='ai-image-generator'>

    <div className='header'>AI Image <span>Generator</span></div>
    
    <div className='img-loading'>
    <div className='image'><img src={image_url === "/" ? Image :image_url} alt="default_image"/>

    <div className='loading'>
      <div className={loading?"loading-bar-full":"loading-bar"}>
      <div className={loading?"loading-text":"display-none"}>
        Loading...  
        </div>
      </div>
    </div>

    </div>

    </div>


    <div className="search-box">

      <input type="text"  ref={inputRef} className='search-input' placeholder='Describe What You Want Too See'/>

      <div className="generate-btn" onClick={() => {imageGenerate()}}>
        Generate
      </div>

      
    </div>

  
    </div>
  );
}

export default Image_Generator
