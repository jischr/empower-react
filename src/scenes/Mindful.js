import React, { Component } from 'react'

class Mindful extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="text-center">
        <h1>MINDFULNESS MEDITATION</h1>
        <div>
           <iframe title="sc-widget1" width="50%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/a-10-minute-meditation-to-work-with-difficult-emotions"></iframe>
        </div>
        <br/><br/>
        <div>
           <iframe title="sc-widget2" width="50%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/6-minute-mountain-meditation-to-help-you-shift-out-of-panic-mode"></iframe>
        </div>
        <br/><br/>
        <div>
           <iframe title="sc-widget3" width="50%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/7-minute-mindfulness-practice-for-responding-to-stress"></iframe>
        </div>
        <br/><br/>
        <div>
           <iframe title="sc-widget4" width="50%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/a-meditation-to-recharge-your-mind"></iframe>
        </div>
        <br/><br/>
        <div>
           <iframe title="sc-widget5" width="50%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/3-minute-body-scan-meditation"></iframe>
        </div>
        <br />
        <div>
           <iframe title="sc-widget6" width="50%" height="400" scrolling="yes" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/"></iframe>
        </div>
      </div>
    )
  }

}

export default Mindful
