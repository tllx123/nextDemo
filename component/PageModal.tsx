import * as React from 'react'

import Draggable from 'react-draggable'

import CloseIcon from '@mui/icons-material/Close'
import Crop32Icon from '@mui/icons-material/Crop32'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Paper, { PaperProps } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

function DraggableComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
  onChange: () => void
  change: boolean
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, onChange, change, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, height: '48px', cursor: 'move' }} {...other}>
      {children}
      {onClose ? (
        <div>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 4,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            aria-label="close"
            onClick={onChange}
            sx={{
              position: 'absolute',
              right: 40,
              top: 4,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            {change ? <FilterNoneIcon /> : <Crop32Icon />}
          </IconButton>
        </div>
      ) : null}
    </DialogTitle>
  )
}

interface PageModalProperty {
  title?: string
  closeHandlerKey?: string
  onClose?: (...args: any[]) => void
  onChange?: (...args: any[]) => void
  children?: JSX.Element | JSX.Element[] | null
}

const PageModal = function (props: PageModalProperty) {
  const [open, setOpen] = React.useState(true)
  const [fullScreen, setFullScreen] = React.useState(false)
  const { onClose, closeHandlerKey } = props
  const handleClose = (...args: any[]) => {
    setOpen(false)
    if (onClose) {
      onClose(...args)
    }
  }
  const handleFullScreen = (...args: any[]) => {
    if (fullScreen === false) {
      setFullScreen(true)
    } else {
      setFullScreen(false)
    }
  }

  if (closeHandlerKey && typeof window != 'undefined') {
    window[closeHandlerKey] = handleClose
  }
  if (!open) {
    return null
  }
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        maxWidth={false}
        PaperComponent={DraggableComponent}
        aria-labelledby="draggable-dialog-title"
        open={open}
        fullScreen={fullScreen}
      >
        <BootstrapDialogTitle
          id="draggable-dialog-title"
          onClose={handleClose}
          onChange={handleFullScreen}
          change={fullScreen}
        >
          <h4 style={{ lineHeight: '100%', fontSize: '16px', fontWeight: 'bold' }}>
            {props.title ? props.title : '123'}
          </h4>
        </BootstrapDialogTitle>
        <DialogContent
          sx={
            fullScreen
              ? {}
              : {
                  width: '960px',
                  height: '600px'
                }
          }
          dividers
        >
          {props.children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

export default PageModal
