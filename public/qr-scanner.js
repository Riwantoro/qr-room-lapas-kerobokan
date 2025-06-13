class QRScanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        video {
          width: 100%;
          border: 2px solid #333;
        }
      </style>
      <video></video>
    `;
    this.video = this.shadowRoot.querySelector('video');
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.scanning = false;
  }

  connectedCallback() {
    this.startScanning();
  }

  disconnectedCallback() {
    this.stopScanning();
  }

  async startScanning() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      this.video.srcObject = stream;
      this.video.play();
      this.scanning = true;
      this.scan();
    } catch (err) {
      this.dispatchEvent(new CustomEvent('error', { detail: err }));
    }
  }

  stopScanning() {
    if (this.video.srcObject) {
      this.video.srcObject.getTracks().forEach(track => track.stop());
    }
    this.scanning = false;
  }

  scan() {
    if (!this.scanning) return;

    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      
      const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const code = this.decodeQR(imageData);
      
      if (code) {
        this.dispatchEvent(new CustomEvent('result', { detail: code }));
        this.stopScanning();
        return;
      }
    }
    
    requestAnimationFrame(() => this.scan());
  }

  // eslint-disable-next-line no-unused-vars
  decodeQR(_imageData) {
    // Simplified QR decoding (in a real app, use a library like jsQR)
    // This is just a placeholder
    return "D11"; // Mock result for demonstration
  }
}

customElements.define('qr-scanner', QRScanner);