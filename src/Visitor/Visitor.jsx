import 'animate.css';
import QRCode from 'qrcode.react';
import { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { saveAs } from 'file-saver';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';


function Visitor(){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('');
  const [program, setProgram] = useState('')
  const [color, setColor] = useState('#054080')
  const [displayColor, setDisplayColor] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [countdownTime, setCountdownTime] = useState(0);
  const [hasExpired, setHasExpired] = useState(false);


  const fileInputRef = useRef(null);

const info = {
  name: name,
  email: email,
  phone_number: phone,
  duration: duration
}

async function handleSubmit(e) {
    e.preventDefault();
    
    
  console.log('Submit button clicked')
    try {
      setLoading(true);
      const response = await fetch('https://wild-gold-coyote-wear.cyclic.app/api/visitor/add-visitor'
, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const json = await response.json();
      console.log(json);
      if (json.status === 'ERROR'){
      toast.error('User Already Exist');

  }else{
    handlegenerateQrcode()
    toast.success('Youve Been Added Succesfully')
    
  }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

// 'https://wild-gold-coyote-wear.cyclic.app/api/client/add-client'

  function handleFileSelect(event){
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      console.log('Selected file:', file);
    }
  }

  function durationToMinutes(duration) {
    if (duration.includes(':')) {
      const [hours, minutes] = duration.split(':').map(Number);
      return hours * 3600 + minutes * 60;
    } else if (duration.includes('hrs')) {
      const hours = parseInt(duration, 10);
      return hours * 3600;
    } else if (duration.includes('day')) {
      const days = parseInt(duration, 10);
      return days * 24 * 3600;
    } else if (duration.includes("month")) {
      const months = parseInt(duration, 10);
      return months * 30 * 24 * 3600;
    } else {
      return 0;
    }
  }
  
  
  

  function formatTime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedTime = `${days.toString().padStart(2, '0')} days: ${hours.toString().padStart(2, '0')} hours: ${minutes.toString().padStart(2, '0')} minutes: ${remainingSeconds.toString().padStart(2, '0')} seconds`;
  
    return formattedTime;
  }
  
  


  function handleClick(){
    setDisplayColor(!displayColor)
  }

  function CustomQRCode({ value, color, selectedImage }){
    return (
      <QRCode
        value={value}
        size={226}
        fgColor={color}
        imageSettings={{
          src: selectedImage,
          height: 60,
          width: 50,
        }}
      />
    );
}

function handlegenerateQrcode() {
  if (duration.trim() !== "") {
    setLoading(true);

    const minutes = durationToMinutes(duration); 
    setCountdownTime(minutes); 

    setTimeout(() => {
      setShowQRCode(true);
      setLoading(false);
    }, 2000);
  }
}


useEffect(() => {
  if (countdownTime > 0) {
    const intervalId = setInterval(() => {
      setCountdownTime((prevTime) => {
        if (prevTime === 0) {
          setShowQRCode(false);
          setHasExpired(true)
          clearInterval(intervalId);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }
}, [countdownTime]);


function handleChange (color){
  setColor(color.hex)
    }

    function generateQRCode() {
      const combinedInputs = `Name: ${name}\nNumber: ${phone}\nEmail: ${email}\nProgram Duration: ${duration}\nProgram: ${program}`;
      return combinedInputs;
    }

    function downloadimg() {
      const qrCodeDataUrl = document.querySelector('canvas').toDataURL(`image/${selectedFormat}`);
    
      const blob = dataURLtoBlob(qrCodeDataUrl);

      saveAs(blob, `qrcode.${selectedFormat}`);
    }

    function dataURLtoBlob(dataURL) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }

    useEffect(() => {
      if (showQRCode) {
        const intervalId = setInterval(() => {
          setCountdownTime((prevTime) => {
            if (prevTime === 0) {
              setShowQRCode(false); 
              clearInterval(intervalId); 
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [showQRCode],);
    

  return(
    <div className='flex  animate__animated animate__fadeInRight' >
<div className='w-[50%] bg-Fbg bg-cover bg-no-repeat flex justify-center items-center'>
<div className='mt-[5rem] '>
            {showQRCode ? (
              <>
                <CustomQRCode value={generateQRCode()} size={226} color={color} selectedImage={selectedImage}/>
               

<div className='flex items-center gap-2 mt-4'>
  <button className='bg-[#11ab7c] rounded-xl p-2 text-white font-medium w-[10rem] mt-4 ' onClick={downloadimg}>
    Download QR Code
  </button>

  <div className=''>
    <select
      id="format"
      onChange={(e) => setSelectedFormat(e.target.value)}
      className='p-2 border text-white font-medium border-gray-400  bg-[#11ab7c] rounded-xl mt-3'
    >
      <option value="png">PNG</option>
      <option value="jpg">JPG</option>
       <option value="svg">SVG</option>
    </select>
  </div>
</div>

<div className='mt-4 text-center items-center'>
<p className='text-white font-medium w-[20rem]'>Your Time Ends in : {formatTime(countdownTime)}</p>
</div>


              </>
            ):(
              <div className="w-[226px] h-[20rem] p-3 bg-white rounded-xl flex items-center text-center text-gray-500 font-bold text-lg" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'}}>Your QR Code Will Appear Here</div>
            )}
            
          </div>
</div>
  
   
<div className='w-[50%]  bg-bgg justify-center flex h-screen'>
  <form action="" className='mt-[4rem]' onSubmit={handleSubmit}>

      <h1 className='text-[30px] font-bold text-center text-white'>
      Sign Up
      </h1>
            <div className="mt-4">
              <label htmlFor="email" className="block text-[15px] mb-2 font-bold text-white">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                id="name"
                name="name"
                placeholder="Name"
                className="w-[36.5rem] p-2 border border-gray-500 rounded"
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="email" className="block text-[15px] mb-2 font-bold text-white">
                Email
              </label>
              <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-[36.5rem] p-2 border border-gray-500 rounded"
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="email" className="block text-[15px] mb-2 font-bold text-white">
                Phone
              </label>
              <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
                type="number"
                id="phone"
                name="phone"
                placeholder="Phone"
                className="w-[36.5rem] p-2 border border-gray-500 rounded"
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="duration" className="block text-[15px] mb-2 font-bold text-white">
                 Duration
              </label>
              <select
            
      id="format"
      onChange={(e) => setDuration(e.target.value)}
      className='p-2 border text-black font-medium border-gray-400  w-[36.5rem] rounded-xl mt-3'
      required
    >
      <option className='text-gray'>Select Duration</option>
      <option value="2hrs">2hrs</option>
      <option value="5hrs">5hrs</option>
       <option value="2day">1Day</option>
       
    </select>
            </div>

            <div className='mt-3'><label htmlFor='color' className='font-medium text-md text-white'>Color</label>
            <div className='flex items-center gap-2'>
                 <div 
                 onClick={handleClick}
                 style={{background:color}}
                 className='w-10 h-8 cursor-pointer border-4'></div>
                 <span className='text-white font-semibold'>{color}</span>
            </div>
            {displayColor && (
            <div className='absolute mt-2'>
              <ChromePicker color={color} onChange={handleChange}/>
            </div>
            )}
            
            <div className='flex items-center text-center justify-center gap-2 mt-2'>
     

            <div className='justify-center items-center '>
            <button type='submit' className='bg-[#054080] rounded-xl p-2 text-white font-medium '
              disabled={loading}
              style={{ width: '20rem' }}>
                {loading ? (<ClipLoader color="white" loading={loading} size={20} />) : ("Generate QR Code")}
              </button>
            </div>
    </div>
              
            </div>
            <ToastContainer/>
    </form>
  





</div>

    </div>
  );
}

export default Visitor;
