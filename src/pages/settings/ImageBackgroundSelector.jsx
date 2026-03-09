import img1 from "../../Components/backgroundComponent/images/anunay-rai-_a6zxdgt9Qs-unsplash.jpg";
import img2 from "../../Components/backgroundComponent/images/diego-ph-mKG3nYgEVIY-unsplash.jpg";
import img3 from "../../Components/backgroundComponent/images/nicolas-pinilla-aaWd4Nl9oFA-unsplash.jpg";
import img4 from "../../Components/backgroundComponent/images/sachin-khadka-LgZbhPuDiKg-unsplash.jpg";
import img5 from "../../Components/backgroundComponent/images/sajad-fi-Hb_Oaqh3vwE-unsplash.jpg";
import img6 from "../../Components/backgroundComponent/images/steve-johnson-A0lfciu6tC8-unsplash.jpg";
import img7 from "../../Components/backgroundComponent/images/steve-johnson-Xu75N4U2zAg-unsplash.jpg";
import "./settings.css";
import Background from "../../Components/backgroundComponent/Background";

const images = [img1, img2, img3, img4, img5, img6, img7];

function ImageBackgroundSelector({ setBackground, background }) {
  return (
    <Background background={background}>
      <div className="image-selector-page">
        <h2 className="settings-title">Choose Background Image</h2>
        <div className="image-list">
          {images.map((img, idx) => (
            <div className="image-item" key={idx}>
              <img src={img} alt={`background-${idx}`} className="selector-img" />
              <button className="set-bg-btn" onClick={() => setBackground(img)}>
                Set as Background
              </button>
            </div>
          ))}
        </div>
      </div>
    </Background>
  );
}

export default ImageBackgroundSelector;
