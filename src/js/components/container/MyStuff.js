import React, { Component } from "react";
import {
  Link,withRouter
} from 'react-router-dom';

import '../../../scss/components/myStuff.scss';

class MyStuff extends Component{
    render() {
        return {
            <div className="container">
                User profile
            </div>
        }
    }
}

export default withRouter(MyStuff);
