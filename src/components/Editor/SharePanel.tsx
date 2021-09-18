import { Box } from '@chakra-ui/layout'
import React from 'react'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TelegramIcon,
} from 'react-share'

const SharePanel = ({ shareUrl, title }) => {
  const _title = title ? title : `whoDat deck`
  const iconProps = {
    round: true,
    size: 50,
  }
  return (
    <Box>
      <TwitterShareButton url={shareUrl} title={_title}>
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl} title={_title}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl} title={_title}>
        <WhatsappIcon {...iconProps} />
      </WhatsappShareButton>
      <TelegramShareButton url={shareUrl} title={_title}>
        <TelegramIcon {...iconProps} />
      </TelegramShareButton>
    </Box>
  )
}

export default SharePanel
