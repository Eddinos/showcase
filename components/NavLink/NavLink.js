import React from 'react';
import {Component} from 'react';
import Link from 'next/link'
import './NavLink.scss';

export default class NavLink extends Component
{
  render() {
    return <Link {...this.props}/>
  }
}
