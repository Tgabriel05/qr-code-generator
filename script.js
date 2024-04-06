
const qrBtn = document.getElementById('qr-btn'),
      urlInput = document.getElementById('url-input'),
      qrCodeDisplay = document.getElementById('qr-code'),
      downloadBtn = document.getElementById('download-btn'),
      copyBtn = document.getElementById('copy-btn'),
      page1Display = document.getElementById('page1'),
      page2Display = document.getElementById('page2'),
      bgLogo = document.getElementById('logo');

//API QR CODE


function getQrCode(){
  if(urlInput.value === ''){
    urlInput.classList.add('error');
    setTimeout(()=>{
      urlInput.classList.remove('error');
    },1000)
    return;
  }
  var qrCode = new QRCode(qrCodeDisplay, {
    text: urlInput.value,
    colorDark : "#000000",
    colorLight : "#ffffff",
    width: 185,
    height:200,
    correctLevel: QRCode.CorrectLevel.H
  });
  page1Display.style.display = 'none';
  page2Display.style.display = 'block';
  bgLogo.style.display = 'block';
  console.log(qrCode);


};
function downloadQR(){
  let qr_code_img = document.querySelector('#qr-code img'),
      qr_code_canvas = document.querySelector('canvas');

  downloadBtn.href = qr_code_img.getAttribute('src') || qr_code_canvas.toDataURL();
  downloadBtn.download = `${urlInput.value}.png`;
};

function copyQuote(){
  urlInput.select();
  navigator.clipboard.writeText(urlInput.value);
  copyBtn.innerHTML = 'Copied <i class="fa-solid fa-check"></i>';
  setTimeout(()=>{
    copyBtn.innerHTML = `Share <i class="fa fa-link" ></i>`
  },2000);
  
}function goToPage1(){
  urlInput.value = '';
  page1Display.style.display = 'block';
  page2Display.style.display = 'none';
  bgLogo.style.display = 'none';
  qrCodeDisplay.innerHTML = '';
};
//CLICKING BUTTONS
bgLogo.addEventListener('click', goToPage1);
qrBtn.addEventListener('click', getQrCode);
urlInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    e.preventDefault();
    getQrCode();
  }
});
downloadBtn.addEventListener('click', downloadQR);
copyBtn.addEventListener('click', copyQuote);


