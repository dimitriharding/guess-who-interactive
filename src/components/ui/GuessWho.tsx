import ReactCompareImage from 'react-compare-image'

const GuessWho = ({ guessImage, actualImage, position = 0.5 }) => {
  return (
    <ReactCompareImage
      sliderPositionPercentage={position}
      leftImage={actualImage}
      rightImage={guessImage}
    />
  )
}

export default GuessWho
