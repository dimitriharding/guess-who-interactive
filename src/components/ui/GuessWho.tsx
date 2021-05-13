import ReactCompareImage from 'react-compare-image'

const GuessWho = ({ guessImage, actualImage }) => {
  return <ReactCompareImage leftImage={actualImage} rightImage={guessImage} />
}

export default GuessWho
