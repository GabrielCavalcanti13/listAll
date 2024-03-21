import React, { useState } from 'react';
import imageDefault from '../../assets/image_default.png';
import './Item.css';

const Item = ({id, onDelete}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputFocused = (e) => {
    setInputFocused(true);
  };

  const handleInputBlur = (e) => {
    setInputFocused(false);
  };

  const handleImageHovered = (e) => {
    setImageHovered(true);
  }

  const handleImageLeaved = (e) => {
    setImageHovered(false);
  }


  return (
    <div className='item-container'>
      <div className='image-container'>
        <label htmlFor={`imageInput_${id}`} onMouseEnter={handleImageHovered} onMouseLeave={handleImageLeaved}>
          {selectedImage ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
               <img className='image' src={selectedImage} alt="Imagem Selecionada" />
              {imageHovered && (
                <button onClick={onDelete} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none', color: 'black', cursor: 'pointer' }}>Deletar</button>
              )}
            </div>
          ) : (
            <img className='image' src={imageDefault} alt="Imagem Selecionada" />
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id={`imageInput_${id}`}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        className={isInputFocused ? 'inputFocused' : 'inputNotFocused'}
        placeholder="Nome do Item..."
      />
    </div>
  );
};

export default Item;