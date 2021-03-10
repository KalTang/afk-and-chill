import React from 'react'
import { actions } from '@storybook/addon-actions'

import MessageForm from './index'

export default {
  title: 'Message Form',
  component: MessageForm,
}

const events = actions({ onSubmit: 'submit' })

export const Default = () => (
  <MessageForm 
  {...events}
  ></MessageForm>
)
