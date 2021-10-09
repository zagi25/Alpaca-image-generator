import data from './data';
import colors from './colors';
import {useState} from 'react';
import mergeImages from 'merge-images';
import {saveAs} from 'file-saver';

function Generator() {
  const [part, setPart] = useState('accessories');
  const [changePart, setChangePart] = useState({
    accessories: 'none',
    backgrounds: 'blue50',
    neck: 'default',
    mouth: 'default',
    ears: 'default',
    hair: 'default',
    leg: 'default',
    eyes: 'default',
  });
  const [randStyle, setRandStyle] = useState([]);
  const [hover, setHover] = useState('');
  const keys = Object.keys(data);
  let hoverStyle = {
    background: colors[changePart.backgrounds],
    color: 'white',
    border: `1px solid ${colors[changePart.backgrounds]}`,
  };
   
  let nonHoverStyle = {
    background: 'inherit',
    color: colors[changePart.backgrounds],
    border: `1px solid ${colors[changePart.backgrounds]}`,
  };

  const handleClickStyle = e => {
    e.preventDefault();
    setChangePart({...changePart, [part]: e.target.value});
  };

  const handleClickPart = e => {
    e.preventDefault();
    setPart(e.target.value);
  };

  const handleMouseEnter = e => {
    e.preventDefault();
    setHover(e.target.value);
  };

  const handleRandom = () => {
    let rand = [];
    for (let i = 0; i < keys.length; i++) {
      do {
        rand[i] = Math.floor(Math.random() * data[keys[i]].length);
      } while (rand[i] === randStyle[i]);
    }
    setChangePart({
      accessories: data.accessories[rand[0]],
      backgrounds: data.backgrounds[rand[1]],
      ears: data.ears[rand[2]],
      eyes: data.eyes[rand[3]],
      hair: data.hair[rand[4]],
      leg: data.leg[rand[5]],
      mouth: data.mouth[rand[6]],
      neck: data.neck[rand[7]],
    });
    setRandStyle(rand);
  };

  //I didn't like placment of some accessories so I did this if
  if (changePart.accessories === 'none') {
    mergeImages([
      `/img/alpaca/backgrounds/${changePart.backgrounds}.png`,
      `/img/alpaca/ears/${changePart.ears}.png`,
      `/img/alpaca/neck/${changePart.neck}.png`,
      `/img/alpaca/nose.png`,
      `/img/alpaca/mouth/${changePart.mouth}.png`,
      `/img/alpaca/hair/${changePart.hair}.png`,
      `/img/alpaca/eyes/${changePart.eyes}.png`,
      `/img/alpaca/leg/${changePart.leg}.png`,
    ]).then(b64 => (document.querySelector('img').src = b64));
  } else if (changePart.accessories === 'earings') {
    mergeImages([
      `/img/alpaca/backgrounds/${changePart.backgrounds}.png`,
      `/img/alpaca/ears/${changePart.ears}.png`,
      `/img/alpaca/neck/${changePart.neck}.png`,
      `/img/alpaca/nose.png`,
      `/img/alpaca/mouth/${changePart.mouth}.png`,
      {src: `/img/alpaca/accessories/earings.png`, x: 10},
      `/img/alpaca/hair/${changePart.hair}.png`,
      `/img/alpaca/eyes/${changePart.eyes}.png`,
      `/img/alpaca/leg/${changePart.leg}.png`,
    ]).then(b64 => (document.querySelector('img').src = b64));
  } else if (changePart.accessories === 'headphone') {
    mergeImages([
      `/img/alpaca/backgrounds/${changePart.backgrounds}.png`,
      `/img/alpaca/ears/${changePart.ears}.png`,
      `/img/alpaca/neck/${changePart.neck}.png`,
      `/img/alpaca/nose.png`,
      `/img/alpaca/mouth/${changePart.mouth}.png`,
      {src: `/img/alpaca/accessories/${changePart.accessories}.png`, x: -10},
      `/img/alpaca/hair/${changePart.hair}.png`,
      `img/alpaca/eyes/${changePart.eyes}.png`,
      `/img/alpaca/leg/${changePart.leg}.png`,
    ]).then(b64 => (document.querySelector('img').src = b64));
  } else if (changePart.accessories === 'glasses') {
    mergeImages([
      `/img/alpaca/backgrounds/${changePart.backgrounds}.png`,
      `/img/alpaca/ears/${changePart.ears}.png`,
      `/img/alpaca/neck/${changePart.neck}.png`,
      `/img/alpaca/nose.png`,
      `/img/alpaca/mouth/${changePart.mouth}.png`,
      `/img/alpaca/hair/${changePart.hair}.png`,
      `/img/alpaca/accessories/${changePart.accessories}.png`,
      `/img/alpaca/eyes/${changePart.eyes}.png`,
      `/img/alpaca/leg/${changePart.leg}.png`,
    ]).then(b64 => (document.querySelector('img').src = b64));
  } else {
    mergeImages([
      `/img/alpaca/backgrounds/${changePart.backgrounds}.png`,
      `/img/alpaca/ears/${changePart.ears}.png`,
      `/img/alpaca/neck/${changePart.neck}.png`,
      `/img/alpaca/nose.png`,
      `/img/alpaca/mouth/${changePart.mouth}.png`,
      `/img/alpaca/hair/${changePart.hair}.png`,
      `/img/alpaca/eyes/${changePart.eyes}.png`,
      `/img/alpaca/accessories/${changePart.accessories}.png`,
      `/img/alpaca/leg/${changePart.leg}.png`,
    ]).then(b64 => (document.querySelector('img').src = b64));
  }

  const handleDownload = () => {
    let imgUrl = document.querySelector('img').src;
    saveAs(imgUrl, 'alpaca.png');
  };

  return (
    <main>
      <header>
        <h1>lpaca generator</h1>
      </header>
      <section className="generator">
        <div className="img-container">
          <img alt="" className="merged-img" />
        </div>
        <div className="btn-container">
          <div className="parts">
            <h1>Accessorize the alapacha's</h1>
            {keys.map((key, index) => {
              if (part === key) {
                return (
                  <button
                    className="btn-parts"
                    key={index}
                    style={{
                      color: 'white',
                      background: colors[changePart.backgrounds],
                      border: `1px solid ${colors[changePart.backgrounds]}`,
                    }}
                    value={key}
                    onClick={e => handleClickPart(e)}
                  >
                    {key}
                  </button>
                );
              } else {
                if (hover === key) {
                  return (
                    <button
                      className="btn-parts"
                      style={hoverStyle}
                      key={index}
                      value={key}
                      onClick={e => handleClickPart(e)}
                      onMouseEnter={e => handleMouseEnter(e)}
                      onMouseLeave={() => setHover('')}
                    >
                      {key}
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="btn-parts"
                      style={nonHoverStyle}
                      key={index}
                      value={key}
                      onClick={e => handleClickPart(e)}
                      onMouseEnter={e => handleMouseEnter(e)}
                      onMouseLeave={() => setHover('')}
                    >
                      {key}
                    </button>
                  );
                }
              }
            })}
          </div>
          <div className="style">
            <h1>style</h1>
            {data[part].map((style, index) => {
              if (part === 'backgrounds') {
                return (
                  <button
                    className="btn-parts"
                    key={index}
                    style={{
                      color: colors[style],
                      background: colors[style],
                      border: colors[style],
                    }}
                    value={style}
                    onClick={e => handleClickStyle(e)}
                  >
                    yellow60
                  </button>
                );
              } else {
                if (changePart[part] === style) {
                  return (
                    <button
                      className="btn-parts"
                      key={index}
                      style={{
                        color: 'white',
                        background: colors[changePart.backgrounds],
                        border: `1px solid ${colors[changePart.backgrounds]}`,
                      }}
                      value={style}
                      onClick={e => handleClickStyle(e)}
                    >
                      {style}
                    </button>
                  );
                } else {
                  if (hover === style) {
                    return (
                      <button
                        className="btn-parts"
                        style={hoverStyle}
                        key={index}
                        value={style}
                        onClick={e => handleClickStyle(e)}
                        onMouseEnter={e => handleMouseEnter(e)}
                        onMouseLeave={() => setHover('')}
                      >
                        {style}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        className="btn-parts"
                        style={nonHoverStyle}
                        key={index}
                        value={style}
                        onClick={e => handleClickStyle(e)}
                        onMouseEnter={e => handleMouseEnter(e)}
                        onMouseLeave={() => setHover('')}
                      >
                        {style}
                      </button>
                    );
                  }
                }
              }
            })}
          </div>
          <div className="randown-container">
            <button
              className="btn-parts randown"
              onClick={() => handleRandom()}
            >
              Random
            </button>
            <button
              className="btn-parts randown"
              onClick={() => handleDownload()}
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Generator;
