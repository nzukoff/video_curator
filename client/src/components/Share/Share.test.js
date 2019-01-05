import React from 'react';
import { Share } from './Share';
import sinon from 'sinon';

import { createShallow } from '@material-ui/core/test-utils'
import { Typography, IconButton, Dialog, Button, Checkbox, FormControlLabel } from '@material-ui/core'

describe('Share Component', () => {
  let shallow
  let video
  let classes

  beforeEach(() => {
    shallow = createShallow();
    video = { 
      id: 1,
      title: "Dean Town",
      link: "https://www.youtube.com/watch?v=hAn-DWwHu6E",
      ytID: "hAn-DWwHu6E",
      duration: "05:57",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: "true",
      projection: "rectangular",
      thumbnail: "https://i.ytimg.com/vi/hAn-DWwHu6E/default.jpg",
      created: "2018-12-25T06:05:18.000+0000",
      modified: "2018-12-25T06:05:18.000+0000",
      timeSince: "16 hours",
      embedded: "false"
    }
    classes = `{root: {
      marginLeft: '10%',
      marginRight: '10%',
    }}`
  });

  it('displays a dialog component', () => {
    const shareWrapper = shallow(<Share id={1} classes={classes} video={video}/>);
    const dialog = shareWrapper.find(Dialog)
    expect(dialog).toHaveLength(1);
    // expect(displayedTitle.childAt(0).text()).toBe('Dean Town - [05:57]')
    // expect(displayedTitle.prop('component')).toBe('a')
    
  })


  it('displays a button component', () => {
    const shareWrapper = shallow(<Share id={1} classes={classes} video={video}/>);
    const copyLinkButton = shareWrapper.find(Button)
    expect(copyLinkButton).toHaveLength(1);
    // expect(displayedTitle.childAt(0).text()).toBe('Dean Town - [05:57]')
    // expect(displayedTitle.prop('component')).toBe('a')
  })

  it('displays a checkbox component', () => {
    const shareWrapper = shallow(<Share id={1} classes={classes} video={video}/>);
    const checkbox = shareWrapper.find(FormControlLabel)
    expect(checkbox).toHaveLength(1);
  })
})